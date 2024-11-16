import { defineStore } from "pinia";

export const useShowStore = defineStore("web", {
  state: () => ({
    sLanguage: { id: -1, name: "請選擇" },
    //dropdown
    dropdownShow: [
      {
        language: false,
      },
    ],
    popupShow: { menu: false, check: false, shopping: false },
  }),

  // 定義 getters
  getters: {},

  // 定義 actions
  actions: {
    toggleShow(params) {
      if (params) {
        this.dropdownShow[params] = !this.dropdownShow[params];
      }
    },
    togglePopupShow(type, val) {
      this.popupShow[type] = val;
    },
  },
});
