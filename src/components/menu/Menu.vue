<template>
  <a-menu theme="dark" v-model:selectedKeys="selectedKeys" mode="inline">
    <a-menu-item key="1">
      <user-outlined />
      <span class="menu-item">
        <router-link to="/drivers">Водители</router-link>
      </span>
    </a-menu-item>
    <a-menu-item key="2">
      <alert-outlined />
      <span class="menu-item">
        <router-link to="/vehicles">Транспорт</router-link>
      </span>
    </a-menu-item>
    <a-menu-item key="3">
      <thunderbolt-outlined />
      <span class="menu-item">
        <router-link to="/orders">Заказы</router-link>
      </span>
    </a-menu-item>
    <a-menu-item key="4">
      <usergroup-add-outlined />
      <span class="menu-item">
        <router-link to="/clients">Клиенты</router-link>
      </span>
    </a-menu-item>
    <a-menu-item key="5">
      <safety-certificate-outlined />
      <span class="menu-item">
        <router-link to="/tariffs">Тарифы</router-link>
      </span>
    </a-menu-item>
  </a-menu>
</template>

<script lang="ts">
import {
  UserOutlined,
  AlertOutlined,
  ThunderboltOutlined,
  UsergroupAddOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: {
    UserOutlined,
    AlertOutlined,
    ThunderboltOutlined,
    UsergroupAddOutlined,
    SafetyCertificateOutlined,
  },
  data() {
    return {
      collapsed: ref<boolean>(false),
      selectedKeys: ref<string[]>(["1"]),
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