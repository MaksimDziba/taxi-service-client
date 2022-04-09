<template>
  <a-table :dataSource="data" :columns="columns" />
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainTable",
  props: {
    data: Array,
    columns: Array,
  },
});
</script>
