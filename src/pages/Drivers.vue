<template>
  <a-typography-title :level="3">Водители</a-typography-title>

  <a-button @click="sidePageCreateDriver">Добавить водителя</a-button>

  <main-table :data="drivers" :columns="columns" />
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import MainTable from "../ui/table/Table.vue";
import DriversService from "../api/drivers";

import { IDriver } from "../types/Driver";

// interface
import { useStore } from "vuex";

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

    const drivers = ref<IDriver[]>([]);
    const loading = ref(true);

    onMounted(() => {
      fetchDrivers();
    });

    async function fetchDrivers() {
      loading.value = true;

      try {
        const fetchDrivers = await DriversService.getAll();

        drivers.value = fetchDrivers;
      } finally {
        loading.value = false;
      }
    }

    const sidePageCreateDriver = () =>
      store.dispatch("setSidePage", { type: "create-driver", show: true });

    return {
      columns,
      drivers,
      loading,
      sidePageCreateDriver,
    };
  },
});
</script>
