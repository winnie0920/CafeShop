import { defineStore } from "pinia";
import { apiGetTheme } from "@/api/menu";

export const userMenuStore = defineStore("menu", {
  state: () => ({
    // 全部菜單品項
    homeMenu: [],
    // 已選所有菜單品項
    menuSelect: [],

    debouncing: false,
  }),
  actions: {
    clearState() {
      this.menuSelect = [];
    },
    // 將已選擇自定義選項加入 menuSelect
    pushMenuSelect(item) {
      this.menuSelect.push(item);
    },
    // 設定 homeMenu
    setHomeMenu(menu) {
      this.homeMenu = menu;
    },
    async initTheme() {
      try {
        const res = await apiGetTheme();
        this.homeMenu = res.data;
      } catch (e) {
        console.error("ERR! initTheme", e);
      }
    },
    // 找到相對應 menuSelect 的菜單品項
    findMenuItem(menuId, childId, option) {
      if (option) {
        return this.menuSelect.find((item) => {
          const hasSameKeys =
            item.option &&
            Object.keys(item.option).length === Object.keys(option).length;
          return (
            item.menuId === menuId &&
            item.childId === childId &&
            hasSameKeys &&
            Object.keys(option).every(
              (key) =>
                JSON.stringify(item.option[key]) ===
                JSON.stringify(option[key]),
            )
          );
        });
      }
      return this.menuSelect.find(
        (item) => item.menuId === menuId && item.childId === childId,
      );
    },

    // 將所有自定義數字選項，篩選出全部選項的內容及中文
    findSelectOption(selected, option) {
      return option.reduce((result, o) => {
        const selectedIds = Array.isArray(selected[o.type])
          ? selected[o.type]
          : [selected[o.type]];

        if (Array.isArray(o.children)) {
          result[o.type] = o.children.filter((child) =>
            selectedIds.includes(child.id),
          );
        }
        return result;
      }, {});
    },

    // 點擊 + 號，新增菜單品項
    makeMenuItem(menuId, childId, c) {
      let existed = this.findMenuItem(menuId, childId);
      if (!existed) {
        this.pushMenuSelect({
          menuId,
          childId,
          count: 0,
          price: 0,
          detail: c,
        });
        existed = this.findMenuItem(menuId, childId);
      }
      return existed;
    },
    // 點擊+號，添加 menuSelect 數量及金額
    addMenuSelect(menuId, c) {
      const existingMenu = this.makeMenuItem(menuId, c.id, c);
      if (existingMenu.count < c.count) existingMenu.count++;
      existingMenu.price = existingMenu.count * c.price;
    },
    // 點擊減少、刪除 menuSelect 的菜單品項及數量
    removeMenuSelect(menuId, childId) {
      const existingMenu = this.findMenuItem(menuId, childId);
      // 減少數量
      existingMenu.count > 1
        ? existingMenu.count--
        : this.menuSelect.splice(this.menuSelect.indexOf(existingMenu), 1);
    },

    // 計算 自定義選項 裡的細項金額
    totalOptionPrice(option, occupy) {
      const options = Array.isArray(option) ? option : [];
      return options.reduce((total, item) => {
        const selectedValue = occupy[item.type];
        if (selectedValue !== undefined) {
          const selectedOption = item.children.find(
            (child) => child.id === selectedValue,
          );
          if (selectedOption && selectedOption.price) {
            return total + selectedOption.price;
          }
        }
        return total;
      }, 0);
    },
    // 獲取菜單品項的數量
    getCount(menuId, childId) {
      const existingMenu = this.findMenuItem(menuId, childId);
      const totalCount = this.menuSelect
        .filter((item) => item.menuId === menuId && item.childId === childId)
        .reduce((sum, item) => sum + item.count, 0);
      return existingMenu ? totalCount : 0;
    },

    // 計算菜單品項總價
    calculateTotal() {
      return this.menuSelect.reduce((total, i) => {
        return total + i.price;
      }, 0);
    },

    // 跳轉至訂單明細
    checkOrder(router) {
      if (this.menuSelect.length > 0) {
        router.push({ name: "UserCheckout" });
      }
    },
    // 防抖
    async debounceAction(callback, delay = 1000) {
      if (this.debouncing) return;
      this.debouncing = true;
      await callback();
      setTimeout(() => {
        this.debouncing = false;
      }, delay);
    },
  },
});
