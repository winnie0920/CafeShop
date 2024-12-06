import { defineStore } from "pinia";

export const useImageStore = defineStore("image", {
  state: () => {
    return {
      uploadImg: null,
      localUploadImg: null,
    };
  },
  actions: {
    //反覆更新還沒按下確認的按鈕，會清除舊照片，取得新路徑
    uploadImage(img) {},
    clearImage() {
      this.uploadImg = null;
      this.localUploadImg = null;
    },
  },
});
