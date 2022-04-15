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
        <a-input v-model:value="formData.maxCountPassenger" />
      </a-form-item>
    </a-form>

    <a-divider />

    <div>Добавить водителя</div>

    <a-divider />

    <search-drivers v-model="formData.drivers" />

    <div class="side-page__footer">
      <a-button type="primary" size="middle" @click="onSubmit">
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
  setup(props, context) {
    const formRef = ref<FormInstance>();
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

    const handleValidate = (_, valid) => {
      context.emit("is-valid", valid);
    };

    const onSubmit = () => {
      formRef.value
        .validate()
        .then(() => {
          VehicleService.create(toRaw(formData));
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    const resetForm = () => {
      formRef.value.resetFields();
    };

    return {
      formRef,
      formData,
      capacityOptions,
      handleValidate,
      onSubmit,
      resetForm,
      options,
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