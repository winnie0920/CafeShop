<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: false,
  },
});
import { apiPostMeal, apiPatchMeal } from "@/api/menu";
import { choiceOption, customOption } from "@/json/Admin";
import { PER_AUTH } from "@/utils/constants.js";

// 菜單顯示的選項
const selectedOptions = ref([...choiceOption]);
const showStore = useShowStore();
const formStore = userFormStore();
const imageStore = useImageStore();
const alertStore = useAlertStore();
const menuStore = userMenuStore();
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

// 清空選項
const clearFormParam = () => {
  const param = {
    name: "",
    price: "",
    description: "",
    count: "",
    isSale: 1,
    options: [],
  };
  delete param.options;
  return param;
};

// 查詢單一菜單
const queryData = async () => {
  menuStore.initMeal(route.query.id);
};
// 驗證欄位
const validateForm = () => {
  formStore.clearError();
  // 檢查輸入、選擇的選項
  const inputValid = validate.every((v) => {
    return formStore.validateInput(v.id, v.name, v.message);
  });
  const imageValid = imageStore.validateImage(imageStore.uploadImg);
  // 檢查下拉式選單
  const dropdownValid = showStore.validateDropdown(showStore.meal, "餐點分類");
  return inputValid && imageValid && dropdownValid;
};

// 新增、更新餐點
const confirmForm = async () => {
  if (!validateForm()) return;
  let formParams = {
    ...formStore.choice,
    imageUrl: imageStore.uploadImg,
    themeId: showStore.meal.id,
  };
  try {
    const res = formStore.choice.id
      ? await apiPatchMeal(formParams)
      : await apiPostMeal(formParams);
    alertStore.pushMsg("Common-Ok", res.msg, "brown");
    menuStore.initTheme();
  } catch (err) {
    console.error(err);
  }
  router.push({ name: "AdminMeal" });
};

onMounted(async () => {
  //清空選項
  formStore.choice = clearFormParam();
  //清空圖片
  if (!route.query.parent) {
    imageStore.setUploadImg(null);
  }
  await queryData();

  imageStore.setUploadImg(formStore.choice.imageUrl);
});
</script>

<template>
  <!-- 輸入資料 Start -->
  <article class="form__frame gap-3">
    <div class="form__container">
      <!-- 上傳圖片 -->
      <form method="post" enctype="multipart/form-data">
        <div class="form__UploadImg">
          <AdminUploadImg
            :url="PER_AUTH"
            :uploaded-img="formStore.choice?.imageUrl"
            slug="dialog"
          />
        </div>
      </form>
      <div class="check__inputBox">
        <h6 class="form__text-label">餐點分類</h6>
        <DropDown
          v-if="dropdown !== null"
          v-model="showStore[dropdown.drop]"
          :data="showStore.dropdownList"
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
      <AddAlter :allOption="customOption" type="groupIds" />
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
