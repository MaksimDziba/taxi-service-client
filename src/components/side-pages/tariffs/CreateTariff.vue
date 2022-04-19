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
        label="Название тарифа"
        name="type"
        :rules="[{ required: true, message: 'Обязательное поле!' }]"
      >
        <a-input
          placeholder="Заполнить поле"
          autoComplete="off"
          v-model:value="formData.type"
        />
      </a-form-item>

      <a-form-item
        label="Базовая стоимость за километр"
        name="costPerKilometer"
        :rules="[{ required: true, message: 'Обязательное поле!' }]"
      >
        <a-input
          placeholder="Заполнить поле"
          autoComplete="off"
          v-model:value="formData.costPerKilometer"
        />
      </a-form-item>

      <a-form-item
        label="Стоимость километра за городом"
        name="costOutOfCity"
        :rules="[{ required: true, message: 'Обязательное поле!' }]"
      >
        <a-input
          placeholder="Заполнить поле"
          autoComplete="off"
          v-model:value="formData.costOutOfCity"
        />
      </a-form-item>

      <a-form-item
        label="Стоимость простоя"
        name="costDownTime"
        :rules="[{ required: true, message: 'Обязательное поле!' }]"
      >
        <a-input
          placeholder="Заполнить поле"
          autoComplete="off"
          v-model:value="formData.costDownTime"
        />
      </a-form-item>

      <a-form-item
        label="Стоимость услуги 'Детское кресло'"
        name="costBabyChair"
        :rules="[{ required: true, message: 'Обязательное поле!' }]"
      >
        <a-input
          placeholder="Заполнить поле"
          autoComplete="off"
          v-model:value="formData.costBabyChair"
        />
      </a-form-item>

      <a-form-item
        label="Стоимость услуги 'Транспортировка животных'"
        name="costTransportingAnimals"
        :rules="[{ required: true, message: 'Обязательное поле!' }]"
      >
        <a-input
          placeholder="Заполнить поле"
          autoComplete="off"
          v-model:value="formData.costTransportingAnimals"
        />
      </a-form-item>
    </a-form>

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
        Сбросить
      </a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRaw } from "vue";

import { useStore } from "vuex";

import type { FormInstance } from "ant-design-vue";

import TariffService from "../../../api/tariffs";

export default defineComponent({
  name: "CreateTariff",
  props: {
    data: Object,
  },
  setup(props) {
    const store = useStore();

    const formRef = ref<FormInstance>();
    const validForm = ref<boolean>(true);

    const isEdit = !!Object.keys(props.data).length;

    const formData = reactive(
      isEdit
        ? props.data
        : {
            type: "",
            costPerKilometer: 0,
            costOutOfCity: 0,
            costBabyChair: 0,
            costDownTime: 0,
            costTransportingAnimals: 0,
          }
    );

    const handleValidate = (_, valid) => {
      validForm.value = !valid;
    };

    const fetchEditTariff = async (data) =>
      await TariffService.update(data.id, data);

    const fetchCreateTariff = async (data) => await TariffService.create(data);

    const onSubmit = async () => {
      try {
        const isValidForm = await formRef.value.validate();

        if (isValidForm) {
          const Tariff = isEdit
            ? fetchEditTariff(toRaw(formData))
            : fetchCreateTariff(toRaw(formData));

          if (Tariff) {
            resetForm();
            store.commit("table/IS_UPDATE_TABLE");
            store.commit("sidepage/CLOSE_SIDE_PAGE");
          }
        }
      } catch (error) {
        console.log("При создании водителя произошла ошибка", error);
      }
    };

    const resetForm = () => {
      formRef.value.resetFields();
    };

    return {
      formRef,
      formData,
      handleValidate,
      onSubmit,
      resetForm,
      validForm,
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