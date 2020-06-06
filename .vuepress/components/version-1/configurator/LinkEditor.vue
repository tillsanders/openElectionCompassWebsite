<template>
  <modal :visible="visible" @close="$emit('cancel')">
    <template v-if="link !== null">
      <h2 v-if="link.uuid === null">{{ $t('add-link') }}</h2>
      <h2 v-else>{{ $t('edit-link') }}</h2>
      <ValidationObserver v-slot="{ invalid }">
        <form @submit.prevent="$emit('save')">
          <!-- Text -->
          <LanguageSwitch :languages="store.languages" :values="link.text" v-slot="{selected}">
            <FieldInput
              alias="text"
              :name="$t('fields.text.name')"
              type="text"
              rules="required"
              v-model="link.text[selected]"
              :placeholder="$t('fields.text.placeholder')"
              :description="$t('fields.text.description')"
            />
          </LanguageSwitch>
          <!-- Href -->
          <LanguageSwitch :languages="store.languages" :values="link.href" v-slot="{selected}">
            <FieldInput
              alias="href"
              :name="$t('fields.href.name')"
              type="text"
              rules="required"
              v-model="link.href[selected]"
              :placeholder="$t('fields.href.placeholder')"
              :description="$t('fields.href.description')"
            />
          </LanguageSwitch>
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
import FieldInput from '../../fields/FieldInput.vue';
import LanguageSwitch from '../../LanguageSwitch.vue';
import Modal from '../../Modal.vue';

export default {
  name: 'LinkEditor',
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    link: {
      type: Object,
      default: null,
    },
    store: {
      type: Object,
      required: true,
    },
  },
  components: {
    FieldInput,
    LanguageSwitch,
    Modal,
    ValidationObserver,
  },
  mounted() {
    this.$i18n.locale = this.$lang
  },
  i18n: {
    messages: {
      'en-US': {
        'add-link': 'Add link',
        'edit-link': 'Edit link',
        'save': 'Save',
        fields: {
          text: {
            name: 'Label',
            placeholder: 'Privacy Policy',
            description: 'The link\'s caption. Keep it short and precise, 1 – 3 words.',
          },
          href: {
            name: 'Link',
            placeholder: 'https://example.com',
            description: 'The actual link as it appears in your browser\'s address bar. You can provide separate links for every language in case the linked resource is also multilingual. If not, simply enter the same link for every language.',
          },
        }
      },
      'de-DE': {
        'add-link': 'Link hinzufügen',
        'edit-link': 'Link bearbeiten',
        'save': 'Speichern',
        fields: {
          text: {
            name: 'Beschriftung',
            placeholder: 'Datenschutzerklärung',
            description: 'Die Beschriftung des Links. Vorzugsweise kurz und präzise, 1 – 3 Wörter.',
          },
          href: {
            name: 'Link',
            placeholder: 'https://example.com',
            description: 'Der eigentliche Link, wie er in der Addresszeile deines Browsers erscheint. Du kannst unterschiedliche Links je Sprache verwenden für den Fall, dass die verlinkte Ressource ebenfalls mehrsprachig ist. Andernfalls verwende einfach für jede Sprache denselben Link.',
          },
        }
      }
    }
  }
};
</script>
