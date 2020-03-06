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
    save(store) {
      const configuration = {};
      configuration.version = '1';
      configuration.title = store.title;
      configuration.subtitle = store.subtitle;
      configuration.language = store.language;
      configuration.parties = this.store.parties.map(party => {
        return {
          alias: party.alias,
          name: party.name,
          short: party.short,
          description: party.description,
          logo: party.logo,
        };
      });
      configuration.theses = this.store.theses.map(thesis => {
        const positions = {};
        this.store.parties.forEach(party => {
          if (thesis.positions[party.uuid]) {
            positions[party.alias] = {
              name: thesis.positions[party.uuid].name,
              statement: thesis.positions[party.uuid].statement,
              position: thesis.positions[party.uuid].position,
              explanation: thesis.positions[party.uuid].explanation,
            };
          }
        });
        return {
          name: thesis.name,
          statement: thesis.statement,
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