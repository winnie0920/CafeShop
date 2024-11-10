<script setup>
import { homeItem, homeMenu, option } from "@/json/UserHome";
const router = useRouter();

const menu = ref([
  {
    name: "肉醬義大利麵",
    count: 1,
    size: "小份",
    spicy: "小辣",
    price: 130,
  },
  {
    name: "肉醬義大利麵",
    count: 1,
    size: "小份",
    spicy: "小辣",
    price: 130,
  },
  {
    name: "肉醬義大利麵",
    count: 1,
    size: "小份",
    spicy: "小辣",
    price: 130,
  },
  {
    name: "肉醬義大利麵",
    count: 1,
    size: "小份",
    spicy: "小辣",
    price: 130,
  },
  {
    name: "肉醬義大利麵",
    count: 1,
    size: "小份",
    spicy: "小辣",
    price: 130,
  },
  {
    name: "肉醬義大利麵",
    count: 1,
    size: "小份",
    spicy: "小辣",
    price: 130,
  },
  {
    name: "肉醬義大利麵",
    count: 1,
    size: "小份",
    spicy: "小辣",
    price: 130,
  },
  {
    name: "肉醬義大利麵",
    count: 1,
    size: "小份",
    spicy: "小辣",
    price: 130,
  },
  {
    name: "肉醬義大利麵",
    count: 1,
    size: "小份",
    spicy: "小辣",
    price: 130,
  },
  {
    name: "肉醬義大利麵",
    count: 1,
    size: "小份",
    spicy: "小辣",
    price: 130,
  },
  {
    name: "肉醬義大利麵",
    count: 1,
    size: "小份",
    spicy: "小辣",
    price: 130,
  },
  {
    name: "肉醬義大利麵",
    count: 1,
    size: "小份",
    spicy: "小辣",
    price: 130,
  },
  {
    name: "肉醬義大利麵",
    count: 1,
    size: "小份",
    spicy: "小辣",
    price: 130,
  },
  {
    name: "肉醬義大利麵",
    count: 1,
    size: "小份",
    spicy: "小辣",
    price: 130,
  },
]);

const tableNumber = ref("");
const errorMessage = ref("");

const validateNumber = () => {
  tableNumber.value = tableNumber.value.replace(/[^0-9]/g, ""); // 移除非數字字符
};

const goBack = () => {
  if (!tableNumber.value) {
    errorMessage.value = "未輸入桌號";
  } else {
    errorMessage.value = "";
    router.push({ name: "UserHome" });
  }
};
</script>

<template>
  <section class="row g-lg-5 g-4">
    <div class="col-lg-8 col-12">
      <div class="new__container User__shop-container new__scrollbar">
        <div class="mb-3 new__menu-content check__inputBox">
          <label for="tableNumber" class="form-label">桌號</label>
          <input
            type="text"
            id="tableNumber"
            placeholder="請輸入桌號"
            v-model="tableNumber"
            @input="validateNumber"
          />
        </div>
      </div>
    </div>
    <div class="col-lg-4 col-12">
      <div class="new__container new__width">
        <h3 class="mb-4">您的訂單</h3>
        <div class="new__content">
          <div class="mb-3 new__menu-content" v-for="m in menu" :key="m.index">
            <div>
              <p>{{ m.name }} X{{ m.count }}</p>
              <p class="User__shop-option">{{ m.size }} {{ m.spicy }}</p>
            </div>
            <p>{{ m.price }}</p>
          </div>
        </div>
        <hr />
        <div class="new__floor"></div>
        <div class="new__gray-text new__menu-content mb-2">
          <p>小計</p>
          <p>$100</p>
        </div>
        <div class="new__gray-text new__menu-content mb-2">
          <p>服務費</p>
          <p>$10</p>
        </div>
        <div class="new__strong-text new__menu-content mt-4">
          <h2>總計</h2>
          <h2>$110</h2>
        </div>
      </div>
      <div class="new__container flex-row mb-5 mb-lg-0">
        <ConfirmBtn class="ms-auto me-3" title="送出訂單" />
        <ConfirmBtn color="gray" title="取消" @click="goBack()" />
      </div>
    </div>
    <div v-if="errorMessage" class="alert alert-danger mt-2">
      {{ errorMessage }}
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use "@/assets/css/mixin" as *;
.new {
  &__scrollbar {
    overflow-y: auto;
    height: 100%;
    scrollbar-width: none;
  }
  &__width {
    max-width: 100%;
    max-height: calc(100vh - 18.5rem);
    scrollbar-width: none;
    overflow-y: auto;
  }
  &__content {
    height: 100vh;
    max-height: 50%;
    overflow-y: auto;
    scrollbar-width: none;
  }
  &__menu {
    &-content {
      display: flex;
      flex-direction: column;
    }
  }
  &__floor {
  }
}
</style>
