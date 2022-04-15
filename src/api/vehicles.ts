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

  create(data: any): Promise<any> {
    return apiClient.post("/vehicles", data);
  }

  update(id: any, data: any): Promise<any> {
    return apiClient.put(`/vehicles/${id}`, data);
  }

  delete(id: any): Promise<any> {
    return apiClient.delete(`/vehicles/${id}`);
  }

  deleteAll(): Promise<any> {
    return apiClient.delete(`/vehicles`);
  }

  findByTitle(title: string): Promise<any> {
    return apiClient.get(`/vehicles?title=${title}`);
  }
}

export default new VehicleService();
