<script></script>

<template>
  <div class="login__container">
    <!-- 這裡是視圖的內容 -->
    <img src="../assets/icons/Logo-coffee.png" alt="" />
    <div class="new__container">
      <div class="check__inputBox">
        <CheckInput
          :regex="/^[0-9]{1,2}$/"
          type="input"
          id="account"
          name="帳號"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/css/mixin" as *;

.login {
  &__container {
    @extend %center-setting;
    height: 100%;
    background: var(--cafe-color-bisque);
    gap: 2rem;
    img {
      width: 15rem;
    }
  }
}

.check__inputBox label {
  font-size: 1.2rem;
}
</style>
