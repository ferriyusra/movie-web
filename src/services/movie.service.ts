import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const movieServices = {
  getMovies: (params?: string) =>
    instance.get(`${endpoint.MOVIES}?${params || ""}`),

  getMovieById: (id: string) => instance.get(`${endpoint.MOVIES}/${id}`),

  addMovie: (payload: {
    title: string;
    description: string;
    posterUrl: string;
    durationMin: number;
    language: string;
    releaseDate?: string;
    genreIds: string[];
  }) => instance.post(endpoint.MOVIES, payload),

  updateMovie: (
    id: string,
    payload: {
      title: string;
      description: string;
      posterUrl: string;
      durationMin: number;
      language: string;
      releaseDate?: string;
      genreIds: string[];
    },
  ) => instance.put(`${endpoint.MOVIES}/${id}`, payload),

  deleteMovie: (id: string) => instance.delete(`${endpoint.MOVIES}/${id}`),
};

export default movieServices;
