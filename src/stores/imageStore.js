import { defineStore } from "pinia";
import { useAlertStore } from "@/stores/alertStore";

export const useImageStore = defineStore("image", {
  state: () => {
    return {
      uploadImg: null,
      localUploadImg: null,
    };
  },
  actions: {
    getImageUrl(id) {
      //處理剛上傳本地圖片路徑
      if (id instanceof File) {
        this.clearImage();
        return (this.localUploadImg = URL.createObjectURL(id));
      }
      //處理已上傳本地圖片路徑
      if (id.startsWith("blob")) {
        return id;
      }
      // 處理靜態圖片路徑
      return id ? new URL(`../assets/image/${id}`, import.meta.url).href : "";
    },
    //反覆更新還沒按下確認的按鈕，會清除舊照片，取得新路徑
    clearImage() {
      this.uploadImg = null;
      this.localUploadImg = null;
    },
    validateImage() {
      const alertStore = useAlertStore();
      if (this.uploadImg === null && this.localUploadImg === null) {
        alertStore.pushMsg("Common-Error", "請上傳圖片，需JPEG、JPG格式");
        return false;
      }
      return true;
    },
  },
});
