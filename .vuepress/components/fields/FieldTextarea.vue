<template>
  <div class="field">
    <ValidationProvider :name="name" :rules="rules" v-slot="{ changed, errors }" ref="field">
      <label
        :for="`generator-${alias}`"
        :class="errors.length > 0 ? 'invalid' : changed ? 'valid' : ''"
      >
        {{ name }}
      </label>
      <textarea
        :value="cache"
        @input="updateCache($event.target.value)"
        @blur="publish()"
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
import { length, required } from 'vee-validate/dist/rules';

extend('length', length);
extend('required', required);

export default {
  name: 'FieldTextarea',
  data() {
    return {
      cache: null,
    };
  },
  mounted() {
    this.cache = this.value;
  },
  watch: {
    value(value) {
      this.cache = value;
    },
  },
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
  methods: {
    updateCache(value) {
      this.cache = value;
    },
    publish() {
      this.$refs.field.validate(this.cache).then(({valid}) => {
        if (valid) {
          this.$emit('change', this.cache);
        } else {
          this.$emit('change', '');
        }
      })
    },
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
  textarea {
    padding: 0.5rem;
    border-radius: 3px;
    border: 1px solid #ddd;
    display: block;
    font-size: 1.4rem;
    width: 100%;
    box-sizing: border-box;
    transition: border-color 0.2s ease-out;
  }
  textarea:hover {
    border-color: #ccc;
  }
  textarea:focus {
    outline: none;
    border-color: #d69e2e;
  }
  ::placeholder {
    font-style: italic;
    color: #CCC;
  }
  textarea + small {
    display: block;
    margin-top: 0.5rem;
    font-style: italic;
    color: #999;
  }
  textarea.valid {
    border-color: #42B983;
  }
  textarea.invalid {
    border-color: #CC0000;
  }
  textarea + small.error {
    color: #CC0000;
  }
</style>