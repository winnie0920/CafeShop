import { defineStore } from "pinia";
import { useAlertStore } from "@/stores/alertStore";

export const userFormStore = defineStore("select", {
  state: () => ({
    // 存儲菜單明細的暫存單選、多選
    choice: {},
    regex: {},
    errorMessages: {},
  }),
  actions: {
    //清空選項
    clearState() {
      this.choice = {};
      this.regex = {};
      this.errorMessages = {};
    },
    clearError() {
      this.errorMessages = {};
    },
    // 更新單選
    singleOption(type, id) {
      this.choice[type] = id;
    },
    // 更新多選
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

    //驗證必填
    validateInput(id, name = "", string) {
      const alertStore = useAlertStore();
      if (this.choice[id] !== undefined && this.regex[id]) {
        if (!this.regex[id].test(this.choice[id])) {
          alertStore.pushMsg("Common-Error", name + string);
          return false;
        }
      }
      return true;
    },
    //驗證選項必填
    validateOption(option) {
      const alertStore = useAlertStore();
      const missingOptions = option.filter((opt) => {
        const isSelected =
          this.choice && Object.keys(this.choice).includes(opt.type);
        if (!isSelected) {
          this.errorMessages[opt.type] = opt.type;
          alertStore.pushMsg("Common-Error", `${opt.name} 請選擇一個選項`);
        }
        return !isSelected;
      });
      return missingOptions.length === 0;
    },
  },
});
