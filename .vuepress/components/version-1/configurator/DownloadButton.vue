<template>
  <div class="buttons">
    <a
      class="button"
      v-if="configurationBlobUrl !== null"
      :href="configurationBlobUrl"
      download="configuration.json"
    >
      <Icon name="download" />
      <span>Download</span>
    </a>
  </div>
</template>

<script>
import uuid from 'uuid/v1';
import _forEach from 'lodash/forEach';

export default {
  name: 'DownloadButton',
  data() {
    return {
      configurationBlobUrl: null,
    };
  },
  props: {
    store: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.$watch('store', (store) => {
      this.save(store);
    }, { deep: true });
  },
  methods: {
    toJsonBlobLink(json) {
      const blob = new Blob([ json ], { type: 'application/json' });
      return URL.createObjectURL(blob);
    },
    /*
     * Translations are keyed by language.uuid internally. The format however expects translations
     * keyed by the language code (e.g. 'en'), because this is shorter and more human-readable. This
     * method converts the uuid keys to language code keys.
     */
    keyTranslationsByLanguageCode(languages, translations) {
      const converted = {};
      _forEach(languages, ({code, uuid}) => {
        converted[code] = translations[uuid];
      });
      return converted;
    },
    save(store) {
      const configuration = {};
      configuration.version = '1';
      configuration.languages = this.store.languages.map(language => {
        return {
          name: language.name,
          code: language.code,
        };
      });
      configuration.title = this.keyTranslationsByLanguageCode(store.languages, store.title);
      configuration.subtitle = this.keyTranslationsByLanguageCode(store.languages, store.subtitle);
      configuration.introduction = {
        heading: this.keyTranslationsByLanguageCode(store.languages, store.introduction.heading),
        text: this.keyTranslationsByLanguageCode(store.languages, store.introduction.text),
      };
      configuration.parties = this.store.parties.map(party => {
        return {
          alias: party.alias,
          name: this.keyTranslationsByLanguageCode(store.languages, party.name),
          short: this.keyTranslationsByLanguageCode(store.languages, party.short),
          description: this.keyTranslationsByLanguageCode(store.languages, party.description),
          logo: party.logo,
        };
      });
      configuration.theses = this.store.theses.map(thesis => {
        const positions = {};
        this.store.parties.forEach(party => {
          if (thesis.positions[party.uuid]) {
            positions[party.alias] = {
              position: thesis.positions[party.uuid].position,
              explanation: this.keyTranslationsByLanguageCode(store.languages, thesis.positions[party.uuid].explanation),
            };
          }
        });
        return {
          title: this.keyTranslationsByLanguageCode(store.languages, thesis.title),
          statement: this.keyTranslationsByLanguageCode(store.languages, thesis.statement),
          positions,
        };
      });

      const json = JSON.stringify(configuration);
      localStorage.setItem('oec-v1-config', json);
      this.configurationBlobUrl = this.toJsonBlobLink(json);
    },
  },
};
</script>

<style scoped>
.buttons {
  text-align: right;
  padding-top: 1rem;
}
</style>