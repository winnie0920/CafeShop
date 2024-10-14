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
  {
    id: 1,
    name: "義大利麵",
    path: "Food__Pescatora.png",
  },
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

const ShowArrow = () => {
  return this.items.length > 5;
};

const ClickScroll = (index, items) => {
  if (LabelRef.value) {
    const liWidth = LabelRef.value.querySelector("li").offsetWidth; // 每個 li 的寬度
    const visibleWidth = LabelRef.value.clientWidth; // 可見的寬度
    let newPosition =
      (liWidth + 8) * index - visibleWidth / 2 + liWidth / 2 + 16; // 計算新的滾動位置

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
const getImageUrl = (id) => {
  return new URL(`../../assets/image/${id}`, import.meta.url).href;
};
</script>

<template>
  <div class="User__container">
    <TitleBar class="sticky-top">
      <div class="col-12 col-sm-7 col-md-6 col-lg-4 me-auto d-flex">
        <SearchBar :value="queryParams.search" @send-search="sendSearch" />
      </div>
    </TitleBar>

    <section class="row">
      <!-- 滾輪軸 -->
      <div class="col-12 col-lg-8">
        <div class="User__side sticky-top">
          <button
            v-if="ShowArrow"
            class="User__side-left"
            @click="ScrollArrow('left')"
          >
            <SvgIcon icon-name="Common-Arrow-Circle"></SvgIcon>
          </button>
          <button
            v-if="ShowArrow"
            class="User__side-right"
            @click="ScrollArrow('right')"
          >
            <SvgIcon icon-name="Common-Arrow-Circle"></SvgIcon>
          </button>
          <ul class="User__side-label" ref="LabelRef">
            <li
              v-for="i in items"
              :key="i.id"
              @click="ClickScroll(i.id, items)"
            >
              <img :src="getImageUrl(i.path)" alt="" />
              <h5>{{ i.name }} <span>(10)</span></h5>
            </li>
          </ul>
        </div>
        <div class="menu__content">
          <p>滾動菜單</p>
        </div>
      </div>
      <div class="col-4">
        <div class="User__side sticky-top">
          <p>計算價錢</p>
        </div>
      </div>
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
    padding: 3rem 3rem 0;
    gap: 1rem;
    overflow-x: hidden;
  }

  &__side {
    top: 8.5rem;
    z-index: 1;
    &-label {
      display: flex;
      gap: 0.5rem;
      margin: 0 3rem;
      padding: 0.5rem 1rem;
      overflow-x: auto;
      scrollbar-width: none;
      li {
        @extend %base-btn-setting;
        flex-direction: column;
        align-items: center;
        padding: 0.8rem;
        color: var(--cafe-color-brown-lighter);
        background-color: var(--cafe-color-transparent);
        cursor: pointer;
        &:active,
        &:hover {
          color: var(--cafe-color-brown);
          border: 0.1rem solid var(--cafe-color-brown);
          background-color: var(--cafe-color-white);
        }
        img {
          max-width: 100%; /* 確保圖片不會超出父容器 */
          height: 4rem; /* 維持圖片比例 */
          margin-bottom: 0.5rem;
        }
        h5 {
          font-size: var(--cafe--font-xs);
          white-space: nowrap;
        }
      }
    }
    &-left,
    &-right {
      @extend %base-btn-setting;
      position: absolute;
      top: 50%;
      padding: 0.7rem;
      border: 0.1rem solid var(--cafe-color-brown);
      background-color: var(--cafe-color-white);
      color: var(--cafe-color-brown);
      transform: translateY(-50%);
      cursor: pointer;
      z-index: 10;
      &:hover {
        color: var(--cafe-color-white);
        background-color: var(--cafe-color-brown);
      }
      svg {
        width: 1rem;
        height: 1rem;
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
.menu {
  &__content {
    overflow-y: auto;
    max-width: 100%;
    max-height: calc(100vh - 20rem);
    scrollbar-width: none;
    &::-webkit-scrollbar {
      width: 0; /* 隱藏滾動條寬度 */
    }
  }
}
</style>
