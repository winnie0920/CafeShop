<script setup>
const props = defineProps({
  value: String,
});
const emit = defineEmits(["sendSearch", "submitSearch"]);
const printSearchVal = () => {
  emit("submitSearch");
};

const search = computed({
  get() {
    return props.value;
  },
  set(val) {
    emit("sendSearch", val);
  },
});
</script>

<template>
  <div class="search__container">
    <input
      class="search__input"
      type="text"
      id="search"
      name="search"
      placeholder="Search here"
      v-model="search"
      @keyup.enter="printSearchVal"
    />
    <button class="search__icon" type="button" @click="printSearchVal">
      <SvgIcon icon-name="Common-Search" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/css/mixin" as *;
.search {
  &__container {
    @extend %base-btn-setting;
    align-items: center;
    width: 100%;
    padding-right: var(--cafe--padding-xs);
    background-color: var(--cafe-color-white);
  }
  &__input {
    padding: var(--cafe--padding-xs) 1.5rem;
    flex-grow: 1;
    line-height: 1.8;
    color: var(--cafe-color-brown);
    font-size: var(--cafe--font-sm);
    border-radius: var(--cafe-radius-md);
    &::placeholder {
      transition: all 0.35s ease-in-out;
      color: var(--cafe-color-brown-lighter);
    }
    &:focus {
      &::placeholder {
        color: var(--cafe-color-brown);
      }
      ~ .search__icon svg {
        color: var(--cafe-color-brown);
      }
    }
  }
  &__icon {
    width: 2rem;
    height: 2rem;
    background-color: transparent;
    svg {
      width: 100%;
      height: 100%;
      transition: all 0.35s ease-in-out;
      color: var(--cafe-color-brown-lighter);
      &:hover {
        color: var(--cafe-color-brown);
      }
    }
  }
}
</style>
