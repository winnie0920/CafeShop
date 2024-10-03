<script setup>
const useStore = userStore();
const props = defineProps({
  title: {
    type: String,
  },
  iconName: {
    type: String,
  },
  data: {
    type: Array,
  },
  drop: {
    type: String,
  },
  width: {
    type: String,
    default: "10rem",
  },
});

const toggleShow = () => {
  useStore.toggleShow(props.drop);
};

const model = defineModel({ default: { id: -1, name: "請選擇" } });
const changeSelected = (item) => {
  model.value = item;
};

const data = computed({
  get() {
    return [{ id: -1, name: "請選擇" }, ...props.data];
  },
});

const closeShow = () => {
  if (useStore.show[props.drop]) useStore.show[props.drop] = false;
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
    :class="{ empty: !props.title, isSvgC: props.iconName }"
    class="list__container"
    @click.stop="toggleShow"
  >
    <p class="list__title">{{ props.title }}</p>
    <SvgIcon
      v-show="props.iconName"
      :iconName="props.iconName"
      class="list__svg-first"
    ></SvgIcon>
    <h5
      :class="{ isSvg: props.iconName }"
      :style="{ width: props.width }"
      class="list__text"
    >
      {{ useStore.sLanguage.name }}
    </h5>
    <SvgIcon class="list__svg-end" iconName="Common-Arrow-Circle"></SvgIcon>

    <transition name="move-in">
      <ul v-if="useStore.show[props.drop]" class="list__drop">
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
@import "@/assets/css/mixin";

.list {
  &__container {
    position: relative;
    display: grid;
    padding: 1rem;
    color: var(--cafe-color-brown);
    border: 0.1rem solid var(--cafe-color-brown);
    background-color: var(--cafe-color-white);
    border-radius: var(--cafe-radius-md);
    grid-template-rows: repeat(2, max-content);
    grid-template-columns: max-content 1rem;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
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
    position: absolute;
    top: calc(100% + 0.75rem);
    display: flex;
    flex-direction: column;
    max-height: 22rem;
    width: 100%;
    padding: 0.75rem 0.75rem;
    gap: 0.5rem;
    background-color: var(--cafe-color-white);
    border: 0.1rem solid var(--cafe-color-brown);
    border-radius: inherit;
    z-index: 10;
  }
  &__drop-item {
    padding: 0.5rem 0.75rem;
    font-size: 1.1rem;
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
