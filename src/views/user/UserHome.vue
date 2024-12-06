<script setup>
import { homeItem, homeMenu, option } from "@/json/User";

const menuStore = userMenuStore();
const showStore = useShowStore();
const queryParams = reactive({ search: "" });
const chooseRef = ref(null);
const labelRef = ref(null);
const router = useRouter();

// 當前選擇的 ID
const chooseId = ref(1);
const showArrow = ref(false);
const maxScroll = ref(0);

// 更新搜尋
const sendSearch = (val) => (queryParams.search = val);

// 檢查箭頭顯示
const checkScrollWidth = () => {
  if (labelRef.value) {
    showArrow.value = labelRef.value.scrollWidth > labelRef.value.clientWidth;
  }
};

// 滾動箭頭
const scrollArrow = (direction) => {
  const scrollContainer = labelRef.value;
  if (!scrollContainer) return;

  const currentScroll = scrollContainer.scrollLeft;
  maxScroll.value = scrollContainer.scrollWidth - scrollContainer.clientWidth;
  const scrollAmount = scrollContainer.clientWidth / 2;

  const scroll =
    typeof direction === "number"
      ? Math.max(0, Math.min(direction, maxScroll.value))
      : direction === "left"
      ? Math.max(0, currentScroll - scrollAmount)
      : Math.min(maxScroll.value, currentScroll + scrollAmount);

  scrollContainer.scrollTo({ left: scroll, behavior: "smooth" });
};

// 點擊滾動
const clickScroll = (id) => {
  chooseId.value = id;
  if (labelRef.value) {
    const liWidth = labelRef.value.querySelector("li").offsetWidth;
    const visibleWidth = labelRef.value.clientWidth;
    const newPosition = (liWidth + 8) * id - visibleWidth / 2 + liWidth / 2;

    // 確保新的滾動位置在合理範圍內
    scrollArrow(Math.max(0, Math.min(newPosition, maxScroll.value)));
  }
  chooseRef.value.clickChoose(id);
};

// 當前選擇的 ID
const currentChoose = (id) => {
  chooseId.value = id;
};

//打開購物車
const clickShow = () => {
  showStore.togglePopupShow("shopping", true);
};

//監聽所在頁面
const checkoutView = ref(false);
watch(
  () => router.currentRoute.value.name,

  (val) => {
    if (val === "UserCheckout") {
      checkoutView.value = true;
    } else {
      checkoutView.value = false;
    }
  },
  { immediate: true }
);

onMounted(() => {
  window.addEventListener("resize", checkScrollWidth);
  checkScrollWidth();
  menuStore.setHomeMenu(homeMenu);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkScrollWidth);
});
</script>

<template>
  <div class="User__container">
    <TitleBar class="sticky-top">
      <div class="col-12 col-sm-7 col-md-6 col-lg-4 me-auto d-flex">
        <SearchBar
          class="mb-4 mb-sm-0"
          v-if="!checkoutView"
          :value="queryParams.search"
          @send-search="sendSearch"
        />
      </div>
    </TitleBar>
    <router-view v-if="checkoutView"></router-view>
    <section
      v-else
      class="row g-5 User__side-row"
      style="margin-top: 0 !important"
    >
      <!-- 左側 2/3 區塊 -->
      <div class="col-12 col-lg-8 User__side-col">
        <div class="User__side">
          <button
            v-if="showArrow"
            class="User__side-left"
            @click="scrollArrow('left')"
          >
            <SvgIcon icon-name="Common-Arrow-Circle"></SvgIcon>
          </button>
          <button
            v-if="showArrow"
            class="User__side-right"
            @click="scrollArrow('right')"
          >
            <SvgIcon icon-name="Common-Arrow-Circle"></SvgIcon>
          </button>
          <ul
            :class="{ 'User__side-label-margin': showArrow }"
            class="User__side-label"
            ref="labelRef"
          >
            <li
              v-for="i in homeItem"
              :key="i.id"
              :class="{ active: chooseId === i.id }"
              @click="clickScroll(i.id, homeItem)"
            >
              <img :src="menuStore.getImageUrl(i.image)" alt="" />
              <h5>
                {{ i.name }}<span>({{ i.count }})</span>
              </h5>
            </li>
          </ul>
        </div>

        <UserMenuSelect
          ref="chooseRef"
          :option="option"
          @currentWatchChoose="currentChoose"
        />
      </div>

      <div class="col-12 col-lg-4 d-lg-block d-none mt-0">
        <div class="User__side sticky-top">
          <UserSopping :option="option"></UserSopping>
        </div>
      </div>
      <div class="User__footer d-block d-lg-none">
        <button
          @click="clickShow"
          class="User__shop-btn d-flex"
          :class="{ 'disabled-button': menuStore.menuSelect.length <= 0 }"
        >
          <span class="mx-auto">查看購物車</span>
          <span>$ {{ menuStore.calculateTotal() }}</span>
        </button>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/css/mixin" as *;

.active {
  color: var(--cafe-color-brown);
  border: 0.1rem solid var(--cafe-color-brown);
  background-color: var(--cafe-color-white);
}

.fixed-button:hover {
  background-color: #0056b3;
}
</style>
