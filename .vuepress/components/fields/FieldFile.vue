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
          Clear image
        </button>
      </ValidationProvider>
    </div>
    <div class="preview">
      <img v-if="value" :src="value" />
      <div v-else class="placeholder">No image</div>
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
      reader.readAsDataURL(file);
    },
  },
  components: {
    ValidationProvider,
  },
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
  .field .preview {
    grid-column: 2;
    grid-row: 1;
  }
  .placeholder {
    background-color: #F2F2F2;
    height: 200px;
    width: 200px;
    border-radius: 3px;
    padding: 1rem;
    text-align: center;
    font-style: italic;
    color: #BBB;
    box-sizing: border-box;
  }
  .clear {
    margin-top: 0.5rem;
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
