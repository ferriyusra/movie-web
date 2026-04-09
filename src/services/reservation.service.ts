import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IReservationForm } from "@/types/Reservation";

const reservationServices = {
  createReservation: (payload: IReservationForm) =>
    instance.post(endpoint.RESERVATIONS, payload),

  getReservations: (params?: string) =>
    instance.get(`${endpoint.RESERVATIONS}?${params || ""}`),

  getReservationById: (id: string) =>
    instance.get(`${endpoint.RESERVATIONS}/${id}`),

  cancelReservation: (id: string) =>
    instance.delete(`${endpoint.RESERVATIONS}/${id}`),

  getAdminReservations: (params?: string) =>
    instance.get(`${endpoint.ADMIN}/reservations?${params || ""}`),

  adminCancelReservation: (id: string) =>
    instance.delete(`${endpoint.ADMIN}/reservations/${id}`),
};

export default reservationServices;
