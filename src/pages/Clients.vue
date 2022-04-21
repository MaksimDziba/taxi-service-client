<template>
  <a-typography-title :level="3">Клиенты</a-typography-title>

  <a-button type="primary" @click="sidePageCreateClient"
    >Добавить клиента</a-button
  >
  <a-divider />

  <main-table
    :data="clients"
    :columns="columns"
    :loading="loading"
    side-page-type="create-client"
  />
</template>

<script lang="ts">
import ClientService from "../api/clients";

import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";

import MainTable from "../ui/table/Table.vue";

// interface
import { IClient } from "../types/Client";

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
    title: "Телефон",
    dataIndex: "phone",
    key: "phone",
  },
];

export default defineComponent({
  name: "Clients",
  components: {
    MainTable,
  },
  setup() {
    const store = useStore();
    const isUpdateTable = computed(() => store.state.table.updateTable);

    const clients = ref<IClient[]>([]);
    const loading = ref(true);

    onMounted(() => {
      fetchClients();
    });

    async function fetchClients() {
      loading.value = true;

      try {
        const fetchClients = await ClientService.getAll({});

        clients.value = fetchClients;
      } finally {
        loading.value = false;
      }
    }

    const sidePageCreateClient = () =>
      store.commit("sidepage/SET_SIDE_PAGE", {
        type: "create-client",
        show: true,
      });

    watch(isUpdateTable, () => {
      fetchClients();
    });

    return {
      columns,
      clients,
      loading,
      sidePageCreateClient,
    };
  },
});
</script>
