<script setup>
const alertStore = useAlertStore();

let countdown = null;
const updateCountdown = () => {
  if (alertStore.messages.length <= 0) {
    clearInterval(countdown);
    countdown = null;
  }
  alertStore.messages.forEach((item, index, arr) => {
    if (item.time <= 0) {
      arr.splice(index, 1);
    } else {
      item.time -= 1;
    }
  });
};
watch(
  () => alertStore.messages.length,
  (val) => {
    if (val > 0 && !countdown) {
      countdown = setInterval(updateCountdown, 1000);
    }
  },
  { immediate: true }
);
</script>

<template>
  <transition-group
    tag="div"
    name="move-up"
    mode="out-in"
    class="msg__container"
  >
    <div
      v-for="(item, index) in alertStore.messages"
      :key="index"
      :class="['msg__card', `msg__card--${item.type}`]"
    >
      <SvgIcon :icon-name="item.icon" />
      <p>{{ item.msg }}</p>
    </div>
  </transition-group>
</template>

<style lang="scss" scoped>
@use "@/assets/css/mixin" as *;
.msg {
  &__container {
    @extend %center-setting;
    position: absolute;
    top: 4rem;
    left: 50%;
    gap: 1.5rem;
    transform: translateX(-50%);
    z-index: 3000;
  }
  &__card {
    @extend %popup-base-setting;
    align-items: center;
    gap: 1rem;
    max-width: 30rem;
    padding: var(--cafe--padding-sm);
    border: 1px solid var(--cafe-color-red-darken);
    svg {
      color: var(--cafe-color-red-darken);
      flex-shrink: 0;
      height: 2rem;
      width: 2rem;
    }
    p {
      font-size: 1.2rem;
      text-align: justify;
      letter-spacing: 0.05em;
      word-break: break-word;
      white-space: pre-line;
    }
  }

  &__card--brown {
    border: 1px solid var(--cafe-color-brown);
    svg {
      color: var(--cafe-color-brown);
    }
  }
}
</style>
