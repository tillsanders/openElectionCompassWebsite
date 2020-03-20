<template>
  <modal :visible="visible" @close="$emit('cancel')">
    <template v-if="party !== null">
      <h2 v-if="party.uuid === null">Add party</h2>
      <h2 v-else-if="party.short.length > 0">Edit party '{{ party.short }}'</h2>
      <h2 v-else>Edit party</h2>
      <ValidationObserver v-slot="{ invalid }">
        <form @submit.prevent="$emit('save')">
          <!-- Name -->
          <LanguageSwitch :languages="store.languages" :values="party.name" v-slot="{selected}">
            <FieldInput
              alias="name"
              name="Full Name"
              type="text"
              rules="required"
              v-model="party.name[selected]"
              placeholder="Super Democratic Party"
              description="The full name of the party, without abbrevations."
            />
          </LanguageSwitch>
          <!-- Short Name -->
          <LanguageSwitch :languages="store.languages" :values="party.short" v-slot="{selected}">
            <FieldInput
              alias="short"
              name="Short Name / Abbrevation"
              type="text"
              rules="required"
              v-model="party.short[selected]"
              placeholder="SCP"
              description="The abbrevation or short name of the party, as it is usually used in logos, charts, etc."
            />
          </LanguageSwitch>
          <!-- Alias -->
          <FieldInput
            alias="alias"
            name="Identifier for technical purposes"
            type="text"
            :rules="{ required: true, alpha: true, regex: /^[a-z]+$/ }"
            v-model="party.alias"
            placeholder="sdp"
            description="The identifier of the party, used for technical purposes. Just enter the abbrevation of the party name in small letters and make sure it is unique (no two parties may have the same identifier)."
          />
          <!-- Description -->
          <LanguageSwitch :languages="store.languages" :values="party.description" v-slot="{selected}">
            <FieldInput
              alias="description"
              name="Description"
              type="text"
              rules="required"
              v-model="party.description[selected]"
              description="A small description of the history or the political direction of this party."
            />
          </LanguageSwitch>
          <!-- Logo -->
          <FieldFile
            alias="logo"
            name="Party Logo"
            type="file"
            rules="ext:jpg,png,svg|image|size:50|dimensions:400,400"
            v-model="party.logo"
            description="Supported formats: SVG, PNG and JPG. Dimensions: 400 x 400 px. Use SVG whenever possible, because of its smaller file size. This is especially important when you have a great number of parties. Avoid PNG and JPG as best you can."
          />
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
import LanguageSwitch from './LanguageSwitch.vue';

export default {
  name: 'PartyEditor',
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    party: {
      type: Object,
      default: null,
    },
    store: {
      type: Object,
      required: true,
    },
  },
  components: {
    Modal,
    FieldInput,
    FieldFile,
    ValidationObserver,
    LanguageSwitch,
  },
};
</script>
