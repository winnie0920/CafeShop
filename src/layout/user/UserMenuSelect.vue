<script setup>
import { option } from "@/json/UserHome";
const useStore = userStore();
const userSelected = userSelectedStore();
const props = defineProps({
  menu: {
    type: Array,
    required: true,
  },
  menuSelect: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["menuSelect", "currentWatchChoose"]);

// 使用 childInformation 存儲選擇的菜單
let childInformation = reactive([...props.menuSelect]);

// 保存打開菜單內容名稱、價錢
const selectedMenu = ref(null);

// 保存打開菜單顯示的選項
const selectedOptions = ref([]);

// 用來存儲菜單明細的暫存選項
const occupy = ref({});

const closeShow = (val) => {
  useStore.togglePopupShow("menu", val);
};

// 監聽 menuSelect 變化 如父層有變化，子層也會變化
watch(
  () => props.menuSelect,
  (newVal) => {
    childInformation = [...newVal];
  }
);

//確認菜單明細
const confirmPopup = () => {
  occupy.value.option = { ...userSelected.choice };
  if (
    Array.isArray(selectedOptions.value) &&
    !userSelected.validateOption(selectedOptions.value)
  ) {
    return;
  }
  let existingMenu = makeMenuItem(
    occupy.value.menuId,
    occupy.value.childId,
    occupy.value.option
  );

  if (existingMenu.count < selectedMenu.value.count) {
    existingMenu.count++;
    existingMenu.price = existingMenu.count * occupy.value.price;
  }
  console.log(childInformation);

  emit("menuSelect", childInformation);
  useStore.togglePopupShow("menu", false);
};

// 找到相對應的 MenuSelect 的菜單品項及客製化選項
const findMenu = (menuId, childId) => {
  selectedOptions.value = {};
  // 菜單內容名稱、價錢
  selectedMenu.value = props.menu
    .find((m) => m.id === menuId)
    ?.children.find((c) => c.id === childId);

  // 菜單顯示的選項
  if (selectedMenu.value.option && selectedMenu.value.option.length > 0) {
    selectedOptions.value = option.filter((o) =>
      selectedMenu.value.option.includes(o.type)
    );
  }
};

// 點擊外框，打開每個菜單明細
const toggleMenu = (menuId, childId, price) => {
  userSelected.clearChoice();
  findMenu(menuId, childId);
  occupy.value = { menuId, childId, count: 0, price };
  useStore.togglePopupShow("menu", true);
};

// 點擊+號，添加 MenuSelect 數量及金額
const addMenuSelect = (menuId, c) => {
  findMenu(menuId, c.id);
  if (selectedOptions.value.length > 0) {
    toggleMenu(menuId, c.id, c.price);
  } else {
    const existingMenu = makeMenuItem(menuId, c.id, c.option);
    console.log(existingMenu);

    if (existingMenu.count < c.count) existingMenu.count++;
    existingMenu.price = existingMenu.count * c.price;
  }
  emit("menuSelect", childInformation);
};

// 點擊+號或送出，新增菜單品項
const makeMenuItem = (menuId, childId, option) => {
  let existed = findMenuItem(menuId, childId, option);
  if (!existed && !option) {
    childInformation.push({ menuId, childId, count: 0, price: 0 });
    existed = findMenuItem(menuId, childId);
  }
  if (!existed && option) {
    childInformation.push(occupy.value);
    existed = findMenuItem(menuId, childId, option);
  }
  return existed;
};

// 找到相對應 MenuSelect 的菜單品項
const findMenuItem = (menuId, childId, option) => {
  if (option) {
    return childInformation.find((item) => {
      const hasSameKeys =
        item.option &&
        Object.keys(item.option).length === Object.keys(option).length;

      return (
        item.menuId === menuId &&
        item.childId === childId &&
        hasSameKeys &&
        Object.keys(option).every((key) => item.option[key] === option[key])
      );
    });
  }
  return childInformation.find(
    (item) => item.menuId === menuId && item.childId === childId
  );
};

// 點擊減少、刪除 MenuSelect 的菜單品項及數量
const removeMenuSelect = (menuId, childId) => {
  const existingMenu = findMenuItem(menuId, childId);
  // 減少數量
  existingMenu.count > 1
    ? existingMenu.count--
    : childInformation.splice(childInformation.indexOf(existingMenu), 1);
  emit("menuSelect", childInformation);
};

// 獲取菜單品項的數量
const getCount = (menuId, childId) => {
  const existingMenu = findMenuItem(menuId, childId);

  const totalCount = childInformation
    .filter((item) => item.menuId === menuId && item.childId === childId)
    .reduce((sum, item) => sum + item.count, 0);
  return existingMenu ? totalCount : 0;
};

//監聽childInformation 是否有option
const checkoutOption = (m, c) => {
  return computed(() => {
    if (Array.isArray(childInformation)) {
      return childInformation.some((child) => {
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

//需監聽的整個高度
const scrollContainer = ref(null);

//監聽目前滾動位置
const watchChoose = () => {
  let selectId = null;
  let selectOffset = Infinity;

  props.menu.forEach((m) => {
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
    <div v-for="m in props.menu" :key="m.id">
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
          <div>
            <img :src="useStore.getImageUrl(c.image)" alt="" />
            <transition name="opacity">
              <div
                class="menu__btn"
                v-if="
                  getCount(m.id, c.id) > 0 && !checkoutOption(m.id, c.id).value
                "
              >
                <div class="menu__btn-content">
                  <button
                    class="menu__btn-trash"
                    @click.stop="removeMenuSelect(m.id, c.id)"
                  >
                    <SvgIcon
                      v-if="getCount(m.id, c.id) == 1"
                      icon-name="Common-Trash"
                    ></SvgIcon>
                    <SvgIcon
                      v-if="getCount(m.id, c.id) > 1"
                      icon-name="Common-Minus"
                    ></SvgIcon>
                  </button>
                  <div>
                    <p>{{ getCount(m.id, c.id) }}</p>
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
                  {{ getCount(m.id, c.id) }}
                </p>
              </button>
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>

  <UserPopup
    :show="useStore.popupShow.menu"
    @close-show="closeShow"
    @confirm-Popup="confirmPopup"
  >
    <template #main="{ title }">
      <img
        :class="['popup__img', { 'popup__img-rounded': !title }]"
        :src="useStore.getImageUrl(selectedMenu.image)"
      />
      <div class="popup__text-content">
        <h3>{{ selectedMenu.name }}</h3>
        <p>${{ selectedMenu.price }}</p>
        <span>{{ selectedMenu.description }}</span>
        <hr />
      </div>
      <div class="popup__text-option" v-if="selectedOptions">
        <ul v-for="o in selectedOptions" :key="o.id">
          <div>
            <h3>{{ o.name }}選擇</h3>
            <div
              :class="{
                'popup__message-error': userSelected.errorMessages[o.type],
              }"
            >
              必填
            </div>
          </div>
          <h5 v-if="o.isSingleChoice">請擇一選擇</h5>
          <h5 v-else>可多選擇</h5>
          <li v-for="c in o.children" :key="c.id">
            <input
              v-if="o.isSingleChoice"
              type="radio"
              :name="o.type"
              :id="`radio-${o.type}-${c.id}`"
              :value="c.id"
              @change="userSelected.singleOption(o.type, c.id)"
            />
            <label v-if="o.isSingleChoice" :for="`radio-${o.type}-${c.id}`">
              <span class="check__and-radio"></span>
              {{ c.name }}
            </label>
            <input
              v-else
              type="checkbox"
              :id="`checkbox-${o.type}-${c.id}`"
              :value="c.id"
              @change="userSelected.pluralOption(o.type, c.id)"
            />
            <label v-if="!o.isSingleChoice" :for="`checkbox-${o.type}-${c.id}`">
              <span class="check__and-mark"></span>
              {{ c.name }}
            </label>
            <p v-if="c.price">${{ c.price }}</p>
            <p v-else>免費</p>
          </li>
          <hr />
        </ul>
      </div>
    </template>
    <template #footer>
      <div class="d-flex gap-4">
        <button>
          <SvgIcon icon-name="Common-Add"></SvgIcon>
        </button>
        <h1>1</h1>
        <button>
          <SvgIcon class="popup__minus" icon-name="Common-Minus"></SvgIcon>
        </button>
      </div>
    </template>
  </UserPopup>
</template>

<style lang="scss" scoped>
@use "@/assets/css/mixin" as *;
</style>
