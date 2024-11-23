<script setup>
import { UserSide } from "@/json/Admin";
</script>

<template>
  <nav class="sidebar__container">
    <input
      class="sidebar__menu-icon"
      type="checkbox"
      ref="menu"
      id="menu"
      name="menu"
    />
    <label for="menu">
      <SvgIcon
        icon-name="Common-Arrow-Circle"
        :icon-style="{ height: '1.5rem', width: '1.5rem' }"
      />
    </label>

    <div class="sidebar__head">
      <router-link :to="{ name: 'AdminMeal' }">
        <div class="sidebar__title">
          <img src="@/assets/icons/Logo.png" alt="" />
          <div>
            <h4>CAFE</h4>
            <p>咖啡餐飲後台系統</p>
          </div>
        </div>
      </router-link>
      <ul>
        <li v-for="(item, index) in UserSide" :key="index">
          <router-link :to="item.to" class="sidebar__item">
            <div>
              <SvgIcon :icon-name="item.iconName" />
              <h3>{{ item.label }}</h3>
            </div>

            <h2>{{ item.name }}</h2>
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
    background-color: var(--cafe-color-brown);
  }
  &__item {
    background-color: var(--cafe-color-brown);
    svg,
    h3,
    h2 {
      color: var(--cafe-color-white);
    }
    &:hover {
      svg,
      h3,
      h2 {
        color: var(--cafe-color-brown);
      }
      background-color: var(--cafe-color-white);
      border: var(--cafe-color-white);
    }
  }
}
.router-link-active {
  background-color: var(--cafe-color-white) !important;
  svg,
  h3,
  h2 {
    color: var(--cafe-color-brown) !important;
  }
}
</style>
