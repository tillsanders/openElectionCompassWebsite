<template>
  <div>
    <fieldset>
      <legend>{{ $t('title') }}</legend>
      <!-- Title -->
      <LanguageSwitch :languages="store.languages" :values="store.title" v-slot="{selected}">
        <FieldInput
          alias="title"
          :name="$t('fields.title.name')"
          type="text"
          rules="required|min:3"
          v-model="store.title[selected]"
          :placeholder="$t('fields.title.placeholder')"
          :description="$t('fields.title.description')"
        />
      </LanguageSwitch>

      <!-- Subtitle -->
      <LanguageSwitch :languages="store.languages" :values="store.subtitle" v-slot="{selected}">
        <FieldInput
          alias="subtitle"
          :name="$t('fields.subtitle.name')"
          type="text"
          rules="required"
          v-model="store.subtitle[selected]"
          :placeholder="$t('fields.subtitle.placeholder')"
          :description="$t('fields.subtitle.description')"
        />
      </LanguageSwitch>

      <!-- Introduction Heading -->
      <LanguageSwitch :languages="store.languages" :values="store.introduction.heading" v-slot="{selected}">
        <FieldInput
          alias="introduction-heading"
          :name="$t('fields.introduction-heading.name')"
          type="text"
          rules="required"
          v-model="store.introduction.heading[selected]"
          :placeholder="$t('fields.introduction-heading.placeholder')"
          :description="$t('fields.introduction-heading.description')"
        />
      </LanguageSwitch>

      <!-- Introduction Text -->
      <LanguageSwitch :languages="store.languages" :values="store.introduction.text" v-slot="{selected}">
        <FieldTextarea
          alias="introduction-text"
          :name="$t('fields.introduction-text.name')"
          rules="required"
          v-model="store.introduction.text[selected]"
          :placeholder="$t('fields.introduction-text.placeholder')"
          :description="$t('fields.introduction-text.description')"
        />
      </LanguageSwitch>
    </fieldset>
  </div>
</template>

<script>
import FieldInput from '../../fields/FieldInput.vue';
import FieldTextarea from '../../fields/FieldTextarea.vue';
import LanguageSwitch from '../../LanguageSwitch.vue';

export default {
  name: 'GeneralInformation',
  props: {
    store: {
      type: Object,
      required: true,
    },
  },
  components: {
    FieldInput,
    FieldTextarea,
    LanguageSwitch,
  },
  mounted() {
    this.$i18n.locale = this.$lang
  },
  i18n: {
    messages: {
      'en-US': {
        title: '2. General information',
        fields: {
          title: {
            name: 'Title',
            placeholder: 'General Election of the United Nations',
            description: 'The title of the election.',
          },
          subtitle: {
            name: 'Subtitle',
            placeholder: 'This election compass is provided by your local democracy support group.',
            description: 'The subtitle, visible in the start section. Should, for example, mention the responsible organization.',
          },
          'introduction-heading': {
            name: 'Introduction, Heading',
            placeholder: 'Welcome to the Election Compass',
            description: 'Below the start section is a short introduction section that starts with a heading. Use about 3 to 5 welcoming words.',
          },
          'introduction-text': {
            name: 'Introduction, Text',
            placeholder: 'All 9 parties that are participating in the election have ...',
            description: 'Provide a short introduction to your election compass. Don\'t add explanations on how it works, rather tell your audience, who you are and why you are doing this, how many parties participated, etc. About 2 - 5 sentences.',
          },
        }
      },
      'de-DE': {
        title: '2. Allgemeine Informationen',
        fields: {
          title: {
            name: 'Titel',
            placeholder: 'Allgemeine Wahl der Vereinten Nationen',
            description: 'Der Titel der Wahl.',
          },
          subtitle: {
            name: 'Untertitel',
            placeholder: 'Dieser Wahlkompass wird bereitgestellt von deiner örtlichen Demokratie-Unterstützungsgruppe.',
            description: 'Der Untertitel, sichtbar im Startabschnitt ist. Sollte, zum Beispiel, die verantwortliche Organisation erwähnen.',
          },
          'introduction-heading': {
            name: 'Einleitung, Überschrift',
            placeholder: 'Willkommen zum Wahlkompass',
            description: 'Unterhalb des Startbereiches folgt eine kurze Einleitung, welche mit einer Überschrift beginnt. Verwende etwa 3 - 5 Grußworte.',
          },
          'introduction-text': {
            name: 'Einleitung, Text',
            placeholder: 'Alle 9 zur Wahl aufgestellten Parteien haben an diesem Wahlkompass ...',
            description: 'Gib eine kurze Einleitung in deinen Wahlkompass. Erläutere an dieser Stelle nicht die Bedienung, sondern erkläre deinen Besucher:innen, wer du bist und warum du das tust, wieviele Parteien teilnehmen, etc. Ungefähr 2 - 5 Sätze.',
          },
        }
      }
    }
  }
};
</script>
