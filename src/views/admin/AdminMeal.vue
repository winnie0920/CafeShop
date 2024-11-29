<script setup>
import { homeMenu } from "@/json/User";
const alertStore = useAlertStore();

const dropdown = ref({
  title: "餐點分類",
  drop: "meal",
  width: "10rem",
});

const refreshPage = () => {
  alertStore.pushMsg("Common-Ok", "同步餐點完畢", "brown");
};

const addMeal = () => {};
</script>

<template>
  <div class="User__container">
    <AdminTitleBar class="sticky-top" :dropdown="dropdown" :data="homeMenu">
      <template #refresh>
        <div class="col-auto d-flex me-sm-auto me-none p-0">
          <ConfirmBtn
            title="同步餐點"
            iconName="Meal-Refresh"
            @click="refreshPage"
          />
        </div>
      </template>
      <template #add>
        <div class="col-auto d-flex p-0">
          <ConfirmBtn title="新增餐點" iconName="User-Add" @click="addMeal" />
        </div>
      </template>
    </AdminTitleBar>

    <AdminMealCard :data="homeMenu" />
  </div>
</template>

<style scoped lang="scss"></style>
