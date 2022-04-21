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
        label="ФИО"
        name="name"
        :rules="[{ required: true, message: 'Обязательное поле!' }]"
      >
        <a-input
          placeholder="Заполнить поле"
          autoComplete="off"
          v-model:value="formData.name"
        />
      </a-form-item>

      <a-form-item
        label="Паспорт"
        name="passport"
        :rules="[{ required: true, message: 'Обязательное поле!' }]"
      >
        <a-input
          placeholder="Заполнить поле"
          v-model:value="formData.passport"
        />
      </a-form-item>
      <a-form-item
        label="Адрес проживания"
        name="address"
        :rules="[{ required: true, message: 'Обязательное поле!' }]"
      >
        <a-input
          placeholder="Заполнить поле"
          autoComplete="off"
          v-model:value="formData.address"
        />
      </a-form-item>

      <a-form-item
        label="Телефон"
        name="phone"
        :rules="[{ required: true, message: 'Обязательное поле!' }]"
      >
        <a-input placeholder="Заполнить поле" v-model:value="formData.phone" />
      </a-form-item>
      <a-form-item
        label="Водительское удостоверение"
        name="driverLicense"
        :rules="[{ required: true, message: 'Обязательное поле!' }]"
      >
        <a-input
          placeholder="Заполнить поле"
          autoComplete="off"
          v-model:value="formData.driverLicense"
        />
      </a-form-item>

      <a-form-item
        label="Номер договора"
        name="contractNumber"
        :rules="[{ required: true, message: 'Обязательное поле!' }]"
      >
        <a-input
          placeholder="Заполнить поле"
          v-model:value="formData.contractNumber"
        />
      </a-form-item>
      <a-form-item
        label="Способ оплаты заказа"
        name="paymentMethod"
        :rules="[{ required: true, message: 'Обязательное поле!' }]"
      >
        <a-radio-group v-model:value="formData.paymentMethod">
          <a-radio value="phone">телефон</a-radio>
          <a-radio value="terminal">терминал</a-radio>
          <a-radio value="cash">наличными</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item
        label="Согласие на транспортировку животных"
        name="transportationAnimals"
        :rules="[{ required: true, message: 'Обязательное поле!' }]"
      >
        <a-radio-group v-model:value="formData.transportationAnimals">
          <a-radio :value="true">Да</a-radio>
          <a-radio :value="false">Нет</a-radio>
        </a-radio-group>
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

import DriverService from "../../../api/drivers";

export default defineComponent({
  name: "CreateDriver",
  props: {
    data: Object,
  },
  setup(props, { emit }) {
    const store = useStore();

    const formRef = ref<FormInstance>();
    const validForm = ref<boolean>(true);

    const isEdit = !!props.data?.id;

    const formData = reactive(
      isEdit
        ? props.data
        : {
            name: "",
            passport: "",
            address: "",
            phone: "",
            driverLicense: "",
            contractNumber: "",
            paymentMethod: "phone",
            transportationAnimals: false,
          }
    );

    const handleValidate = (_, valid) => {
      validForm.value = !valid;
    };

    const fetchEditDriver = (data) => DriverService.update(data.id, data);
    const fetchCreateDriver = (data) => DriverService.create(data);

    const onSubmit = async () => {
      try {
        const isValidForm = await formRef.value.validate();

        if (isValidForm) {
          const driver = isEdit
            ? await fetchEditDriver(toRaw(formData))
            : await fetchCreateDriver(toRaw(formData));

          if (driver) {
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