import { IMovie } from "./Movie";
import { ISeat } from "./Theater";
import { IShowtime } from "./Showtime";
import { ITheater } from "./Theater";

interface IReservation {
  id: string;
  bookingReference: string;
  showtimeId: string;
  status: "confirmed" | "cancelled";
  totalAmount: number;
  cancelledAt?: string;
  createdAt: string;
  seats: ISeat[];
}

interface IReservationDetail extends IReservation {
  movie: IMovie;
  showtime: IShowtime;
  theater: ITheater;
}

interface IReservationForm {
  showtimeId: string;
  seatIds: string[];
}

export type { IReservation, IReservationDetail, IReservationForm };
