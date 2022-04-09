import apiClient from "./http/axios-client";

export const singUp = async () => {
  try {
    const { data } = await apiClient.get("/signup");

    if (data) {
      const token = `Bearer ${data.Authenticate}`;

      apiClient.defaults.headers.common["Authorization"] = token;
    }
  } catch (error) {
    throw new Error(`При получении токена произошла ошибка. ${error}`);
  }
};
