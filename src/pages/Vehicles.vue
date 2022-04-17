<template>
  <a-typography-title :level="3">Транспортные средства</a-typography-title>

  <a-button type="primary" @click="openSidePage">Добавить транспорт</a-button>
  <a-divider />

  <main-table
    :data="vehicles"
    :columns="columns"
    :loading="loading"
    side-page-type="create-vehicle"
  />
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";

import MainTable from "../ui/table/Table.vue";

import VehicleService from "../api/vehicles";

// interface
import { IVehicle } from "../types/Vehicle";

const columns = [
  {
    title: "id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Марка автомобиля",
    dataIndex: "carModel",
    key: "carModel",
  },
  {
    title: "Гос. номер",
    dataIndex: "gosNumber",
    key: "gosNumber",
  },
  {
    title: "Цвет кузова",
    dataIndex: "carColor",
    key: "carColor",
  },
  {
    title: "Дата выпуска",
    dataIndex: "dateManufacture",
    key: "dateManufacture",
    slots: { customRender: "date" },
  },
  {
    title: "Грузоподъемность",
    dataIndex: "capacity",
    key: "capacity",
  },
  {
    title: "Детское кресло",
    dataIndex: "babyChair",
    key: "babyChair",
    align: "center",
    slots: { customRender: "checkbox", props: { disabled: true } },
  },
  {
    title: "Кол-во пассажиров",
    dataIndex: "maxCountPassenger",
    key: "maxCountPassenger",
  },
];

export default defineComponent({
  name: "Vehicles",
  components: {
    MainTable,
  },
  setup() {
    const store = useStore();
    const isUpdateTable = computed(() => store.state.table.updateTable);

    const vehicles = ref<IVehicle[]>([]);
    const loading = ref(true);

    onMounted(() => {
      fetchVehicles();
    });

    async function fetchVehicles() {
      loading.value = true;

      try {
        const fetchVehicles = await VehicleService.getAll();

        vehicles.value = fetchVehicles;
      } finally {
        loading.value = false;
      }
    }

    const openSidePage = () =>
      store.commit("sidepage/SET_SIDE_PAGE", {
        type: "create-vehicle",
        show: true,
      });

    watch(isUpdateTable, () => {
      fetchVehicles();
    });

    return {
      columns,
      vehicles,
      loading,
      openSidePage,
    };
  },
});
</script>
