<template>
  <a-typography-title :level="3">Водители</a-typography-title>
  <main-table :data="drivers" :columns="columns" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import MainTable from "../ui/table/Table.vue";
import DriversDataService from "../api/drivers";

export default defineComponent({
  name: "Drivers",
  components: {
    MainTable,
  },
  setup() {
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Age",
        dataIndex: "age",
        key: "age",
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
      },
    ];

    const drivers = ref(null);
    const loading = ref(true);

    async function fetchDrivers() {
      loading.value = true;

      try {
        const data = await DriversDataService.getAll();

        console.log("data", data);

        // drivers.value = data;
      } finally {
        loading.value = false;
      }
    }

    onMounted(() => {
      fetchDrivers();
    });

    return {
      columns,
      drivers,
      loading,
    };
  },
});
</script>
