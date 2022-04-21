import apiClient from "./http/axios-client";

class VehicleService {
  async getAll(): Promise<any> {
    try {
      const response = await apiClient.get("/vehicles");

      return response.data || [];
    } catch (error) {
      throw new Error(
        `При получении транспортных средств произошла ошибка: ${error}`
      );
    }
  }

  get(id: any): Promise<any> {
    return apiClient.get(`/vehicles/${id}`);
  }

  async create(data: any): Promise<any> {
    try {
      const response = await apiClient.post("/vehicles", data);

      return response.data;
    } catch (error) {
      throw new Error(`При создании ТС произошла ошибка: ${error}`);
    }
  }

  update(id: any, data: any): Promise<any> {
    return apiClient.put(`/vehicles/${id}`, data);
  }

  delete(id: any): Promise<any> {
    return apiClient.delete(`/vehicles/${id}`);
  }

  findByTitle(title: string): Promise<any> {
    return apiClient.get(`/vehicles?title=${title}`);
  }
}

export default new VehicleService();
