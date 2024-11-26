<script setup>
import cookie from "@/utils/cookies";
import { loginOption, adminLogin } from "@/json/Admin";

const formStore = userFormStore();
const alertStore = useAlertStore();
const tokenStore = useTokenStore();
// 菜單顯示的選項
const selectedOptions = ref([...loginOption]);

const validate = [
  {
    id: "account",
    message: "帳號有誤，請重新輸入。",
  },
  {
    id: "password",
    message: "密碼有誤，請重新輸入。",
  },
];

const login = () => {
  if (!validateForm()) return;
  if (!validateAdmin()) return;
  rememberAccount();
  alertStore.pushMsg("Common-Ok", "登入成功", "brown");
  tokenStore.saveToken({
    name: formStore.choice.account,
    role: "admin",
  });
  if (!tokenStore.verifyToken()) return;
  router.push({ name: "AdminLayout" });
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

// 檢查帳號密碼是否匹配
const validateAdmin = () => {
  const admin = adminLogin.find(
    (admin) =>
      admin.account === formStore.choice.account &&
      admin.password === formStore.choice.password
  );
  if (!admin) {
    alertStore.pushMsg("Common-Error", "帳號或密碼錯誤，請重新輸入。");
    return false;
  }
  return true;
};

// 驗證帳號密碼格式
const validateForm = () => {
  formStore.clearError();
  const inputValid = validate.reduce((isValid, field) => {
    const valid = formStore.validateInput(field.id, field.name, field.message);
    return isValid && valid;
  }, true);

  if (!inputValid) return false;

  return true;
};

onMounted(() => {
  getAdmin();
});
</script>

<template>
  <div class="login__container">
    <!-- 這裡是視圖的內容 -->
    <img src="../assets/icons/Logo-coffee.png" alt="" />
    <div class="new__container">
      <div class="check__inputBox">
        <CheckInput
          :regex="/^[a-zA-Z0-9]{6,}$/"
          :basic="{
            type: 'input',
            id: 'account',
            name: '帳號',
          }"
        />
        <CheckInput
          :style="{ marginTop: '1rem' }"
          :regex="/^[a-zA-Z0-9]{6,}$/"
          :basic="{
            type: 'password',
            id: 'password',
            name: '密碼',
          }"
        />
        <CheckInput
          :style="{ padding: '0' }"
          :option="selectedOptions"
          :basic="{
            type: 'select',
          }"
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
