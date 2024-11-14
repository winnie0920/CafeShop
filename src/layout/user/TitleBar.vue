<script setup>
import { homeLanguage } from "@/json/UserHome";

const showStore = useShowStore();
</script>

<template>
  <header class="row justify-content-end d-flex">
    <slot />
    <div class="col-auto d-flex">
      <DropDown
        v-model="showStore.sLanguage"
        :data="homeLanguage"
        drop="language"
        width="5rem"
        iconName="Common-Earth"
      />
    </div>
    <div class="col-auto d-flex">
      <ConfirmBtn iconName="Common-Shopping" />
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use "@/assets/css/mixin" as *;
header {
  background-color: var(--cafe-color-bisque);
  padding: 3rem 0 1.5rem 0;
}
</style>
