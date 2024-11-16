<script setup>
const props = defineProps({
  iconName: {
    type: String,
    default: "",
  },
  title: {
    type: String,
  },
  color: {
    type: String,
  },
});

const emit = defineEmits(["click"]);
</script>

<template>
  <button
    class="drop__btn"
    :class="{ gray: props.color === 'gray', brown: props.color === 'brown' }"
    @click="$emit('click')"
  >
    <SvgIcon
      v-show="props.iconName"
      :iconName="props.iconName"
      class="list__svg-first"
    ></SvgIcon>
    <h5 v-if="props.title">{{ props.title }}</h5>
  </button>
</template>

<style lang="scss" scoped>
@use "@/assets/css/mixin" as *;
.drop {
  &__btn {
    display: flex;
    align-items: center;
    padding: var(--cafe--padding-xs) 1.25rem;
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

.gray {
  border: 0.1rem solid var(--cafe-color-gray-darken) !important;
  color: var(--cafe-color-white) !important;
  background-color: var(--cafe-color-gray-darken) !important;
  svg {
    color: var(--cafe-color-gray-darken) !important;
  }
  &:active {
    color: var(--cafe-color-gray-darken) !important;
    border: 0.1rem solid var(--cafe-color-gray-darken) !important;
    background-color: var(--cafe-color-white) !important;
  }
}
.brown {
  color: var(--cafe-color-white) !important;
  background-color: var(--cafe-color-brown) !important;
  svg {
    color: var(--cafe-color-white) !important;
  }
  &:active {
    color: var(--cafe-color-brown) !important;
    border: 0.1rem solid var(--cafe-color-brown) !important;
    background-color: var(--cafe-color-white) !important;
  }
}
</style>
