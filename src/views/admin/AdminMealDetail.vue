<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: false,
  },
});
import { homeMenu, homeItem } from "@/json/User";
import { choiceOption, customOption } from "@/json/Admin";
// 菜單顯示的選項
const selectedOptions = ref([...choiceOption]);
const showStore = useShowStore();
const formStore = userFormStore();
const route = useRoute();

// 當頁面加載時，data 是 null 檢查 URL
// const isValidParams = () => {
//   const parent = route.query.parent;
//   const id = route.query.id;
//   if (parent && id && !props.data) {
//     router.go(-1);
//   }
// };
const dropdown = ref({
  drop: "meal",
  active: true,
});

const getFormParam = () => ({
  name: "",
  price: "",
  description: "",
  count: 0,
  sale: 1,
  option: [],
});

//確認原本擁有的資料
const checkData = () => {
  if (route.query.id) {
    const matchedItem = homeItem.find((h) => h.name === props.data.name);
    showStore.meal = matchedItem;
    const { name, price, description, count, option } =
      props.data.children || getFormParam();
    Object.assign(formStore.choice, {
      name,
      price,
      description,
      count,
      sale: 1,
      option,
    });
  }
};

const confirmForm = () => {
  let formParams = {
    menuId: showStore.meal.id,
    ...formStore.choice,
  };
};

onMounted(() => {
  formStore.choice = getFormParam();
  checkData();
});
</script>

<template>
  <div class="form__frame gap-3">
    <div class="form__container">
      <form method="post" enctype="multipart/form-data">
        <div class="form__UploadImg">
          <AdminUploadImg :image="props.data?.children.image" />
        </div>
      </form>
      <div class="check__inputBox">
        <h6 class="form__text-label">餐點分類</h6>
        <DropDown
          v-if="dropdown !== null"
          v-model="showStore[dropdown.drop]"
          :data="homeItem"
          :dropdown="dropdown"
        />
        <CheckInput
          :regex="/^.+$/"
          :basic="{
            type: 'input',
            id: 'name',
            name: '名稱',
          }"
        />
        <CheckInput
          :regex="/^[0-9]+$/"
          :basic="{
            type: 'input',
            id: 'price',
            name: '價錢',
          }"
        />
        <CheckInput
          :regex="/^[0-9]+$/"
          :basic="{
            type: 'input',
            id: 'count',
            name: '數量',
          }"
        />
      </div>
    </div>
    <div class="form__container new__menu-content check__inputBox">
      <CheckInput
        :basic="{
          type: 'textarea',
          id: 'description',
          name: '說明',
        }"
      />
      <CheckInput
        :style="{ padding: '0', marginTop: '1rem' }"
        :option="selectedOptions"
        :basic="{
          type: 'select',
        }"
      />
      <AddAlter :allOption="customOption" />
    </div>
  </div>
  <div class="form__add-controller">
    <ConfirmBtn
      :styles="['brown']"
      class="ms-auto"
      title="確認"
      @click="confirmForm()"
    />
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/css/mixin" as *;

.check__inputBox {
  @include flex-center(column, inherit, space-evenly);
}
</style>
