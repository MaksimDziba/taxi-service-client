<template>
  <a-typography-title :level="3">Водители</a-typography-title>

  <a-button type="primary" @click="sidePageCreateDriver"
    >Добавить водителя</a-button
  >
  <a-divider />

  <main-table :data="drivers" :columns="columns" :loading="loading" />
</template>

<script lang="ts">
import DriversService from "../api/drivers";

import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";

import MainTable from "../ui/table/Table.vue";

// interface
import { IDriver } from "../types/Driver";

const columns = [
  {
    title: "id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "ФИО",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Адрес",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Телефон",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Паспорт",
    dataIndex: "passport",
    key: "passport",
  },
  {
    title: "Вод. удостоверение",
    dataIndex: "driverLicense",
    key: "driverLicense",
  },
  {
    title: "Номер договора",
    dataIndex: "contractNumber",
    key: "contractNumber",
    slots: {
      title: "contractNumber",
    },
  },
  {
    title: "Способ оплаты",
    dataIndex: "paymentMethod",
    key: "paymentMethod",
  },
  {
    title: "Транспортировка животных",
    dataIndex: "transportationAnimals",
    key: "transportationAnimals",
    align: "center",
    slots: { customRender: "checkbox", props: { disabled: true } },
  },
];

export default defineComponent({
  name: "Drivers",
  components: {
    MainTable,
  },
  setup() {
    const store = useStore();
    const isUpdateTable = computed(() => store.state.table.updateTable);

    const drivers = ref<IDriver[]>([]);
    const loading = ref(true);

    onMounted(() => {
      fetchDrivers();
    });

    async function fetchDrivers() {
      loading.value = true;

      try {
        const fetchDrivers = await DriversService.getAll({});

        drivers.value = fetchDrivers;
      } finally {
        loading.value = false;
      }
    }

    const sidePageCreateDriver = () =>
      store.dispatch("setSidePage", { type: "create-driver", show: true });

    watch(isUpdateTable, () => {
      fetchDrivers();
    });

    return {
      columns,
      drivers,
      loading,
      sidePageCreateDriver,
    };
  },
});
</script>
