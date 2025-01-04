import { defineStore } from "pinia";
import { useAlertStore } from "@/stores/alertStore";

export const useShowStore = defineStore("show", {
  state: () => ({
    language: { id: -1, name: "請選擇" },
    meal: { id: -1, name: "請選擇" },
    dropdownShow: [
      {
        language: false,
        meal: false,
        theme: false,
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

  getters: {},

  actions: {
    // 開關下拉式選項
    toggleShow(params) {
      if (params) {
        this.dropdownShow[params] = !this.dropdownShow[params];
      }
    },
    // 開啟視窗彈窗
    togglePopupShow(type, val) {
      this.popupShow[type] = val;
    },
    // 驗證下拉式選項
    validateDropdown(drop, name) {
      const alertStore = useAlertStore();
      if (drop.id === -1 || drop.name === "請選擇") {
        alertStore.pushMsg("Common-Error", `${name} 請選擇一個選項`);
        return false;
      }
      return true;
    },
  },
});
