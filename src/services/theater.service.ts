import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ITheaterForm } from "@/types/Theater";

const theaterServices = {
  getTheaters: () => instance.get(endpoint.THEATERS),

  getTheaterById: (id: string) => instance.get(`${endpoint.THEATERS}/${id}`),

  addTheater: (payload: ITheaterForm) =>
    instance.post(endpoint.THEATERS, payload),

  updateTheater: (
    id: string,
    payload: { name: string; location: string },
  ) => instance.put(`${endpoint.THEATERS}/${id}`, payload),
};

export default theaterServices;
