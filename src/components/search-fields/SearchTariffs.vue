<template>
  <a-select
    v-model:value="value"
    style="width: 100%"
    placeholder="Начните вводит тип тарифа"
    showSearch
    allow-clear
    :filter-option="false"
    :options="data"
    :not-found-content="fetching ? undefined : null"
    @search="fetchTariffs"
  ></a-select>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from "vue";
import { debounce } from "lodash-es";

import TariffsService from "../../api/tariffs";

import { ITariff } from "../../types/Tariff";

export default defineComponent({
  name: "SearchTariffs",
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

    const fetchTariffs = debounce(async (value: string) => {
      lastFetchId += 1;

      const fetchId = lastFetchId;

      state.data = [];
      state.fetching = true;

      const tariffs: [] | ITariff[] = await TariffsService.getAll({
        search: value,
      });

      if (fetchId !== lastFetchId) {
        // for fetch callback order
        return;
      }

      const data = tariffs.map((tariff) => ({
        label: tariff.type,
        value: tariff.id,
      }));

      state.data = data;
      state.fetching = false;
    }, 500);

    return {
      ...toRefs(state),
      value,
      fetchTariffs,
    };
  },
});
</script>``