<script setup>
const props = defineProps({
  data: Object,
  dropdown: {
    type: [Object, null],
    required: false,
  },
});
import cookie from "@/utils/cookies";
const showStore = useShowStore();
const alertStore = useAlertStore();
const router = useRouter();

//登出
const loginOut = () => {
  alertStore.pushMsg("Common-Ok", "登出成功", "brown");
  router.push({ name: "LoginView" });
  cookie.removeAllToken();
};
</script>

<template>
  <header class="row justify-content-end d-flex gap-3">
    <slot name="refresh" />
    <div class="col-auto d-flex p-0">
      <DropDown
        v-if="props.dropdown !== null"
        v-model="showStore[props.dropdown.drop]"
        :data="data"
        :dropdown="props.dropdown"
      />
    </div>
    <slot name="add" />
    <div class="col-auto d-flex p-0">
      <ConfirmBtn title="登出" iconName="User-Logout" @click="loginOut" />
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use "@/assets/css/mixin" as *;
header {
  @include style-color(transparent, var(--cafe-color-bisque));
  --bs-gutter-x: 0rem;
  padding: 3rem 0 1.5rem 0;
}

.logout {
  &__container {
    @include style-color(var(--cafe-color-brown), var(--cafe-color-white));
    @include border(var(--cafe-color-brown), 0.1rem);
    padding: var(--cafe--padding-xs);
  }
  &__btn {
    @include style-color(var(--cafe-color-brown), var(--cafe-color-white));
    gap: 0.5rem;
    svg {
      @include size(1.5rem);
      transition: all 0.2s ease-in-out;
      &:hover {
        color: var(--cafe-color-brown-lighter);
      }
    }
  }
}
</style>
