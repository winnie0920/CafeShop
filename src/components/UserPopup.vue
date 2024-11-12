<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  style: {
    type: Object,
    default: () => ({ width: "30rem", height: "40vh" }),
  },
  title: String,
  button: String,
  isFull: Boolean,
});

const emit = defineEmits(["closeShow", "confirmPopup"]);

const closePopup = () => {
  emit("closeShow", false);
};

const confirmPopup = () => {
  emit("confirmPopup");
};
</script>

<template>
  <transition name="opacity">
    <div v-if="props.show" class="popup__wrapper" @click="closePopup">
      <div
        ref="containerDOM"
        class="popup__container"
        :style="style"
        :class="{ 'full-size': isFull }"
        @click.stop
      >
        <SvgIcon
          class="popup__close"
          icon-name="Common-Add"
          @click="closePopup"
        ></SvgIcon>
        <header v-if="props.title" class="popup__header">
          <h2>{{ props.title }}</h2>
          <SvgIcon
            class="popup__close"
            icon-name="Common-Add"
            @click="closePopup"
          ></SvgIcon>
        </header>
        <div class="popup__content">
          <slot name="main" :title="title"></slot>
        </div>
        <footer class="popup__footer" :class="{ 'none-radius ': isFull }">
          <slot name="footer"></slot>
          <button class="ms-auto popup__footer-button" @click="confirmPopup">
            {{ props.button }}
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
@use "@/assets/css/mixin" as *;

.full-size {
  @media (max-width: 400px) {
    width: 100% !important;
    height: 100% !important;
    overflow: auto !important;
  }
}
.none-radius {
  border-radius: 0 !important;
}
</style>
