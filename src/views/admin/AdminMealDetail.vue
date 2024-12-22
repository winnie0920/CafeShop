<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: false,
  },
});
import { homeMenu, homeItem } from "@/json/User";
import { choiceOption, customOption } from "@/json/Admin";
// 菜單顯示的選項
const selectedOptions = ref([...choiceOption]);
const showStore = useShowStore();
const formStore = userFormStore();
const imageStore = useImageStore();
const alertStore = useAlertStore();
const route = useRoute();

//下拉式選項
const dropdown = ref({
  drop: "meal",
  active: true,
});

// 驗證選項
const validate = [
  {
    id: "name",
    message: "請輸入正確名稱。",
  },
  {
    id: "price",
    message: "請輸入正確價錢。",
  },
  {
    id: "count",
    message: "請輸入正確數量。",
  },
];

//當頁面加載時，data 是 null 檢查 URL
const isValidParams = () => {
  if (route.query.id && !props.data) {
    router.go(-1);
  }
};

// 清空選項
const clearFormParam = () => {
  const param = {
    name: "",
    price: "",
    description: "",
    count: "",
    status: 1,
  };
  delete param.option;
  return param;
};

// 放入餐點明細原有的選項
const checkData = () => {
  const matchedItem = homeItem.find((h) => h.name === props.data.name);
  showStore.meal = matchedItem;
  const { name, price, description, count, option } = props.data.children;
  Object.assign(formStore.choice, {
    name,
    price,
    description,
    count,
    status: 1,
    option,
  });
};

// 驗證欄位
const validateForm = () => {
  formStore.clearError();
  // 檢查輸入、選擇的選項
  const inputValid = validate.map((v) => {
    return formStore.validateInput(v.id, v.name, v.message);
  });
  // 檢查是否上傳照片
  const imageValid = imageStore.validateImage();
  // 檢查下拉式選單
  const dropdownValid = showStore.validateDropdown(showStore.meal, "餐點分類");

  if (inputValid.includes(false) || !imageValid || !dropdownValid) return false;

  return true;
};

//post 新增餐點細項
const postMeal = (formParams) => {
  const menu = homeMenu.find((i) => i.id === formParams.menuId);
  if (menu) {
    const existingItem = menu.children.find((i) => i.name === formParams.name);
    if (!existingItem) {
      menu.children.push({
        ...formParams,
        id: menu.children.length,
      });
    }
  }
};

//送出表單
const confirmForm = () => {
  if (!validateForm()) return;
  let formParams = {
    menuId: showStore.meal.id,
    image: imageStore.localUploadImg || imageStore.uploadImg,
    ...formStore.choice,
  };
  postMeal(formParams);
  alertStore.pushMsg("Common-Ok", "送出成功", "brown");
  router.push({ name: "AdminMeal" });
};

onMounted(() => {
  //清空選項
  formStore.choice = clearFormParam();
  if (!route.query.id) {
    //清空圖片
    imageStore.clearImage();
  } else if (props.data) {
    checkData();
  }
});
</script>

<template>
  <!-- 輸入資料 Start -->
  <article class="form__frame gap-3">
    <div class="form__container">
      <!-- 上傳圖片 -->
      <form method="post" enctype="multipart/form-data">
        <div class="form__UploadImg">
          <AdminUploadImg :image="props.data?.children.image" />
        </div>
      </form>
      <div class="check__inputBox">
        <h6 class="form__text-label">餐點分類</h6>
        <DropDown
          v-if="dropdown !== null"
          v-model="showStore[dropdown.drop]"
          :data="homeItem"
          :dropdown="dropdown"
        />
        <CheckInput
          :regex="/^.+$/"
          :basic="{
            type: 'input',
            id: 'name',
            name: '名稱',
          }"
        />

        <CheckInput
          :regex="/^[0-9]+$/"
          :basic="{
            type: 'input',
            id: 'price',
            name: '價錢',
          }"
        />
        <CheckInput
          :regex="/^[0-9]+$/"
          :basic="{
            type: 'input',
            id: 'count',
            name: '數量',
          }"
        />
      </div>
    </div>
    <div class="form__container new__menu-content check__inputBox">
      <CheckInput
        :basic="{
          type: 'textarea',
          id: 'description',
          name: '說明',
        }"
      />
      <CheckInput
        :style="{ padding: '0', marginTop: '1rem' }"
        :option="selectedOptions"
        :basic="{
          type: 'select',
        }"
      />
      <AddAlter :allOption="customOption" />
    </div>
  </article>
  <!-- 輸入資料 End -->
  <div class="form__add-controller">
    <ConfirmBtn
      :styles="['brown']"
      class="ms-auto"
      title="確認"
      @click="confirmForm()"
    />
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/css/mixin" as *;

.check__inputBox {
  @include flex-center(column, inherit, space-evenly);
}
</style>
