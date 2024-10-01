<script></script>

<template>
  <div>
    <UserSide />
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/css/mixin";
div {
  height: 100%;
  width: 100%;
  display: flex;
  background-color: var(--cafe-color-bisque);
}
</style>
