<template>
  <div class="buttons">
    <button class="small" @click="loadFromBrowser">
      <Icon name="history" />
      <span>Load from browser storage</span>
    </button>
    <button class="small" @click="openFileDialog">
      <Icon name="upload" />
      <span>Load from file</span>
    </button>
    <input type="file" class="file-button" @input="loadFromFile($event)" />
    <button class="small" @click="$emit('clear')">
      <Icon name="trash" />
      <span>Clear browser storage</span>
    </button>
  </div>
</template>

<script>
import uuid from 'uuid/v1';
export default {
  name: 'StorageButtons',
  props: {
    store: {
      type: Object,
      required: true,
    },
  },
  methods: {
    loadFromBrowser() {
      const existing = localStorage.getItem('oec-v1-config');
      if (existing) {
        this.load(existing);
      } else {
        alert('The browser storage appears to be empty :(');
      }
    },
    openFileDialog() {
      this.$el.querySelector('input.file-button').click();
    },
    loadFromFile(event) {
      if (event.target.files === undefined || event.target.files[0] === undefined) {
        return;
      }
      const file = event.target.files[0];
      if (file.type !== 'application/json') {
        alert('Please upload a JSON file.')
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        console.log(reader.result);
        this.load(reader.result);
      };
      reader.readAsText(file);
    },
    load(json) {
      const configuration = JSON.parse(json);
      this.store.title = configuration.title;
      this.store.subtitle = configuration.subtitle;
      this.store.language = configuration.language;
      configuration.parties.forEach((party) => {
        this.store.parties.push({
          uuid: uuid(),
          alias: party.alias,
          name: party.name,
          short: party.short,
          description: party.description,
          logo: party.logo,
        });
      });
      configuration.theses.forEach((thesis) => {
        const positions = {};
        this.store.parties.forEach(party => {
          if (thesis.positions[party.alias]) {
            positions[party.uuid] = {
              name: thesis.positions[party.alias].name,
              statement: thesis.positions[party.alias].statement,
              position: thesis.positions[party.alias].position,
              explanation: thesis.positions[party.alias].explanation,
            };
          }
        });
        this.store.theses.push({
          uuid: uuid(),
          name: thesis.name,
          statement: thesis.statement,
          positions,
        });
      });
    },
  },
};
</script>

<style scoped>
.buttons {
  padding-top: 1rem;
}
.file-button {
  position: fixed;
  top: -100vh;
}
</style>