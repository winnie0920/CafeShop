<script setup>
const props = defineProps({
  data: Object,
});
const emit = defineEmits(["deleteData"]);

const imageStore = useImageStore();
const showStore = useShowStore();
const alertStore = useAlertStore();
const detailData = ref(null);
const popupTheme = (d) => {
  detailData.value = { name: d.name, content: d.content, image: d.image };
  router.push({
    name: "AdminThemeDetail",
    query: { parent: d.id },
  });
};

// 刪除分類的資料
const params = ref(null);

// 刪除分類彈窗
const alertTrash = (d) => {
  showStore.togglePopupShow("check", true);
  params.value = d;
};

// 確認刪除分類
const confirmPopup = () => {
  showStore.togglePopupShow("check", false);
  alertStore.pushMsg("Common-Ok", "成功刪除", "brown");

  nextTick(() => {
    emit("deleteData", params.value);
  });
};

// 關閉分類彈窗
const closeShow = (val) => {
  showStore.togglePopupShow("check", val);
};
</script>

<template>
  <div v-if="$route.path !== `/admin/theme/detail`">
    <div class="admin__container">
      <div v-for="d in props.data" :key="d.id" class="admin__card">
        <div class="d-flex gap-4 overflow-hidden">
          <img :src="imageStore.getImageUrl(d.image)" alt="mealImage" />
          <div class="d-flex flex-column justify-content-evenly">
            <h4 class="admin__title">{{ d.name }}</h4>
            <h6>{{ d.content }}</h6>
          </div>
        </div>
        <div class="d-flex justify-content-end gap-2 position-relative">
          <div class="admin__start">
            <p class="hover-text">已啟用</p>
            <p v-if="false" class="hover-text">未啟用</p>
            <SvgIcon iconName="Common-Ok"></SvgIcon>
            <SvgIcon v-if="false" iconName="Common-No"></SvgIcon>
          </div>
          <ConfirmBtn
            :styles="['brown', 'circle']"
            iconName="Common-Pencil"
            @click="popupTheme(d)"
          />
          <ConfirmBtn
            :styles="['gray', 'circle']"
            iconName="Common-Trash"
            @click="alertTrash(d)"
          />
        </div>
      </div>
    </div>
  </div>
  <router-view v-else :data="detailData"></router-view>
  <UserPopup
    :show="showStore.popupShow.check"
    title="刪除餐點"
    button="確認"
    @close-show="closeShow"
    @confirm-Popup="confirmPopup"
    :style="{ width: '30rem', height: '15rem' }"
  >
    <template #main>
      <div class="popup__text-content">
        <p>是否確定刪除餐點？</p>
      </div>
    </template>
  </UserPopup>
</template>

<style scoped lang="scss">
@use "@/assets/css/mixin" as *;

.popup__text-content {
  display: flex;
  align-content: center;
}

.admin {
  &__container {
    grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  }
  &__title {
    margin: 0;
  }
  &__card {
    h6 {
      @extend %text-ellipsis;
    }
    img {
      @include border;
      @include size(5rem);
      object-fit: contain;
      padding: 0 var(--cafe--padding-xxxs);
    }
  }
}
</style>
