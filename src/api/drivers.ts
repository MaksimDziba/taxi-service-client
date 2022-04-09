import apiClient from "./http/axios-client";

class DriversDataService {
  getAll(): Promise<any> {
    return apiClient.get("/drivers");
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

export default new DriversDataService();
