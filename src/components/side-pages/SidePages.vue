<template>
  <div v-if="!visible" />
  <a-drawer
    v-else
    :title="sidePage.titleText"
    :visible="$store.state.show"
    closable
    destroyOnClose
    placement="right"
    width="540"
    @close="handleClose"
  >
    <component :is="$store.state.type" :data="sidePage.data" />
  </a-drawer>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

import { useStore } from "vuex";

import CreateDriver from "./drivers/CreateDriver.vue";

export default defineComponent({
  components: {
    CreateDriver,
  },
  setup() {
    const store = useStore();

    const sidePage = computed(
      () =>
        ({
          "create-driver": {
            titleText: "Добавить водителя",
            component: "CreateDriver",
            data: {},
          },
        }[store.state.type])
    );

    const handleClose = () => {
      store.dispatch("closeSidePage");
    };

    return {
      type: computed(() => store.state.type),
      visible: computed(() => store.state.show),
      sidePage,
      handleClose,
    };
  },
});
</script>