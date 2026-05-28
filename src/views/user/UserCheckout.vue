<script setup>
import { payOption, option } from "@/json/User";
const formStore = userFormStore();
const showStore = useShowStore();
const alertStore = useAlertStore();
const menuStore = userMenuStore();
const router = useRouter();
// 菜單顯示的選項
const selectedOptions = ref([...payOption]);

// 計算服務費及總金額
const calculateAmounts = () => {
  // 計算服務費
  const serviceAmount = Math.ceil(menuStore.calculateTotal() * 0.1);
  return menuStore.calculateTotal() + serviceAmount;
};

// 全部訂單資料
const orderMenu = computed(() => {
  const totalAmount = calculateAmounts(); // 計算總金額和最終金額
  return {
    table: formStore.choice.tableNumber,
    allAmount: totalAmount,
    payMethod: formStore.choice.size || "", // 如果沒有 size 則是空字串
    remark: formStore.choice.remark,
    menuList: menuStore.menuSelect?.map((m) => {
      const menuItem = {
        id: m.detail.id,
        menuId: m.menuId,
        childId: m.childId,
        name: m.detail.name,
        price: m.price,
        amount: m.price * m.count,
        description: m.detail.description || "",
        image: m.detail.image || "",
        count: m.count,
      };
      // 判斷是否有option
      if (m.option?.constructor === Object) {
        menuItem.option = {};
        for (const key in m.option) {
          menuItem.option[key] = m.option[key] ?? 0;
        }
      }
      return menuItem;
    }),
  };
});

// 取消訂單
const sendBack = () => {
  router.push({ name: "UserHome" });
};

const validate = [
  {
    id: "tableNumber",
    message: "請輸入正確桌號，請勿輸入英文字母",
  },
];

// 送出訂單按鈕
const sendOrder = () => {
  formStore.clearError();
  if (!validateForm()) return;
  // 開啟送出訂單彈窗
  showStore.togglePopupShow("check", true);
};

// 欄位驗證
const validateForm = () => {
  formStore.clearError();
  // 檢查輸入、選擇的選項
  const inputValid = validate.map((v) => {
    return formStore.validateInput(v.id, v.name, v.message);
  });
  // 檢查是否勾選選項
  const optionsValid =
    Array.isArray(selectedOptions.value) &&
    formStore.validateOption(selectedOptions.value);

  if (inputValid.includes(false) || !optionsValid) return false;
  return true;
};

// 送出送出訂單彈窗
const confirmPopup = () => {
  showStore.togglePopupShow("check", false);
  alertStore.pushMsg("Common-Ok", "成功送出", "brown");
  //清空選項
  formStore.clearState();
  menuStore.clearState();

  router.push({ name: "UserHome" });
};

// 關閉送出訂單彈窗
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
          <div
            class="mb-3 new__menu-content"
            v-for="m in orderMenu.menuList"
            :key="m.index"
          >
            <div>
              <p>{{ m.name }} X{{ m.count }}</p>
              <div v-if="m.option" class="d-flex gap-2">
                <div
                  class="d-flex"
                  v-for="(options, type) in menuStore.findSelectOption(
                    m.option,
                    option,
                  )"
                  :key="type"
                >
                  <div v-for="(o, index) in options" :key="o.id">
                    <p class="User__shop-option">
                      {{ o.name
                      }}<span v-if="index < options.length - 1">、</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <p>${{ m.price }}</p>
          </div>
        </div>
        <hr class="new__hr" />
        <div class="new__floor"></div>
        <div class="new__gray-text new__menu-content mb-2">
          <p>小計</p>
          <p>${{ menuStore.calculateTotal() }}</p>
        </div>
        <div class="new__gray-text new__menu-content mb-2">
          <p>服務費</p>
          <p>${{ Math.ceil(menuStore.calculateTotal() * 0.1) }}</p>
        </div>
        <div class="new__strong-text new__menu-content mt-4">
          <h2>總計</h2>
          <h2>${{ orderMenu.allAmount }}</h2>
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
  }
  &__width {
    max-width: 100%;
    max-height: calc(100vh - 19rem);
    overflow-y: auto;
  }
  &__content {
    height: 100vh;
    max-height: 50%;
    overflow-y: auto;
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
