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
  isFull: String,
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
        :class="{
          'full-ipad-size ': isFull === 'large',
          'full-phone-size ': isFull !== 'large',
        }"
        @click.stop
      >
        <SvgIcon
          class="popup__close"
          icon-name="Common-Add"
          @click="closePopup"
        ></SvgIcon>
        <header
          v-if="props.title"
          class="popup__header"
          :class="{ 'none-radius ': isFull }"
        >
          <h2>{{ props.title }}</h2>
          <SvgIcon
            class="popup__close popup__svg"
            icon-name="Common-Add"
            @click="closePopup"
          ></SvgIcon>
        </header>
        <div class="popup__content">
          <slot name="main"></slot>
        </div>
        <footer class="popup__footer" :class="{ 'none-radius ': isFull }">
          <slot name="footer"></slot>
          <button
            v-if="props.button"
            class="ms-auto popup__footer-button"
            @click="confirmPopup()"
          >
            {{ props.button }}
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
@use "@/assets/css/mixin" as *;

.full-phone-size {
  @media (max-width: 425px) {
    width: 100% !important;
    height: 100% !important;
    overflow: visible !important;
  }
}
.full-ipad-size {
  @media (max-width: 991px) {
    width: 100% !important;
    height: 100% !important;
    overflow: visible !important;
  }
}
.none-radius {
  border-radius: 0 !important;
}
</style>
