<script setup>
const formStore = userFormStore();
const props = defineProps({
  option: {
    type: [Array, Object],
    required: false,
  },
  id: String,
  name: String,
  class: String,
  regex: RegExp,
});

onMounted(() => {
  if (props.id) {
    formStore.choice = { [props.id]: "" };
  }
});
</script>

<template>
  <!-- 多選及單選 -->
  <template v-if="props.class === 'input'">
    {{ formStore.choice[props.id] }}
    <label :for="props.id" class="form-label">{{ props.name }}</label>
    <input
      type="text"
      :id="props.id"
      :placeholder="`請輸入${props.name}`"
      v-model="formStore.choice[props.id]"
    />
  </template>
  <div class="popup__text-option" v-if="props.class === 'select'">
    <ul v-for="o in option" :key="o.id">
      <div>
        <h3>{{ o.name }}選擇</h3>
        <div
          :class="{
            'popup__message-error': formStore.errorMessages[o.type],
          }"
        >
          必填
        </div>
      </div>
      <h5 v-if="o.isSingleChoice">請擇一選擇</h5>
      <h5 v-else>可多選擇</h5>
      <li v-for="c in o.children" :key="c.id">
        <input
          v-if="o.isSingleChoice"
          type="radio"
          :name="o.type"
          :id="`radio-${o.type}-${c.id}`"
          :value="c.id"
          @change="formStore.singleOption(o.type, c.id)"
        />
        <label v-if="o.isSingleChoice" :for="`radio-${o.type}-${c.id}`">
          <span class="check__and-radio"></span>
          {{ c.name }}
        </label>
        <input
          v-else
          type="checkbox"
          :id="`checkbox-${o.type}-${c.id}`"
          :value="c.id"
          @change="formStore.pluralOption(o.type, c.id)"
        />
        <label v-if="!o.isSingleChoice" :for="`checkbox-${o.type}-${c.id}`">
          <span class="check__and-mark"></span>
          {{ c.name }}
        </label>
        <p v-if="c.price">${{ c.price }}</p>
        <p v-else>免費</p>
      </li>
      <hr />
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/css/mixin" as *;
</style>
