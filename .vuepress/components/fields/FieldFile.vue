<template>
  <div class="field">
    <div class="input">
      <ValidationProvider :name="name" :rules="rules" v-slot="{ changed, errors }">
        <label
          :for="`generator-${alias}`"
          :class="errors.length > 0 ? 'invalid' : changed ? 'valid' : ''"
        >
          {{ name }}
        </label>
        <input
          @input="upload($event)"
          type="file"
          :name="alias"
          :id="`generator-${alias}`"
          :class="errors.length > 0 ? 'invalid' : changed ? 'valid' : ''"
        />
        <small v-if="errors.length < 1">
          <slot name="description">{{ description }}</slot>
        </small>
        <small v-else class="error">{{ errors[0] }}</small>
        <button
          v-if="value"
          @click="$emit('change', null)"
          class="small clear"
        >
          {{ $t('clear') }}
        </button>
      </ValidationProvider>
    </div>
    <div class="preview">
      <div
        v-if="preview === 'image'"
        class="preview__image"
      >
        <img v-if="value" :src="value" />
        <div v-else class="placeholder">{{ $t('preview.image.empty') }}</div>
      </div>
      <div
        v-else-if="preview === 'configuration'"
        class="preview__configuration"
      >
        <Icon name="file" v-if="value" />
        <div v-else class="placeholder">{{ $t('preview.configuration.empty') }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationProvider } from 'vee-validate';
import { extend } from 'vee-validate';
import { dimensions, ext, image, size } from 'vee-validate/dist/rules';

extend('dimensions', dimensions);
extend('ext', ext);
extend('image', image);
extend('size', size);

export default {
  name: 'FieldFile',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    alias: {
      type: String,
      required: true,
    },
    // The human readable name
    name: {
      type: String,
      required: true,
    },
    value: {
      required: true,
    },
    rules: {
      type: [String, Object],
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    preview: {
      type: String,
      default: 'image',
      validator(value) {
        return ['image', 'configuration'].includes(value);
      },
    },
    returnType: {
      type: String,
      default: 'data-url',
      validator(value) {
        return ['data-url', 'text'].includes(value);
      },
    }
  },
  mounted() {
    this.$i18n.locale = this.$lang;
  },
  methods: {
    upload(event) {
      if (event.target.files === undefined || event.target.files[0] === undefined) {
        return;
      }
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.$emit('change', reader.result);
      };
      if (this.returnType === 'data-url') {
        reader.readAsDataURL(file);
      } else if (this.returnType === 'text') {
        reader.readAsText(file);
      }
    },
  },
  components: {
    ValidationProvider,
  },
  i18n: {
    messages: {
      'en-US': {
        clear: 'Clear',
        preview: {
          image: {
            empty: 'No image',
          },
          configuration: {
            empty: 'No file',
          },
        },
      },
      'de-DE': {
        clear: 'Leeren',
        preview: {
          image: {
            empty: 'Keine Grafik',
          },
          configuration: {
            empty: 'Keine Datei',
          },
        },
      }
    }
  }
};
</script>

<style lang="css" scoped>
  .field {
    display: grid;
    grid-template-columns: auto 200px;
    grid-template-rows: auto;
    grid-gap: 1rem;
  }
  .field .input {
    grid-column: 1;
    grid-row: 1;
  }
  .preview {
    grid-column: 2;
    grid-row: 1;
    background-color: #F2F2F2;
    height: 200px;
    width: 200px;
    border-radius: 3px;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 100%;
    justify-content: center;
    align-items: center;
  }
  .preview__configuration {
    text-align: center;
    grid-column: 0;
    grid-row: 0;
  }
  .preview__configuration .icon {
    font-size: 3rem;
  }
  .placeholder {
    padding: 1rem;
    text-align: center;
    font-style: italic;
    color: #BBB;
    box-sizing: border-box;
  }
  .clear {
    margin-top: 1.5rem;
  }
  label {
    display: block;
    margin-bottom: 0.5rem;
    transition: color 0.2s ease-out;
  }
  label.valid {
    color: #42B983;
  }
  label.invalid {
    color: #CC0000;
  }
  input {
    padding: 0.5rem;
    border-radius: 3px;
    border: 1px solid #ddd;
    display: block;
    width: 100%;
    box-sizing: border-box;
    transition: border-color 0.2s ease-out;
  }
  input:hover {
    border-color: #ccc;
  }
  input:focus {
    border-color: #d69e2e;
  }
  ::placeholder {
    font-style: italic;
    color: #CCC;
  }
  input + small {
    display: block;
    margin-top: 0.5rem;
    font-style: italic;
    color: #999;
  }
  input.valid {
    border-color: #42B983;
  }
  input.invalid {
    border-color: #CC0000;
  }
  input + small.error {
    color: #CC0000;
  }
</style>
