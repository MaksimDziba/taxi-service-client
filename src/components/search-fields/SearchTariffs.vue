<template>
  <a-select
    v-model:value="value"
    style="width: 100%"
    placeholder="Выбрать тариф..."
    showSearch
    allow-clear
    :filter-option="false"
    :options="optionsTariffs"
  ></a-select>
</template>

<script lang="ts">
import { computed, defineComponent, ref, onMounted } from "vue";

import TariffsService from "../../api/tariffs";

import { ITariff } from "../../types/Tariff";

export default defineComponent({
  name: "SearchTariffs",
  props: {
    modelValue: Number,
  },
  emits: ["update:modelValue", "select-tariff"],
  setup(props, { emit }) {
    const value = computed({
      get: () => props.modelValue,
      set: (tariffID) => {
        emit(
          "select-tariff",
          tariffs.value.find((tariff) => tariff.id === tariffID)
        );

        emit("update:modelValue", tariffID);
      },
    });

    onMounted(async () => await fetchTariffs());

    const tariffs = ref<[] | ITariff[]>([]);
    const optionsTariffs = ref<{ label: string; value: number }[] | []>([]);

    const fetchTariffs = async () => {
      tariffs.value = await TariffsService.getAll();

      optionsTariffs.value = tariffs.value.map((tariff) => ({
        label: tariff.type,
        value: tariff.id,
      }));
    };

    return {
      value,
      optionsTariffs,
    };
  },
});
</script>
``
