<template>
  <div class="field">
    <ValidationProvider :name="name" :rules="rules" v-slot="{ changed, errors }">
      <label
        :for="`generator-${alias}`"
        :class="errors.length > 0 ? 'invalid' : changed ? 'valid' : ''"
      >
        {{ name }}
      </label>
      <input
        :value="value"
        @input="$emit('change', $event.target.value)"
        :type="type"
        :name="alias"
        :id="`generator-${alias}`"
        :placeholder="placeholder"
        :class="errors.length > 0 ? 'invalid' : changed ? 'valid' : ''"
      />
      <small v-if="errors.length < 1">
        <slot name="description">{{ description }}</slot>
      </small>
      <small v-else class="error">{{ errors[0] }}</small>
    </ValidationProvider>
  </div>
</template>

<script>
import { ValidationProvider } from 'vee-validate';
import { extend } from 'vee-validate';
import { alpha, length, regex, required } from 'vee-validate/dist/rules';

extend('alpha', alpha);
extend('length', length);
extend('regex', regex);
extend('required', required);

export default {
  name: 'FieldInput',
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
    type: {
      type: String,
      required: true,
      validator(value) {
        return ['text', 'file'].includes(value);
      },
    },
    value: {
      required: true,
    },
    rules: {
      type: [String, Object],
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },
  components: {
    ValidationProvider,
  },
};
</script>

<style lang="css" scoped>
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
    font-size: 1.4rem;
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