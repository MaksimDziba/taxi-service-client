<template>
  <a-select
    v-model:value="value"
    placeholder="Начните вводит телефон клиента"
    mode="tags"
    style="width: 100%"
    allow-clear
    showSearch
    :filter-option="false"
    :options="data"
    :not-found-content="fetching ? undefined : null"
    @search="fetchClients"
    @change="handleChange"
  ></a-select>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from "vue";
import { debounce } from "lodash-es";

import ClientsService from "../../api/clients";

import { IClient } from "../../types/Client";

export default defineComponent({
  name: "SearchClients",
  props: {
    modelValue: Array,
    default: () => [],
  },
  setup(props, { emit }) {
    let lastFetchId = 0;

    const value = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });

    const state = reactive({
      data: [],
      fetching: false,
    });

    const fetchClients = debounce(async (value: string) => {
      lastFetchId += 1;

      const fetchId = lastFetchId;

      state.data = [];
      state.fetching = true;

      const clients: [] | IClient[] = await ClientsService.getAll({
        search: value,
      });

      if (fetchId !== lastFetchId) {
        // for fetch callback order
        return;
      }

      const data = clients.map((client) => ({
        label: client.name,
        value: client.id,
      }));

      state.data = data;
      state.fetching = false;
    }, 500);

    const handleChange = (value: string) => {
      console.log(`selected ${value}`);
    };

    return {
      value,
      fetchClients,
      handleChange,
      ...toRefs(state),
    };
  },
});
</script>