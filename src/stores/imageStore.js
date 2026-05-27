import { defineStore } from "pinia";
import { useAlertStore } from "@/stores/alertStore";
import { apiDelImg } from "@/api/image";

export const useImageStore = defineStore("image", {
  state: () => {
    return {
      uploadImg: null,
      localUploadImg: null,
    };
  },
  actions: {
    getImageUrl(id) {
      // 處理剛上傳本地圖片路徑
      if (id instanceof File) {
        this.setUploadImg("");
        return (this.localUploadImg = URL.createObjectURL(id));
      }
      // // 處理已上傳本地圖片路徑
      // if (id.startsWith("blob")) {
      //   return id;
      // }
      // 處理靜態圖片路徑
      return id ? new URL(`../assets/image/${id}`, import.meta.url).href : "";
    },
    validateImage(imageUrl) {
      const alertStore = useAlertStore();
      if (!imageUrl) {
        alertStore.pushMsg("Common-Error", "請上傳圖片，需JPEG、JPG格式");
        return false;
      }
      return true;
    },

    setUploadImg(val) {
      this.uploadImg = val;
    },
    // 送出更新時，如有上傳新照片或清空照片，則請求刪除舊照片、取得新照片路徑
    async delOriginalImg(url, path) {
      try {
        if (this.uploadImg || this.uploadImg === "") {
          if (path) await apiDelImg(url, path);
          path = this.uploadImg ? this.uploadImg : null;
        }
        this.setUploadImg(null);
        return path;
      } catch (e) {
        console.error("ERR! delOriginalImg", e);
      }
    },
    // 關閉 popup 視窗、反覆上傳新照片時，刪除新上傳但沒用到的照片
    async delUploadedImg(url) {
      try {
        if (this.uploadImg) await apiDelImg(url, this.uploadImg);
        this.setUploadImg(null);
      } catch (e) {
        console.error("ERR! delUploadedImg", e);
      }
    },
  },
});
