<template>
  <div class="side-page side-page__with-footer">
    <a-form
      ref="formRef"
      layout="vertical"
      :model="formData"
      name="basic"
      validateOnRuleChange
      @validate="handleValidate"
    >
      <a-form-item
        label="Модель"
        name="carModel"
        :rules="[{ required: true, message: 'Обязательное поле!' }]"
      >
        <a-input
          placeholder="Заполнить поле"
          autoComplete="off"
          v-model:value="formData.carModel"
        />
      </a-form-item>

      <a-form-item
        label="Гос. номер"
        name="gosNumber"
        :rules="[{ required: true, message: 'Обязательное поле!' }]"
      >
        <a-input
          placeholder="Заполнить поле"
          v-model:value="formData.gosNumber"
        />
      </a-form-item>

      <a-form-item
        label="Цвет автомобиля"
        name="carColor"
        :rules="[{ required: true, message: 'Обязательное поле!' }]"
      >
        <a-input
          placeholder="Заполнить поле"
          autoComplete="off"
          v-model:value="formData.carColor"
        />
      </a-form-item>

      <a-form-item
        label="Дата производства"
        name="dateManufacture"
        :rules="[{ required: true, message: 'Обязательное поле!' }]"
      >
        <a-input
          placeholder="Заполнить поле"
          v-model:value="formData.dateManufacture"
        />
      </a-form-item>

      <a-form-item
        label="Грузоподъемность"
        name="capacity"
        :rules="[{ required: true, message: 'Обязательное поле!' }]"
      >
        <a-select
          placeholder="Заполнить поле"
          v-model:value="formData.capacity"
          :options="capacityOptions"
        />
      </a-form-item>

      <a-form-item
        label="Детское кресло"
        name="babyChair"
        :rules="[{ required: true, message: 'Обязательное поле!' }]"
      >
        <a-radio-group v-model:value="formData.babyChair">
          <a-radio value="true">Да</a-radio>
          <a-radio value="false">Нет</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item
        label="Макс. кол-во пассажиров"
        name="maxCountPassenger"
        :rules="[{ required: true, message: 'Обязательное поле!' }]"
      >
        <a-input
          v-model:value="formData.maxCountPassenger"
          placeholder="Заполнить поле"
        />
      </a-form-item>
    </a-form>

    <a-divider />

    <div>Добавить водителя</div>

    <a-divider />

    <search-drivers
      :modelValue="formData.drivers"
      @update:modelValue="formData.drivers = $event"
    />

    <div class="side-page__footer">
      <a-button
        type="primary"
        size="middle"
        :disabled="validForm"
        @click="onSubmit"
      >
        Создать
      </a-button>

      <a-button type="secondary" size="middle" @click="resetForm">
        Отменить
      </a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRaw } from "vue";

import { useStore } from "vuex";

// components
import SearchDrivers from "./SearchDrivers.vue";

// interface
import type { FormInstance } from "ant-design-vue";

// api
import VehicleService from "../../../api/vehicles";

const capacity = [
  { label: "Малой грузоподъемности (0,5-2 тонны)", value: "0,5-2 тонны" },
  {
    label: "Средней грузоподъемности (от 2 до 5 тонн)",
    value: "от 2 до 5 тонн",
  },
  { label: "Большой грузоподъемности (5-16 тонн)", value: "5-16 тонн" },
  { label: "Особой большой (от 16 тонн)", value: "от 16 тонн" },
];

export default defineComponent({
  name: "CreateDriver",
  components: {
    SearchDrivers,
  },
  setup() {
    const store = useStore();
    const formRef = ref<FormInstance>();
    const validForm = ref<boolean>(true);
    const options = ref<[] | { value: string }[]>([]);
    const capacityOptions = capacity;

    const formData = reactive({
      gosNumber: "",
      dateManufacture: "",
      carModel: "",
      carColor: "",
      capacity: null,
      babyChair: false,
      maxCountPassenger: null,
      drivers: [],
    });

    const onSubmit = async () => {
      try {
        const isValidForm = await formRef.value.validate();

        if (isValidForm) {
          const driver = await VehicleService.create(toRaw(formData));

          if (driver) {
            resetForm();
            store.commit("table/IS_UPDATE_TABLE");
            store.commit("sidepage/CLOSE_SIDE_PAGE");
          }
        }
      } catch (error) {
        console.log(
          "При создании транспортного средства произошла ошибка",
          error
        );
      }
    };

    const resetForm = () => {
      formRef.value.resetFields();
    };

    const handleValidate = (_, valid) => {
      validForm.value = !valid;
    };

    return {
      formRef,
      formData,
      capacityOptions,
      onSubmit,
      resetForm,
      options,
      validForm,
      handleValidate,
    };
  },
});
</script>

<style scoped>
.side-page__with-footer {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.side-page__footer {
  margin-top: auto;
}

.side-page__footer button {
  margin-left: 10px;
}
</style>