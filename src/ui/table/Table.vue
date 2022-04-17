<template>
  <a-table :dataSource="data" :columns="columns" :loading="loading">
    <template v-slot:checkbox="{ value, record, column }">
      <a-checkbox :checked="value" :disabled="column.slots.props.disabled" />
    </template>
  </a-table>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainTable",
  props: {
    data: Array,
    columns: Array,
    loading: Boolean,
  },
});
</script>
