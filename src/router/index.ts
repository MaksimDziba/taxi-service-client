import { createRouter, createWebHistory } from "vue-router";

import StorageService from "../service/storage.service.js";

import Auth from "../pages/Auth.vue";
import Home from "../pages/Home.vue";
import Drivers from "../pages/Drivers.vue";
import Orders from "../pages/Orders.vue";
import Vehicles from "../pages/Vehicles.vue";
import Clients from "../pages/Clients.vue";
import Tariffs from "../pages/Tariffs.vue";

const checkAuthentication = async () => {
  const user = (await StorageService.user.get()) || {};
  const token = (await StorageService.token.get()) || "";

  return !!token && !!user;
};

// Пропускает только пользователей, не прошедших авторизацию или регистрацию
const isNotAuth = async (to, from, next) => {
  const isAuthenticated = await checkAuthentication();

  next(!isAuthenticated ? true : { path: "/auth" });
};

// Пропускает только авторизованных пользователей
const isAuth = async (to, from, next) => {
  const isAuthenticated = await checkAuthentication();

  if (isAuthenticated) {
    next(true);
  } else {
    next({
      name: "Auth",
      query: to.query,
    });
  }
};

const routes = [
  {
    path: "/auth",
    name: "Auth",
    component: Auth,
    beforeEnter: isNotAuth,
  },
  {
    path: "/home",
    name: "Home",
    meta: {
      auth: true,
    },
    component: Home,
    beforeEnter: isAuth,
  },
  {
    path: "/drivers",
    name: "Drivers",
    meta: {
      auth: true,
    },
    component: Drivers,
    beforeEnter: isAuth,
  },
  {
    path: "/vehicles",
    name: "Vehicles",
    meta: {
      auth: true,
    },
    component: Vehicles,
    beforeEnter: isAuth,
  },
  {
    path: "/orders",
    name: "Orders",
    meta: {
      auth: true,
    },
    component: Orders,
    beforeEnter: isAuth,
  },
  {
    path: "/clients",
    name: "Clients",
    meta: {
      auth: true,
    },
    component: Clients,
    beforeEnter: isAuth,
  },
  {
    path: "/tariffs",
    name: "Tariffs",
    meta: {
      auth: true,
    },
    component: Tariffs,
    beforeEnter: isAuth,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: {
      name: "Home",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
