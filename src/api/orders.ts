import apiClient from "./http/axios-client";
import IOrder from "../types/Order";

class OrderService {
  async create(data: IOrder): Promise<IOrder> {
    try {
      const { clientID, tariffID, ...orderData } = data;

      const response = await apiClient.post("/orders", {
        clientID: clientID[0],
        tariffID: tariffID[0],
        ...orderData,
      });
      console.log("🚀 ~ OrderService ~ create ~ response", response);

      return response.data;
    } catch (error) {
      throw new Error(`При создании заказа произошла ошибка: ${error}`);
    }
  }

  update(id: any, data: any): Promise<any> {
    return apiClient.put(`/orders/${id}`, data);
  }

  delete(id: any): Promise<any> {
    return apiClient.delete(`/orders/${id}`);
  }

  findByTitle(title: string): Promise<any> {
    return apiClient.get(`/orders?title=${title}`);
  }

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
}

export default new OrderService();
