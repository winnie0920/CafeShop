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
const { drop, width, iconName, title } = props.dropdown;

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
    :class="{ empty: !title, isSvgC: iconName }"
    class="list__container"
    @click.stop="toggleShow"
  >
    <p v-if="title" class="list__title mb-1">{{ title }}</p>
    <SvgIcon
      v-if="iconName"
      :iconName="iconName"
      class="list__svg-first"
    ></SvgIcon>
    <h5
      :class="{ isSvg: iconName }"
      :style="{ width: width }"
      class="list__text"
    >
      {{ showStore[drop].name }}
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
    @include style-color(var(--cafe-color-brown), var(--cafe-color-white));
    @include border(var(--cafe-color-brown), 0.1rem);
    position: relative;
    display: grid;
    padding: var(--cafe--padding-xs);
    grid-template-rows: repeat(2, max-content);
    grid-template-columns: max-content 1rem;
    cursor: pointer;
    svg {
      @include size(100%);
      @include style-color(var(--cafe-color-brown), transparent);
      aspect-ratio: 1 / 1;
    }
  }
  &__svg-end {
    @include style-color(var(--cafe-color-brown), transparent);
    transform: rotate(90deg) translateX(-15%);
  }
  &__title {
    @include style-color(var(--cafe-color-brown-lighter), transparent);

    grid-column: 1/-1;
  }
  &__drop {
    @include border(var(--cafe-color-brown), 0.1rem);
    @include flex-center(column, none, none);
    @include style-color(var(--cafe-color-brown), var(--cafe-color-white));
    @include size(100%, auto);
    position: absolute;
    top: calc(100% + 0.75rem);
    max-height: 22rem;
    padding: var(--cafe--padding-xxs);
    gap: 0.5rem;
    overflow-x: hidden;
    scrollbar-width: none;
    z-index: 10;
  }
  &__drop-item {
    padding: var(--cafe--padding-xxxs) var(--cafe--padding-xxs);
    border-radius: var(--cafe-radius-xs);
    font-size: var(--cafe--font-sm);
    white-space: nowrap;
    text-overflow: ellipsis;
    transition: all 0.35s ease-in-out;
    &:hover,
    &-active {
      @include style-color;
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
