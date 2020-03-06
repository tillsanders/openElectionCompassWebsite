<template>
  <font-awesome-icon
    class="icon"
    :icon="['fas', name]"
    :fixed-width="monospace"
    :spin="spinning"
  />
</template>

<script>
  import { library } from '@fortawesome/fontawesome-svg-core'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import { faBars, faCheck, faCogs, faDownload, faEdit, faHistory, faPlus, faTimes, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';

  library.add(faBars, faCheck, faCogs, faDownload, faEdit, faHistory, faPlus, faTimes, faTrash, faUpload);

  export default {

    name: 'Icon',

    props: {
      name: {
        type: String,
        required: true,
      },
      monospace: {
        type: Boolean,
        default: false,
      },
      spinning: {
        type: Boolean,
        default: false,
      },
    },

    components: {
      FontAwesomeIcon,
    },
  }
</script>
