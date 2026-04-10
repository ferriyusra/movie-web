import { useQuery } from "@tanstack/react-query";
import movieServices from "@/services/movie.service";
import genreServices from "@/services/genre.service";
import showtimeServices from "@/services/showtime.service";
import { IMovie } from "@/types/Movie";
import { IGenre } from "@/types/Genre";
import { IShowtimeDetail } from "@/types/Showtime";

const getTomorrow = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
};

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
        `date=${getTomorrow()}`,
      );
      return data.data as IShowtimeDetail[];
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
