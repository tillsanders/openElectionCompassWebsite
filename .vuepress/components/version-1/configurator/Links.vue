<template>
  <div>
    <link-editor
      :visible="link !== null"
      :link="link"
      :store="store"
      @save="save"
      @cancel="cancel"
    />
    <fieldset>
      <legend>{{ $t('title') }}</legend>
      <p>{{ $t('explanation') }}</p>
      <SlickList
        lockAxis="y"
        :useDragHandle="true"
        v-model="store.links"
        class="items"
      >
        <SlickItem
          v-for="(link, index) in store.links"
          :index="index"
          :key="link.uuid"
          class="item"
        >
          <span v-handle class="handle"><Icon name="bars" /></span>
          <span>
            <strong>{{ link.text[defaultLanguage] }}</strong>
            <br>
            <small>{{ link.href[defaultLanguage] }}</small>
          </span>
          <button @click="edit(link)" class="small">
            <Icon name="edit" /><span>{{ $t('edit') }}</span>
          </button>
          <button @click="remove(link)" class="small">
            <Icon name="trash" /><span>{{ $t('remove') }}</span>
          </button>
        </SlickItem>
      </SlickList>
      <button @click="add" class="add small">
        <Icon name="plus" /><span>{{ $t('add') }}</span></button>
    </fieldset>
  </div>
</template>

<script>
import { v1 as uuid } from 'uuid';
import _filter from 'lodash/filter';
import { SlickList, SlickItem, HandleDirective } from 'vue-slicksort';
import LinkEditor from './LinkEditor.vue';

export default {
  name: 'Links',
  data() {
    return {
      link: null, // which link should be edited, if any
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
      this.$set(this, 'link', {
        uuid: null, // indicates, that this link is not yet present in the links array
        text: {},
        href: {},
      });
    },
    edit(link) {
      this.$set(this, 'link', JSON.parse(JSON.stringify(link))); // clone link
    },
    findIndexOfLink(link) {
      return this.store.links.findIndex(item => item.uuid === link.uuid);
    },
    save() {
      if (this.link === null) {
        return;
      }

      // Add new link to links array
      if (this.link.uuid === null) {
        this.link.uuid = uuid();
        this.store.links.push(this.link);
        this.link = null;
        return;
      }

      // Save existing link
      const originalLink = this.store.links[this.findIndexOfLink(this.link)];
      Object.assign(originalLink, this.link);
      this.link = null;
      return;
    },
    cancel() {
      this.link = null;
    },
    remove(link) {
      const index = this.findIndexOfLink(link);
      this.store.links.splice(index, 1);
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
    LinkEditor,
  },
  directives: {
    handle: HandleDirective,
  },
  i18n: {
    messages: {
      'en-US': {
        title: '6. Links',
        explanation: 'You can display links in the footer and at the bottom of the navigation to link to your home page, privacy policy, about page etc.',
        edit: 'Edit',
        remove: 'Remove',
        add: 'Add link'
      },
      'de-DE': {
        title: '6. Links',
        explanation: 'Im Fußbereich, sowie am Ende der Navigation können Links zu deiner Startseite, Datenschutzerklärung, Impressum etc. angezeigt werden.',
        edit: 'Bearbeiten',
        remove: 'Löschen',
        add: 'Link hinzufügen'
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
  .add {
    margin-top: 1rem;
  }
</style>