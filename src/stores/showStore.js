import { defineStore } from "pinia";
import { useAlertStore } from "@/stores/alertStore";
import { apiGetThemeDropdown } from "@/api/menu";

export const useShowStore = defineStore("show", {
  state: () => ({
    // 全部下拉式選單選項
    dropdownList: [],
    language: { id: -1, name: "請選擇" },
    meal: { id: -1, name: "請選擇" },
    // 下拉式選項
    dropdownShow: [
      {
        language: false,
        meal: false,
      },
    ],
    // 視窗彈窗
    popupShow: {
      dialog: false,
      menu: false,
      check: false,
      shopping: false,
      options: false,
    },
  }),

  getters: {},

  actions: {
    async initThemeDropdown() {
      try {
        const res = await apiGetThemeDropdown();
        this.dropdownList = res.data;
      } catch (e) {
        console.error("ERR! initTheme", e);
      }
    },
    // 開關下拉式選項
    toggleShow(params) {
      if (params) {
        this.dropdownShow[params] = !this.dropdownShow[params];
      }
    },
    // 開啟視窗彈窗
    togglePopupShow(type) {
      this.popupShow[type] = !this.popupShow[type];
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
