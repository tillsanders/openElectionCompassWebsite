<template>
  <div>
    <fieldset>
      <legend>2. General information</legend>
      <!-- Title -->
      <LanguageSwitch :languages="store.languages" :values="store.title" v-slot="{selected}">
        <FieldInput
          alias="title"
          name="Title"
          type="text"
          rules="required|min:3"
          v-model="store.title[selected]"
          placeholder="General Election of the United Nations"
          description="The title of the election."
        />
      </LanguageSwitch>

      <!-- Subtitle -->
      <LanguageSwitch :languages="store.languages" :values="store.subtitle" v-slot="{selected}">
        <FieldInput
          alias="subtitle"
          name="Subtitle"
          type="text"
          rules="required"
          v-model="store.subtitle[selected]"
          placeholder="This election compass is provided by your local democracy support group."
          description="The subtitle, visible in the start section. Should, for example, mention the responsible organization."
        />
      </LanguageSwitch>

      <!-- Introduction Heading -->
      <LanguageSwitch :languages="store.languages" :values="store.introduction.heading" v-slot="{selected}">
        <FieldInput
          alias="introduction-heading"
          name="Introduction, Heading"
          type="text"
          rules="required"
          v-model="store.introduction.heading[selected]"
          placeholder="Welcome to the Election Compass"
          description="Below the start section is a short introduction section that starts with a heading. Use about 3 to 5 welcoming words."
        />
      </LanguageSwitch>

      <!-- Introduction Text -->
      <LanguageSwitch :languages="store.languages" :values="store.introduction.text" v-slot="{selected}">
        <FieldTextarea
          alias="introduction-text"
          name="Introduction, Text"
          rules="required"
          v-model="store.introduction.text[selected]"
          placeholder="All 9 parties that are participating in the election have ..."
          description="Provide a short introduction to your election compass. Don't add explanations on how it works, rather tell your audience, who you are and why you are doing this, how many parties participated, etc. About 2 - 5 sentences."
        />
      </LanguageSwitch>
    </fieldset>
  </div>
</template>

<script>
import FieldInput from '../../fields/FieldInput.vue';
import FieldTextarea from '../../fields/FieldTextarea.vue';
import LanguageSwitch from './LanguageSwitch.vue';

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
};
</script>
