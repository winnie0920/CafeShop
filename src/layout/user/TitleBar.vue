<script setup>
import { homeLanguage, option } from "@/json/User";
const showStore = useShowStore();
const router = useRouter();
const menuStore = userMenuStore();

const dropdown = ref({
  drop: "language",
  width: "5rem",
  iconName: "Common-Earth",
});

// 用來監控視口大小
const isMobile = ref(false);

// 更新視口寬度的函數
const updateWindowWidth = () => {
  isMobile.value = window.innerWidth <= 991;
};

//打開側邊欄
const clickMenu = () => {};

//打開購物車
const clickShow = () => {
  if (isMobile.value) {
    showStore.togglePopupShow("shopping", true);
  } else {
    router.push({ name: "UserHome" });
  }
};

//關閉購物車
const closeShow = (val) => {
  showStore.togglePopupShow("shopping", val);
};

//確認訂單
const confirmPopup = () => {
  closeShow(false);
  menuStore.checkOrder(router);
};

onMounted(() => {
  updateWindowWidth();
  window.addEventListener("resize", updateWindowWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateWindowWidth);
});
</script>

<template>
  <header class="row justify-content-end d-flex">
    <slot />
    <div class="col-auto d-flex">
      <DropDown
        v-model="showStore.language"
        :data="homeLanguage"
        :dropdown="dropdown"
      />
    </div>
    <div class="col-auto d-flex">
      <ConfirmBtn iconName="Common-Shopping" @click="clickShow" />
    </div>
    <div class="col-auto d-flex">
      <ConfirmBtn iconName="Common-Menu" @click="clickMenu" />
    </div>

    <UserPopup
      class="popup__none"
      :show="showStore.popupShow.shopping"
      title="購物車"
      @close-show="closeShow"
      isFull="large"
    >
      <template #main>
        <UserSopping :option="option"></UserSopping>
      </template>
      <template #footer>
        <div class="w-100">
          <div class="d-flex justify-content-between mb-2">
            <h5>小計</h5>
            <h5>${{ menuStore.calculateTotal() }}</h5>
          </div>
          <div class="d-flex justify-content-between">
            <h5>服務費</h5>
            <h5>${{ Math.ceil(menuStore.calculateTotal() * 0.1) }}</h5>
          </div>
          <button
            @click="confirmPopup"
            class="User__shop-btn"
            :class="{ 'disabled-button': menuStore.menuSelect.length <= 0 }"
          >
            查看訂單
          </button>
        </div>
      </template>
    </UserPopup>
  </header>
</template>

<style lang="scss" scoped>
@use "@/assets/css/mixin" as *;
header {
  background-color: var(--cafe-color-bisque);
  padding: 3rem 0 1.5rem 0;
}
</style>
