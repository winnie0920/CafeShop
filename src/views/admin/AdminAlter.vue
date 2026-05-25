<script setup>
import { homeMenu } from "@/json/User";
const alertStore = useAlertStore();
const router = useRouter();
const dropdown = ref({
  title: "餐點分類",
  drop: "meal",
  width: "10rem",
});

const queryParams = reactive({ search: "" });

// 切換排序方式
const sortData = ref({
  sort: "id",
  direction: "DESC",
});

// 切換排序
const changeSort = (data) => {
  sortData.value = { ...sortData.value, ...data };
};

//同步更新資料
const refreshPage = () => {
  alertStore.pushMsg("Common-Ok", "同步餐點完畢", "brown");
};

// 更新搜尋
const sendSearch = (val) => (queryParams.search = val);
</script>

<template>
  <div class="User__container">
    <!-- 導航欄 -->
    <AdminTitleBar class="sticky-top">
      <template #refresh>
        <div
          class="col-auto d-flex me-sm-auto"
          v-if="$route.path !== `/admin/alter`"
        >
          <ConfirmBtn
            title="返回"
            iconName="User-Return"
            @click="router.go(-1)"
          />
        </div>
        <div
          class="col-12 col-lg-6 d-flex me-auto"
          v-if="$route.path == `/admin/alter`"
        >
          <SearchBar :value="queryParams.search" @send-search="sendSearch" />
        </div>
      </template>

      <template #add>
        <div
          class="col-auto d-flex gap-3"
          v-if="$route.path !== `/admin/alter/detail`"
        >
          <ConfirmBtn
            title="同步自訂項目"
            iconName="Meal-Refresh"
            @click="refreshPage"
          />
          <ConfirmBtn
            title="新增自訂項目"
            iconName="User-Add"
            @click="router.push({ name: 'AdminAlterDetail' })"
          />
        </div>
      </template>
    </AdminTitleBar>
    <!-- 表格 -->
    <article class="alter__container">
      <UserTable :sortData="sortData" @send-sort="changeSort" />
    </article>
  </div>
</template>

<style scoped lang="scss">
.alter__container {
  width: 100%;
  padding: 1.5rem 0 4rem;
  overflow: hidden;
}
</style>
