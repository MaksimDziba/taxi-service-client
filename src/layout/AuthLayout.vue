<template>
  <div class="auth-page__login-form">
    <div class="auth-page__login-form-header">
      Вход в систему "Службы заказа такси"
    </div>

    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onAuth"
    >
      <a-form-item
        label="Логин"
        name="phone"
        :rules="[{ required: true, message: 'Обязательное поле!' }]"
      >
        <a-input v-model:value="formState.phone" />
      </a-form-item>

      <a-form-item
        label="Пароль"
        name="password"
        :rules="[{ required: true, message: 'Обязательное поле!' }]"
      >
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit" :disabled="disabledButton">
          Войти
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "vue";

import { useRouter } from "vue-router";
import { useStore } from "vuex";

import { loginUser } from "../api/auth";

interface FormState {
  phone: string;
  password: string;
}

export default defineComponent({
  name: "AuthLayout",
  setup() {
    const router = useRouter();
    const store = useStore();

    const formState = reactive<FormState>({
      phone: "",
      password: "",
    });

    const onAuth = async (values: FormState) => {
      const { token, user } = await loginUser(values);

      if (token && user) {
        await store.dispatch("base/setToken", token);
        await store.dispatch("base/setUser", user);

        router.push({ path: "/home" });
      }
    };

    const disabledButton = computed(() => {
      return !(formState.phone && formState.password);
    });

    return {
      formState,
      onAuth,
      disabledButton,
    };
  },
});
</script>
