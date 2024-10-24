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
        <header v-if="props.title" class="popup__header">
          <h2>{{ props.title }}</h2>
          <SvgIcon icon-name="Common-Add" @click="closePopup"></SvgIcon>
        </header>
        <div class="popup__content">
          <slot name="main" :title="title"></slot>
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


</style>
