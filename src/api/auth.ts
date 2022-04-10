import apiClient from "./http/axios-client";

import { IUser } from "../interface/User";

import Notification from "../components/notification/Notification.vue";

const loginUser = async (params: IUser) => {
  try {
    const { data } = await apiClient.get("/auth/login", params);

    if (data) {
      const token = `Bearer ${data.Authenticate}`;

      apiClient.defaults.headers.common["Authorization"] = token;
    }
  } catch (error) {
    throw new Error(`При получении токена произошла ошибка. ${error}`);
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

export { loginUser, registrationUser };
