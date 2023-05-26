import apiClient from "./http/axios-client";

import { IDriver } from "../interface/Driver";

class DriverService {
  async getAll(): Promise<IDriver[] | []> {
    try {
      const response = await apiClient.get("/drivers");

      return response.data || [];
    } catch (error) {
      throw new Error(`При получении водителей произошла ошибка: ${error}`);
    }
  }

  get(id: any): Promise<any> {
    return apiClient.get(`/drivers/${id}`);
  }

  async create(data: any): Promise<any> {
    try {
      const response = await apiClient.post("/drivers", data);

      return response.data;
    } catch (error) {
      throw new Error(`При создании водителя произошла ошибка: ${error}`);
    }
  }

  update(id: any, data: any): Promise<any> {
    return apiClient.put(`/drivers/${id}`, data);
  }

  delete(id: any): Promise<any> {
    return apiClient.delete(`/drivers/${id}`);
  }

  findByTitle(title: string): Promise<any> {
    return apiClient.get(`/drivers?title=${title}`);
  }
}

export default new DriverService();
