<script setup>
const props = defineProps({
  menu: {
    type: Array,
    required: true,
  },
  menuSelect: {
    type: Array,
    required: true,
  },
});

const menuStore = userMenuStore();

onMounted(() => {
  console.log(menuStore.menuSelect);
});
</script>

<template>
  <div class="User__shop-container">
    <h1>購物車</h1>

    <div class="User__shop-content">
      <div class="d-flex mt-3 mb-3 position-relative">
        <img src="../../assets/image/food_Fried-2.jpeg" alt="" />
        <div
          class="d-flex flex-column justify-content-center gap-3 ms-3 flex-grow-1"
        >
          <h2>義大利肉醬</h2>
          <p>$133</p>
          <div class="menu__image">
            <transition name="opacity">
              <div class="menu__btn-content">
                <button class="menu__btn-trash">
                  <SvgIcon icon-name="Common-Trash"></SvgIcon>
                  <SvgIcon icon-name="Common-Minus"></SvgIcon>
                </button>
                <div>
                  <p>22</p>
                </div>
                <button class="menu__btn-add">
                  <SvgIcon icon-name="Common-Add"></SvgIcon>
                </button>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-between mb-2">
      <h3>小計</h3>
      <p>$553</p>
    </div>
    <div class="d-flex justify-content-between">
      <h3>服務費</h3>
      <p>$100</p>
    </div>
    <hr />
    <div class="d-flex align-items-center">
      <button class="User__shop-btn">查看訂單</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/css/mixin" as *;

.User {
  &__shop {
    &-container {
      @extend %base-btn-setting;
      flex-direction: column;
      max-height: calc(100vh - 10.5rem);
      color: var(--cafe-color-brown);
      background-color: var(--cafe-color-white);
      margin-top: var(--cafe--margin-xs);
      padding: var(--cafe--padding-sm);
      overflow: hidden;
      h1 {
        font-size: var(--cafe--font-xxxl);
        line-height: 1.5;
      }
      h3 {
        font-size: var(--cafe--font-md);
      }
      hr {
        border: 0;
        opacity: 100;
        background: var(--cafe-color-brown);
        border-top: 0.2rem dashed var(--cafe-color-white);
      }
    }
    &-content {
      height: 100vh;
      max-height: calc(50%);
      overflow-y: auto;
      scrollbar-width: none;
      margin: var(--cafe--margin-sm) 0;
      ::-webkit-scrollbar {
        display: none;
      }
      img {
        width: 10rem;
        height: 10rem;
        object-fit: cover;
        border-radius: var(--cafe-radius-sm);
      }
    }
    &-btn {
      @extend %popup-base-setting-2;
      display: block;
      text-align: center;
      font-size: var(--cafe--font-xl);
      padding: var(--cafe--margin-xs);
      margin: var(--cafe--margin-xxs) 0;
      width: 100%;
    }
  }
}
</style>
