<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
});

const emit = defineEmits(["closeShow"]);

const closePopup = () => {
  emit("closeShow", false);
};
</script>

<template>
  <transition name="opacity">
    <div v-if="props.show" class="popup__wrapper" @click="closePopup">
      <div ref="containerDOM" class="popup__container" @click.stop>
        <SvgIcon icon-name="Common-Add" @click="closePopup"></SvgIcon>
        <header v-if="title" class="popup__header">
          <h2>{{ title }}</h2>
          <SvgIcon icon-name="Common-Add" @click="closePopup"></SvgIcon>
        </header>
        <div class="popup__content">
          <slot name="main"></slot>
        </div>
        <footer class="popup__footer d-flex justify-content-end">
          <button>取消</button>
          <slot name="footer"></slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
@import "@/assets/css/mixin";

.popup {
  &__wrapper {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    inset: 0;
    z-index: 2000;
    background-color: var(--cafe-color-background);
    svg {
      @extend %base-btn-setting;
      width: 2.5rem;
      height: 2.5rem;
      transform: rotate(45deg);
      color: var(--cafe-color-brown);
      background: var(--cafe-color-white);
      cursor: pointer;
    }
  }

  &__container {
    @extend %Popup-base-setting;
    position: relative;
    flex-direction: column;
    width: 60rem;
    height: 80vh;
    svg {
      position: absolute;
      right: 0.5rem;
      top: 0.5rem;
    }
  }

  &__header {
    @extend %Popup-base-setting;
    justify-content: space-between;
    padding: 1rem;
    z-index: 2;

    h2 {
      font-size: 1.6rem;
      color: var(--eip-color-gray);
      margin: 0; /* 移除 margin */
    }
  }

  &__content {
    flex: 1;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__footer {
    @extend %Popup-base-setting;
    padding: 1.5rem 2rem;
    gap: 1rem;
    z-index: 2;

    button {
      color: var(--eip-color-text);
      background-color: var(--eip-color-bg);
    }
  }
}
@media (max-width: 768px) {
  .popup {
    &__container {
      max-width: 400px;
    }
  }
}
@media (max-width: 400px) {
  .popup {
    &__wrapper {
      position: fixed;
      display: block;
    }
    &__container {
      height: 100%;
    }
    &__header,
    &__footer {
      border-radius: 0px;
    }
  }
}
</style>
