<template>
  <modal :visible="visible" @close="$emit('cancel')">
    <template v-if="language !== null">
      <h2 v-if="language.uuid === null">Add language</h2>
      <h2 v-else-if="language.name.length > 0">Edit language '{{ language.name }}'</h2>
      <h2 v-else>Edit language</h2>
      <ValidationObserver v-slot="{ invalid }">
        <form @submit.prevent="$emit('save')">
          <!-- Name -->
          <FieldInput
            alias="name"
            name="Name"
            type="text"
            rules="required"
            v-model="language.name"
            placeholder="English"
            description="The full name of the language, in the language itself."
          />
          <!-- Code -->
          <Field-Input
            alias="code"
            name="Code"
            type="text"
            :rules="{ required: true, alpha: true, length: 2, regex: /^[a-z]+$/ }"
            v-model="language.code"
            placeholder="en"
          >
            <template v-slot:description>
              A two letter, lowercase language code as defined by <a href="https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes" target="_blank">ISO 639-1</a>. E.g. 'en' for English, 'de' for German, etc.
            </template>
          </Field-Input>
          <button type="submit" :disabled="invalid">
            <Icon name="check" /><span>Save</span>
          </button>
        </form>
      </ValidationObserver>
    </template>
  </modal>
</template>

<script>
import { ValidationObserver } from 'vee-validate';
import Modal from '../../Modal.vue';
import FieldInput from '../../fields/FieldInput.vue';
import FieldFile from '../../fields/FieldFile.vue';

export default {
  name: 'LanguageEditor',
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    language: {
      type: Object,
      default: null,
    },
  },
  components: {
    Modal,
    FieldInput,
    FieldFile,
    ValidationObserver,
  },
};
</script>
