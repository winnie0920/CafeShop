<script setup>
import { homeMenu } from "@/json/User";
const alertStore = useAlertStore();
const router = useRouter();
const route = useRoute();

const dropdown = ref({
  title: "餐點分類",
  drop: "meal",
  width: "10rem",
});

//同步更新資料
const refreshPage = () => {
  alertStore.pushMsg("Common-Ok", "同步餐點完畢", "brown");
};

const returnPage = () => {
  router.go(-1);
};

//判斷路徑是否為餐點明細頁面
const isMealDetail = computed(() => route.path !== "/admin/meal/detail");

const addMeal = () => {
  router.push({ name: "AdminMealDetail" });
};
</script>

<template>
  <div class="User__container">
    <AdminTitleBar
      class="sticky-top"
      :dropdown="isMealDetail ? dropdown : null"
      :data="homeMenu"
    >
      <template #refresh>
        <div class="col-auto d-flex me-sm-auto me-none p-0">
          <ConfirmBtn
            v-if="isMealDetail"
            title="同步餐點"
            iconName="Meal-Refresh"
            @click="refreshPage"
          />
          <ConfirmBtn
            v-else
            title="返回"
            iconName="User-Return"
            @click="returnPage"
          />
        </div>
      </template>
      <template #add>
        <div class="col-auto d-flex p-0" v-if="isMealDetail">
          <ConfirmBtn title="新增餐點" iconName="User-Add" @click="addMeal" />
        </div>
      </template>
    </AdminTitleBar>
    <AdminMealCard :data="homeMenu" />
  </div>
</template>

<style scoped lang="scss"></style>
