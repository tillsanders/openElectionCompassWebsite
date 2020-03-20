<template>
  <modal :visible="visible" @close="$emit('cancel')">
    <template v-if="thesis !== null">
      <h2 v-if="thesis.uuid === null">Add thesis</h2>
      <h2 v-else-if="thesis.title.length > 0">Edit thesis '{{ thesis.title }}'</h2>
      <h2 v-else>Edit thesis</h2>
      <ValidationObserver v-slot="{ invalid }">
        <form @submit.prevent="$emit('save')">
          <!-- Title -->
          <LanguageSwitch :languages="store.languages" :values="thesis.title" v-slot="{selected}">
            <FieldInput
              alias="title"
              name="Title"
              type="text"
              rules="required"
              v-model="thesis.title[selected]"
              placeholder="Political Education"
              description="A short name, describing what this thesis is about. Two to four words. Will be visible above the actual statement."
            />
          </LanguageSwitch>
          <!-- Statement -->
          <LanguageSwitch :languages="store.languages" :values="thesis.statement" v-slot="{selected}">
            <FieldInput
              alias="statement"
              name="Statement"
              type="text"
              rules="required"
              v-model="thesis.statement[selected]"
              placeholder="The government should support political education by financing the election compass."
              description="The actual thesis. Choose your words carefully! The thesis needs to be balanced and specific enough. Explain what should be implemented, but don't be too detailed about how this might be achieved."
            />
          </LanguageSwitch>
          <!-- Position -->
          <fieldset v-for="party in store.parties">
            <legend>{{ `Position of ${party.short[defaultLanguage]} (${party.name[defaultLanguage]})` }}</legend>
            <FieldSelect
              :alias="`position-${party.alias}`"
              :name="`Position of ${party.short[defaultLanguage]} (${party.name[defaultLanguage]})`"
              :rules="{}"
              :options="[
                { value: 'approve', name: 'Approve' },
                { value: 'neutral', name: 'Neutral' },
                { value: 'reject', name: 'Reject' },
                { value: 'skip', name: 'No Position' },
              ]"
              v-model="thesis.positions[party.uuid].position"
            />
            <LanguageSwitch :languages="store.languages" :values="thesis.positions[party.uuid].explanation" v-slot="{selected}">
              <FieldTextarea
                :alias="`explanation-${party.alias}`"
                :name="`Explanation of ${party.short[defaultLanguage]} (${party.name[defaultLanguage]})`"
                :rules="{}"
                v-model="thesis.positions[party.uuid].explanation[selected]"
              />
            </LanguageSwitch>
          </fieldset>
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
import FieldSelect from '../../fields/FieldSelect.vue';
import FieldTextarea from '../../fields/FieldTextarea.vue';
import LanguageSwitch from './LanguageSwitch.vue';

export default {
  name: 'ThesisEditor',
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    store: {
      type: Object,
      required: true,
    },
    thesis: {
      type: Object,
      default: null,
    },
  },
  computed: {
    defaultLanguage() {
      return this.store.languages[0].uuid;
    },
  },
  components: {
    Modal,
    FieldInput,
    FieldSelect,
    FieldTextarea,
    ValidationObserver,
    LanguageSwitch,
  },
};
</script>
