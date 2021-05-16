<template>
  <div>
    <party-editor
      :visible="party !== null"
      :party="party"
      :store="store"
      @save="save"
      @cancel="cancel"
    />
    <fieldset>
      <legend>{{ $t('title') }}</legend>
      <SlickList
        v-if="store.parties.length > 0"
        lockAxis="y"
        :useDragHandle="true"
        v-model="store.parties"
        class="items"
      >
        <SlickItem
          v-for="(party, index) in store.parties"
          :index="index"
          :key="party.uuid"
          class="item"
        >
          <span v-handle class="handle"><Icon name="bars" /></span>
          <img v-if="party.logo" :src="party.logo" class="logo" />
          <span>
            <strong>{{ party.short[defaultLanguage] }}</strong>
            <br>
            <small>{{ party.name[defaultLanguage] }}</small>
          </span>
          <button @click="edit(party)" class="small">
            <Icon name="edit" /><span>{{ $t('edit') }}</span>
          </button>
          <button @click="remove(party)" class="small">
            <Icon name="trash" /><span>{{ $t('remove') }}</span>
          </button>
        </SlickItem>
      </SlickList>
      <p v-else class="empty">{{ $t('empty') }}</p>
      <button @click="add" class="add small">
        <Icon name="plus" /><span>{{ $t('add') }}</span></button>
    </fieldset>
  </div>
</template>

<script>
import { v1 as uuid } from 'uuid';
import { SlickList, SlickItem, HandleDirective } from 'vue-slicksort';
import PartyEditor from './PartyEditor.vue';

export default {
  name: 'Parties',
  data() {
    return {
      party: null, // which party should be edited, if any
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
    add() {
      this.$set(this, 'party', {
        uuid: null, // indicates, that this party is not yet present in the parties array
        alias: '',
        name: {},
        short: {},
        description: {},
        logo: null,
      });
    },
    edit(party) {
      this.$set(this, 'party', JSON.parse(JSON.stringify(party))); // clone party
    },
    findIndexOfParty(party) {
      return this.store.parties.findIndex(item => item.uuid === party.uuid);
    },
    save() {
      if (this.party === null) {
        return;
      }

      // Add new party to parties array
      if (this.party.uuid === null) {
        this.party.uuid = uuid();
        this.store.parties.push(this.party);
        this.party = null;
        return;
      }

      // Save existing party
      const originalParty = this.store.parties[this.findIndexOfParty(this.party)];
      Object.assign(originalParty, this.party);
      this.party = null;
      return;
    },
    cancel() {
      this.party = null;
    },
    remove(party) {
      const index = this.findIndexOfParty(party);
      this.store.parties.splice(index, 1);
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
    PartyEditor,
  },
  directives: {
    handle: HandleDirective,
  },
  i18n: {
    messages: {
      'en-US': {
        title: '3. Parties',
        edit: 'Edit',
        remove: 'Remove',
        add: 'Add party',
        empty: 'You haven\'t added any parties yet.'
      },
      'de-DE': {
        title: '3. Parteien',
        edit: 'Bearbeiten',
        remove: 'Löschen',
        add: 'Partei hinzufügen',
        empty: 'Du hast noch keine Parteien hinzugefügt.'
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
  .item > .logo {
    flex: 0 1 auto;
    width: 40px;
    margin-right: 1rem;
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