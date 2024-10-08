<script setup>
const queryParams = reactive({
  search: "",
});

// AdminSearch 的 emit
const sendSearch = (val) => {
  queryParams.search = val;
};

const LabelRef = ref(null);
// 當前滾動最大寬度
const maxScroll = ref(0);
//滾輪假資料
const items = [
  "義大利麵1",
  "義大利麵2",
  "義大利麵3",
  "義大利麵4",
  "義大利麵5",
  "義大利麵6",
  "義大利麵7",
  "義大利麵8",
  "義大利麵9",
  "義大利麵10",
  "義大利麵11",
  "義大利麵12",
];

// side左右移動
const ScrollArrow = (direction) => {
  if (LabelRef.value) {
    const scrollContainer = LabelRef.value;
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
const ClickScroll = (index, items) => {
  if (LabelRef.value) {
    const liWidth = LabelRef.value.querySelector("li").offsetWidth; // 每個 li 的寬度
    const visibleWidth = LabelRef.value.clientWidth; // 可見的寬度
    let newPosition = (liWidth + 32) * index - visibleWidth / 2 + liWidth / 2; // 計算新的滾動位置

    // 確保最後幾個元素正確處理
    if (index >= items.length - 2) {
      newPosition = maxScroll.value;
    }

    // 確保新的滾動位置在合理範圍內
    const adjustedPosition = Math.max(
      0,
      Math.min(newPosition, maxScroll.value)
    );

    // 滾動到新位置
    ScrollArrow(adjustedPosition);
  }
};
</script>

<template>
  <div class="User__container">
    <TitleBar>
      <div class="col-12 col-sm-7 col-md-6 col-lg-4 me-auto d-flex">
        <SearchBar :value="queryParams.search" @send-search="sendSearch" />
      </div>
    </TitleBar>

    <section class="row">
      <!-- 滾輪軸 -->
      <div class="User__side col-12 col-lg-8">
        <button class="User__side-left" @click="ScrollArrow('left')">
          <SvgIcon icon-name="Common-Arrow-Circle"></SvgIcon>
        </button>
        <button class="User__side-right" @click="ScrollArrow('right')">
          <SvgIcon icon-name="Common-Arrow-Circle"></SvgIcon>
        </button>
        <ul class="User__side-label" ref="LabelRef">
          <li
            v-for="(item, index) in items"
            :key="index"
            @click="ClickScroll(index, items)"
          >
            <img src="@/assets/image/Food__Pescatora.png" alt="" />
            <h5>{{ item }} <span>(10)</span></h5>
          </li>
        </ul>
      </div>
      <div class="col-4">123</div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/css/mixin";

.User {
  &__container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 5rem 3rem 0;
    gap: 2rem;
    overflow: hidden;
  }

  &__side {
    position: relative;
    &-label {
      display: flex;
      gap: 2rem;
      margin: 0 3rem;
      padding: 0.5rem 1rem;
      overflow-x: auto;
      scrollbar-width: none;
      li {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem 0.9rem 1rem 1.1rem;
        color: var(--cafe-color-brown-lighter);
        background-color: var(--cafe-color-transparent);
        border-radius: var(--cafe-radius-md);
        border: 0.1rem solid var(--cafe-color-brown-lighter);
        transition: all 0.35s ease-in-out;
        cursor: pointer;
        &:active,
        &:hover {
          color: var(--cafe-color-brown);
          border: 0.1rem solid var(--cafe-color-brown);
          background-color: var(--cafe-color-white);
        }
        img {
          max-width: 100%; /* 確保圖片不會超出父容器 */
          height: 5rem; /* 維持圖片比例 */
          margin-bottom: 0.5rem;
        }
        h5 {
          font-size: 1rem;
          white-space: nowrap;
        }
      }
    }
    &-left,
    &-right {
      display: flex;
      align-items: center;
      position: absolute;
      top: 50%;
      padding: 0.7rem;
      border: 0.1rem solid var(--cafe-color-brown);
      border-radius: var(--cafe-radius-xl);
      background-color: var(--cafe-color-white);
      color: var(--cafe-color-brown);
      transform: translateY(-50%);
      transition: all 0.1s ease-in-out;
      cursor: pointer;
      z-index: 10;
      &:hover {
        color: var(--cafe-color-white);
        background-color: var(--cafe-color-brown);
      }
      svg {
        width: 1.3rem;
        height: 1.3rem;
      }
    }

    &-left {
      transform: rotate(180deg) translateY(50%);
      left: 0;
    }

    &-right {
      right: 0;
    }
  }
}
</style>
