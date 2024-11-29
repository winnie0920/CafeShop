<script setup>
const props = defineProps({
  data: Object,
});
const menuStore = userMenuStore();

const popupMeal = () => {};

onMounted(() => {
  console.log(props.data);
});
</script>

<template>
  <div v-for="d in props.data" :key="d.id">
    <h4 class="admin__title">{{ d.name }}</h4>
    <div class="admin__container">
      <div v-for="c in d.children" :key="c.index" class="admin__card">
        <img :src="menuStore.getImageUrl(c.image)" alt="" />
        <div class="d-flex justify-content-between text-center">
          <h5>{{ c.name }}</h5>
          <h6>$138</h6>
        </div>
        <div class="d-flex justify-content-end gap-2">
          <div class="admin__start">
            <SvgIcon iconName="Common-Ok"></SvgIcon>
            <SvgIcon v-if="false" iconName="Common-No"></SvgIcon>
          </div>
          <ConfirmBtn
            :styles="['brown', 'circle']"
            iconName="Common-Pencil"
            @click="popupMeal"
          />
          <ConfirmBtn
            :styles="['gray', 'circle']"
            iconName="Common-Trash"
            @click="popupMeal"
          />
        </div>
      </div>
    </div>
  </div>
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
    padding: var(--cafe--padding-xxxs) 0.6rem;
    svg {
      @include size(1.5rem, 1.6rem);
    }
  }
}
</style>
