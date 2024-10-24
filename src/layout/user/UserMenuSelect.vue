<script setup>
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

//監聽 menuSelect 變化 如父層有變化，子層也會變化
watch(
  () => props.menuSelect,
  (newVal) => {
    childInformation = [...newVal];
  }
);

//保存打開菜單內容名稱、價錢
const selectedMenu = ref(null);
// 保存打開菜單顯示的選項
const selectedOptions = ref([]);
//控管菜單的開關
const show = ref(false);

//打開每個菜單明細
const toggleMenu = (menuId, childId) => {
  const menu = props.menu.find((m) => m.id === menuId);
  selectedMenu.value = menu?.children.find((c) => c.id === childId);

  // 根據 selectedMenu 的選項來過濾
  selectedOptions.value = selectedMenu.value?.option?.length
    ? menu.options.filter((option) =>
        selectedMenu.value.option.includes(option.id)
      )
    : menu.options;

  show.value = true;
};

const closeShow = (val) => {
  show.value = val;
};

//找到相對應 MenuSelect 的菜單品項
const findMenuItem = (menuId, childId) => {
  return childInformation.find(
    (item) => item.menuId === menuId && item.childId === childId
  );
};

const makeMenuItem = (menuId, childId) => {
  let existed = findMenuItem(menuId, childId);
  if (!existed) {
    childInformation.push({ menuId, childId, count: 0 });
    existed = findMenuItem(menuId, childId);
  }
  return existed;
};

//新增、添加 MenuSelect 的菜單品項及數量
const addMenuSelect = (menuId, childId, maxCount) => {
  const existingMenu = makeMenuItem(menuId, childId);
  if (existingMenu.count < maxCount) existingMenu.count++;

  emit("menuSelect", childInformation);
};

//減少、刪除 MenuSelect 的菜單品項及數量
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

// 用來存儲每組的選中選項
const selectedOption = reactive([]);

// 處理單選邏輯 (radio)
const RadioChange = (groupId, childId) => {
  // 單選情況下只能選擇一個
  selectedOption[groupId] = childId;
};

// 處理多選邏輯 (checkbox)
const CheckboxChange = (groupId, childId) => {
  if (!Array.isArray(selectedOption[groupId])) {
    selectedOption[groupId] = [];
  }
  const index = selectedOption[groupId].indexOf(childId);

  if (index > -1) {
    // 如果已經選中，則取消選中
    selectedOption[groupId].splice(index, 1);
  } else {
    // 如果未選中，則添加到選項中
    selectedOption[groupId].push(childId);
  }
};
//圖片路徑
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
        <li v-for="c in m.children" :key="c.id" @click="toggleMenu(m.id, c.id)">
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
                  @click.stop="addMenuSelect(m.id, c.id, c.count)"
                ></SvgIcon>
              </button>
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>

  <UserPopup :show="show" @close-show="closeShow">
    <template #main="{ title }">
      <img
        :class="['popup__img', { 'popup__img-rounded': !title }]"
        :src="getImageUrl(selectedMenu.image)"
      />
      <div class="popup__text-content">
        <h3>{{ selectedMenu.name }}</h3>
        <span>{{ selectedMenu.description }}</span>
        <p>${{ selectedMenu.count }}</p>
        <hr />
      </div>
      <div v-if="selectedOptions">
        <ul v-for="o in selectedOptions" :key="o.id">
          <h3>{{ o.type }}</h3>
          <li v-for="c in o.children" :key="c.id">
            <label>
              <input
                v-if="o.isSingleChoice"
                type="radio"
                :value="c.id"
                v-model="selectedOption[o.id]"
              />
              <input
                v-else
                type="checkbox"
                :id="c.id"
                :value="c.id"
                v-model="selectedOption"
              />
              {{ c }}
            </label>
          </li>
          {{
            selectedOption
          }}
        </ul>
      </div>
    </template>
  </UserPopup>
</template>

<style lang="scss" scoped>
@import "@/assets/css/mixin";
</style>
