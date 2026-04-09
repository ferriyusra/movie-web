import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IShowtimeForm } from "@/types/Showtime";

const showtimeServices = {
  getShowtimes: (params?: string) =>
    instance.get(`${endpoint.SHOWTIMES}?${params || ""}`),

  getShowtimeById: (id: string) =>
    instance.get(`${endpoint.SHOWTIMES}/${id}`),

  addShowtime: (payload: IShowtimeForm) =>
    instance.post(endpoint.SHOWTIMES, payload),

  updateShowtime: (id: string, payload: IShowtimeForm) =>
    instance.put(`${endpoint.SHOWTIMES}/${id}`, payload),

  deleteShowtime: (id: string) =>
    instance.delete(`${endpoint.SHOWTIMES}/${id}`),
};

export default showtimeServices;
