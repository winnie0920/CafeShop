<script></script>

<template>
  <nav class="sidebar__container">
    <div class="sidebar__head">
      <img src="@/assets/icons/Logo-coffee.png" alt="" />
      <ul>
        <li>
          <router-link
            to="Home"
            class="sidebar__item"
            active-class="sidebar__item-active"
          >
            <SvgIcon icon-name="Common-Home" />
            <h3>HOME</h3>
          </router-link>
        </li>
        <li>
          <router-link
            to="Home"
            class="sidebar__item"
            active-class="sidebar__item-active"
          >
            <SvgIcon icon-name="Common-Home" />
            <h3>HOME</h3>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@import "@/assets/css/mixin";
.sidebar {
  &__container {
    flex-shrink: 0;
    position: relative;
    display: flex;
    flex-direction: column;
    width: 12rem;
    padding: 4rem 3rem;
    border-top-right-radius: 3rem;
    border-bottom-right-radius: 3rem;
    background-color: var(--cafe-color-white);
    ul {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3rem;
    }
  }
  &__head {
    img {
      display: block;
      height: 6rem;
      width: 6rem;
      margin-bottom: 6rem;
    }
  }
  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    padding: 0.75rem 1rem;
    border-radius: var(--cafe-radius-md);
    background-color: var(--cafe--color-white);
    transition: all 0.35s ease-in-out;
    cursor: pointer;

    svg,
    h3 {
      color: var(--cafe--color-brown);
      transition: all 0.35s ease-in-out;
    }
    svg {
      flex: 0 0 2.8rem;
      width: 2.8rem;
      object-fit: contain;
    }
    h3 {
      font-size: 0.9rem;
      font-weight: 400;
      letter-spacing: 0.2rem;
    }
    &:hover,
    &:active {
      svg,
      h3 {
        color: var(--cafe-color-white);
      }
      background-color: var(--cafe--color-brown);
      border: var(--cafe--color-brown);
    }
  }
}
</style>
