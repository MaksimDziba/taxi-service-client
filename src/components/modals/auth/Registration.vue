<template>
  <a-form
    ref="formRef"
    :model="modelValue"
    name="basic"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    validateOnRuleChange
    @validate="handleValidate"
  >
    <a-form-item
      label="Почта"
      name="email"
      :rules="[{ required: true, message: 'Обязательное поле!' }]"
    >
      <a-input autoComplete="off" v-model:value="modelValue.email" />
    </a-form-item>

    <a-form-item
      label="Пароль"
      name="password"
      :rules="[{ required: true, message: 'Обязательное поле!' }]"
    >
      <a-input-password v-model:value="modelValue.password" />
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import type { FormInstance } from "ant-design-vue";

export default defineComponent({
  name: "Registration",
  props: {
    modelValue: Object,
  },
  setup(props, context) {
    const formRef = ref<FormInstance>();

    const handleValidate = (_, valid) => {
      context.emit("is-valid", valid);
    };

    return {
      formRef,
      handleValidate,
    };
  },
});
</script>