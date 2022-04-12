<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo">
        <img alt="Taxi service logo" src="../assets/taxi-logo.png" />
      </div>
      <Menu />
    </a-layout-sider>

    <a-layout>
      <a-layout-header
        style="background: #fff; padding: 0 30px; text-align: right"
      >
        <span class="btn-auth">
          <a-button
            type="primary"
            shape="round"
            size="middle"
            @click="handleModalType('login')"
          >
            <template #icon>
              <login-outlined />
            </template>
            Авторизация
          </a-button>
        </span>
        <span class="btn-auth">
          <a-button
            type="primary"
            shape="round"
            size="middle"
            @click="handleModalType('registration')"
          >
            <template #icon>
              <login-outlined />
            </template>
            Регистрация
          </a-button>
        </span>
        <span class="btn-auth">
          <a-button
            type="primary"
            shape="round"
            size="middle"
            @click="handleModalType('logout')"
          >
            <template #icon>
              <login-outlined />
            </template>
            Выход
          </a-button>
        </span>
      </a-layout-header>

      <a-layout-content
        style="margin: 0 16px; display: flex; flex-direction: column"
      >
        <div
          :style="{
            padding: '24px',
            background: '#fff',
            minHeight: '360px',
            margin: '16px 0',
            flex: '1 1 auto',
          }"
        >
          <!-- main router content -->
          <slot name="content" />
        </div>
      </a-layout-content>

      <a-layout-footer style="text-align: center">
        Taxi Service ©2022 Created by Maksim Dziba
      </a-layout-footer>
    </a-layout>

    <modal-auth v-if="modalType" :type="modalType" @close="handleModalClose" />

    <side-pages />
  </a-layout>
</template>


<script lang="ts">
import { defineComponent, ref } from "vue";

// import { useStore } from "vuex";

import ModalAuth from "../components/modals/auth/ModalAuth.vue";

// icons
import { LoginOutlined } from "@ant-design/icons-vue";

// interface
import { ISidePageState } from "../service/store/modules/side-page/interface";

export default defineComponent({
  components: {
    LoginOutlined,
    ModalAuth,
  },
  setup() {
    // const store = useStore<ISidePageState>();

    // ui data
    const collapsed = ref<boolean>(false);
    const loading = ref<boolean>(true);
    const modalType = ref<string>("");

    const handleModalType = (value) => {
      modalType.value = value;
    };

    const handleModalClose = () => {
      modalType.value = "";
    };

    // TODO: добавить лоадер из стейта

    return {
      collapsed,
      loading,
      modalType,
      handleModalType,
      handleModalClose,
    };
  },
});
</script>
<style>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}

.logo {
  text-align: center;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.logo img {
  height: 40px;
}

.btn-auth {
  margin-right: 10px;
}
</style>