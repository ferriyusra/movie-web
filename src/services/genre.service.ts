import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const genreServices = {
  getGenres: () => instance.get(endpoint.GENRES),

  addGenre: (payload: { name: string }) =>
    instance.post(endpoint.GENRES, payload),

  deleteGenre: (id: string) => instance.delete(`${endpoint.GENRES}/${id}`),
};

export default genreServices;
