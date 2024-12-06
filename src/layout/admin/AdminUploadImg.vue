<script setup>
const props = defineProps({
  image: {
    type: String,
    required: false,
  },
});
const alertStore = useAlertStore();
const menuStore = userMenuStore();
const imageStore = useImageStore();
const showStore = useShowStore();
const fileInput = ref(null);

// 驗證圖片格式
const validImg = (file) => {
  const types = ["image/jpeg", "image/jpg", "image/png"];
  if (!types.includes(file.type)) {
    alertStore.pushMsg("Common-Error", "只能上傳JPEG、JPG格式的圖片格式。");
    return false;
  }
  return true;
};

// 更新圖片
const changeImg = (event) => {
  const file = event.target.files[0];
  const input = fileInput.value;
  if (file && validImg(file)) {
    localUploadImg(file);
  }
  if (input) input.value = "";
};

// 本地新增圖片
const localUploadImg = (file) => {
  imageStore.clearImage();
  const reader = new FileReader();
  reader.onload = () => {
    imageStore.localUploadImg = reader.result;
  };
  reader.readAsDataURL(file);
};

// 移除圖片
const removeImg = () => {
  showStore.togglePopupShow("meal", true);
};

const confirmPopup = () => {
  imageStore.clearImage();
  showStore.togglePopupShow("meal", false);
};

const closeShow = (val) => {
  showStore.togglePopupShow("meal", false);
};

onMounted(() => {
  //清空uploadImg 和 本地圖片
  imageStore.clearImage();
  if (props.image) {
    imageStore.uploadImg = props.image;
  }
});
</script>

<template>
  <input
    class="uploadImg__file"
    type="file"
    id="uploadImg"
    name="uploadImg"
    ref="fileInput"
    accept=".jpg, .jpeg, .png, .gif"
    @change="changeImg"
  />
  <label class="uploadImg__container" for="uploadImg">
    <input class="d-none" type="text" name="stopPop" id="stopPop" />
    <label
      v-if="imageStore.uploadImg || imageStore.localUploadImg"
      for="stopPop"
      @click="removeImg"
    >
      <img
        v-if="!imageStore.localUploadImg"
        :src="menuStore.getImageUrl(imageStore.uploadImg)"
        alt="uploaded"
      />
      <img v-else :src="imageStore.localUploadImg" alt="uploaded" />
    </label>
    <div
      v-else
      class="h-100 d-flex gap-2 flex-column justify-content-center align-items-center uploadImg__tip"
    >
      <SvgIcon icon-name="User-Camera"></SvgIcon>
      <p>請選擇上傳圖片</p>
    </div>
  </label>
  <UserPopup
    :show="showStore.popupShow.meal"
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
.uploadImg {
  &__file {
    display: none;
  }
  &__container {
    @include size(100%);
    @include border(transparent, 0);
    overflow: hidden;
    cursor: pointer;
    label {
      @include size(100%);
      @include border(transparent, 0);
      position: relative;
      cursor: pointer;
      &::after {
        @include absolute-setting(0, 0, auto, auto, none);
        @include size(100%);
        @include flex-center;
        @include style-color(var(--cafe-color-white), rgba(0, 0, 0, 0.4));
        content: "移除圖片";
        transition: opacity 0.3s ease;
        font-size: var(--cafe--font-lg);
        opacity: 0;
        cursor: pointer;
      }
      &:hover::after {
        opacity: 1;
      }
    }
    img {
      @include size(100%);
      object-fit: cover;
    }
    svg {
      @include size(5rem);
    }
  }
  &__tip {
    @include style-color(var(--cafe-color-white), var(--cafe-color-gray));
    transition: all 0.3s cubic-bezier(0.42, 0, 0.58, 1);
    &:hover {
      @include style-color(
        var(--cafe-color-white),
        var(--cafe-color-gray-darken)
      );
    }
  }
}
</style>
