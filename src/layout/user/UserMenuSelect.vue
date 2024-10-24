<script setup>
import { option } from "@/json/UserHome";
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

const emit = defineEmits(["menuSelect"]);

// 使用 childInformation 存儲選擇的菜單
const childInformation = reactive([...props.menuSelect]);

// 監聽 menuSelect 變化 如父層有變化，子層也會變化
watch(
  () => props.menuSelect,
  (newVal) => {
    childInformation = [...newVal];
  }
);

// 保存打開菜單內容名稱、價錢
const selectedMenu = ref(null);

// 保存打開菜單顯示的選項
const selectedOptions = ref([]);

// 控管菜單明細的開關
const show = ref(false);

// 用來存儲菜單明細的暫存選項
const occupy = ref({});

const closeShow = (val) => {
  show.value = val;
};

const confirmPopup = () => {
  console.log(occupy.value);
};

// 找到相對應的 selectedMenu 的菜單品項及客製化選項
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
  findMenu(menuId, childId);
  occupy.value = { menuId, childId, count: 1, price };
  show.value = true;
};

// 點擊+號，添加 MenuSelect 數量及金額
const addMenuSelect = (menuId, c) => {
  findMenu(menuId, c.id);
  if (selectedOptions.value.length > 0) {
    toggleMenu(menuId, c.id, c.price);
  } else {
    const existingMenu = makeMenuItem(menuId, c.id);
    if (existingMenu.count < c.count) existingMenu.count++;
    existingMenu.price = existingMenu.count * c.price;
  }
  emit("menuSelect", childInformation);
};

// 點擊+號，新增菜單品項
const makeMenuItem = (menuId, childId) => {
  let existed = findMenuItem(menuId, childId);
  if (!existed) {
    childInformation.push({ menuId, childId, count: 0, price: 0 });
    existed = findMenuItem(menuId, childId);
    console.log(childInformation);
  }
  return existed;
};

// 找到相對應 MenuSelect 的菜單品項
const findMenuItem = (menuId, childId) => {
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
  return existingMenu ? existingMenu.count : 0;
};

// 用來更新單選的選項
const singleOption = (type, id) => {
  occupy.value[type] = id;
};

// 用來更新多選的選項
const pluralOption = (type, id) => {
  if (!occupy.value[type]) {
    occupy.value[type] = [];
  }
  const index = occupy.value[type].indexOf(id);
  if (index === -1) {
    occupy.value[type].push(id);
  } else {
    occupy.value[type].splice(index, 1);
  }
};

// 圖片路徑
const getImageUrl = (id) => {
  return new URL(`../../assets/image/${id}`, import.meta.url).href;
};
</script>

<template>
  <div class="menu__content">
    <div v-for="m in props.menu" :key="m.id">
      <h1>{{ m.name }}</h1>
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
            <img :src="getImageUrl(c.image)" alt="" />
            <transition name="opacity">
              <div class="menu__btn" v-if="getCount(m.id, c.id) > 0">
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
                  icon-name="Common-Add"
                  @click.stop="addMenuSelect(m.id, c)"
                ></SvgIcon>
              </button>
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>

  <UserPopup :show="show" @close-show="closeShow" @confirm-Popup="confirmPopup">
    <template #main="{ title }">
      <img
        :class="['popup__img', { 'popup__img-rounded': !title }]"
        :src="getImageUrl(selectedMenu.image)"
      />
      <div class="popup__text-content">
        <h3>{{ selectedMenu.name }}</h3>
        <span>{{ selectedMenu.description }}</span>
        <p>${{ selectedMenu.price }}</p>
        <hr />
      </div>
      <div v-if="selectedOptions">
        <ul v-for="o in selectedOptions" :key="o.id">
          <h3>{{ o.name }}</h3>
          <li v-for="c in o.children" :key="c.id">
            <label>
              <input
                v-if="o.isSingleChoice"
                type="radio"
                :name="o.type"
                :value="c.id"
                @change="singleOption(o.type, c.id)"
              />
              <input
                v-else
                type="checkbox"
                :id="c.id"
                :value="c.id"
                @change="pluralOption(o.type, c.id)"
              />
            </label>
            {{ c.name }}
          </li>
        </ul>
      </div>
    </template>
  </UserPopup>
</template>

<style lang="scss" scoped>
@import "@/assets/css/mixin";
</style>
