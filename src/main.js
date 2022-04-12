import { createApp } from "vue";
import router from "./router/index";
import store from "./service/store";
import App from "./App.vue";

const app = createApp(App);

app.use(store);
app.use(router);

app.mount("#app");
