<script lang="ts">
import { notification } from "ant-design-vue";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    message: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const openNotification = () => {
      notification.error({
        message: props.message,
        description: props.description,
      });
    };

    return {
      openNotification,
    };
  },
});
</script>