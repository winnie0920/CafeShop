<script setup>
import { homeMenu } from "@/json/User";
const alertStore = useAlertStore();
const router = useRouter();

const dropdown = ref({
  title: "餐點分類",
  drop: "meal",
  width: "10rem",
});

//同步更新資料
const refreshPage = () => {
  alertStore.pushMsg("Common-Ok", "同步餐點完畢", "brown");
};

const deleteData = (detail) => {
  homeMenu.forEach((h) => {
    h.children = h.children.filter((c) => c.name !== detail.name);
  });
};
</script>

<template>
  <div class="User__container">
    <!-- 導航欄 -->
    <AdminTitleBar
      class="sticky-top"
      :dropdown="$route.path !== '/admin/meal/detail' ? dropdown : null"
      :data="homeMenu"
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
    <AdminMealCard :data="homeMenu" @deleteData="deleteData" />
  </div>
</template>

<style scoped lang="scss"></style>
