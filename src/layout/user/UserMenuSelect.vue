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

// 使用 localSelect 存儲選擇的菜單
const localSelect = reactive([...props.menuSelect]);

//監聽 menuSelect 變化 如父層有變化，子層也會變化
watch(
  () => props.menuSelect,
  (newVal) => {
    localSelect = [...newVal];
  }
);

//找到相對應 MenuSelect 的菜單品項
const findMenuItem = (menuId, childId) => {
  return localSelect.find(
    (item) => item.menuId === menuId && item.childId === childId
  );
};

//目前用來保存選中的菜品
const selectedMenu = ref(null);
//控管菜單的開關
const show = ref(false);

//打開每個菜單明細
const toggleMenu = (menuId, childId) => {
  selectedMenu.value = props.menu
    .find((m) => m.id === menuId)
    ?.children.find((c) => c.id === childId);
  show.value = true;
};

const closeShow = (val) => {
  show.value = val;
};
//新增、添加 MenuSelect 的菜單品項及數量
const addMenuSelect = (menuId, childId, maxCount) => {
  const existingMenu = findMenuItem(menuId, childId);
  if (existingMenu) {
    // 增加數量

    if (existingMenu.count < maxCount) existingMenu.count++;
  } else {
    // 新增一個新項目
    const newItem = { menuId, childId, count: 1 };
    localSelect.push(newItem);
  }

  // 通知父層更新
  emit("menuSelect", localSelect);
};

//減少、刪除 MenuSelect 的菜單品項及數量
const removeMenuSelect = (menuId, childId) => {
  const existingMenu = findMenuItem(menuId, childId);
  if (existingMenu) {
    // 減少數量
    if (existingMenu.count > 1) {
      existingMenu.count--;
    } else {
      // 找到該項目的索引，並刪除它
      const index = localSelect.indexOf(existingMenu);
      if (index !== -1) {
        localSelect.splice(index, 1);
      }
    }
  }
  emit("menuSelect", localSelect);
};

// 獲取菜單品項的數量
const getCount = (menuId, childId) => {
  const existingMenu = findMenuItem(menuId, childId);
  return existingMenu ? existingMenu.count : 0;
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
    <template #main>
      <img class="Popup__img" :src="getImageUrl(selectedMenu.image)" alt="" />
      <div>
        <h2></h2>
      </div>
    </template>
  </UserPopup>
</template>

<style lang="scss" scoped>
@import "@/assets/css/mixin";

.Popup__img {
  height: 205px;
  width: 100%;
  object-fit: cover;
}
@media (min-width: 768px) {
  .Popup__img {
    height: 317px;
  }
}
</style>
