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
        label="Телефон клиента"
        name="client"
        :rules="rules.required"
      >
        <search-clients
          :is-disabled="isEdit"
          v-model:id="formData.clientID"
          v-model:phone="formData.client.phone"
        />
      </a-form-item>

      <a-form-item label="Тариф" name="tariffID" :rules="rules.required">
        <search-tariffs
          :item="formData.tariff"
          :modelValue="formData.tariffID"
          @update:modelValue="formData.tariffID = $event"
          @select-tariff="handleSelectTariff"
        />
      </a-form-item>

      <a-divider />

      <a-form-item
        label="Местонахождения"
        name="addressFrom"
        :rules="rules.required"
      >
        <search-address
          :modelValue="formData.addressFrom"
          @update:modelValue="formData.addressFrom = $event"
        />
      </a-form-item>

      <a-form-item label="Куда поедет" name="addressTo" :rules="rules.required">
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
          disabled
          :value="formData.preOrderCost"
          placeholder="Предварительная стоимость"
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
import { defineComponent, reactive, ref, toRaw, watch } from "vue";
import { useStore } from "vuex";
import { loadYmap } from "vue-yandex-maps";

import { yaSettings } from "../../../config/yandex";

// api
import OrderService from "../../../api/orders";

// interface
import type { FormInstance } from "ant-design-vue";
import { IOrder } from "../../../types/Order";

// components
import SearchClients from "../../search-fields/SearchClients.vue";
import SearchTariffs from "../../search-fields/SearchTariffs.vue";
import SearchDrivers from "../../search-fields/SearchDrivers.vue";
import SearchAddress from "../../search-fields/SearchAddress.vue";
import { ITariff } from "../../../types/Tariff";

export default defineComponent({
  name: "CreateOrder",
  components: {
    SearchClients,
    SearchTariffs,
    SearchDrivers,
    SearchAddress,
  },
  props: {
    data: Object as () => IOrder,
  },
  setup(props) {
    const store = useStore();
    const formRef = ref<FormInstance>();
    const validForm = ref<boolean>(true);
    const tariff = ref<ITariff | null>(null);

    const options = ref<[] | { value: string }[]>([]);

    const isEdit = !!props.data?.id;

    const formData: IOrder = reactive(
      isEdit
        ? { ...props.data }
        : {
            addressFrom: "",
            addressTo: "",
            timeOrder: null,
            maxCountPassenger: null,
            preOrderCost: 0,
            transportationAnimals: false,
            babyChair: false,
            operatorName: "",
            clientID: null,
            tariffID: null,
            client: {
              phone: "",
            },
            status: "pending",
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

    const resetForm = () => formRef.value.resetFields();

    const handleValidate = (_, valid) => (validForm.value = !valid);

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
      const nowTime = new Date();

      if (!selectedHour && selectedHour > nowTime.getHours()) {
        return [];
      }

      return [...Array(nowTime.getMinutes())].map((_, idx) => idx);
    };

    const rules = {
      required: [{ required: true, message: "Обязательное поле!" }],
    };

    const kilometersCount = ref<number>(4);

    const loadingYMap = async (addressFrom: string, addressTo: string) => {
      await loadYmap({ ...yaSettings });

      ymaps.ready(function () {
        const multiRoute = new ymaps.multiRouter.MultiRoute(
          {
            referencePoints: [addressFrom, addressTo],
            params: { results: 2 },
          },
          {
            boundsAutoApply: true,
            activeRouteAutoSelection: true,
          }
        );

        multiRoute.model.events
          .add("requestsuccess", function (event: any) {
            let route = event.get("target").getRoutes()[0];

            if (route) {
              // convert to kilometers
              kilometersCount.value =
                route.properties.get("distance").value / 1000;
            }
          })
          .add("requestfail", function (event: any) {
            alert("Ошибка загрузки маршрута");

            console.log(
              "Ошибка загрузки маршрута: " + event.get("error").message
            );
          });
      });
    };

    const calcOrderCost = () => {
      let calcCost = 0;

      if (tariff.value) {
        if (formData.tariffID) {
          calcCost = tariff.value.costPerKilometer * kilometersCount.value;
        }

        if (formData.transportationAnimals) {
          calcCost = tariff.value.costTransportingAnimals + calcCost;
        }

        if (formData.babyChair) {
          calcCost = tariff.value.costBabyChair + calcCost;
        }
      }

      return calcCost;
    };

    watch(formData, () => {
      if (formData.addressFrom && formData.addressTo) {
        loadingYMap(formData.addressFrom, formData.addressTo);
      }

      formData.preOrderCost = calcOrderCost();
    });

    const handleSelectTariff = (selectTariff: ITariff) => {
      tariff.value = selectTariff;
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
      handleSelectTariff,
      getDisabledHours,
      getDisabledMinutes,
      rules,
    };
  },
});
</script>
