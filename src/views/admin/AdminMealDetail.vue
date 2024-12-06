<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: false,
  },
});
const router = useRouter();
const route = useRoute();

// 當頁面加載時，data 是 null 檢查 URL
// const isValidParams = () => {
//   const parent = route.query.parent;
//   const id = route.query.id;
//   if (parent && id && !props.data) {
//     router.go(-1);
//   }
// };
onMounted(() => {
  //isValidParams();
});
</script>

<template>
  <div class="form__container">
    <form method="post" enctype="multipart/form-data">
      <div class="form__UploadImg">
        <AdminUploadImg :image="props.data?.image" />
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/css/mixin" as *;
.form {
  &__container {
    @include style-color(var(--cafe-color-brown), var(--cafe-color-white));
    @include border(transparent);
    padding: var(--cafe--padding-sm);
    display: grid;
    column-gap: 4rem;
    grid-template-rows: 25rem max-content;
    grid-template-columns: 5fr 5fr;
  }
  &__UploadImg {
    @include size(100%, 100%);
  }
}
</style>
