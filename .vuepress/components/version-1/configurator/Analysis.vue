<template>
  <div>
    <fieldset>
      <legend>{{ $t('title') }}</legend>
      <!-- Endpoint -->
      <FieldInput
        alias="endpoint"
        :name="$t('fields.endpoint.name')"
        type="text"
        rules=""
        v-model="store.analysis.endpoint"
        :placeholder="$t('fields.endpoint.placeholder')"
        :description="$t('fields.endpoint.description')"
      />

      <!-- Institution -->
      <LanguageSwitch :languages="store.languages" :values="store.analysis.institution" v-slot="{selected}">
        <FieldInput
          alias="institution"
          :name="$t('fields.institution.name')"
          type="text"
          rules=""
          v-model="store.analysis.institution[selected]"
          :placeholder="$t('fields.institution.placeholder')"
          :description="$t('fields.institution.description')"
        />
      </LanguageSwitch>

      <!-- Survey -->
      <LanguageSwitch :languages="store.languages" :values="store.analysis.survey" v-slot="{selected}">
        <FieldInput
          alias="survey"
          :name="$t('fields.survey.name')"
          type="text"
          rules=""
          v-model="store.analysis.survey[selected]"
          :placeholder="$t('fields.survey.placeholder')"
          :description="$t('fields.survey.description')"
        />
      </LanguageSwitch>
    </fieldset>
  </div>
</template>

<script>
import FieldInput from '../../fields/FieldInput.vue';
import LanguageSwitch from '../../LanguageSwitch.vue';

export default {
  name: 'Analysis',
  props: {
    store: {
      type: Object,
      required: true,
    },
  },
  components: {
    FieldInput,
    LanguageSwitch,
  },
  mounted() {
    this.$i18n.locale = this.$lang
  },
  i18n: {
    messages: {
      'en-US': {
        title: '5. Analysis',
        fields: {
          endpoint: {
            name: 'Endpoint URL',
            placeholder: 'https://api.example.com/data/',
            description: 'If you want to collect data for scientific research, you can activate this feature by providing an endpoint that will collect the datasets.',
          },
          institution: {
            name: 'Institution',
            placeholder: 'University Münster',
            description: 'The name of your institution / university / research group.',
          },
          survey: {
            name: 'Survey URL',
            placeholder: 'http://example.com/survey/en',
            description: 'Use this option to provide a follow-up questionnaire for user\'s that answered all other questions.',
          }
        }
      },
      'de-DE': {
        title: '5. Analyse',
        fields: {
          endpoint: {
            name: 'Endpunkt URL',
            placeholder: 'https://api.example.com/data/',
            description: 'Wenn du Daten für wissenschaftliche Forschung sammeln möchtest, kannst du dieses Feature aktivieren indem du einen Endpunkt bereitstellst, der die Datensätze sammelt.',
          },
          institution: {
            name: 'Institution',
            placeholder: 'Universität Münster',
            description: 'Der Name deiner Institution / Universität / Forschungsgruppe.',
          },
          survey: {
            name: 'Folgefragebogen URL',
            placeholder: 'http://example.com/survey/de',
            description: 'Nutze diese Option um einen Folgefragebogen bereitzustellen für Besucher:innen, die alle übrigen Fragen beantwortet haben.',
          }
        }
      }
    }
  }
};
</script>
