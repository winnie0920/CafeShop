<script setup>
const props = defineProps({
  data: Object,
});
const emit = defineEmits(["deleteData"]);

const showStore = useShowStore();
const alertStore = useAlertStore();
const detailData = ref(null);
const route = useRoute();

const popupMeal = (c, d) => {
  detailData.value = { name: d.name, id: d.id, children: c };
  router.push({
    name: "AdminMealDetail",
    query: { parent: d.id, id: c.id },
  });
};

// 刪除分類的資料
const params = ref(null);

const alertTrash = (d) => {
  showStore.togglePopupShow("check", true);
  params.value = d;
};

const confirmPopup = () => {
  showStore.togglePopupShow("check", false);
  alertStore.pushMsg("Common-Ok", "成功刪除", "brown");
  nextTick(() => {
    emit("deleteData", params.value);
  });
};

const closeShow = (val) => {
  showStore.togglePopupShow("check", val);
};
</script>

<template>
  <div v-if="$route.path !== '/admin/meal/detail'">
    <div
      v-for="d in Array.isArray(props.data) ? props.data : [props.data]"
      :key="d.id"
    >
      <h4 class="admin__title">{{ d.name }}</h4>

      <div class="admin__container">
        <div v-for="c in d.children || []" :key="c.id" class="admin__card">
          <img :src="c.imageUrl" alt="mealImage" />

          <div class="d-flex justify-content-between text-center">
            <h5>{{ c.name }}</h5>
            <h6>$ {{ c.price }}</h6>
          </div>

          <div class="d-flex justify-content-end gap-2 position-relative">
            <div class="admin__start">
              <p class="hover-text">已啟用</p>
              <SvgIcon iconName="Common-Ok" />
            </div>

            <ConfirmBtn
              :styles="['brown', 'circle']"
              iconName="Common-Pencil"
              @click="popupMeal(c, d)"
            />

            <ConfirmBtn
              :styles="['gray', 'circle']"
              iconName="Common-Trash"
              @click="alertTrash(c)"
            />
          </div>
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
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  }
  &__card {
    display: grid;
    h5 {
      @extend %text-ellipsis;
      width: 80%;
      text-align: left;
    }
    img {
      @include border(transparent, 0);
      @include size(100%, 10rem);
      object-fit: cover;
    }
  }
}
</style>
