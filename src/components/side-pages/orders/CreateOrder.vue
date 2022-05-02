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
        label="ФИО клиента"
        name="clientID"
        :rules="[{ required: true, message: 'Обязательное поле!' }]"
      >
        <search-clients
          :modelValue="formData.clientID"
          @update:modelValue="formData.clientID = [$event[0]]"
        />
      </a-form-item>

      <a-form-item
        label="Тариф"
        name="tariffID"
        :rules="[{ required: true, message: 'Обязательное поле!' }]"
      >
        <search-tariffs
          :modelValue="formData.tariffID"
          @update:modelValue="formData.tariffID = [$event]"
        />
      </a-form-item>

      <a-divider />

      <a-form-item
        label="Местонахождения"
        name="addressFrom"
        :rules="[{ required: true, message: 'Обязательное поле!' }]"
      >
        <search-address
          :modelValue="formData.addressFrom"
          @update:modelValue="formData.addressFrom = $event"
        />
      </a-form-item>

      <a-form-item
        label="Куда поедет"
        name="addressTo"
        :rules="[{ required: true, message: 'Обязательное поле!' }]"
      >
        <search-address
          :modelValue="formData.addressTo"
          @update:modelValue="formData.addressTo = $event"
        />
      </a-form-item>

      <a-form-item label="Время подачи" name="timeOrder">
        <a-time-picker
          placeholder="Заполните время"
          :disabledHours="getDisabledHours"
          :disabledMinutes="getDisabledMinutes"
          :showNow="false"
          :minuteStep="5"
          format="HH:mm"
        />
      </a-form-item>

      <a-form-item label="Макс. кол-во пассажиров" name="maxCountPassenger">
        <a-input
          v-model:value="formData.maxCountPassenger"
          placeholder="Заполнить поле"
        />
      </a-form-item>

      <a-form-item label="Предварительная стоимость" name="preOrderCost">
        <a-input
          v-model:value="formData.preOrderCost"
          placeholder="Заполнить поле"
        />
      </a-form-item>

      <a-form-item
        label="Транспортировка животных"
        name="transportationAnimals"
      >
        <a-radio-group v-model:value="formData.transportationAnimals">
          <a-radio :value="true">Да</a-radio>
          <a-radio :value="false">Нет</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="Детское кресло" name="babyChair">
        <a-radio-group v-model:value="formData.babyChair">
          <a-radio :value="true">Да</a-radio>
          <a-radio :value="false">Нет</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item
        label="ФИО оператора"
        name="operatorName"
        :rules="[{ required: true, message: 'Обязательное поле!' }]"
      >
        <a-input
          v-model:value="formData.operatorName"
          placeholder="Заполнить поле"
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

// interface
import type { FormInstance } from "ant-design-vue";

// api
import OrderService from "../../../api/orders";

// components
import SearchClients from "../../search-fields/SearchClients.vue";
import SearchTariffs from "../../search-fields/SearchTariffs.vue";
import SearchDrivers from "../../search-fields/SearchDrivers.vue";
import SearchAddress from "../../search-fields/SearchAddress.vue";

export default defineComponent({
  name: "CreateOrder",
  components: {
    SearchClients,
    SearchTariffs,
    SearchDrivers,
    SearchAddress,
  },
  props: {
    data: Object,
  },
  setup(props) {
    const store = useStore();
    const formRef = ref<FormInstance>();
    const validForm = ref<boolean>(true);

    const options = ref<[] | { value: string }[]>([]);

    const isEdit = !!props.data?.id;

    const formData = reactive(
      isEdit
        ? {
            ...toRaw(props.data),
            clientID: [props.data.client.name],
            tariffID: [props.data.tariff.type],
          }
        : {
            id: null,
            clientID: [],
            tariffID: [],
            addressFrom: "",
            addressTo: "",
            timeOrder: new Date(),
            maxCountPassenger: null,
            preOrderCost: 0,
            transportationAnimals: false,
            babyChair: false,
            operatorName: "",
          }
    );

    const fetchEditOrder = (data) => OrderService.update(data.id, data);

    const fetchCreateOrder = (data) => OrderService.create(data);

    const onSubmit = async () => {
      try {
        const isValidForm = await formRef.value.validate();

        if (isValidForm) {
          const order = isEdit
            ? await fetchEditOrder(toRaw(formData))
            : await fetchCreateOrder(toRaw(formData));

          if (order) {
            resetForm();
            store.commit("table/IS_UPDATE_TABLE");
            store.commit("sidepage/CLOSE_SIDE_PAGE");
          }
        }
      } catch (error) {
        console.log("При создании заказа произошла ошибка", error);
      }
    };

    const resetForm = () => {
      formRef.value.resetFields();
    };

    const handleValidate = (_, valid) => {
      validForm.value = !valid;
    };

    const handleDelete = async () => {
      try {
        if (formData.id) {
          const tariff = await OrderService.delete(formData.id);

          if (tariff) {
            store.commit("table/IS_UPDATE_TABLE");
          }
        }
      } finally {
        store.commit("sidepage/CLOSE_SIDE_PAGE");
      }
    };

    const getDisabledHours = () => {
      const hour = new Date().getHours();

      return [...Array(hour)].map((_, idx) => idx);
    };

    const getDisabledMinutes = (selectedHour) => {
      if (!selectedHour) {
        return [];
      }

      const nowTime = new Date();

      if (selectedHour > nowTime.getHours()) {
        return [];
      } else {
        return [...Array(nowTime.getMinutes())].map((_, idx) => idx);
      }
    };

    return {
      isEdit,
      formRef,
      formData,
      onSubmit,
      resetForm,
      options,
      validForm,
      handleValidate,
      handleDelete,
      getDisabledHours,
      getDisabledMinutes,
    };
  },
});
</script>