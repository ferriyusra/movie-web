import { IMovie } from "./Movie";
import { ITheater } from "./Theater";

interface IShowtime {
  id: string;
  movieId: string;
  theaterId: string;
  startTime: string;
  endTime: string;
  price: number;
  availableSeats: number;
}

interface IShowtimeDetail extends IShowtime {
  movie: IMovie;
  theater: ITheater;
}

interface IShowtimeForm {
  movieId: string;
  theaterId: string;
  startTime: string;
  price: number;
}

export type { IShowtime, IShowtimeDetail, IShowtimeForm };
