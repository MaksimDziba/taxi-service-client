<template>
  <a-select
    v-model:value="value"
    mode="multiple"
    style="width: 100%"
    placeholder="Начните вводит ФИО водителя"
    allow-clear
    :filter-option="false"
    :options="data"
    :not-found-content="fetching ? undefined : null"
    @search="fetchDrivers"
    @change="handleChange"
  ></a-select>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from "vue";
import { debounce } from "lodash-es";

import DriversService from "../../../api/drivers";

import { IDriver } from "../../../types/Driver";

export default defineComponent({
  name: "SearchDrivers",
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

    const fetchDrivers = debounce(async (value: string) => {
      lastFetchId += 1;

      const fetchId = lastFetchId;

      state.data = [];
      state.fetching = true;

      const drivers: [] | IDriver[] = await DriversService.getAll({
        search: value,
      });

      if (fetchId !== lastFetchId) {
        // for fetch callback order
        return;
      }

      const data = drivers.map((driver) => ({
        label: driver.name,
        value: driver.id,
      }));

      state.data = data;
      state.fetching = false;
    }, 500);

    const handleChange = (value: string) => {
      console.log(`selected ${value}`);
    };

    return {
      ...toRefs(state),
      value,
      fetchDrivers,
      handleChange,
    };
  },
});
</script>