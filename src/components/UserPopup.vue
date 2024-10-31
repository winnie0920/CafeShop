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
      <div ref="containerDOM" class="popup__container" @click.stop>
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
        <footer class="popup__footer">
          <slot name="footer"></slot>
          <button class="ms-auto" @click="confirmPopup">確認</button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
@use "@/assets/css/mixin" as *;
</style>
