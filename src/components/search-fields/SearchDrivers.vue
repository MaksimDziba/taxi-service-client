<template>
  <a-select
    v-model:value="value"
    placeholder="Начните вводит ФИО водителя"
    style="width: 100%"
    allow-clear
    mode="multiple"
    :not-found-content="loading ? undefined : null"
    :options="optionsDriver"
  ></a-select>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";

import DriversService from "../../api/drivers";

import { IDriver } from "../../types/Driver";

export default defineComponent({
  name: "SearchDrivers",
  props: {
    modelValue: Array,
    default: () => [],
  },
  emits: ["update:modelValue", "select"],
  setup(props, { emit }) {
    const value = computed({
      get: () => props.modelValue,
      set: (driversID) => {
        emit(
          "select",
          drivers.value.filter((driver) => driversID?.includes(driver.id))
        );

        emit("update:modelValue", driversID);
      },
    });

    const drivers = ref<IDriver[] | []>([]);
    const optionsDriver = ref<{ label: string; value: number }[] | []>([]);

    const loading = ref(false);

    onMounted(async () => await fetchDrivers());

    const fetchDrivers = async () => {
      loading.value = true;

      try {
        drivers.value = await DriversService.getAll();

        optionsDriver.value = drivers.value.map((driver) => ({
          label: driver.name,
          value: driver.id,
        }));
      } finally {
        loading.value = false;
      }
    };

    return {
      value,
      optionsDriver,
      loading,
    };
  },
});
</script>
