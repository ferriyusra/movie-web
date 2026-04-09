import { IGenre } from "./Genre";

interface IMovie {
  id: string;
  title: string;
  description: string;
  posterUrl: string;
  durationMin: number;
  language: string;
  releaseDate: string | null;
  rating: number;
  genres: IGenre[];
  createdAt: string;
  updatedAt: string;
}

interface IMovieForm {
  title: string;
  description: string;
  posterUrl: string;
  durationMin: number;
  language: string;
  releaseDate: string;
  genreIds: string[];
}

export type { IMovie, IMovieForm };
