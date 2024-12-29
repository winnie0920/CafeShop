<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: false,
  },
});

const emit = defineEmits(["deleteData"]);
import { homeMenu, homeItem } from "@/json/User";
import { choiceOption } from "@/json/Admin";

const selectedOptions = ref([...choiceOption]);
const showStore = useShowStore();
const formStore = userFormStore();
const imageStore = useImageStore();
const alertStore = useAlertStore();
const route = useRoute();

// 驗證選項
const validate = [
  {
    id: "name",
    message: "請輸入正確名稱。",
  },
];

// 放入餐點明細原有的選項
const checkData = () => {
  const matchedItem = homeItem.find((h) => h.name === props.data.name);
  showStore.theme = matchedItem;
  const { name, content } = props.data;
  Object.assign(formStore.choice, {
    name,
    content,
    status: 1,
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
  if (inputValid.includes(false) || !imageValid) return false;

  return true;
};

// 清空選項
const clearFormParam = () => {
  const param = {
    name: "",
    content: "",
    status: 1,
  };
  return param;
};

//post 新增餐點主題
const postTheme = (formParams) => {
  const menu = homeItem.find((i) => i.id === formParams.id);

  if (!menu) {
    homeItem.push({
      ...formParams,
    });
  }
};

//送出表單
const confirmForm = () => {
  if (!validateForm()) return;
  let formParams = {
    id: showStore.theme.id ? showStore.theme.id : homeItem.length + 1,
    image: imageStore.localUploadImg || imageStore.uploadImg,
    ...formStore.choice,
  };

  postTheme(formParams);
  alertStore.pushMsg("Common-Ok", "送出成功", "brown");
  router.push({ name: "AdminTheme" });
};

onMounted(() => {
  //清空選項
  formStore.choice = clearFormParam();
  showStore.theme = "";
  if (!route.query.parent) {
    //清空圖片
    imageStore.clearImage();
  } else {
    checkData();
  }
});
</script>

<template>
  <!-- 輸入資料 Start -->
  <article class="form__frame gap-3">
    <div class="form__container check__inputBox">
      <!-- 上傳圖片 -->
      <form method="post" enctype="multipart/form-data">
        <div class="form__UploadImg">
          <AdminUploadImg :image="props.data?.image" />
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
