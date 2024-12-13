<script setup>
const props = defineProps({
  option: {
    type: Array,
    required: true,
  },
});
const router = useRouter();
const menuStore = userMenuStore();
const imageStore = useImageStore();

// 將所有自定義選項中篩選出已選擇的選項
const findSelectOption = (selected) => {
  return props.option.reduce((result, o) => {
    // 將不是陣列的選項轉成陣列
    const selectedIds = Array.isArray(selected[o.type])
      ? selected[o.type]
      : [selected[o.type]];
    // 從所有自定義選項中篩選，並且回傳已選擇的選項物件
    result[o.type] = o.children.filter((child) =>
      selectedIds.includes(child.id)
    );
    return result;
  }, {});
};

onMounted(() => {
  console.log(menuStore.menuSelect);
  sessionStorage.removeItem("selectedOptions");
});
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
          <img :src="imageStore.getImageUrl(m.detail.image)" alt="shopImage" />
          <div
            class="d-flex flex-column justify-content-center gap-3 ms-3 flex-grow-1"
          >
            <h4>{{ m.detail.name }}</h4>
            <p>${{ m.price }}</p>
            <div v-if="m.option" class="d-flex gap-2">
              <div
                class="d-flex"
                v-for="(options, type) in findSelectOption(m.option)"
                :key="type"
              >
                <div v-for="(o, index) in options" :key="o.id">
                  <p class="User__shop-option">
                    {{ o.name
                    }}<span v-if="index < options.length - 1">、</span>
                  </p>
                </div>
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
      <h5>${{ menuStore.calculateTotal() }}</h5>
    </div>
    <div class="d-flex justify-content-between">
      <h5>服務費</h5>
      <h5>${{ Math.ceil(menuStore.calculateTotal() * 0.1) }}</h5>
    </div>
    <hr />
    <div class="d-flex align-items-center">
      <button
        class="User__shop-btn"
        :class="{ 'disabled-button': menuStore.menuSelect.length <= 0 }"
        @click="menuStore.checkOrder(router)"
      >
        查看訂單
      </button>
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
