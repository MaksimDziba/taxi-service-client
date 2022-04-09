<template>
  <a-button type="primary" @click="showDrawer">Open</a-button>
  <a-drawer
    title="Basic Drawer"
    :placement="right"
    :closable="false"
    :visible="visible"
    @close="onClose"
  >
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-drawer>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const visible = ref<boolean>(false);

    const showDrawer = () => {
      visible.value = true;
    };

    const onClose = () => {
      visible.value = false;
    };

    return {
      visible,
      showDrawer,
      onClose,
    };
  },
});
</script>