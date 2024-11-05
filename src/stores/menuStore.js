import { defineStore } from "pinia";

export const userMenuStore = defineStore("menu", {
  state: () => ({
    homeMenu: [],
    menuSelect: [],
    childInformation: [],
  }),
  actions: {
    setMenuSelect(newMenuSelect) {
      this.menuSelect = newMenuSelect;
    },
    setHomeMenu(newHomeMenu) {
      this.homeMenu = newHomeMenu;
    },
  },
});
