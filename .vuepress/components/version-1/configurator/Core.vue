<template>
  <div>
    <StorageButtons :store="store" @reset="reset" />
    <Languages :store="store" />
    <GeneralInformation :store="store" />
    <Parties :store="store" />
    <Theses :store="store" />
    <Links :store="store" />
    <hr>
    <DownloadButton :store="store" />
  </div>
</template>

<script>
import { localize } from 'vee-validate';
import uuid from 'uuid/v1';
import de from 'vee-validate/dist/locale/de.json';
import en from 'vee-validate/dist/locale/en.json';
import Languages from './Languages.vue';
import GeneralInformation from './GeneralInformation.vue';
import Parties from './Parties.vue';
import Theses from './Theses.vue';
import Links from './Links.vue';
import DownloadButton from './DownloadButton.vue';
import StorageButtons from './StorageButtons.vue';

// Install vee-validate error messages
localize({
  de,
  en,
});

export default {
  name: 'Version1',
  data() {
    return {
      store: {
        languages: [{ uuid: uuid(), name: 'English', code: 'en' }],
        title: {},
        subtitle: {},
        introduction: {
          heading: {},
          text: {},
        },
        parties: [],
        theses: [],
        links: [],
      },
    };
  },
  components: {
    Languages,
    GeneralInformation,
    Parties,
    Theses,
    Links,
    DownloadButton,
    StorageButtons,
  },
  methods: {
    reset() {
      this.$set(this, 'store', {
        languages: [{ uuid: uuid(), name: 'English', code: 'en' }],
        title: {},
        subtitle: {},
        introduction: {
          heading: {},
          text: {},
        },
        parties: [],
        theses: [],
        links: [],
      });
    },
  },
  mounted() {
    localize(this.$lang.substring(0, 2));
  }
};
</script>

<style>
  fieldset {
    border: none;
    padding: 0;
    margin: 2rem 0;
  }
  legend {
    font-size: 2rem;
    padding: 2rem 0;
  }
  .field {
    margin-bottom: 2rem;
  }
  button, a.button {
    display: inline-block;
    font-size: 1.2rem;
    color: #fff;
    background-color: #d69e2e;
    padding: 0.8em 1.6em;
    border-radius: 4px;
    transition: background-color 0.1s ease;
    box-sizing: border-box;
    border-width: 0;
    border-bottom: 1px solid #c48f26;
    cursor: pointer;
    text-decoration: none !important;
  }
  button:disabled, button:disabled:hover {
    background-color: rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.15);
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    cursor: not-allowed;
  }
  button:hover, a.button:hover {
	  background-color: #daa843;
  }
  button:focus, a.button:focus {
	  outline: none;
    box-shadow: 0 0 0 2px rgb(218, 168, 67);
  }
  button.small, a.button.small {
    font-size: 0.875rem;
    background-color: rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.7);
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  }
  button.small:hover, a.button.small:hover {
	  background-color: rgba(0, 0, 0, 0.075);
  }
  button .icon + span, button span + .icon,
  a.button .icon + span, a.button span + .icon {
    margin-left: 0.75em;
  }
</style>