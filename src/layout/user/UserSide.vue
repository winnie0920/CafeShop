<script setup>
import { homeSide } from "@/json/User";
</script>

<template>
  <nav class="sidebar__container d-lg-block d-none">
    <div class="sidebar__head">
      <router-link :to="{ name: 'UserHome' }">
        <div class="sidebar__title">
          <img src="@/assets/icons/Logo-coffee.png" alt="" />
        </div>
      </router-link>
      <ul>
        <li v-for="(item, index) in homeSide" :key="index">
          <router-link :to="item.to" class="sidebar__item">
            <div>
              <SvgIcon :icon-name="item.iconName" />
              <h3>{{ item.label }}</h3>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@use "@/assets/css/mixin" as *;
.sidebar {
  &__container {
    background-color: var(--cafe-color-white);
  }
  &__item {
    background-color: var(--cafe--color-white);
    svg,
    h3 {
      color: var(--cafe-color-brown);
    }
    &:hover {
      svg,
      h3 {
        color: var(--cafe-color-white);
      }
      background-color: var(--cafe-color-brown);
      border: var(--cafe-color-brown);
    }
  }
}

.router-link-active {
  background-color: var(--cafe-color-brown);
  svg,
  h3 {
    color: var(--cafe-color-white);
  }
}
</style>
