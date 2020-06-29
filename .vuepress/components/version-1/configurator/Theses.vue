<template>
  <div>
    <thesis-editor
      :visible="thesis !== null"
      :store="store"
      :thesis="thesis"
      @save="save"
      @cancel="cancel"
    />
    <fieldset>
      <legend>{{ $t('title') }}</legend>
      <SlickList
        v-if="store.theses.length > 0 && store.parties.length > 0"
        lockAxis="y"
        :useDragHandle="true"
        v-model="store.theses"
        class="items"
      >
        <SlickItem
          v-for="(thesis, index) in store.theses"
          :index="index"
          :key="thesis.uuid"
          class="item"
        >
          <span v-handle class="handle"><Icon name="bars" /></span>
          <span>
            <strong>{{ thesis.title[defaultLanguage] }}</strong>
            <br>
            <small>
              <span v-if="positionsMissing(thesis) === store.parties.length">
                {{ $t('positions-complete') }} <Icon name="check" />
              </span>
              <span v-else>
                {{ $t('positions-missing', { only: positionsMissing(thesis), total: store.parties.length }) }}
              </span>
            </small>
          </span>
          <button @click="edit(thesis)" class="small">
            <Icon name="edit" /><span>{{ $t('edit') }}</span>
          </button>
          <button @click="remove(thesis)" class="small">
            <Icon name="trash" /><span>{{ $t('remove') }}</span>
          </button>
        </SlickItem>
      </SlickList>
      <p v-else-if="store.parties.length > 0" class="empty">
        {{ $t('empty') }}
      </p>
      <p v-else class="empty">
        {{ $t('empty-parties') }}
      </p>
      <button @click="add" class="add small">
        <Icon name="plus" /><span>{{ $t('add') }}</span></button>
    </fieldset>
  </div>
</template>

<script>
import uuid from 'uuid/v1';
import _filter from 'lodash/filter';
import { SlickList, SlickItem, HandleDirective } from 'vue-slicksort';
import ThesisEditor from './ThesisEditor.vue';

export default {
  name: 'Theses',
  data() {
    return {
      thesis: null, // which thesis should be edited, if any
    };
  },
  props: {
    store: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.$i18n.locale = this.$lang
  },
  methods: {
    positionsMissing(thesis) {
      return _filter(thesis.positions, (position => position.position !== null)).length;
    },
    add() {
      const positions = {};
      this.store.parties.forEach(party => {
        positions[party.uuid] = {
          position: null,
          explanation: {},
        };
      });
      this.$set(this, 'thesis', {
        uuid: null, // indicates, that this thesis is not yet present in the theses array
        title: {},
        statement: {},
        positions,
      });
    },
    edit(thesis) {
      this.store.parties.forEach(party => {
        if (!thesis.positions[party.uuid]) {
          this.$set(thesis.positions, party.uuid, {
            position: null,
            explanation: {},
          });
        }
      });
      this.$set(this, 'thesis', JSON.parse(JSON.stringify(thesis))); // clone thesis
    },
    findIndexOfThesis(thesis) {
      return this.store.theses.findIndex(item => item.uuid === thesis.uuid);
    },
    save() {
      if (this.thesis === null) {
        return;
      }

      // Add new thesis to parties array
      if (this.thesis.uuid === null) {
        this.thesis.uuid = uuid();
        this.store.theses.push(this.thesis);
        this.thesis = null;
        return;
      }

      // Save existing thesis
      const originalThesis = this.store.theses[this.findIndexOfThesis(this.thesis)];
      Object.assign(originalThesis, this.thesis);
      this.thesis = null;
      return;
    },
    cancel() {
      this.thesis = null;
    },
    remove(thesis) {
      const index = this.findIndexOfThesis(thesis);
      this.store.theses.splice(index, 1);
    },
  },
  computed: {
    defaultLanguage() {
      return this.store.languages[0].uuid;
    },
  },
  components: {
    SlickList,
    SlickItem,
    ThesisEditor,
  },
  directives: {
    handle: HandleDirective,
  },
  i18n: {
    messages: {
      'en-US': {
        title: '4. Theses',
        'positions-complete': 'Positions complete',
        'positions-missing': 'Positions missing (only {only} / {total})',
        edit: 'Edit',
        remove: 'Remove',
        add: 'Add thesis',
        empty: 'You haven\'t added any theses yet.',
        'empty-parties': 'You haven\'t added any theses yet, but add some parties first!'
      },
      'de-DE': {
        title: '4. Thesen',
        'positions-complete': 'Antworten vollständig',
        'positions-missing': 'Antworten unvollständig (nur {only} / {total})',
        edit: 'Bearbeiten',
        remove: 'Löschen',
        add: 'These hinzufügen',
        empty: 'Du hast noch keine Thesen hinzugefügt.',
        'empty-parties': 'Du hast noch keine Thesen hinzugefügt, lege erst ein paar Parteien an!'
      }
    }
  }
};
</script>

<style lang="css" scoped>
  .items {
    list-style-type: none;
    padding-left: 0;
  }
  .item {
    padding: 1rem;
    border: 1px solid #DDD;
    background-color: #F2F2F2;
    border-radius: 3px;
    display: flex;
    align-items: center;
    margin-top: 0.5rem;
    user-select: none;
  }
  .item > .handle {
    flex: 0 1 auto;
    margin-right: 0.75rem;
    cursor: grab;
  }
  .item > span {
    flex: 1 1 0%;
    justify-self: flex-start;
    margin-right: 0.5rem;
  }
  .item > button {
    flex: 0 1 auto;
    justify-self: flex-end;
  }
  .item > button + button {
    margin-left: 0.5rem;
  }
  p.empty {
    background-color: #F2F2F2;
    border-radius: 3px;
    padding: 2rem;
    text-align: center;
    font-style: italic;
    color: #BBB;
    margin: 0;
  }
  .add {
    margin-top: 1rem;
  }
</style>