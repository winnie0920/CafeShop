<script setup>
import { homeItem, homeMenu } from "@/json/UserHome";

const useStore = userStore();
const queryParams = reactive({ search: "" });
const chooseRef = ref(null);
const menuSelect = ref([]);

// 當前選擇的 ID
const chooseId = ref(1);
const showArrow = ref(false);
const labelRef = ref(null);
const maxScroll = ref(0);

// 更新搜尋
const sendSearch = (val) => (queryParams.search = val);

// 檢查箭頭顯示
const checkScrollWidth = () => {
  showArrow.value = labelRef.value.scrollWidth > labelRef.value.clientWidth;
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

const updateMenuSelect = (newMenuSelect) => {
  menuSelect.value = newMenuSelect;
  console.log(menuSelect.value);
};

onMounted(() => {
  window.addEventListener("resize", checkScrollWidth);
  checkScrollWidth();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkScrollWidth);
});
</script>

<template>
  <div class="User__container">
    <TitleBar class="sticky-top">
      <div class="col-12 col-sm-7 col-md-6 col-lg-4 me-auto d-flex">
        <SearchBar :value="queryParams.search" @send-search="sendSearch" />
      </div>
    </TitleBar>

    <section class="row" style="overflow-y: hidden">
      <div
        class="col-12 col-lg-8 sticky-top"
        style="z-index: 2000__content !important"
      >
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
              <img :src="useStore.getImageUrl(i.image)" alt="" />
              <h5>
                {{ i.name }}<span>({{ i.count }})</span>
              </h5>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-4">
        <div class="User__side sticky-top">
          <p>計算價錢</p>
        </div>
      </div>
      <div class="col-12 col-lg-8">
        <UserMenuSelect
          ref="chooseRef"
          :menuSelect="menuSelect"
          @currentWatchChoose="currentChoose"
          @menuSelect="updateMenuSelect"
          :menu="homeMenu"
        />
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
</style>
