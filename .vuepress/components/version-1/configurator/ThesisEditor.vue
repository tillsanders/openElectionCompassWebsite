<template>
  <modal :visible="visible" @close="$emit('cancel')">
    <template v-if="thesis !== null">
      <h2 v-if="thesis.uuid === null">Add thesis</h2>
      <h2 v-else-if="thesis.name.length > 0">Edit thesis '{{ thesis.name }}'</h2>
      <h2 v-else>Edit thesis</h2>
      <ValidationObserver v-slot="{ invalid }">
        <form @submit.prevent="$emit('save')">
          <!-- Title -->
          <FieldInput
            alias="title"
            name="Title"
            type="text"
            rules="required"
            v-model="thesis.title"
            placeholder="Political Education"
            description="A short name, describing what this thesis is about. Two to four words. Will be visible above the actual statement."
          />
          <!-- Statement -->
          <FieldInput
            alias="statement"
            name="Statement"
            type="text"
            rules="required"
            v-model="thesis.statement"
            placeholder="The government should support political education by financing the election compass."
            description="The actual thesis. Choose your words carefully! The thesis needs to be balanced and specific enough. Explain what should be implemented, but don't be too detailed about how this might be achieved."
          />
          <!-- Position -->
          <fieldset v-for="party in store.parties">
            <legend>{{ `Position of ${party.short} (${party.name})` }}</legend>
            <FieldSelect
              :alias="`position-${party.alias}`"
              :name="`Position of ${party.short} (${party.name})`"
              :rules="{}"
              :options="[
                { value: 'approve', name: 'Approve' },
                { value: 'neutral', name: 'Neutral' },
                { value: 'reject', name: 'Reject' },
                { value: 'skip', name: 'No Position' },
              ]"
              v-model="thesis.positions[party.uuid].position"
            />
            <FieldTextarea
              :alias="`explanation-${party.alias}`"
              :name="`Explanation of ${party.short} (${party.name})`"
              :rules="{}"
              v-model="thesis.positions[party.uuid].explanation"
            />
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
  components: {
    Modal,
    FieldInput,
    FieldSelect,
    FieldTextarea,
    ValidationObserver,
  },
};
</script>
