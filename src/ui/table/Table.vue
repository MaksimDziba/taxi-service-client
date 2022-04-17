<template>
  <a-table
    emptyText="Данные отсутствуют"
    class="ui-table"
    :dataSource="data"
    :columns="columns"
    :loading="loading"
    :customRow="
      (record) => ({
        onClick: () => onSelect(record),
      })
    "
  >
    <template v-slot:checkbox="{ value, record, column }">
      <a-checkbox :checked="value" :disabled="column.slots.props.disabled" />
    </template>
    <template v-slot:date="{ value, record, column }">
      {{ new Date(value).toLocaleDateString() }}
    </template>
  </a-table>
</template>

<script>
import { defineComponent, toRaw } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "MainTable",
  props: {
    data: Array,
    columns: Array,
    loading: Boolean,
    sidePageType: String,
  },
  setup(props) {
    const store = useStore();

    const onSelect = (record) => {
      if (props.sidePageType) {
        store.commit("sidepage/SET_SIDE_PAGE", {
          type: props.sidePageType,
          show: true,
          data: toRaw(record),
        });
      }
    };

    return { onSelect };
  },
});
</script>

<style scoped>
.ui-table :deep(.ant-table-row):hover {
  cursor: pointer;
  color: #1890ff;
}
</style>