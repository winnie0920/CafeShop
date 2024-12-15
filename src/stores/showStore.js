import { defineStore } from "pinia";
import { useAlertStore } from "@/stores/alertStore";

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
