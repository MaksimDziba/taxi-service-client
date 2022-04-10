<template>
  <div>
    <a-modal
      v-model:visible="visible"
      :title="modalData.titleText"
      :ok-text="modalData.okText"
      cancel-text="Отмена"
      @ok="handleOk"
      @cancel="handleClose"
      :okButtonProps="{
        disabled: validForm,
      }"
    >
      <component
        :is="modalData.component"
        :modelValue="formState"
        @is-valid="handleValidForm"
      />
    </a-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed, reactive } from "vue";

import { loginUser, registrationUser } from "../../../api/auth";

import Registration from "./Registration.vue";
import Login from "./Login.vue";

// interface
import { IUser } from "../../../interface/User";

export default defineComponent({
  components: {
    Registration,
    Login,
  },
  name: "ModalAuth",
  props: {
    type: {
      type: String,
      default: "",
    },
  },
  emits: ["close"],
  setup(props, context) {
    const visible = ref<boolean>(!!props.type);
    const validForm = ref<boolean>(false);

    const formState = reactive<IUser>({
      email: "",
      password: "",
    });

    const modalData = computed(
      () =>
        ({
          login: {
            titleText: "Авторизация",
            component: "Login",
            request: "Login",
            okText: "Вход",
          },
          registration: {
            titleText: "Регистрация",
            component: "Registration",
            request: "Registration",
            okText: "Зарегистрироваться",
          },
        }[props.type])
    );

    const handleClose = () => {
      visible.value = false;

      context.emit("close");
    };

    const handleOk = async () => {
      if (props.type === "registration") {
        try {
          const userData = await registrationUser(formState);

          console.log("userData", userData);

          handleClose();
        } catch (error) {
          console.log(`Ошибка при отправке данных ${props.type}: ${error}`);
        }
      }

      if (props.type === "login") {
        try {
          const userData = await loginUser(formState);

          console.log("userData", userData);

          handleClose();
        } catch (error) {
          console.log(`Ошибка при отправке данных ${props.type}: ${error}`);
        }
      }
    };

    const handleValidForm = (valid) => {
      validForm.value = !valid;
    };

    return {
      visible,
      modalData,
      handleOk,
      handleClose,
      formState,
      validForm,
      handleValidForm,
    };
  },
});
</script>