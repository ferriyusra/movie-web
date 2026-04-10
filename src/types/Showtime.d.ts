interface IShowtime {
  id: string;
  movieId: string;
  movieTitle: string;
  theaterId: string;
  theaterName: string;
  startTime: string;
  endTime: string;
  price: number;
  availableSeats: number;
}

interface IShowtimeForm {
  movieId: string;
  theaterId: string;
  startTime: string;
  price: number;
}

export type { IShowtime, IShowtimeForm };
