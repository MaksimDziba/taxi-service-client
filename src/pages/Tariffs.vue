<template>
  <a-typography-title :level="3">Тарифы</a-typography-title>

  <a-button type="primary" @click="sidePageCreateTariff"
    >Добавить тариф</a-button
  >
  <a-divider />

  <main-table
    :data="tariffs"
    :columns="columns"
    :loading="loading"
    side-page-type="create-order"
  />
</template>

<script lang="ts">
import TariffService from "../api/tariffs";

import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";

import MainTable from "../ui/table/Table.vue";

// interface
import { ITariff } from "../types/Tariff";

// data
const columns = [
  {
    title: "id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Название тарифа",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Базовая стоимость за километр",
    dataIndex: "costPerKilometer",
    key: "costPerKilometer",
  },
  {
    title: "Стоимость километра за городом",
    dataIndex: "costOutOfCity",
    key: "costOutOfCity",
  },
  {
    title: "Стоимость простоя",
    dataIndex: "costDownTime",
    key: "costDownTime",
  },
  {
    title: "Стоимость услуги 'Детское кресло'",
    dataIndex: "costBabyChair",
    key: "costBabyChair",
  },
  {
    title: "Стоимость услуги 'Транспортировка животных'",
    dataIndex: "costTransportingAnimals",
    key: "costTransportingAnimals",
  },
];

export default defineComponent({
  name: "Tariffs",
  components: {
    MainTable,
  },
  setup() {
    const store = useStore();
    const isUpdateTable = computed(() => store.state.table.updateTable);

    const tariffs = ref<ITariff[]>([]);
    const loading = ref(true);

    onMounted(() => {
      fetchTariffs();
    });

    async function fetchTariffs() {
      loading.value = true;

      try {
        const fetchTariffs = await TariffService.getAll({});

        tariffs.value = fetchTariffs;
      } finally {
        loading.value = false;
      }
    }

    const sidePageCreateTariff = () =>
      store.commit("sidepage/SET_SIDE_PAGE", {
        type: "create-tariff",
        show: true,
      });

    watch(isUpdateTable, () => {
      fetchTariffs();
    });

    return {
      columns,
      tariffs,
      loading,
      sidePageCreateTariff,
    };
  },
});
</script>
