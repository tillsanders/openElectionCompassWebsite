<template>
  <div>
    <ul class="switch" v-if="languages.length > 1">
      <li
        v-for="language in languages"
        :key="language.uuid"
        :class="{
          selected: language.uuid === selected,
          filled: values[language.uuid] ? true : false,
        }"
      >
        <button
          @click.prevent="switchLanguage(language.uuid)"
          :title="language.name"
        >
          {{ language.code }}
        </button>
      </li>
    </ul>
    <slot :selected="selected" />
  </div>
</template>

<script>
export default {
  name: 'LanguageSwitch',
  data() {
    return {
      selected: this.languages[0].uuid,
    };
  },
  props: {
    languages: {
      type: Array,
      required: true,
    },
    values: {
      type: Object,
      required: true,
    },
  },
  created() {
    this.$watch('languages', () => {
      this.selected = this.languages[0].uuid;
    }, { deep: true });
  },
  methods: {
    switchLanguage(uuid) {
      this.selected = uuid;
    },
  },
}
</script>

<style scoped>
.switch {
  list-style-type: none;
  text-align: right;
  margin: 0;
  padding: 0;
}

  .switch li {
    display: inline-block;
  }

    .switch button {
      padding: 0.2em 0.5em;
      font-size: 0.75rem;
      border-radius: 0;
      background-color: rgba(0, 0, 0, 0.1);
      color: rgba(0, 0, 0, 0.7);
      border-bottom: 1px solid rgba(0, 0, 0, 0.15);
      text-transform: uppercase;
      position: relative;
      font-weight: bold;
    }
    .switch button:hover, .switch button:focus {
      outline: none;
      box-shadow: none;
      background-color: rgba(0, 0, 0, 0.075);
    }
    .switch li:first-of-type button {
      border-top-left-radius: 2px;
      border-bottom-left-radius: 2px;
    }
    .switch li:last-of-type button {
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }
    .switch li.selected button:before {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      margin-left: -5px;
      border-top: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 5px solid #d69e2e;
      border-left: 5px solid transparent;
    }
    .switch li.filled button {
      background-color: #2ecc71;
      color: #fff;
      border-bottom: 1px solid #27ae60;
    }
    .switch li.filled button:hover {
      background-color: #31db78;
    }
</style>