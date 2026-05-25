<script setup>
const props = defineProps(["url", "slug", "uploadedImg"]);
const alertStore = useAlertStore();
const imageStore = useImageStore();
const showStore = useShowStore();
import { apiPostImg } from "@/api/image";

// 更新圖片
const changeImg = async (event) => {
  const file = event.target.files[0];
  event.target.value = "";
  if (!validImg(file)) return;

  if (file) {
    try {
      await imageStore.delUploadedImg(props.url);
      const formData = new FormData();
      formData.append("file", file);
      const { data, msg } = await apiPostImg(props.url, formData);
      alertStore.pushMsg("Common-Ok", msg, "brown");
      imageStore.setUploadImg(data);
    } catch (e) {
      console.error("ERR! changeImg", e);
    }
  }
};

// 驗證圖片格式
const validImg = (file) => {
  const types = ["image/jpeg", "image/jpg", "image/png"];
  if (!types.includes(file.type)) {
    alertStore.pushMsg("Common-Error", "只能上傳JPEG、JPG格式的圖片格式。");
    return false;
  }
  return true;
};

// 開關移除圖片彈窗
const changeShow = () => {
  showStore.popupShow[props.slug] = !showStore.popupShow[props.slug];
};

// 確認圖片彈窗
const confirmPopup = () => {
  imageStore.setUploadImg("");
  alertStore.clearConfirm();
  showStore.togglePopupShow(props.slug, false);
};

onMounted(() => {
  if (props.uploadedImg) {
    imageStore.uploadImg = props.uploadedImg;
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
      v-if="imageStore.uploadImg ?? props.uploadedImg"
      for="stopPop"
      @click="changeShow"
    >
      <img :src="imageStore.uploadImg ?? props.uploadedImg" alt="uploaded" />
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
    :show="showStore.popupShow[props.slug]"
    title="刪除圖片"
    button="確認"
    @close-show="changeShow"
    @confirm-Popup="confirmPopup"
    :style="{ width: '30rem', height: '15rem' }"
  >
    <template #main>
      <div class="popup__text-content">
        <p>是否確定刪除圖片？</p>
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
      object-fit: contain;
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
