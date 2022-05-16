<template>
  <a-auto-complete
    v-model:value="phone"
    style="width: 100%"
    placeholder="Начните вводит телефон клиента"
    allow-clear
    showSearch
    :filter-option="false"
    :options="findOptions"
    :not-found-content="fetching ? undefined : null"
    :disabled="isDisabled"
    @search="fetchData"
    @select="onSelect"
    @change="onChange"
  />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";
import { debounce } from "lodash-es";

import ClientsService from "../../api/clients";

import { IClient } from "../../types/Client";

export default defineComponent({
  name: "SearchClients",
  props: {
    id: Number,
    phone: String,
    isDisabled: Boolean,
  },
  setup(props, { emit }) {
    let lastFetchId = 0;

    const phone = ref(props.phone || "");

    const state = reactive({
      findOptions: [],
      fetching: false,
    });

    onMounted(async () => {
      if (props.id) {
        state.findOptions = [
          {
            label: props.phone,
            value: props.id,
          },
        ];
      }
    });

    const fetchData = debounce(async (value: string) => {
      lastFetchId += 1;

      const fetchId = lastFetchId;

      state.fetching = true;

      const response: [] | IClient[] = await ClientsService.getAll({
        search: value,
      });

      if (fetchId !== lastFetchId) {
        // for fetch callback order
        return;
      }

      const data = response.map((client) => ({
        label: client.phone,
        value: client.id,
      }));

      state.findOptions = data;
      state.fetching = false;
    }, 1000);

    const onSelect = (value, option) => {
      if (value) {
        phone.value = option.label;

        emit("update:id", value);
        emit("update:phone", option.label);
      }
    };

    const onChange = (value, option) => {
      const isPhone = !Object.keys(option).length;

      if (isPhone) {
        phone.value = value;

        emit("update:id", null);
        emit("update:phone", value);
      }
    };

    return {
      phone,
      fetchData,
      onSelect,
      onChange,
      isDisabled: props.isDisabled,
      ...toRefs(state),
    };
  },
});
</script>