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
    //shopping
    shoppingShow: false,
  }),

  // 定義 getters
  getters: {},

  // 定義 actions
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
