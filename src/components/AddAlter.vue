<script setup>
const props = defineProps({
  allOption: {
    type: Object,
    required: false,
  },
});
const formStore = userFormStore();
const showStore = useShowStore();

// 開啟自訂項目彈窗
const addAlter = () => {
  showStore.togglePopupShow("option", true);
};

// 關閉自訂項目彈窗
const closeShow = () => {
  showStore.togglePopupShow("option", false);
};

// 刪除自訂項目
const removeOption = () => {};

// 檢驗自訂項目與預設自訂項目是否相同
const choiceAlter = () => {
  if (!formStore.choice.option) return false;
  return props.allOption[0].children.filter((i) => {
    return formStore.choice.option.includes(i.id);
  });
};
</script>

<template>
  <div class="form__text-grid">
    <div class="d-flex justify-content-between align-items-center mb-2">
      <label for="alter" class="form__text-label">新增自訂項目</label>
      <ConfirmBtn
        :styles="['brown', 'small-button']"
        class="ms-auto"
        iconName="Common-Add"
        title="添加自訂項目"
        @click="addAlter"
      />
    </div>
    <div class="form__text-tag mb-3" @click="addAlter">
      <div class="content" v-if="choiceAlter()">
        <div @click.stop v-for="c in choiceAlter()" :key="c.id">
          <span>{{ c.name }}</span>
          <button class="remove-btn" @click="removeOption('food')">X</button>
        </div>
      </div>
    </div>
  </div>

  <UserPopup
    :show="showStore.popupShow.option"
    title="添加自訂項目"
    button="確認"
    @close-show="closeShow"
    @confirm-Popup="closeShow"
    :style="{ width: '30rem', height: '30rem' }"
  >
    <template #main>
      <div class="popup__text-content">
        <CheckInput
          :style="{ padding: '0' }"
          :option="allOption"
          :basic="{
            type: 'select',
            noValid: 'true',
          }"
        />
      </div>
    </template>
  </UserPopup>
</template>

<style scoped lang="scss">
@use "@/assets/css/mixin" as *;
input {
  min-height: 2rem;
  height: auto;
}
</style>
