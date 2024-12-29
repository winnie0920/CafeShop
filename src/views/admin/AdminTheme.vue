<script setup>
import { homeItem as HomeItem } from "@/json/User";
const alertStore = useAlertStore();
const router = useRouter();
import { getCurrentInstance } from "vue";

// 手動觸發重新渲染
const instance = getCurrentInstance();

const refreshPage = () => {
  alertStore.pushMsg("Common-Ok", "同步分類完畢", "brown");
};

const deleteData = (detail) => {
  const index = HomeItem.findIndex((d) => d.name === detail.name);
  if (index !== -1) {
    HomeItem.splice(index, 1);
  }

  // 手動觸發重新渲染
  instance.proxy.$forceUpdate();
};
</script>

<template>
  <div class="User__container">
    <AdminTitleBar class="sticky-top" :dropdown="null" :data="HomeItem">
      <template #refresh>
        <div class="col-auto d-flex me-sm-auto me-none p-0">
          <ConfirmBtn
            v-if="$route.path !== `/admin/theme/detail`"
            title="同步分類"
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
          v-if="$route.path !== `/admin/theme/detail`"
        >
          <ConfirmBtn
            title="新增分類"
            iconName="User-Add"
            @click="router.push({ name: 'AdminThemeDetail' })"
          />
        </div>
      </template>
    </AdminTitleBar>
    <AdminThemeCard @deleteData="deleteData" :data="HomeItem" />
  </div>
</template>

<style scoped></style>
