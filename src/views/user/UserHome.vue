<script setup>
const queryParams = reactive({
  search: "",
});

// AdminSearch 的 emit
const sendSearch = (val) => {
  queryParams.search = val;
};
</script>

<template>
  <div class="User__container">
    <TitleBar>
      <div class="col-12 col-sm-7 col-md-6 col-lg-4 me-auto d-flex">
        <SearchBar :value="queryParams.search" @send-search="sendSearch" />
      </div>
    </TitleBar>
    <section class="row d-flex">123</section>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/css/mixin";

.User {
  &__container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 5rem 3rem 0;
    gap: 3rem;
  }
}
</style>
