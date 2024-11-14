<script setup>
const props = defineProps({
  option: {
    type: Array,
    required: true,
  },
});

const menuStore = userMenuStore();
const showStore = useShowStore();
const formStore = userFormStore();
const emit = defineEmits(["currentWatchChoose"]);

// 菜單內容名稱、價錢
const selectedMenu = ref(null);
// 菜單顯示的選項
const selectedOptions = ref([]);
// 菜單明細的占存全部內容
const occupy = ref({});

const closeShow = (val) => {
  showStore.togglePopupShow("menu", val);
};

//確認菜單明細
const confirmPopup = () => {
  occupy.value.option = { ...formStore.choice };
  occupy.value.detail = { ...selectedMenu.value };
  if (
    Array.isArray(selectedOptions.value) &&
    !formStore.validateOption(selectedOptions.value)
  ) {
    return;
  }
  //找到菜單裡面是否有相同的菜單選項
  let existingMenu = menuStore.findMenuItem(
    occupy.value.menuId,
    occupy.value.childId,
    occupy.value.option
  );
  occupy.value.price += menuStore.totalOptionPrice(
    selectedOptions.value,
    occupy.value.option
  );

  //如果這裡快速點擊，就做防抖防止
  menuStore.debounceAction(() => {
    if (!existingMenu) {
      menuStore.pushMenuSelect(occupy.value);
      existingMenu = occupy.value;
    } else if (existingMenu.count < selectedMenu.value.count) {
      existingMenu.count += occupy.value.count;
      existingMenu.price = existingMenu.count * occupy.value.price;
    }
    showStore.togglePopupShow("menu", false);
  }, 1000);
};

// 找到相對應的 MenuSelect 的菜單品項及客製化選項
const findMenu = (menuId, childId) => {
  selectedOptions.value = {};
  // 菜單內容名稱、價錢
  selectedMenu.value = menuStore.homeMenu
    .find((m) => m.id === menuId)
    ?.children.find((c) => c.id === childId);

  // 菜單顯示的選項
  if (selectedMenu.value.option && selectedMenu.value.option.length > 0) {
    selectedOptions.value = props.option.filter((o) =>
      selectedMenu.value.option.includes(o.type)
    );
  }
};

// 點擊外框，打開每個菜單明細
const toggleMenu = (menuId, childId, price) => {
  formStore.clearState();
  findMenu(menuId, childId);
  occupy.value = { menuId, childId, count: 1, price };
  showStore.togglePopupShow("menu", true);
};

// 點擊+號，添加 MenuSelect 數量及金額
const addMenuSelect = (menuId, c) => {
  findMenu(menuId, c.id);
  if (selectedOptions.value.length > 0) {
    toggleMenu(menuId, c.id, c.price);
  } else {
    menuStore.addMenuSelect(menuId, c);
  }
};

//監聽childInformation 是否有option
const checkoutOption = (m, c) => {
  return computed(() => {
    if (Array.isArray(menuStore.menuSelect)) {
      return menuStore.menuSelect.some((child) => {
        return (
          child.menuId === m &&
          child.childId === c &&
          child.option &&
          Object.keys(child.option).length > 0
        );
      });
    }
    return false;
  });
};

const increaseCount = () => {
  occupy.value.count += 1;
};

const decreaseCount = () => {
  if (occupy.value.count > 1) {
    occupy.value.count -= 1;
  }
};

//需監聽的整個高度
const scrollContainer = ref(null);

//監聽目前滾動位置
const watchChoose = () => {
  let selectId = null;
  let selectOffset = Infinity;

  menuStore.homeMenu.forEach((m) => {
    const target = document.getElementById(m.id);
    if (target) {
      const offsetTop = target.getBoundingClientRect().top;
      if (offsetTop >= 0 && offsetTop < selectOffset) {
        selectOffset = offsetTop;
        selectId = m.id;
      }
    }
  });
  emit("currentWatchChoose", selectId);
};

