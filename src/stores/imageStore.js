import { defineStore } from "pinia";

export const useImageStore = defineStore("image", {
  state: () => {
    return {
      uploadImg: null,
      localUploadImg: null,
    };
  },
  actions: {
    getImageUrl(id) {
      // 取得本地路徑圖片
      if (id instanceof File) {
        this.clearImage();
        const objectUrl = URL.createObjectURL(id);
        this.localUploadImg = objectUrl;
        return this.localUploadImg;
      }
      // 取得檔案路徑圖片
      return new URL(`../assets/image/${id}`, import.meta.url).href;
    },
    //反覆更新還沒按下確認的按鈕，會清除舊照片，取得新路徑
    clearImage() {
      this.uploadImg = null;
      this.localUploadImg = null;
    },
  },
});
