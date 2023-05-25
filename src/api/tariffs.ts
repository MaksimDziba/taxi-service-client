import apiClient from "./http/axios-client";
import { ITariff } from "../types/Tariff";

class TariffService {
  async getAll(): Promise<ITariff[] | []>  {
    try {
      const response = await apiClient.get("/tariffs");

      return response.data || [];
    } catch (error) {
      throw new Error(`При получении тарифов произошла ошибка: ${error}`);
    }
  }

  get(id: number): Promise<ITariff> {
    return apiClient.get(`/tariffs/${id}`);
  }

  async create(data: ITariff): Promise<ITariff> {
    try {
      const response = await apiClient.post("/tariffs", data);

      return response.data;
    } catch (error) {
      throw new Error(`При создании тарифа произошла ошибка: ${error}`);
    }
  }

  update(id: number, data: ITariff): Promise<ITariff> {
    return apiClient.put(`/tariffs/${id}`, data);
  }

  async delete(id: number): Promise<ITariff> {
    try {
      const response = await apiClient.delete(`/tariffs/${id}`);

      return response.data;
    } catch (error) {
      throw new Error(`При удалении тарифа произошла ошибка: ${error}`);
    }
  }

  findByTitle(title: string): Promise<ITariff[]> {
    return apiClient.get(`/tariffs?title=${title}`);
  }
}

export default new TariffService();
