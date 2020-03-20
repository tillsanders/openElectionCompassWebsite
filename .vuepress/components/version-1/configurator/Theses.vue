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
      <legend>4. Theses</legend>
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
                Positions complete <Icon name="check" />
              </span>
              <span v-else>
                Positions missing (only {{ positionsMissing(thesis) }} / {{ store.parties.length }})
              </span>
            </small>
          </span>
          <button @click="edit(thesis)" class="small">
            <Icon name="edit" /><span>Edit</span>
          </button>
          <button @click="remove(thesis)" class="small">
            <Icon name="trash" /><span>Remove</span>
          </button>
        </SlickItem>
      </SlickList>
      <p v-else-if="store.parties.length > 0" class="empty">
        You haven't added any theses yet.
      </p>
      <p v-else class="empty">
        You haven't added any theses yet, but add some parties first!
      </p>
      <button @click="add" class="add small">
        <Icon name="plus" /><span>Add thesis</span></button>
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
            explanation: null,
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