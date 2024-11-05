import { defineStore } from "pinia";

export const userSelectedStore = defineStore("select", {
  state: () => ({
    // 用來存儲菜單明細的暫存選項
    choice: {},
    errorMessages: {},
  }),

  // 定義 getters
  getters: {},

  // 定義 actions
  actions: {
    //清空選項
    clearChoice() {
      this.choice = {};
    },
    // 更新單選的選項
    singleOption(type, id) {
      this.choice[type] = id;
    },
    // 更新多選的選項
    pluralOption(type, id) {
      if (!this.choice[type]) {
        this.choice[type] = [];
      }
      const index = this.choice[type].indexOf(id);
      if (index === -1) {
        this.choice[type].push(id);
      } else {
        this.choice[type].splice(index, 1);
      }
    },
    //驗證選項必填
    validateOption(option) {
      this.errorMessages = {};
      const types = option.map((opt) => opt.type);
      for (const k of types) {
        const keys = this.choice ? Object.keys(this.choice) : [];
        if (!Array.isArray(keys) || keys.length === 0) {
          this.errorMessages[k] = k;
        } else if (!keys.includes(k)) {
          this.errorMessages[k] = k;
        }
      }
      if (Object.keys(this.errorMessages).length > 0) {
        return false;
      }
      return true;
    },
  },
});
