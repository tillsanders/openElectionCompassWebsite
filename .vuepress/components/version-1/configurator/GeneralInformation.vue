<template>
  <div>
    <fieldset>
      <legend>1. General information</legend>
      <!-- Title -->
      <Field-Input
        alias="title"
        name="Title"
        type="text"
        rules="required"
        v-model="store.title"
        placeholder="General Election of the United Nations"
        description="The title of the election."
      />

      <!-- Subtitle -->
      <Field-Input
        alias="subtitle"
        name="Subtitle"
        type="text"
        rules="required"
        v-model="store.subtitle"
        placeholder="This election compass is provided by your local democracy support group."
        description="The subtitle, visible in the start section. Should, for example, mention the responsible organization."
      />

      <!-- Language -->
      <Field-Input
        alias="language"
        name="Language Code"
        type="text"
        :rules="{ required: true, alpha: true, length: 2, regex: /^[a-z]+$/ }"
        v-model="store.language"
        placeholder="en"
      >
        <template v-slot:description>
          A two letter, lowercase language code as defined by <a href="https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes" target="_blank">ISO 639-1</a>. E.g. 'en' for English, 'de' for German, etc.
        </template>
      </Field-Input>
    </fieldset>
  </div>
</template>

<script>
import FieldInput from '../../fields/FieldInput.vue';

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
  },
};
</script>
