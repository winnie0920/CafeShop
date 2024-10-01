<script setup>
const props = defineProps({
  title: {
    type: String,
  },
  iconName: {
    type: String,
  },
});
</script>

<template>
  <div
    :class="{ empty: !props.title, isSvgC: props.iconName }"
    class="list__container"
  >
    <p class="list__title">{{ props.title }}</p>
    <SvgIcon
      v-show="props.iconName"
      :iconName="props.iconName"
      class="list__svg-first"
    ></SvgIcon>
    <h5 :class="{ isSvg: props.iconName }" class="list__text">請選擇</h5>
    <SvgIcon class="list__svg-end" iconName="Common-Arrow-Circle"></SvgIcon>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/css/mixin";

.list {
  &__container {
    position: relative;
    display: grid;
    padding: 1rem;
    background-color: var(--cafe-color-white);
    border-radius: var(--cafe-radius-md);
    grid-template-rows: repeat(2, max-content);
    grid-template-columns: max-content 1rem;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
    svg {
      width: 100%;
      aspect-ratio: 1 / 1;
    }
  }
  &__svg-end {
    transform: rotate(90deg) translateX(-15%);
  }
  &__title {
    grid-column: 1/-1;
  }
  &__text {
    width: 5rem;
  }
}

.empty {
  grid-template-rows: auto;
  align-items: center;
}

.isSvg {
  padding-left: 0.5rem;
}
.isSvgC {
  grid-template-columns: 1.5rem max-content 1rem;
}
</style>
