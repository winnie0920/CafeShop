<script></script>

<template>
  <header class="row justify-content-end d-flex mb-5 gap-3">
    <slot />
    <div class="col-auto d-flex">
      <DropDown iconName="Common-Earth" />
      <button>購物車</button>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import "@/assets/css/mixin";
</style>
