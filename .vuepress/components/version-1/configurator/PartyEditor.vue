<template>
  <modal :visible="visible" @close="$emit('cancel')">
    <template v-if="party !== null">
      <h2 v-if="party.uuid === null">{{ $t('add-party') }}</h2>
      <h2 v-else-if="party.short.length > 0">{{ $t('edit-party') }} '{{ party.short }}'</h2>
      <h2 v-else>{{ $t('edit-party') }}</h2>
      <ValidationObserver v-slot="{ invalid }">
        <form @submit.prevent="$emit('save')">
          <!-- Name -->
          <LanguageSwitch :languages="store.languages" :values="party.name" v-slot="{selected}">
            <FieldInput
              alias="name"
              :name="$t('fields.name.name')"
              type="text"
              rules="required"
              v-model="party.name[selected]"
              :placeholder="$t('fields.name.placeholder')"
              :description="$t('fields.name.description')"
            />
          </LanguageSwitch>
          <!-- Short Name -->
          <LanguageSwitch :languages="store.languages" :values="party.short" v-slot="{selected}">
            <FieldInput
              alias="short"
              :name="$t('fields.short.name')"
              type="text"
              rules="required"
              v-model="party.short[selected]"
              placeholder="SCP"
              :placeholder="$t('fields.short.placeholder')"
              :description="$t('fields.short.description')"
            />
          </LanguageSwitch>
          <!-- Alias -->
          <FieldInput
            alias="alias"
            :name="$t('fields.alias.name')"
            type="text"
            :rules="{ required: true, alpha: true, regex: /^[a-z]+$/ }"
            v-model="party.alias"
            :placeholder="$t('fields.alias.placeholder')"
            :description="$t('fields.alias.description')"
          />
          <!-- Description -->
          <LanguageSwitch :languages="store.languages" :values="party.description" v-slot="{selected}">
            <FieldInput
              alias="description"
              :name="$t('fields.description.name')"
              type="text"
              rules="required"
              v-model="party.description[selected]"
              :description="$t('fields.description.description')"
            />
          </LanguageSwitch>
          <!-- Logo -->
          <FieldFile
            alias="logo"
            :name="$t('fields.logo.name')"
            type="file"
            rules="ext:jpg,png,svg|image|size:50|dimensions:400,400"
            v-model="party.logo"
            :description="$t('fields.logo.description')"
          />
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
import FieldFile from '../../fields/FieldFile.vue';
import LanguageSwitch from '../../LanguageSwitch.vue';

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
  mounted() {
    this.$i18n.locale = this.$lang
  },
  i18n: {
    messages: {
      'en-US': {
        'add-party': 'Add party',
        'edit-party': 'Edit party',
        'save': 'Save',
        fields: {
          name: {
            name: 'Full Name',
            placeholder: 'Super Democratic Party',
            description: 'The full name of the party, without abbrevations.',
          },
          short: {
            name: 'Short Name / Abbrevation',
            placeholder: 'SDP',
            description: 'The abbrevation or short name of the party, as it is usually used in logos, charts, etc.',
          },
          alias: {
            name: 'Identifier for technical purposes',
            placeholder: 'sdp',
            description: 'The identifier of the party, used for technical purposes. Simply enter the abbrevation of the party name in small letters without spaces and make sure it is unique (no two parties may have the same identifier). The identifier is used in the theses objects to map the positions to the respective parties.',
          },
          description: {
            name: 'Description',
            description: 'A small description of the history or the political direction of this party.',
          },
          logo: {
            name: 'Party logo',
            description: 'Supported formats: SVG, PNG and JPG. Dimensions: 400 x 400 px. Use SVG whenever possible, because of its smaller file size. This is especially important when you have a great number of parties. Avoid PNG and JPG as best you can.',
          },
        }
      },
      'de-DE': {
        'add-party': 'Partei anlegen',
        'edit-party': 'Partei bearbeiten',
        'save': 'Speichern',
        fields: {
          name: {
            name: 'Vollständiger Name',
            placeholder: 'Super Demokratische Partei',
            description: 'Der vollständige Name der Partei, ohne Abkürzungen.',
          },
          short: {
            name: 'Kürzel / Kurzer Name',
            placeholder: 'SDP',
            description: 'Das Kürzel oder der kurze Name der Partei, wie er für gewöhnlich in Logos und Diagrammen auftaucht.',
          },
          alias: {
            name: 'ID / Alias (für technische Zwecke)',
            placeholder: 'sdp',
            description: 'Die ID der Partei, für technische Zwecke. Verwende hier einfach die Abkürzung der Partei in Kleinbuchstaben, ohne Leerzeichen, und stelle sicher, dass sie einzigartig ist (keine zwei Parteien dürfen dieselbe ID verwenden). Die ID kommt in den Thesen-Objekten zum Einsatz um die Positionen den entsprechenden Parteien zuzuordnen.',
          },
          description: {
            name: 'Beschreibung',
            description: 'Eine kurze Beschreibung der Geschichte oder der politischen Ausrichtung der Partei.',
          },
          logo: {
            name: 'Party logo',
            description: 'Unterstützte Formate: SVG, PNG und JPG. Maße: 400 x 400 px. Verwende SVG, wann immer möglich, aufgrund der geringen Dateigröße. Dies ist besonders relevant, wenn du eine große Zahl an Parteien hast. Vermeide PNG und JPG so gut es geht.',
          },
        }
      }
    }
  }
};
</script>
