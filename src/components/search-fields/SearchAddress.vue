<template>
  <a-auto-complete
    v-model:value="address"
    :options="data"
    style="width: 100%"
    placeholder="Начните вводит адрес"
    allow-clear
    :filter-option="false"
    :not-found-content="fetching ? undefined : null"
    @search="fetchAddress"
    @select="onSelect"
  />
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs } from "vue";
import { debounce } from "lodash-es";

import GeoService from "../../api/geo";

export default defineComponent({
  name: "SearchAddress",
  props: {
    modelValue: String,
  },
  setup(props, { emit }) {
    let lastFetchId = 0;

    const address = computed({
      get: () => [props.modelValue],
      set: (value) => emit("update:modelValue", value),
    });

    const state = reactive({
      data: [],
      fetching: false,
    });

    const fetchAddress = debounce(async (value: string) => {
      lastFetchId += 1;

      const fetchId = lastFetchId;

      state.fetching = true;

      const addressList = await GeoService.fetchAddresses(value);

      if (fetchId !== lastFetchId) {
        // for fetch callback order
        return;
      }

      const data = addressList.map((item) => ({
        label: item.value,
        value: item.value,
      }));

      state.data = data;
      state.fetching = false;
    }, 1000);

    const onSelect = (value: string) => {
      emit("update:modelValue", value);
    };

    return {
      address,
      onSelect,
      fetchAddress,
      ...toRefs(state),
    };
  },
});
</script>
