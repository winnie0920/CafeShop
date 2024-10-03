import { defineStore } from "pinia";

export const userStore = defineStore("web", {
  // 定义状态
  state: () => ({
    sLanguage: { id: -1, name: "請選擇" },
    show: [
      {
        language: false,
      },
    ],
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
  },
});
