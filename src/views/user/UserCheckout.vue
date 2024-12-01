<script setup>
import { payOption } from "@/json/User";
const formStore = userFormStore();
const showStore = useShowStore();
const alertStore = useAlertStore();
const router = useRouter();
// 菜單顯示的選項
const selectedOptions = ref([...payOption]);

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

//取消訂單
const sendBack = () => {
  router.push({ name: "UserHome" });
};

const validate = [
  {
    id: "tableNumber",
    message: "請輸入正確桌號，請勿輸入英文字母",
  },
];

//送出訂單
const sendOrder = () => {
  formStore.clearError();
  const inputValid = validate.find((field) =>
    formStore.validateInput(field.id, field.name, field.message)
  );
  const optionsValid =
    Array.isArray(selectedOptions.value) &&
    formStore.validateOption(selectedOptions.value);

  if (!inputValid || !optionsValid) return;
  showStore.togglePopupShow("check", true);
};

const confirmPopup = () => {
  showStore.togglePopupShow("check", false);
  alertStore.pushMsg("Common-Ok", "成功送出", "brown");
  router.push({ name: "UserHome" });
};

const closeShow = (val) => {
  showStore.togglePopupShow("check", val);
};
</script>

<template>
  <section class="row g-lg-5 g-4">
    <div class="col-lg-8 col-12">
      <div class="new__container new__scrollbar">
        <div class="mb-3 new__menu-content check__inputBox">
          <div class="col-md-6 col-12">
            <CheckInput
              :style="{ fontSize: '1.7rem' }"
              :regex="/^[0-9]{1,2}$/"
              :basic="{
                type: 'input',
                id: 'tableNumber',
                name: '桌號',
              }"
            />
          </div>
          <hr class="mb-3" />
          <CheckInput
            :regex="/^[0-9]{1,2}$/"
            :style="{ padding: '0' }"
            :option="selectedOptions"
            :basic="{
              type: 'select',
            }"
          />
          <CheckInput
            :style="{ fontSize: '1.7rem' }"
            :basic="{
              type: 'textarea',
              id: 'remark',
              name: '備註',
            }"
          />
          <hr class="mb-3" />
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
        <hr class="new__hr" />
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
      <div class="new__container flex-row mb-4 mb-lg-0">
        <ConfirmBtn
          styles="brown"
          class="ms-auto me-3"
          title="送出訂單"
          @click="sendOrder()"
        />
        <ConfirmBtn styles="gray" title="取消" @click="sendBack()" />
      </div>
    </div>
  </section>
  <UserPopup
    :show="showStore.popupShow.check"
    title="送出訂單"
    button="確認"
    @close-show="closeShow"
    @confirm-Popup="confirmPopup"
    :style="{ width: '30rem', height: '15rem' }"
  >
    <template #main>
      <div class="popup__text-content">
        <p>是否確定送出？</p>
      </div>
    </template>
  </UserPopup>
</template>

<style lang="scss" scoped>
@use "@/assets/css/mixin" as *;
.new {
  &__scrollbar {
    overflow-y: auto;
    height: 100%;
    max-height: calc(100vh - 11.5rem);
    scrollbar-width: none;
  }
  &__width {
    max-width: 100%;
    max-height: calc(100vh - 19rem);
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
}
.popup__text-content {
  display: flex;
  align-content: center;
}

@media (max-width: 991px) {
  .new {
    &__width,
    &__scrollbar {
      max-height: 100%;
    }
    &__content {
      overflow-y: visible;
      height: 100%;
    }
  }
}
</style>
