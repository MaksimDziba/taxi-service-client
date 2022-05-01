<template>
  <Layout>
    <template #content>
      <router-view />
    </template>
  </Layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Layout from "./layout/Layout.vue";

export default defineComponent({
  name: "App",
  components: {
    Layout,
  },
});
</script>

<style lang="sass">
@import "./assets/style/main.scss"
</style>