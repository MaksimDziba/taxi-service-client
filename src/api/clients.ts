import apiClient from "./http/axios-client";
import { IClient } from "../types/Client";

class ClientService {
  async getAll(params: object): Promise<IClient[]> | [] {
    try {
      const response = await apiClient.get("/clients", {
        params,
      });

      return response.data || [];
    } catch (error) {
      throw new Error(`При получении клиентов произошла ошибка: ${error}`);
    }
  }

  async get(id: number): Promise<IClient> {
    const response = await apiClient.get(`/clients/${id}`);

    return response.data || {};
  }

  async create(data: IClient): Promise<IClient> {
    try {
      const response = await apiClient.post("/clients", data);

      return response.data;
    } catch (error) {
      throw new Error(`При создании клиента произошла ошибка: ${error}`);
    }
  }

  update(id: number, data: IClient): Promise<IClient> {
    return apiClient.put(`/clients/${id}`, data);
  }

  async delete(id: number): Promise<IClient> {
    try {
      const response = await apiClient.delete(`/clients/${id}`);

      return response.data;
    } catch (error) {
      throw new Error(`При удалении клиента произошла ошибка: ${error}`);
    }
  }

  findByTitle(title: string): Promise<IClient[]> {
    return apiClient.get(`/clients?title=${title}`);
  }
}

export default new ClientService();
