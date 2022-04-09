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
        <span>
          <a-button
            type="primary"
            shape="circle"
            size="middle"
            @click="setUserToken"
          >
            <template #icon>
              <login-outlined />
            </template>
          </a-button>
          Авторизация
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
  </a-layout>
</template>


<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { singUp } from "../api/auth";

import { LoginOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  components: {
    LoginOutlined,
  },
  setup() {
    // ui data
    const collapsed = ref<boolean>(false);
    const loading = ref(true);

    async function setUserToken() {
      loading.value = true;

      try {
        await singUp();
      } finally {
        loading.value = false;
      }
    }

    return {
      collapsed,
      loading,
      setUserToken,
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
</style>