<script setup>
const props = defineProps({
  data: Object,
});
const menuStore = userMenuStore();
const showStore = useShowStore();
const alertStore = useAlertStore();
const router = useRouter();
const route = useRoute();

const detailData = ref(null);

const popupMeal = (c, d) => {
  detailData.value = c;
  router.push({
    name: "AdminMealDetail",
    query: { parent: d.id, id: c.id },
  });
};

const alertTrash = (detail) => {
  showStore.togglePopupShow("check", true);
  nextTick(() => {
    props.data.forEach((d) => {
      d.children = d.children.filter((i) => i.name !== detail.name);
    });
  });
};

const confirmPopup = () => {
  showStore.togglePopupShow("check", false);
  alertStore.pushMsg("Common-Ok", "成功刪除", "brown");
};

const closeShow = (val) => {
  showStore.togglePopupShow("check", val);
};

//判斷路徑是否為餐點明細頁面
const isMealDetail = computed(() => route.path === "/admin/meal/detail");
</script>

<template>
  <div v-if="!isMealDetail">
    <div v-for="d in props.data" :key="d.id">
      <h4 class="admin__title" v-if="d.children.length > 0">{{ d.name }}</h4>
      <div class="admin__container">
        <div v-for="c in d.children" :key="c.index" class="admin__card">
          <img :src="menuStore.getImageUrl(c.image)" alt="mealImage" />
          <div class="d-flex justify-content-between text-center">
            <h5>{{ c.name }}</h5>
            <h6>$ {{ c.price }}</h6>
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
  <router-view v-if="isMealDetail" :data="detailData"></router-view>
</template>

<style scoped lang="scss">
@use "@/assets/css/mixin" as *;
h4 {
  color: var(--cafe-color-brown);
  margin-bottom: 1rem;
}
.admin {
  &__container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    gap: 2rem;
    padding-bottom: 2rem;
    overflow-y: auto;
    scrollbar-width: none;
  }
  &__card {
    @include border;
    @include style-color(var(--cafe-color-brown), var(--cafe-color-white));
    display: grid;
    gap: 1rem;
    padding: var(--cafe--padding-sm);
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
  &__start {
    @include border(transparent, 0);
    @include style-color;
    @include absolute-setting(auto, auto, 6.6rem, auto, none);
    @include flex-center(row, center, flex-end);
    padding: var(--cafe--padding-xxxs) 0.6rem;
    cursor: pointer;
    &:hover p {
      @include size(3.2rem, 100%);
      opacity: 1;
    }
    p {
      @include size(0, 100%);
      white-space: nowrap;
      opacity: 0;
      transition: width 0.4s ease-out, opacity 0.2s ease-out;
    }
    svg {
      @include size(1.5rem, 1.6rem);
    }
  }
}

.popup__text-content {
  display: flex;
  align-content: center;
}
</style>
