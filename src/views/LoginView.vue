<script setup>
import cookie from "@/utils/cookies";
import { loginOption, adminLogin } from "@/json/Admin";
import { apiLogIn } from "@/api/login.js";

const formStore = userFormStore();
const alertStore = useAlertStore();
const tokenStore = useTokenStore();
// 菜單顯示的選項
const selectedOptions = ref([...loginOption]);

const login = async () => {
  try {
    const res = await apiLogIn({
      account: formStore.choice.account,
      password: formStore.choice.password,
    });
    if (res.code === 200) {
      rememberAccount();
      alertStore.pushMsg("Common-Ok", "登入成功", "brown");
    }
    router.push({ name: "AdminLayout" });
  } catch (e) {
    console.error(e);
  }
};

// 取出 Cookie 存取的帳號
const getAdmin = () => {
  const savedAccount = cookie.getCookie("account"); // 取得cookie
  if (savedAccount) {
    formStore.choice.account = savedAccount;
  }
};

// 記住帳號，儲存到 Cookie
const rememberAccount = () => {
  if (formStore.choice.remember) {
    cookie.setCookie("account", formStore.choice.account, 1);
  }
};

onMounted(() => {
  getAdmin();
});
</script>

<template>
  <div class="login__container">
    <!-- 這裡是視圖的內容 -->
    <img src="../assets/icons/Logo-coffee.png" alt="loginLogo" />
    <div class="new__container">
      <form class="check__inputBox" @submit.prevent="login">
        <CheckInput
          :regex="/^[a-zA-Z0-9]{4,}$/"
          :basic="{
            type: 'input',
            id: 'account',
            name: '帳號',
          }"
        />
        <CheckInput
          :style="{ marginTop: '0.5rem' }"
          :regex="/^[a-zA-Z0-9]{4,}$/"
          :basic="{
            type: 'password',
            id: 'password',
            name: '密碼',
          }"
        />
        <CheckInput
          :style="{ padding: '0', marginTop: '1rem' }"
          :option="selectedOptions"
          :basic="{
            type: 'select',
          }"
        />
        <div>
          <ConfirmBtn
            styles="brown"
            class="justify-content-center w-100"
            title="登入"
            type="submit"
          />
        </div>
      </form>
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
