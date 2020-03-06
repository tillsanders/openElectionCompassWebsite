<template>
  <transition name="modal">
    <div v-if="visible" class="modal">
      <button @click="$emit('close')" class="close">
        <Icon name="times" monospace />
      </button>
      <div class="inner">
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    visible(visible) {
      if (visible) {
        document.body.style.top = `-${window.scrollY}px`;
        document.body.style.width = '100%';
        document.body.style.position = 'fixed';
      } else {
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    },
  },
};
</script>

<style scoped>
  .modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow-y: auto;
    background-color: #FFF;
    z-index: 30;
    padding: 2rem 2.5rem;
    box-shadow: 0 5rem 10rem rgba(0, 0, 0, 0.5);
  }
  .inner {
    max-width: 740px;
    margin: 0 auto;
    padding: 3rem;
  }
  .modal button.close {
    position: absolute;
    top: 0;
    right: 0;
    padding: 1rem;
    margin: 1rem;
    appearance: none;
    background: none;
    border: 1px solid #DDD;
    color: inherit;
  }
  .modal-enter-active {
    animation-name: modal-in;
    animation-duration: 0.35s;
    animation-timing-function: ease-out;
    animation-direction: normal;
    animation-fill-mode: forwards;
  }
  .modal-leave-active {
    animation-name: modal-out;
    animation-duration: 0.35s;
    animation-timing-function: ease-out;
    animation-direction: normal;
    animation-fill-mode: forwards;
  }
  @keyframes modal-in {
    0% {
      transform: perspective(1000px) translateY(0) rotateX(-10deg) scale(0.7);
      opacity: 0;
    }
    100% {
      transform: perspective(1000px) translateY(0) rotateX(0deg) scale(1);
      opacity: 1;
    }
  }
  @keyframes modal-out {
    0% {
      transform: perspective(1000px) translateY(0) rotateX(0deg) scale(1);
      opacity: 1;
    }
    100% {
      transform: perspective(1000px) translateY(0) rotateX(10deg) scale(0.8);
      opacity: 0;
    }
  }
</style>