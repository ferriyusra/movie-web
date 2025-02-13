import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ICart } from "@/types/Ticket";

const orderServices = {
  getOrders: (params: string) => instance.get(`${endpoint.ORDERS}?${params}`),
  getMemberOrder: (params: string) =>
    instance.get(`${endpoint.ORDERS}-history?${params}`),
  getOrderById: (id: string) => instance.get(`${endpoint.ORDERS}/${id}`),
  createOrder: (payload: ICart) => instance.post(`${endpoint.ORDERS}`, payload),
  updateOrderStatus: (id: string, status: string) =>
    instance.put(`${endpoint.ORDERS}/${id}/${status}`),
  deleteOrder: (id: string) => instance.delete(`${endpoint.ORDERS}/${id}`),
};

export default orderServices;