//點擊滾動到指定位置
const clickChoose = (id) => {
  const targetElement = document.getElementById(id);
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: "smooth" });
  }
};

//暴露給父層
defineExpose({ clickChoose });

onMounted(() => {
  scrollContainer.value?.addEventListener("scroll", watchChoose);
});

onUnmounted(() => {
  scrollContainer.value?.addEventListener("scroll", watchChoose);
});
</script>

<template>
  <div ref="scrollContainer" class="menu__content">
    <div v-for="m in menuStore.homeMenu" :key="m.id">
      <h1 :id="m.id">{{ m.name }}</h1>
      <span>{{ m.content }}</span>
      <ul class="menu__background">
        <li
          v-for="c in m.children"
          :key="c.id"
          @click="toggleMenu(m.id, c.id, c.price)"
        >
          <div>
            <h3>{{ c.name }}</h3>
            <p>${{ c.price }}</p>
            <span v-if="c.description">{{ c.description }}</span>
          </div>
          <div class="menu__image">
            <img :src="menuStore.getImageUrl(c.image)" alt="" />
            <transition name="opacity">
              <div
                class="menu__btn"
                v-if="
                  menuStore.getCount(m.id, c.id) > 0 &&
                  !checkoutOption(m.id, c.id).value
                "
              >
                <div class="menu__btn-content">
                  <button
                    class="menu__btn-trash"
                    @click.stop="menuStore.removeMenuSelect(m.id, c.id)"
                  >
                    <SvgIcon
                      v-if="menuStore.getCount(m.id, c.id) == 1"
                      icon-name="Common-Trash"
                    ></SvgIcon>
                    <SvgIcon
                      v-if="menuStore.getCount(m.id, c.id) > 1"
                      icon-name="Common-Minus"
                    ></SvgIcon>
                  </button>
                  <div>
                    <p>{{ menuStore.getCount(m.id, c.id) }}</p>
                  </div>
                  <button class="menu__btn-add"></button>
                </div>
              </div>
            </transition>
            <span class="menu__btn-circle">
              <button class="menu__btn-add">
                <SvgIcon
                  v-if="!checkoutOption(m.id, c.id).value"
                  icon-name="Common-Add"
                  @click.stop="addMenuSelect(m.id, c)"
                ></SvgIcon>
                <p v-else>
                  {{ menuStore.getCount(m.id, c.id) }}
                </p>
              </button>
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>

  <UserPopup
    button="放入購物車"
    :show="showStore.popupShow.menu"
    @close-show="closeShow"
    @confirm-Popup="confirmPopup"
    :style="{ width: '60rem', height: '80vh' }"
    :isFull="true"
  >
    <template #main>
      <img
        class="popup__img"
        :src="menuStore.getImageUrl(selectedMenu.image)"
      />
      <div class="popup__text-content">
        <h3>{{ selectedMenu.name }}</h3>
        <p>${{ selectedMenu.price }}</p>
        <span>{{ selectedMenu.description }}</span>
        <hr />
      </div>
      <CheckInput :option="selectedOptions" type="select" />
    </template>
    <template #footer>
      <div class="d-flex gap-4 align-items-center">
        <button
          @click="decreaseCount()"
          :class="{ 'disabled-button': occupy.count <= 1 }"
        >
          <SvgIcon class="popup__minus" icon-name="Common-Minus"></SvgIcon>
        </button>
        <p class="">{{ occupy.count }}</p>
        <button @click="increaseCount()">
          <SvgIcon icon-name="Common-Add"></SvgIcon>
        </button>
      </div>
    </template>
  </UserPopup>
</template>

<style lang="scss" scoped>
@use "@/assets/css/mixin" as *;
.disabled-button {
  cursor: not-allowed;
  &:hover {
    background-color: inherit;
  }
  svg {
    background-color: var(--cafe-color-gray);
    &:hover {
      color: inherit;
    }
  }
}
.popup__text-content {
  h3 {
    margin-top: var(--cafe--padding-lg);
  }
}
</style>
