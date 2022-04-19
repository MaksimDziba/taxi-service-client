<template>
  <div v-if="!visible" />
  <a-drawer
    v-else
    :title="sidePage.titleText"
    :visible="visible"
    closable
    destroyOnClose
    placement="right"
    width="540"
    @close="handleClose"
  >
    <component :is="type" :data="data" />
  </a-drawer>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

import { useStore } from "vuex";

import CreateDriver from "./drivers/CreateDriver.vue";
import CreateVehicle from "./vehicles/CreateVehicle.vue";
import CreateTariff from "./tariffs/CreateTariff.vue";

const sidePages = {
  "create-driver": {
    titleText: "Добавить водителя",
    component: "CreateDriver",
    data: {},
  },
  "create-vehicle": {
    titleText: "Добавить транспортное средство",
    component: "CreateVehicle",
    data: {},
  },
  "create-tariff": {
    titleText: "Добавить тариф",
    component: "CreateTariff",
    data: {},
  },
};

export default defineComponent({
  components: {
    CreateDriver,
    CreateVehicle,
    CreateTariff,
  },
  setup() {
    const store = useStore();
    const sidePageStore = store.state["sidepage"];

    const sidePage = computed(() => sidePages[sidePageStore.type]);

    const handleClose = () => {
      store.commit("sidepage/CLOSE_SIDE_PAGE");
    };

    return {
      type: computed(() => sidePageStore.type),
      visible: computed(() => sidePageStore.show),
      data: computed(() => sidePageStore.data),
      sidePage,
      handleClose,
    };
  },
});
</script>