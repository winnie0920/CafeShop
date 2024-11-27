<script setup>
import { homeMenu } from "@/json/User";

const dropdown = ref({
  title: "餐點分類",
  drop: "meal",
  width: "10rem",
});

const addMeal = () => {};

const showStore = useShowStore();
</script>

<template>
  <header class="row justify-content-end d-flex">
    <div class="col-auto d-flex">
      <DropDown
        v-model="showStore.meal"
        :data="homeMenu"
        :dropdown="dropdown"
      />
    </div>
    <div class="col-auto d-flex">
      <ConfirmBtn title="新增餐點" iconName="User-Add" @click="addMeal" />
    </div>
    <div class="col-auto d-flex">
      <div class="logout__container"></div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use "@/assets/css/mixin" as *;
header {
  background-color: var(--cafe-color-bisque);
  padding: 3rem 0 1.5rem 0;
}

.logout {
  &__container {
    @include style-color(var(--cafe-color-brown), var(--cafe-color-white));
    @include border(var(--cafe-color-brown), 0.1rem);
    padding: var(--cafe--padding-xs);
  }
}
</style>
