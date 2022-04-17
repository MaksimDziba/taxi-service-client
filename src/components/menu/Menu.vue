<template>
  <a-menu theme="dark" v-model:selectedKeys="selectedKeys" mode="inline">
    <a-menu-item key="1">
      <appstore-outlined />
      <span class="menu-item">
        <router-link to="/">Главная</router-link>
      </span>
    </a-menu-item>
    <a-menu-item key="2">
      <user-outlined />
      <span class="menu-item">
        <router-link to="/drivers">Водители</router-link>
      </span>
    </a-menu-item>
    <a-menu-item key="3">
      <alert-outlined />
      <span class="menu-item">
        <router-link to="/vehicles">Транспорт</router-link>
      </span>
    </a-menu-item>
    <a-menu-item key="4">
      <thunderbolt-outlined />
      <span class="menu-item">
        <router-link to="/orders">Заказы</router-link>
      </span>
    </a-menu-item>
    <a-menu-item key="5">
      <usergroup-add-outlined />
      <span class="menu-item">
        <router-link to="/clients">Клиенты</router-link>
      </span>
    </a-menu-item>
    <a-menu-item key="6">
      <safety-certificate-outlined />
      <span class="menu-item">
        <router-link to="/tariffs">Тарифы</router-link>
      </span>
    </a-menu-item>
  </a-menu>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

// icons
import {
  AppstoreOutlined,
  UserOutlined,
  AlertOutlined,
  ThunderboltOutlined,
  UsergroupAddOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons-vue";

const items = ["", "/", "/drivers", "/vehicles", "/orders", "/clients"];

export default defineComponent({
  components: {
    AppstoreOutlined,
    UserOutlined,
    AlertOutlined,
    ThunderboltOutlined,
    UsergroupAddOutlined,
    SafetyCertificateOutlined,
  },
  data() {
    const routerPath = window.location.pathname;
    const current = items.findIndex((item) => item === routerPath) || "1";

    return {
      collapsed: ref<boolean>(false),
      selectedKeys: ref<string[]>([`${current}`]),
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
.menu-item a {
  color: white;
}
</style>