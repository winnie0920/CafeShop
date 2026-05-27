<script setup>
const alertStore = useAlertStore();
const menuStore = userMenuStore();
const showStore = useShowStore();
const router = useRouter();
import { apiDeleteMeal } from "@/api/menu";
import { apiDelImg } from "@/api/image";
import { PER_AUTH } from "@/utils/constants.js";

const dropdown = ref({
  title: "餐點分類",
  drop: "meal",
  width: "10rem",
});

//同步更新資料
const refreshPage = () => {
  alertStore.pushMsg("Common-Ok", "同步餐點完畢", "brown");
};

const deleteData = async (detail) => {
  try {
    if (detail.imageUrl) {
      await apiDelImg(PER_AUTH, detail.imageUrl);
    }
    await apiDeleteMeal({ id: detail.id });
    menuStore.initTheme();
  } catch (e) {
    console.error("ERR! handlePopup", e);
  }
};

onMounted(() => {
  menuStore.initTheme();
  showStore.initThemeDropdown();
});

watch(
  () => showStore[dropdown.value.drop].id,
  async (newValue) => {
    await menuStore.initTheme({ id: showStore[dropdown.value.drop].id });
  },
);
</script>

<template>
  <div class="User__container">
    <!-- 導航欄 -->
    <AdminTitleBar
      class="sticky-top"
      :dropdown="$route.path !== '/admin/meal/detail' ? dropdown : null"
      :data="showStore.dropdownList"
    >
      <template #refresh>
        <div class="col-auto d-flex me-sm-auto me-none p-0">
          <ConfirmBtn
            v-if="$route.path !== `/admin/meal/detail`"
            title="同步餐點"
            iconName="Meal-Refresh"
            @click="refreshPage"
          />
          <ConfirmBtn
            v-else
            title="返回"
            iconName="User-Return"
            @click="router.go(-1)"
          />
        </div>
      </template>
      <template #add>
        <div
          class="col-auto d-flex p-0"
          v-if="$route.path !== `/admin/meal/detail`"
        >
          <ConfirmBtn
            title="新增餐點"
            iconName="User-Add"
            @click="router.push({ name: 'AdminMealDetail' })"
          />
        </div>
      </template>
    </AdminTitleBar>
    <!-- 卡片 -->
    <AdminMealCard @deleteData="deleteData" :data="menuStore.homeMenu" />
  </div>
</template>

<style scoped lang="scss"></style>
