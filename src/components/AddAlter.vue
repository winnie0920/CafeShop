<script setup>
const formStore = userFormStore();
const showStore = useShowStore();

const sendOrder = () => {};

const closeShow = () => {};

const confirmPopup = () => {};
</script>

<template>
  <div class="form__text-grid">
    <div class="d-flex justify-content-between align-items-center mb-2">
      <label for="alter" class="form__text-label">新增自訂項目</label>
      <ConfirmBtn
        :styles="['brown', 'small-button']"
        class="ms-auto"
        title="添加自訂項目"
        @click="sendOrder()"
      />
    </div>
    <div class="position-relative">
      <input
        type="input"
        id="alter"
        :placeholder="`請選擇自訂項目`"
        v-model="formStore.choice.alter"
        readonly
      />
      <div class="form__text-options">
        <div class="selected-option">
          <span>餐點</span>
          <button class="remove-btn">X</button>
        </div>
      </div>
    </div>
  </div>

  <UserPopup
    :show="showStore.popupShow.check"
    title="添加自訂項目"
    button="確認"
    @close-show="closeShow"
    @confirm-Popup="confirmPopup"
    :style="{ width: '30rem', height: '15rem' }"
  >
    <template #main>
      <div class="popup__text-content">
        <p>是否確定送出？</p>
      </div>
    </template>
  </UserPopup>
</template>

<style scoped lang="scss">
@use "@/assets/css/mixin" as *;

.form__text {
  &-options {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(10%, -50%);
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    padding: 5px;
    pointer-events: none;
    z-index: 1;
  }
}
</style>
