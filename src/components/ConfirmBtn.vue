<script setup>
const props = defineProps({
  iconName: {
    type: String,
    default: "",
  },
  title: {
    type: String,
  },
  styles: {
    type: [String, Array],
  },
  type: {
    type: String,
    required: false,
  },
});

const emit = defineEmits(["click"]);
</script>

<template>
  <button
    class="drop__btn"
    :type="type"
    :class="styles"
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
    @include border;
    @include style-color(var(--cafe-color-brown), var(--cafe-color-white));
    @include flex-center(row, center, baseline);
    padding: var(--cafe--padding-xs) 1.25rem;
    gap: 0.5rem;
    transition: all 0.2s ease-in-out;
    svg {
      @include size(1.6rem, 1.5rem);
    }
    &:hover {
      @include style-color;
      @include border;
    }
  }
}

.gray {
  @include style-color(var(--cafe-color-white), var(--cafe-color-gray-darken));
  @include border(var(--cafe-color-gray-darken));
  &:hover {
    @include style-color(
      var(--cafe-color-gray-darken),
      var(--cafe-color-white)
    );
    @include border(var(--cafe-color-gray-darken));
  }
}
.brown {
  @include style-color;
  &:hover {
    @include style-color(var(--cafe-color-brown), var(--cafe-color-white));
    @include border;
  }
}

.circle {
  padding: var(--cafe--padding-xxxs);
}

.small-button {
  padding: var(--cafe--padding-xxs) 1rem;
  h5 {
    font-size: 1rem;
  }
}
</style>
