import apiClient from "./http/axios-client";
import { ITariff } from "../types/Tariff";

class TariffService {
  async getAll(params: object): Promise<ITariff[]> | [] {
    try {
      const response = await apiClient.get("/tariffs", {
        params,
      });

      return response.data || [];
    } catch (error) {
      throw new Error(`При получении тарифов произошла ошибка: ${error}`);
    }
  }

  get(id: any): Promise<any> {
    return apiClient.get(`/tariffs/${id}`);
  }

  async create(data: any): Promise<any> {
    try {
      const response = await apiClient.post("/tariffs", data);

      return response.data;
    } catch (error) {
      throw new Error(`При создании тарифов произошла ошибка: ${error}`);
    }
  }

  update(id: any, data: any): Promise<any> {
    return apiClient.put(`/tariffs/${id}`, data);
  }

  delete(id: any): Promise<any> {
    return apiClient.delete(`/tariffs/${id}`);
  }

  findByTitle(title: string): Promise<any> {
    return apiClient.get(`/tariffs?title=${title}`);
  }
}

export default new TariffService();
