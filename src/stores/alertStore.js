import { defineStore } from "pinia";

export const useAlertStore = defineStore("alert", {
  state: () => {
    return {
      confirmData: {
        title: "",
        content: "",
        buttons: [{ name: "", style: "", cb: null }],
      },
      messages: [],
    };
  },

  // 定義 getters
  getters: {},

  // 定義 actions
  actions: {
    //設定Confirm，button得名稱、風格、callback
    setConfirm(title, content, ...buttons) {
      this.confirmData = { title, content, buttons };
    },
    //清空Confirm
    clearConfirm() {
      this.confirmData = {
        title: "",
        content: "",
        buttons: [{ name: "", style: "", cb: null }],
      };
    },
    //如果相同訊息的資料已存在，則不新增
    pushMsg(icon, msg, type, time = 2) {
      const existed = this.messages.find((item) => msg === item.msg);
      if (!existed) {
        this.messages.push({ icon, msg, type, time });
      }
    },
  },
});
