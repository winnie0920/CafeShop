import { defineStore } from "pinia";

export const userMenuStore = defineStore("menu", {
  state: () => ({
    homeMenu: [],
    menuSelect: [],
    debouncing: false,
  }),
  actions: {
    setMenuSelect(newMenuSelect) {
      this.menuSelect = newMenuSelect;
    },

    pushMenuSelect(item) {
      this.menuSelect.push(item);
    },
    setHomeMenu(menu) {
      this.homeMenu = menu;
    },
    // 找到相對應 MenuSelect 的菜單品項
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
                JSON.stringify(item.option[key]) === JSON.stringify(option[key])
            )
          );
        });
      }
      return this.menuSelect.find(
        (item) => item.menuId === menuId && item.childId === childId
      );
    },

    // 點擊+號，新增菜單品項
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
    // 點擊+號，添加 MenuSelect 數量及金額
    addMenuSelect(menuId, c) {
      const existingMenu = this.makeMenuItem(menuId, c.id, c);
      if (existingMenu.count < c.count) existingMenu.count++;
      existingMenu.price = existingMenu.count * c.price;
    },
    // 點擊減少、刪除 MenuSelect 的菜單品項及數量
    removeMenuSelect(menuId, childId) {
      const existingMenu = this.findMenuItem(menuId, childId);
      // 減少數量
      existingMenu.count > 1
        ? existingMenu.count--
        : this.menuSelect.splice(this.menuSelect.indexOf(existingMenu), 1);
    },

    //計算option裡面的細項金額
    totalOptionPrice(option, occupy) {
      const options = Array.isArray(option) ? option : [];
      return options.reduce((total, item) => {
        const selectedValue = occupy[item.type];
        if (selectedValue !== undefined) {
          const selectedOption = item.children.find(
            (child) => child.id === selectedValue
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

    //計算菜單品項總價
    calculateTotal() {
      return this.menuSelect.reduce((total, i) => {
        return total + i.price;
      }, 0);
    },

    //跳轉至訂單明細
    checkOrder(router) {
      if (this.menuSelect.length > 0) {
        router.push("/home/checkout");
      }
    },

    //取得正確路徑圖片
    getImageUrl(id) {
      return new URL(`../assets/image/${id}`, import.meta.url).href;
    },

    //防抖
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
