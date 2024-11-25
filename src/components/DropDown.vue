<script setup>
const showStore = useShowStore();
const props = defineProps({
  data: {
    type: Array,
  },
  dropdown: {
    type: Object,
    required: true,
  },
});
const { drop, width, iconName } = props.dropdown;

// 初始下拉式選單
const model = defineModel({ default: { id: -1, name: "請選擇" } });

//切換下拉式選單
const toggleShow = () => {
  showStore.toggleShow(drop);
};

// 選擇下拉式選單
const changeSelected = (item) => {
  model.value = item;
};

// 下拉式選單初始化
const data = computed({
  get() {
    return [{ id: -1, name: "請選擇" }, ...props.data];
  },
});

//關閉下拉式選單
const closeShow = () => {
  showStore.dropdownShow[drop] = false;
};
onMounted(() => {
  changeSelected({ id: -1, name: "請選擇" });
  document.addEventListener("click", closeShow);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", closeShow);
});
</script>

<template>
  <div
    :class="{ empty: !props.title, isSvgC: iconName }"
    class="list__container"
    @click.stop="toggleShow"
  >
    <p class="list__title">{{ props.title }}</p>
    <SvgIcon
      v-show="iconName"
      :iconName="iconName"
      class="list__svg-first"
    ></SvgIcon>
    <h5
      :class="{ isSvg: iconName }"
      :style="{ width: width }"
      class="list__text"
    >
      {{ showStore.sLanguage.name }}
    </h5>
    <SvgIcon class="list__svg-end" iconName="Common-Arrow-Circle"></SvgIcon>

    <transition name="move-up">
      <ul v-if="showStore.dropdownShow[drop]" class="list__drop">
        <li
          @click="changeSelected(d)"
          v-for="d in data"
          :key="d.id"
          class="list__drop-item"
        >
          <p>{{ d.name }}</p>
        </li>
      </ul>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/css/mixin" as *;

.list {
  &__container {
    @extend %base-btn-setting;
    height: 4rem;
    position: relative;
    display: grid;
    padding: var(--cafe--padding-xs);
    color: var(--cafe-color-brown);
    border: 0.1rem solid var(--cafe-color-brown);
    background-color: var(--cafe-color-white);
    grid-template-rows: repeat(2, max-content);
    grid-template-columns: max-content 1rem;
    cursor: pointer;
    svg {
      width: 100%;
      aspect-ratio: 1 / 1;
      color: var(--cafe-color-brown);
    }
  }
  &__svg-end {
    color: var(--cafe-color-brown);
    transform: rotate(90deg) translateX(-15%);
  }
  &__title {
    grid-column: 1/-1;
  }
  &__drop {
    @extend %base-btn-setting;
    position: absolute;
    top: calc(100% + 0.75rem);
    flex-direction: column;
    max-height: 22rem;
    width: 100%;
    padding: 0.75rem;
    gap: 0.5rem;
    background-color: var(--cafe-color-white);
    border-radius: inherit;
    z-index: 10;
  }
  &__drop-item {
    padding: 0.5rem 0.75rem;
    font-size: var(--cafe--font-sm);
    transition: all 0.35s ease-in-out;
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    border-radius: var(--cafe-radius-xs);
    &:hover,
    &-active {
      background-color: var(--cafe-color-brown);
      color: var(--cafe-color-white);
    }
  }
}

.empty {
  grid-template-rows: auto;
  align-items: center;
}

.isSvg {
  padding-left: 0.5rem;
}
.isSvgC {
  grid-template-columns: 1.5rem max-content 1rem;
}
</style>
