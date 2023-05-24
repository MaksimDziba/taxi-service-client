import apiClient from "./http/axios-client";

import { IUser } from "../interface/User";

import Notification from "../components/notification/Notification.vue";

const loginUser = async (params) => {
  try {
    const { data } = await apiClient.post('/auth/login', params);

    if (data.token && data.user) {
      const token = `Bearer ${data.token}`;

      apiClient.defaults.headers.common['Authorization'] = token;

      return data || {};
    }
  } catch (error) {
    throw new Error(`При получении токена произошла ошибка. ${error}`);
  }
};

const logoutUser = async () => {
  try {
    apiClient.defaults.headers.common["Authorization"] = "";
  } catch (error) {
    Notification({
      message: "error",
      description: `При выходе из приложения произошла ошибка: ${error}`,
    });

    throw new Error(`При выходе из приложения произошла ошибка. ${error}`);
  }
};

const registrationUser = async (params: IUser) => {
  try {
    const { data } = await apiClient.post("/auth/registration", params);

    if (data) {
      const token = `Bearer ${data.Authenticate}`;

      apiClient.defaults.headers.common["Authorization"] = token;
    }
  } catch (error) {
    Notification({ message: "some", description: "some" });
    // throw new Error(`При получении токена произошла ошибка. ${error}`);
  }
};

export { loginUser, registrationUser, logoutUser };
