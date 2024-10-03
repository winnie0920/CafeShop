<script setup>
import { homeLanguage } from "@/json/UserHome";

const useStore = userStore();
</script>

<template>
  <header class="row justify-content-end d-flex mb-5 gap-3">
    <slot />
    <div class="col-auto d-flex">
      <DropDown
        v-model="useStore.sLanguage"
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
@import "@/assets/css/mixin";
</style>
