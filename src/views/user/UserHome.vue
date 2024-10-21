<script setup>
import { homeItem, homeMenu } from "@/json/UserHome";

const queryParams = reactive({
  search: "",
});

// AdminSearch 的 emit
const sendSearch = (val) => {
  queryParams.search = val;
};

let menuSelect = reactive([]);

// 更新菜單選擇的處理函數
const updateMenuSelect = (newMenuSelect) => {
  menuSelect = newMenuSelect;
  console.log(menuSelect);
};

const labelRef = ref(null);

// 當前滾動最大寬度
const maxScroll = ref(0);

// 預設選中的菜單項目
const selectMenu = ref(homeMenu[0]);

//箭頭顯示
const showArrow = ref(false);

//圖片路徑
const getImageUrl = (id) => {
  return new URL(`../../assets/image/${id}`, import.meta.url).href;
};

// side左右移動
const scrollArrow = (direction) => {
  if (labelRef.value) {
    const scrollContainer = labelRef.value;
    const currentScroll = scrollContainer.scrollLeft;
    maxScroll.value = scrollContainer.scrollWidth - scrollContainer.clientWidth;
    // 滾動值
    const scrollAmount = scrollContainer.clientWidth / 2;

    const scroll =
      typeof direction === "number"
        ? Math.max(0, Math.min(direction, maxScroll.value)) // 如果是數字，直接滾動到指定位置
        : direction === "left"
        ? Math.max(0, currentScroll - scrollAmount) // 向左滾動
        : Math.min(maxScroll.value, currentScroll + scrollAmount); // 向右滾動

    scrollContainer.scrollTo({
      left: scroll,
      behavior: "smooth",
    });
  }
};

const clickScroll = (id, items) => {
  if (labelRef.value) {
    const liWidth = labelRef.value.querySelector("li").offsetWidth; // 每個 li 的寬度
    const visibleWidth = labelRef.value.clientWidth; // 可見的寬度
    let newPosition = (liWidth + 8) * id - visibleWidth / 2 + liWidth / 2; // 計算新的滾動位置

    // 確保最後幾個元素正確處理
    if (id >= items.length - 2) {
      newPosition = maxScroll.value;
    }

    // 確保新的滾動位置在合理範圍內
    const adjustedPosition = Math.max(
      0,
      Math.min(newPosition, maxScroll.value)
    );

    // 滾動到新位置
    scrollArrow(adjustedPosition);
    //找到homeMenu中id對應的項目
    selectMenu.value = homeMenu.find((item) => item.id === id);
    console.log(selectMenu.value);
  }
};

//判斷箭頭顯示
const checkScrollWidth = () => {
  const label = labelRef.value;
  if (label.scrollWidth > label.clientWidth) {
    showArrow.value = true;
  } else {
    showArrow.value = false;
  }
};

//檢查箭頭是否顯示
onMounted(() => {
  window.addEventListener("resize", checkScrollWidth);
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
      <!-- 滾輪軸 -->
      <div class="col-12 col-lg-8 sticky-top" style="z-index: 0 !important">
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
              @click="clickScroll(i.id, homeItem)"
            >
              <img :src="getImageUrl(i.image)" alt="" />
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
          :menuSelect="menuSelect"
          @menuSelect="updateMenuSelect"
          :menu="homeMenu"
        />
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/css/mixin";
</style>
