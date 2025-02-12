import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ICart } from "@/types/Ticket";

const orderServices = {
  createOrder: (payload: ICart) => instance.post(`${endpoint.ORDERS}`, payload),
  updateOrderStatus: (id: string, status: string) =>
    instance.put(`${endpoint.ORDERS}/${id}/${status}`),
  getMemberOrder: (params: string) =>
    instance.get(`${endpoint.ORDERS}-history?${params}`),
  getOrderById: (id: string) => instance.get(`${endpoint.ORDERS}/${id}`),
};

export default orderServices;
