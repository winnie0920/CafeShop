<script setup>
const props = defineProps({
  iconName: {
    type: String,
    required: true,
  },
  iconStyle: {
    type: Object,
    default: {
      fill: "currentColor",
    },
  },
});

const iconName = computed(() => {
  return `#icon-${props.iconName}`;
});
</script>

<template>
  <svg :style="iconStyle" fill="currentColor" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>
