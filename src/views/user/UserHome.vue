<script setup>
const queryParams = reactive({
  search: "",
});

// AdminSearch 的 emit
const sendSearch = (val) => {
  queryParams.search = val;
};

const LabelRef = ref(null);

//side左右移動
const ScrollArrow = (num) => {
  if (LabelRef.value) {
    LabelRef.value.scrollBy({
      left: num,
      behavior: "smooth",
    });
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
    <section>
      <div class="User__side">
        <button class="User__side-left" @click="ScrollArrow(-320)">
          <SvgIcon icon-name="Common-Arrow-Circle"></SvgIcon>
        </button>
        <button class="User__side-right" @click="ScrollArrow(320)">
          <SvgIcon icon-name="Common-Arrow-Circle"></SvgIcon>
        </button>
        <div class="User__side-label" ref="LabelRef">
          <ul>
            <li>
              <img src="@/assets/image/Food__Pescatora.png" alt="" />
              <h5>義大利麵1 <span>(10)</span></h5>
            </li>
            <li>
              <img src="@/assets/image/Food__Pescatora.png" alt="" />
              <h5>義大利麵2 <span>(10)</span></h5>
            </li>
            <li>
              <img src="@/assets/image/Food__Pescatora.png" alt="" />
              <h5>義大利麵3 <span>(10)</span></h5>
            </li>
            <li>
              <img src="@/assets/image/Food__Pescatora.png" alt="" />
              <h5>義大利麵4 <span>(10)</span></h5>
            </li>
            <li>
              <img src="@/assets/image/Food__Pescatora.png" alt="" />
              <h5>義大利麵5 <span>(10)</span></h5>
            </li>
            <li>
              <img src="@/assets/image/Food__Pescatora.png" alt="" />
              <h5>義大利麵6 <span>(10)</span></h5>
            </li>
            <li>
              <img src="@/assets/image/Food__Pescatora.png" alt="" />
              <h5>義大利麵7 <span>(10)</span></h5>
            </li>
            <li>
              <img src="@/assets/image/Food__Pescatora.png" alt="" />
              <h5>義大利麵8 <span>(10)</span></h5>
            </li>
            <li>
              <img src="@/assets/image/Food__Pescatora.png" alt="" />
              <h5>義大利麵9 <span>(10)</span></h5>
            </li>
            <li>
              <img src="@/assets/image/Food__Pescatora.png" alt="" />
              <h5>義大利麵10 <span>(10)</span></h5>
            </li>
            <li>
              <img src="@/assets/image/Food__Pescatora.png" alt="" />
              <h5>義大利麵11 <span>(10)</span></h5>
            </li>
          </ul>
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
    padding: 5rem 3rem 0;
    gap: 2rem;
  }

  &__side {
    position: relative;
    &-label {
      display: flex;
      margin: 0 4rem;
      overflow-x: auto;
      scrollbar-width: none;
      ul {
        display: flex;
        gap: 2rem;
        li {
          padding: 1rem 0.9rem 1rem 1.1rem;
          background-color: var(--cafe-color-white);
          border-radius: var(--cafe-radius-md);
          border: 0.1rem solid var(--cafe-color-brown-lighter);
          transition: all 0.35s ease-in-out;
          cursor: pointer;
          &:active,
          &:hover {
            border: 0.1rem solid var(--cafe-color-brown);
          }
          img {
            width: 6rem;
            height: 6rem;
          }
          h5 {
            font-size: 1rem;
            white-space: nowrap;
          }
        }
      }
    }
    &-left,
    &-right {
      display: flex;
      align-items: center;
      position: absolute;
      top: 50%;
      padding: 1rem;
      border: 0.1rem solid var(--cafe-color-brown);
      border-radius: var(--cafe-radius-xl);
      background-color: var(--cafe-color-white);
      color: var(--cafe-color-brown);
      transform: translateY(-50%);
      cursor: pointer;
      z-index: 10;
      &:hover {
        color: var(--cafe-color-brown-darker);
      }
      svg {
        width: 1.8rem;
        height: 1.8rem;
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
