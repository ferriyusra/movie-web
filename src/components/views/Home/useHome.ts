import { useQuery } from "@tanstack/react-query";
import movieServices from "@/services/movie.service";
import genreServices from "@/services/genre.service";
import showtimeServices from "@/services/showtime.service";
import { IMovie } from "@/types/Movie";
import { IGenre } from "@/types/Genre";
import { IShowtime } from "@/types/Showtime";

const DEFAULT_SHOWTIME_DATE = "2026-04-11";

const useHome = () => {
  const { data: moviesData, isLoading: isLoadingMovies } = useQuery({
    queryKey: ["HomeMovies"],
    queryFn: async () => {
      const { data } = await movieServices.getMovies("limit=8&page=1");
      return data;
    },
  });

  const { data: genresData } = useQuery({
    queryKey: ["HomeGenres"],
    queryFn: async () => {
      const { data } = await genreServices.getGenres();
      return data.data as IGenre[];
    },
  });

  const { data: showtimesData } = useQuery({
    queryKey: ["HomeShowtimes"],
    queryFn: async () => {
      const { data } = await showtimeServices.getShowtimes(
        `date=${DEFAULT_SHOWTIME_DATE}`,
      );
      return data.data as IShowtime[];
    },
  });

  const movies: IMovie[] = moviesData?.data || [];
  const featuredMovie = movies[0] || null;
  const upcomingShowtimes = (showtimesData || []).slice(0, 6);

  return {
    movies,
    featuredMovie,
    isLoading: isLoadingMovies,
    genres: genresData || [],
    upcomingShowtimes,
  };
};

export default useHome;
