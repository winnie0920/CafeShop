<script setup>
import { loginOption } from "@/json/UserHome";
const formStore = userFormStore();
// 菜單顯示的選項
const selectedOptions = ref([...loginOption]);

const login = () => {
  console.log(formStore.choice);
};
</script>

<template>
  <div class="login__container">
    <!-- 這裡是視圖的內容 -->
    <img src="../assets/icons/Logo-coffee.png" alt="" />
    <div class="new__container">
      <div class="check__inputBox">
        <CheckInput
          :regex="/^[a-zA-Z0-9]+$/"
          type="input"
          id="account"
          name="帳號"
        />
        <CheckInput
          :style="{ marginTop: '1rem' }"
          :regex="/^[a-zA-Z0-9]+$/"
          type="input"
          id="password"
          name="密碼"
        />
        <CheckInput
          :regex="/^[a-zA-Z0-9]+$/"
          :style="{ padding: '0', fontSize: '1.7rem' }"
          :option="selectedOptions"
          type="select"
        />
        <div class="mt-4">
          <ConfirmBtn
            color="brown"
            class="justify-content-center w-100"
            title="登入"
            @click="login()"
          />
        </div>
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
      width: 10rem;
    }
  }
}

.new__container {
  max-width: 35rem;
  width: calc(100% - var(--cafe--padding-lg) * 2);
  margin: 0 var(--cafe--padding-lg);
}

.check__inputBox label {
  font-size: 1.2rem;
}
</style>
