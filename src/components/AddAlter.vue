<script setup>
import { customOption } from "@/json/User";
const formStore = userFormStore();
const showStore = useShowStore();

const sendOrder = () => {
  showStore.togglePopupShow("option", true);
};

const closeShow = () => {
  showStore.togglePopupShow("option", false);
};

const confirmPopup = () => {
  showStore.togglePopupShow("option", false);
};

const removeOption = () => {};
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
        @click="sendOrder()"
      />
    </div>
    <div class="form__text-tag mb-3" @click="sendOrder">
      <div class="content">
        <div @click.stop>
          <span>餐點</span>
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
    @confirm-Popup="confirmPopup"
    :style="{ width: '30rem', height: '30rem' }"
  >
    <template #main>
      <div class="popup__text-content">
        <CheckInput
          :style="{ padding: '0' }"
          :option="customOption"
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
