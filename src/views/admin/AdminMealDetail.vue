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
  <div>
    <div class="form__container">
      <form method="post" enctype="multipart/form-data">
        <div class="form__UploadImg">
          <AdminUploadImg :image="props.data?.image" />
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/css/mixin" as *;
</style>
