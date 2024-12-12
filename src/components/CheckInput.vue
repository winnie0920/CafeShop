<script setup>
const formStore = userFormStore();
const props = defineProps({
  option: [Array, Object],
  basic: Object,
  style: Object,
  regex: RegExp,
});

const { type, id, name, noValid } = props.basic || {};

onMounted(() => {
  if (id) {
    formStore.choice = { ...formStore.choice, [id]: "" };
    formStore.regex = { ...formStore.regex, [id]: props.regex };
  }
});
</script>

<template>
  <!-- input 或 password -->
  <div v-if="type === 'input' || type === 'password'" class="form__text-grid">
    <label :style="props.style" :for="id" class="form__text-label">{{
      name
    }}</label>
    <input
      :type="type === 'input' ? 'text' : 'password'"
      :id="id"
      :placeholder="`請輸入${name}`"
      v-model="formStore.choice[id]"
    />
  </div>

  <!-- textarea -->
  <div v-if="type === 'textarea'" class="form__text-grid">
    <label :style="props.style" :for="id" class="form__text-label">{{
      name
    }}</label>
    <textarea
      type="text"
      :id="id"
      :placeholder="`請輸入${name}`"
      v-model="formStore.choice[id]"
      rows="4"
    ></textarea>
  </div>

  <!-- radio 或 checkbox -->
  <div :style="props.style" class="form__text-option" v-if="type === 'select'">
    <ul v-for="o in option" :key="o.id">
      <div v-if="o.name">
        <h3 :style="{ fontSize: o.name.length > 2 ? '1.2rem' : '1.6rem' }">
          {{ o.name }}
        </h3>
        <div
          v-if="!noValid"
          :class="{ 'form__message-error': formStore.errorMessages[o.type] }"
        >
          必填
        </div>
      </div>
      <h5 v-if="o.name">{{ o.isSingleChoice ? "請擇一選擇" : "可多選擇" }}</h5>
      <li v-for="c in o.children" :key="c.id">
        <!-- 單選 -->
        <template v-if="o.isSingleChoice">
          <input
            type="radio"
            :id="`radio-${o.type}-${c.id}`"
            :name="o.type"
            :value="c.id"
            @change="formStore.singleOption(o.type, c.id)"
            v-model="formStore.choice[o.type]"
          />
        </template>

        <!-- 複選 -->
        <template v-else>
          <input
            type="checkbox"
            :id="`checkbox-${o.type}-${c.id}`"
            :value="c.id"
            :checked="formStore.choice[o.type]?.includes(c.id)"
            @change="formStore.pluralOption(o.type, c.id)"
          />
        </template>

        <label
          :for="`${o.isSingleChoice ? 'radio' : 'checkbox'}-${o.type}-${c.id}`"
        >
          <span
            :class="o.isSingleChoice ? 'check__and-radio' : 'check__and-mark'"
          ></span>
          {{ c.name }}
        </label>
        <p v-if="c.price">${{ c.price }}</p>
        <p v-else-if="c.price === 0">免費</p>
      </li>
      <hr v-if="o.name" class="mb-4" />
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/css/mixin" as *;
</style>
