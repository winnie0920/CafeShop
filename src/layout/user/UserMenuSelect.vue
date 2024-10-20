<script setup>
const props = defineProps({
  menu: {
    type: Array, // 假設 menu 是一個數組
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

const addMenuSelect = (menuId, childId) => {
  const existingMenu = localSelect.find(
    (item) => item.menuId === menuId && item.childId === childId
  );

  if (existingMenu) {
    // 增加數量
    existingMenu.amount++;
  } else {
    // 新增一個新項目
    const newItem = { menuId, childId, amount: 1 };
    localSelect.push(newItem);
    console.log(existingMenu);
  }

  // 通知父層更新
  emit("menuSelect", localSelect);
};

// 獲取該項目的數量
const getAmount = (menuId, childId) => {
  const existingMenu = localSelect.find(
    (item) => item.menuId === menuId && item.childId === childId
  );

  return existingMenu ? existingMenu.amount : 0;
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
        <li v-for="c in m.children" :key="c.id">
          <div>
            <h3>{{ c.name }}</h3>
            <p>{{ c.dollar }}</p>
            <span v-if="c.remark">{{ c.remark.join(", ") }}</span>
          </div>
          <div>
            <img :src="getImageUrl(c.image)" alt="" />
            <div class="menu__btn">
              <transition name="fade">
                <div class="menu__btn-content" v-if="getAmount(m.id, c.id) > 0">
                  <button class="menu__btn-trash">
                    <SvgIcon icon-name="Common-Trash"></SvgIcon>
                  </button>
                  <button class="menu__btn-num">
                    <p>{{ getAmount(m.id, c.id) }}</p>
                    <!-- 顯示數量 -->
                  </button>
                  <button class="menu__btn-add">
                    <SvgIcon
                      icon-name="Common-Add"
                      @click="addMenuSelect(m.id, c.id)"
                    ></SvgIcon>
                  </button>
                </div>
              </transition>
            </div>
            <span class="menu__btn-circle">
              <button class="menu__btn-add">
                <SvgIcon
                  icon-name="Common-Add"
                  @click="addMenuSelect(m.id, c.id)"
                ></SvgIcon>
              </button>
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/css/mixin";
</style>
