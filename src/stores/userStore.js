import { defineStore } from "pinia";

export const userStore = defineStore("web", {
  state: () => ({
    sLanguage: { id: -1, name: "請選擇" },
    //dropdown
    show: [
      {
        language: false,
      },
    ],
    //popup
    popupShow: { menu: false },
  }),

  // 定义 getters
  getters: {},

  // 定义 actions
  actions: {
    toggleShow(params) {
      if (params) {
        this.show[params] = !this.show[params];
      }
    },
    togglePopupShow(type, val) {
      this.popupShow[type] = val;
    },
    getImageUrl(id) {
      return new URL(`../assets/image/${id}`, import.meta.url).href;
    },
  },
});
