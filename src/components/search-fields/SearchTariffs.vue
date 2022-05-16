<template>
  <a-select
    v-model:value="value"
    style="width: 100%"
    placeholder="Начните вводит тип тарифа"
    showSearch
    allow-clear
    :filter-option="false"
    :options="findOptions"
    :not-found-content="fetching ? undefined : null"
    @search="fetchData"
  ></a-select>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs } from "vue";
import { debounce } from "lodash-es";

import TariffsService from "../../api/tariffs";

import { ITariff } from "../../types/Tariff";

export default defineComponent({
  name: "SearchTariffs",
  props: {
    modelValue: Number,
  },
  setup(props, { emit }) {
    let lastFetchId = 0;

    const value = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });

    const state = reactive({
      findOptions: [],
      fetching: false,
    });

    const fetchData = debounce(async (value: string) => {
      lastFetchId += 1;

      const fetchId = lastFetchId;

      state.fetching = true;

      const response: [] | ITariff[] = await TariffsService.getAll({
        search: value,
      });

      if (fetchId !== lastFetchId) {
        // for fetch callback order
        return;
      }

      const data = response.map((tariff) => ({
        label: tariff.type,
        value: tariff.id,
      }));

      state.findOptions = data;
      state.fetching = false;
    }, 1000);

    return {
      value,
      fetchData,
      ...toRefs(state),
    };
  },
});
</script>``