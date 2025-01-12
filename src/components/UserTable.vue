<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "表格標題",
  },
  tableData: {
    type: Object,
    default: {
      thead: [
        {
          type: "id",
          name: "項次",
          style: { textAlign: "left" },
        },
        { type: "col1", name: "欄位1" },
        { type: "col2", name: "欄位2", ban: true },
      ],
      tbody: [
        { id: 1, col1: "test", col2: "test" },
        { id: 2, col1: "test", col2: "test" },
        { id: 3, col1: "test", col2: "test" },
        { id: 4, col1: "test", col2: "test" },
      ],
    },
  },
  sortData: {
    type: Object,
    default: {
      sort: "id",
      direction: "DESC",
    },
  },
  pageData: {
    type: Object,
  },
  checkType: {
    type: String,
    default: "",
  },
  checkBan: {
    type: Function,
    default: () => false,
  },
});

const emit = defineEmits(["sendSort"]);

//排序
const sortNoBan = computed(() =>
  props.tableData.thead.filter((col) => !col.ban)
);

const setSort = (sort) => {
  // 檢查是否可以排序（排除 ban 的欄位）
  const isSortable = sortNoBan.value.some((col) => col.type === sort);
  if (!isSortable) return null;
  let direction = "DESC";

  if (sort === props.sortData.sort && props.sortData.direction === "DESC") {
    direction = "ASC";
  }
  emit("sendSort", { sort, direction });
};
</script>

<template>
  <!-- 表格頭部控制項 -->
  <div class="table__title">
    <p>{{ props.title }}</p>
  </div>
  <div class="table__container">
    <!-- 表格滾動範圍 -->
    <div class="table__scroll">
      <table>
        <thead>
          <tr>
            <!-- 一般th -->
            <th
              v-for="col in props.tableData.thead"
              :key="col.type"
              :style="col.style"
              @click="setSort(col.type)"
            >
              <div class="d-inline-flex align-items-center gap-2">
                <p>{{ col.name }}</p>
              </div>
              <template v-if="col.type === sortData?.sort">
                <SvgIcon
                  v-show="sortData?.direction === 'DESC'"
                  icon-name="Sort-Desc"
                />
                <SvgIcon
                  v-show="sortData?.direction === 'ASC'"
                  icon-name="Sort-Asc"
                />
              </template>
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-if="props.tableData.tbody.length > 0">
            <tr v-for="(row, idx) in props.tableData.tbody" :key="idx">
              <!-- td，預設文字顯示 -->
              <template v-for="col in props.tableData.thead" :key="col.type">
                <td :style="col.style">
                  <slot :name="col.type" :row="row">
                    <p :title="row[col.type]">{{ row[col.type] }}</p>
                  </slot>
                </td>
              </template>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>

  <UserTablePage />
</template>

<style scoped lang="scss"></style>
