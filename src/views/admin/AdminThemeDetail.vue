<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: false,
  },
});
import { choiceOption } from "@/json/Admin";
import { apiGetTheme, apiPostTheme, apiPatchTheme } from "@/api/menu";
import { PER_AUTH } from "@/utils/constants.js";

const selectedOptions = ref([...choiceOption]);
const formStore = userFormStore();
const imageStore = useImageStore();
const alertStore = useAlertStore();
const menuStore = userMenuStore();
const route = useRoute();

// 驗證選項
const validate = [
  {
    id: "name",
    message: "請輸入正確名稱。",
  },
];

// 查詢單一主題
const queryData = async () => {
  try {
    const res = await apiGetTheme({ id: route.query.parent });
    let data = res.data;
    Object.assign(formStore.choice, {
      id: data.id,
      name: data.name,
      content: data.content,
      isSale: data.isSale ?? 1,
      imageUrl: data.imageUrl,
    });
  } catch (e) {
    console.error("ERR! queryData", e);
  }
};

// 驗證欄位
const validateForm = () => {
  formStore.clearError();
  // 檢查輸入、選擇的選項
  const inputValid = validate.every((v) => {
    return formStore.validateInput(v.id, v.name, v.message);
  });
  const imageValid = imageStore.validateImage(imageStore.uploadImg);
  return inputValid || imageValid;
};

// 清空選項
const clearFormParam = () => {
  const param = {
    name: "",
    content: "",
    isSale: 1,
    imageUrl: null,
  };
  return param;
};

//新增、更新主題
const confirmForm = async () => {
  if (!validateForm()) return;
  try {
    const formParams = {
      ...formStore.choice,
      imageUrl: imageStore.uploadImg,
    };

    const res = formStore.choice.id
      ? await apiPatchTheme(formParams)
      : await apiPostTheme(formParams);

    alertStore.pushMsg("Common-Ok", res.msg, "brown");
    menuStore.initTheme();
  } catch (e) {
    console.error(e);
  }
  router.push({ name: "AdminTheme" });
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
    <div class="form__container check__inputBox">
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
        <CheckInput
          :style="{ marginTop: '1rem' }"
          :regex="/^.+$/"
          :basic="{
            type: 'input',
            id: 'name',
            name: '名稱',
          }"
        />
        <CheckInput
          :style="{ marginTop: '1rem' }"
          :regex="/^.+$/"
          :basic="{
            type: 'input',
            id: 'content',
            name: '描述',
          }"
        />
        <CheckInput
          :style="{ padding: '0', marginTop: '1rem' }"
          :option="selectedOptions"
          :basic="{
            type: 'select',
          }"
        />
      </div>
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

form {
  @include flex-center(row);
}
.form {
  &__UploadImg {
    width: 30rem;
  }
  &__container {
    grid-template-columns: 1fr;
  }
}
</style>
