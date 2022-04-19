import apiClient from "./http/axios-client";
import { ITariff } from "../types/Tariff";

class TariffService {
  async getAll(params: object): Promise<ITariff[]> | [] {
    try {
      const response = await apiClient.get("/tariffs", {
        params,
      });

      return response.data || [];
    } catch (err) {
      throw new Error(`При получении тарифов произошла ошибка: ${err}`);
    }
  }

  get(id: any): Promise<any> {
    return apiClient.get(`/tariffs/${id}`);
  }

  create(data: any): Promise<any> {
    return apiClient.post("/tariffs", data);
  }

  update(id: any, data: any): Promise<any> {
    return apiClient.put(`/tariffs/${id}`, data);
  }

  delete(id: any): Promise<any> {
    return apiClient.delete(`/tariffs/${id}`);
  }

  deleteAll(): Promise<any> {
    return apiClient.delete(`/tariffs`);
  }

  findByTitle(title: string): Promise<any> {
    return apiClient.get(`/tariffs?title=${title}`);
  }
}

export default new TariffService();
