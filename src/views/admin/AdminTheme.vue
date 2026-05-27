<script setup>
const alertStore = useAlertStore();
const router = useRouter();
const menuStore = userMenuStore();
import { apiDeleteTheme } from "@/api/menu";
import { apiDelImg } from "@/api/image";
import { PER_AUTH } from "@/utils/constants.js";

const refreshPage = () => {
  alertStore.pushMsg("Common-Ok", "同步分類完畢", "brown");
};

const deleteData = async (detail) => {
  try {
    if (detail.imageUrl) {
      await apiDelImg(PER_AUTH, detail.imageUrl);
    }
    await apiDeleteTheme({ id: detail.id });
    menuStore.initTheme();
  } catch (e) {
    console.error("ERR! handlePopup", e);
  }
};

onMounted(() => {
  menuStore.initTheme();
});
</script>

<template>
  <div class="User__container">
    <AdminTitleBar class="sticky-top">
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
    <AdminThemeCard @deleteData="deleteData" :data="menuStore.homeMenu" />
  </div>
</template>

<style scoped></style>
