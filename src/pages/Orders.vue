<template>
  <a-typography-title :level="3">Заказы</a-typography-title>

  <a-button type="primary" @click="sidePageCreateOrders"
    >Добавить заказ</a-button
  >
  <a-divider />

  <main-table
    :data="orders"
    :columns="columns"
    :loading="loading"
    side-page-type="create-order"
  />
</template>

<script lang="ts">
import OrderService from "../api/orders";

import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";

import MainTable from "../ui/table/Table.vue";

// interface
import { IOrder } from "../types/Order";

// data
const columns = [
  {
    title: "id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Клиент",
    dataIndex: ["client", "phone"],
    key: "phone",
  },
  {
    title: "Местонахождения",
    dataIndex: "addressFrom",
    key: "addressFrom",
  },
  {
    title: "Куда поедет",
    dataIndex: "addressTo",
    key: "addressTo",
  },
  {
    title: "Время подачи",
    dataIndex: "timeOrder",
    key: "timeOrder",
    align: "center",
    slots: { customRender: "time" },
  },
  {
    title: "Кол-во пассажиров",
    dataIndex: "maxCountPassenger",
    key: "maxCountPassenger",
    align: "center",
  },
  {
    title: "Начальная цена",
    dataIndex: "preOrderCost",
    key: "preOrderCost",
    align: "center",
  },
  {
    title: "Оператор",
    dataIndex: "operatorName",
    key: "operatorName",
  },
  {
    title: "Перевозка дом. животных",
    dataIndex: "transportationAnimals",
    key: "transportationAnimals",
    align: "center",
    slots: { customRender: "checkbox", props: { disabled: true } },
  },
  {
    title: "Детское кресло",
    dataIndex: "babyChair",
    key: "babyChair",
    align: "center",
    slots: { customRender: "checkbox", props: { disabled: true } },
  },
  {
    title: "Тариф",
    dataIndex: ["tariff", "type"],
    key: "tariff",
    align: "center",
  },
  {
    title: "Статус",
    dataIndex: "status",
    key: "status",
    align: "center",
    slots: { customRender: "statusOrder" },
  },
];

export default defineComponent({
  name: "Orders",
  components: {
    MainTable,
  },
  setup() {
    const store = useStore();
    const isUpdateTable = computed(() => store.state.table.updateTable);

    const orders = ref<IOrder[]>([]);
    const loading = ref(true);

    onMounted(() => {
      fetchOrders();
    });

    async function fetchOrders() {
      loading.value = true;

      try {
        const fetchOrders = await OrderService.getAll({});

        orders.value = fetchOrders;
      } finally {
        loading.value = false;
      }
    }
    const sidePageCreateOrders = () =>
      store.commit("sidepage/SET_SIDE_PAGE", {
        type: "create-order",
        show: true,
      });

    watch(isUpdateTable, () => {
      fetchOrders();
    });

    return {
      columns,
      orders,
      loading,
      sidePageCreateOrders,
    };
  },
});
</script>
