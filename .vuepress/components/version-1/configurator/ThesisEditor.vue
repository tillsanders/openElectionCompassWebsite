<template>
  <modal :visible="visible" @close="$emit('cancel')">
    <template v-if="thesis !== null">
      <h2 v-if="thesis.uuid === null">{{ $t('add-thesis') }}</h2>
      <h2 v-else-if="thesis.title.length > 0">{{ $t('edit-thesis') }} '{{ thesis.title }}'</h2>
      <h2 v-else>{{ $t('edit-thesis') }}</h2>
      <ValidationObserver v-slot="{ invalid }">
        <form @submit.prevent="$emit('save')">
          <!-- Title -->
          <LanguageSwitch :languages="store.languages" :values="thesis.title" v-slot="{selected}">
            <FieldInput
              alias="title"
              :name="$t('fields.title.name')"
              type="text"
              rules="required"
              v-model="thesis.title[selected]"
              :placeholder="$t('fields.title.placeholder')"
              :description="$t('fields.title.description')"
            />
          </LanguageSwitch>
          <!-- Statement -->
          <LanguageSwitch :languages="store.languages" :values="thesis.statement" v-slot="{selected}">
            <FieldInput
              alias="statement"
              :name="$t('fields.statement.name')"
              type="text"
              rules="required"
              v-model="thesis.statement[selected]"
              :placeholder="$t('fields.statement.placeholder')"
              :description="$t('fields.statement.description')"
            />
          </LanguageSwitch>
          <!-- Position -->
          <fieldset v-for="party in store.parties">
            <legend>
              {{ $t('fields.position.name', { short: party.short[defaultLanguage], name: party.name[defaultLanguage] }) }}
            </legend>
            <FieldSelect
              :alias="`position-${party.alias}`"
              :name="$t('fields.position.name', { short: party.short[defaultLanguage], name: party.name[defaultLanguage] })"
              :rules="{}"
              :options="[
                { value: 'approve', name: $t('fields.position.options.approve') },
                { value: 'neutral', name: $t('fields.position.options.neutral') },
                { value: 'reject', name: $t('fields.position.options.reject') },
                { value: 'skip', name: $t('fields.position.options.skip') },
              ]"
              v-model="thesis.positions[party.uuid].position"
            />
            <LanguageSwitch :languages="store.languages" :values="thesis.positions[party.uuid].explanation" v-slot="{selected}">
              <FieldTextarea
                :alias="`explanation-${party.alias}`"
                :name="$t('fields.explanation.name', { short: party.short[defaultLanguage], name: party.name[defaultLanguage] })"
                :rules="{}"
                v-model="thesis.positions[party.uuid].explanation[selected]"
              />
            </LanguageSwitch>
          </fieldset>
          <button type="submit" :disabled="invalid">
            <Icon name="check" /><span>{{ $t('save') }}</span>
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
  mounted() {
    this.$i18n.locale = this.$lang
  },
  i18n: {
    messages: {
      'en-US': {
        'add-thesis': 'Add thesis',
        'edit-thesis': 'Edit thesis',
        'save': 'Save',
        fields: {
          title: {
            name: 'Title',
            placeholder: 'Political Education',
            description: 'A short name, describing what this thesis is about. Two to four words. Will be visible above the actual statement.',
          },
          statement: {
            name: 'Statement',
            placeholder: 'The government should increase financial support of political education.',
            description: 'The actual thesis. Choose your words carefully! The thesis needs to be balanced and specific enough. Explain what should be implemented, but don\'t be too detailed about how this might be achieved.',
          },
          position: {
            name: 'Position of {short} ({name})',
            options: {
              approve: 'Approve',
              neutral: 'Neutral',
              reject: 'Reject',
              skip: 'No position'
            }
          },
          explanation: {
            name: 'Explanation of {short} ({name})'
          }
        }
      },
      'de-DE': {
        'add-thesis': 'These anlegen',
        'edit-thesis': 'These bearbeiten',
        'save': 'Speichern',
        fields: {
          title: {
            name: 'Titel',
            placeholder: 'Politische Bildung',
            description: 'Ein kurzer Name der das Themengebiet der These beschreibt. Zwei bis vier Wörter. Wird direkt oberhalb der eigentlichen These angezeigt.',
          },
          statement: {
            name: 'These',
            placeholder: 'Die Bundesregierung soll politische Bildung stärker finanziell unterstützen.',
            description: 'Die eigentliche These. Wähle deine Worte mit Bedacht! Eine These muss ausgewogen und präzise sein. Erkläre, was umgesetzt werden soll, aber gehe nicht ins Detail, wie dies erreicht werden könnte.',
          },
          position: {
            name: 'Position der {short} ({name})',
            options: {
              approve: 'Zustimmung',
              neutral: 'Neutral',
              reject: 'Ablehnung',
              skip: 'Keine Position'
            }
          },
          explanation: {
            name: 'Antwort der {short} ({name})'
          }
        }
      }
    }
  }
};
</script>
