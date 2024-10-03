<script setup>
const props = defineProps({
  iconName: {
    type: String,
  },
  title: {
    type: String,
  },
});
</script>

<template>
  <button class="drop__btn">
    <SvgIcon
      v-show="props.iconName"
      :iconName="props.iconName"
      class="list__svg-first"
    ></SvgIcon>
    <h5 v-if="props.title">{{ props.title }}</h5>
  </button>
</template>

<style lang="scss" scoped>
.drop {
  &__btn {
    display: flex;
    align-items: center;
    padding: 1rem 1.25rem;
    gap: 0.5rem;
    color: var(--cafe-color-brown);
    border: 0.1rem solid var(--cafe-color-brown);
    background-color: var(--cafe-color-white);
    border-radius: var(--cafe-radius-md);
    transition: all 0.1s ease-in-out;
    svg {
      width: 1.5rem;
      height: 1.5rem;
      color: var(--cafe-color-brown);
      transition: all 0.1s ease-in-out;
    }
    h5 {
      line-height: 1;
    }
    &:active {
      color: var(--cafe-color-white);
      border: 0.1rem solid var(--cafe-color-brown);
      background-color: var(--cafe-color-brown);
      svg {
        color: var(--cafe-color-white);
      }
    }
  }
}
@import "@/assets/css/mixin";
</style>
