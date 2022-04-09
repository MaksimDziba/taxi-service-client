import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Drivers from "../pages/Drivers.vue";
import Orders from "../pages/Orders.vue";
import Vehicles from "../pages/Vehicles.vue";
import Clients from "../pages/Clients.vue";
import Tariffs from "../pages/Tariffs.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/drivers",
    name: "Drivers",
    component: Drivers,
  },
  {
    path: "/vehicles",
    name: "Vehicles",
    component: Vehicles,
  },
  {
    path: "/orders",
    name: "Orders",
    component: Orders,
  },
  {
    path: "/clients",
    name: "Clients",
    component: Clients,
  },
  {
    path: "/tariffs",
    name: "Tariffs",
    component: Tariffs,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
