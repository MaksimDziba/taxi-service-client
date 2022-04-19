<template>
  <a-typography-title :level="3">Заказы</a-typography-title>

  <a-button type="primary" @click="sidePageCreateDriver"
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
