import { defineStore } from "pinia";

export const useShowStore = defineStore("show", {
  state: () => ({
    language: { id: -1, name: "請選擇" },
    meal: { id: -1, name: "請選擇" },
    //dropdown
    dropdownShow: [
      {
        language: false,
        meal: false,
      },
    ],
    popupShow: {
      menu: false,
      check: false,
      shopping: false,
      meal: false,
      option: false,
    },
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
