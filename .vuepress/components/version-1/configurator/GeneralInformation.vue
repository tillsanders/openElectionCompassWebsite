<template>
  <div>
    <fieldset>
      <legend>2. General information</legend>
      <!-- Title -->
      <LanguageSwitch :languages="store.languages" :values="store.title" v-slot="{selected}">
        <Field-Input
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
        <Field-Input
          alias="subtitle"
          name="Subtitle"
          type="text"
          rules="required"
          v-model="store.subtitle[selected]"
          placeholder="This election compass is provided by your local democracy support group."
          description="The subtitle, visible in the start section. Should, for example, mention the responsible organization."
        />
      </LanguageSwitch>
    </fieldset>
  </div>
</template>

<script>
import FieldInput from '../../fields/FieldInput.vue';
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
    LanguageSwitch,
  },
};
</script>
