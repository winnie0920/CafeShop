<script setup>
const props = defineProps({
  option: {
    type: Array,
    required: true,
  },
});
const router = useRouter();
const menuStore = userMenuStore();
const checkOrder = () => {
  if (menuStore.menuSelect.length > 0) {
    router.push("/home/checkout");
  }
};

const calculateTotal = () => {
  return menuStore.menuSelect.reduce((total, i) => {
    return total + i.price;
  }, 0);
};

const findSelectOption = (selected) => {
  const result = {};

  props.option.forEach((o) => {
    const selectedId = selected[o.type];
    const selectedChild = o.children.find((c) => c.id === selectedId);
    if (selectedChild) {
      result[o.type] = selectedChild;
    }
  });
  return result;
};
</script>

<template>
  <div class="User__shop-container">
    <h3>購物車</h3>
    <div class="User__shop-content">
      <div v-if="menuStore.menuSelect.length !== 0">
        <div
          class="d-flex mt-3 mb-3 position-relative"
          v-for="m in menuStore.menuSelect"
          :key="`${m.menuId}-${m.childId}`"
        >
          <img :src="menuStore.getImageUrl(m.detail.image)" alt="" />
          <div
            class="d-flex flex-column justify-content-center gap-3 ms-3 flex-grow-1"
          >
            <h4>{{ m.detail.name }}</h4>
            <p>${{ m.price }}</p>
            <div v-if="m.option" class="d-flex gap-2">
              <div v-for="o in findSelectOption(m.option)" :key="o.id">
                <p class="User__shop-option">
                  {{ o.name }}
                </p>
              </div>
            </div>
            <div class="menu__image">
              <transition name="opacity">
                <div class="menu__btn-content">
                  <button
                    class="menu__btn-trash"
                    @click.stop="
                      menuStore.removeMenuSelect(m.menuId, m.childId)
                    "
                  >
                    <SvgIcon
                      icon-name="Common-Trash"
                      v-if="menuStore.getCount(m.menuId, m.childId) == 1"
                    ></SvgIcon>
                    <SvgIcon
                      icon-name="Common-Minus"
                      v-if="menuStore.getCount(m.menuId, m.childId) > 1"
                    ></SvgIcon>
                  </button>
                  <div>
                    <p>{{ m.count }}</p>
                  </div>
                  <button
                    class="menu__btn-add"
                    @click="menuStore.addMenuSelect(m.menuId, m.detail)"
                  >
                    <SvgIcon icon-name="Common-Add"></SvgIcon>
                  </button>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="User__shop-clear">
        <SvgIcon
          class="User__shop-icon"
          icon-name="Common-Shopping-Clear"
        ></SvgIcon>
        <p>購物車目前暫無商品</p>
      </div>
    </div>
    <div class="d-flex justify-content-between mb-2">
      <h5>小計</h5>
      <h5>${{ calculateTotal() }}</h5>
    </div>
    <div class="d-flex justify-content-between">
      <h5>服務費</h5>
      <h5>${{ Math.ceil(calculateTotal() * 0.1) }}</h5>
    </div>
    <hr />
    <div class="d-flex align-items-center">
      <button class="User__shop-btn" @click="checkOrder()">查看訂單</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/css/mixin" as *;
.menu__image {
  overflow: visible;
}
.menu__btn-content {
  border: solid 0.1rem var(--cafe-color-brown);
  border-radius: 2rem;
}
</style>
