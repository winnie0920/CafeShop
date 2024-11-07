<script setup>
import { homeItem, homeMenu, option } from "@/json/UserHome";
const router = useRouter();

const goBack = () => {
  router.push({ name: "UserHome" });
};
</script>

<template>
  <section class="row g-5">
    <div class="col-lg-8 col-12" style="margin-top: 4rem">
      <div class="new__width">
        <div class="new__container m-0">
          <div class="mb-3 new__menu-content">
            <div>
              <p>肉醬義大利麵 X1</p>
              <p class="User__shop-option">小份 小辣</p>
            </div>
            <p>$130</p>
          </div>
          <div class="mb-3 new__menu-content">
            <div>
              <p>肉醬義大利麵 X1</p>
              <p class="User__shop-option">小份 小辣</p>
            </div>
            <p>$130</p>
          </div>
          <div class="mb-3 new__menu-content">
            <div>
              <p>肉醬義大利麵 X1</p>
              <p class="User__shop-option">小份 小辣</p>
            </div>
            <p>$130</p>
          </div>
          <div class="mb-3 new__menu-content">
            <div>
              <p>肉醬義大利麵 X1</p>
              <p class="User__shop-option">小份 小辣</p>
            </div>
            <p>$130</p>
          </div>
          <div class="mb-3 new__menu-content">
            <div>
              <p>肉醬義大利麵 X1</p>
              <p class="User__shop-option">小份 小辣</p>
            </div>
            <p>$130</p>
          </div>
          <div class="mb-3 new__menu-content">
            <div>
              <p>肉醬義大利麵 X1</p>
              <p class="User__shop-option">小份 小辣</p>
            </div>
            <p>$130</p>
          </div>
          <div class="mb-3 new__menu-content">
            <div>
              <p>肉醬義大利麵 X1</p>
              <p class="User__shop-option">小份 小辣</p>
            </div>
            <p>$130</p>
          </div>
          <div class="mb-3 new__menu-content">
            <div>
              <p>肉醬義大利麵 X1</p>
              <p class="User__shop-option">小份 小辣</p>
            </div>
            <p>$130</p>
          </div>
          <div class="mb-3 new__menu-content">
            <div>
              <p>肉醬義大利麵 X1</p>
              <p class="User__shop-option">小份 小辣</p>
            </div>
            <p>$130</p>
          </div>
          <div class="new__menu-content">
            <div>
              <p>肉醬義大利麵 X1</p>
              <p class="User__shop-option">小份 小辣</p>
            </div>
            <p>$130</p>
          </div>
        </div>
      </div>
      <div class="new__container" style="display: block">
        <ConfirmBtn
          color="gray"
          class="ms-auto"
          title="取消"
          @click="goBack()"
        />
      </div>
    </div>
    <div class="col-lg-4 col-12">
      <div class="new__container User__shop-container">
        <h3 class="mb-5">您的訂單</h3>
        <div class="new__content">
          <div class="mb-3 new__menu-content">
            <div>
              <p>肉醬義大利麵 X1</p>
              <p class="User__shop-option">小份 小辣</p>
            </div>
            <p>$130</p>
          </div>
          <div class="mb-3 new__menu-content">
            <div>
              <p>肉醬義大利麵 X1</p>
              <p class="User__shop-option">小份 小辣</p>
            </div>
            <p>$130</p>
          </div>
          <div class="mb-3 new__menu-content">
            <div>
              <p>肉醬義大利麵 X1</p>
              <p class="User__shop-option">小份 小辣</p>
            </div>
            <p>$130</p>
          </div>
          <div class="mb-3 new__menu-content">
            <div>
              <p>肉醬義大利麵 X1</p>
              <p class="User__shop-option">小份 小辣</p>
            </div>
            <p>$130</p>
          </div>
        </div>
        <hr />
        <div class="new__floor"></div>
        <div class="new__gray-text new__menu-content mb-2">
          <p>小計</p>
          <p>$100</p>
        </div>
        <div class="new__gray-text new__menu-content mb-2">
          <p>服務費</p>
          <p>$10</p>
        </div>
        <div class="new__strong-text new__menu-content mt-5">
          <h2>總計</h2>
          <h2>$110</h2>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use "@/assets/css/mixin" as *;
.new {
  &__width {
    max-width: 100%;
    max-height: calc(100vh - 16rem);
    scrollbar-width: none;
    overflow-y: auto;
  }
  &__content {
    height: 100vh;
    max-height: 50%;
    overflow-y: auto;
    scrollbar-width: none;
  }
  &__menu {
    &-content {
      display: flex;
      justify-content: space-between;
    }
  }
  &__floor {
  }
}
</style>
