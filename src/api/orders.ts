import apiClient from "./http/axios-client";

class OrderService {
  async getAll(params: object): Promise<IOrder[]> | [] {
    try {
      const response = await apiClient.get("/orders", {
        params,
      });

      return response.data || [];
    } catch (err) {
      throw new Error(`При получении заказов произошла ошибка: ${err}`);
    }
  }

  get(id: any): Promise<any> {
    return apiClient.get(`/orders/${id}`);
  }

  create(data: any): Promise<any> {
    return apiClient.post("/orders", data);
  }

  update(id: any, data: any): Promise<any> {
    return apiClient.put(`/orders/${id}`, data);
  }

  delete(id: any): Promise<any> {
    return apiClient.delete(`/orders/${id}`);
  }

  deleteAll(): Promise<any> {
    return apiClient.delete(`/orders`);
  }

  findByTitle(title: string): Promise<any> {
    return apiClient.get(`/orders?title=${title}`);
  }
}

export default new OrderService();
