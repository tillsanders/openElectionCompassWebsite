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
        algorithm: 'cityblock/accept-neutral-reject',
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
        algorithm: 'cityblock/accept-neutral-reject',
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
