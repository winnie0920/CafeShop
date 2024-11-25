<script setup>
const formStore = userFormStore();
const props = defineProps({
  option: [Array, Object],
  basic: Object,
  style: Object,
  regex: RegExp,
});

const { type, id, name } = props.basic || {};

onMounted(() => {
  if (id) {
    formStore.choice = { ...formStore.choice, [id]: "" };
    formStore.regex = { ...formStore.regex, [id]: props.regex };
  }
});
</script>

<template>
  <!-- input 或 password -->
  <template v-if="type === 'input' || type === 'password'">
    <label :style="props.style" :for="id" class="form-label">{{ name }}</label>
    <input
      class="mb-3"
      :type="type === 'input' ? 'text' : 'password'"
      :id="id"
      :placeholder="`請輸入${name}`"
      v-model="formStore.choice[id]"
    />
  </template>

  <!-- textarea -->
  <template v-if="type === 'textarea'">
    <label :style="props.style" :for="id" class="form-label">{{ name }}</label>
    <textarea
      class="mb-3"
      type="text"
      :id="id"
      :placeholder="`請輸入${name}`"
      v-model="formStore.choice[id]"
      rows="4"
    ></textarea>
  </template>

  <!-- radio 或 checkbox -->
  <div :style="props.style" class="popup__text-option" v-if="type === 'select'">
    <ul v-for="o in option" :key="o.id">
      <div v-if="o.name">
        <h3>{{ o.name }}選項</h3>
        <div
          :class="{ 'popup__message-error': formStore.errorMessages[o.type] }"
        >
          必填
        </div>
      </div>
      <h5 v-if="o.name">{{ o.isSingleChoice ? "請擇一選擇" : "可多選擇" }}</h5>
      <li v-for="c in o.children" :key="c.id">
        <input
          :type="o.isSingleChoice ? 'radio' : 'checkbox'"
          :id="`${o.isSingleChoice ? 'radio' : 'checkbox'}-${o.type}-${c.id}`"
          :name="o.isSingleChoice ? o.type : undefined"
          :value="c.id"
          @change="
            o.isSingleChoice
              ? formStore.singleOption(o.type, c.id)
              : formStore.pluralOption(o.type, c.id)
          "
        />
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
.form-label {
  font-weight: 700;
}
</style>
