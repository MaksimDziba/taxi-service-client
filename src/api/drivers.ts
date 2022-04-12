import apiClient from "./http/axios-client";

class DriverService {
  async getAll(): Promise<any> {
    try {
      const response = await apiClient.get("/drivers");

      return response.data || [];
    } catch (err) {
      throw new Error(`При получении водителей произошла ошибка: ${err}`);
    }
  }

  get(id: any): Promise<any> {
    return apiClient.get(`/drivers/${id}`);
  }

  create(data: any): Promise<any> {
    return apiClient.post("/drivers", data);
  }

  update(id: any, data: any): Promise<any> {
    return apiClient.put(`/drivers/${id}`, data);
  }

  delete(id: any): Promise<any> {
    return apiClient.delete(`/drivers/${id}`);
  }

  deleteAll(): Promise<any> {
    return apiClient.delete(`/drivers`);
  }

  findByTitle(title: string): Promise<any> {
    return apiClient.get(`/drivers?title=${title}`);
  }
}

export default new DriverService();
