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
        <search-address
          :modelValue="formData.address"
          @update:modelValue="formData.address = $event"
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
        {{ isEdit ? "Сохранить" : "Создать" }}
      </a-button>

      <a-button type="secondary" size="middle" @click="resetForm">
        Сбросить
      </a-button>

      <a-button
        v-if="isEdit"
        class="btn__delete"
        type="danger"
        size="middle"
        @click="handleDelete"
      >
        Удалить
      </a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRaw } from "vue";

import { useStore } from "vuex";

import type { FormInstance } from "ant-design-vue";

import DriverService from "../../../api/drivers";

import SearchAddress from "../../search-fields/SearchAddress.vue";

export default defineComponent({
  name: "CreateDriver",
  components: {
    SearchAddress,
  },
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

    const handleDelete = async () => {
      try {
        const driver = await DriverService.delete(formData.id);

        if (driver) {
          store.commit("table/IS_UPDATE_TABLE");
        }
      } finally {
        store.commit("sidepage/CLOSE_SIDE_PAGE");
      }
    };

    return {
      isEdit,
      formRef,
      formData,
      handleValidate,
      handleDelete,
      onSubmit,
      resetForm,
      validForm,
    };
  },
});
</script>
