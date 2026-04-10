import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import movieServices from "@/services/movie.service";
import showtimeServices from "@/services/showtime.service";
import { useRouter } from "next/router";
import { IShowtime } from "@/types/Showtime";
import { IMovie } from "@/types/Movie";

const useMovieDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [selectedDate, setSelectedDate] = useState("2026-04-10");

  const { data: dataMovie, isLoading: isLoadingMovie } = useQuery({
    queryKey: ["Movie", id],
    queryFn: async () => {
      const { data } = await movieServices.getMovieById(id as string);
      return data.data;
    },
    enabled: !!id,
  });

  const { data: allShowtimes, isLoading: isLoadingShowtimes } = useQuery({
    queryKey: ["Showtimes", selectedDate],
    queryFn: async () => {
      const { data } = await showtimeServices.getShowtimes(
        `date=${selectedDate}`,
      );
      return data.data as IShowtime[];
    },
    enabled: !!selectedDate,
  });

  const dataShowtimes = (allShowtimes || []).filter(
    (s) => s.movieId === (id as string),
  );

  const { data: relatedMoviesData } = useQuery({
    queryKey: ["RelatedMovies", id],
    queryFn: async () => {
      const { data } = await movieServices.getMovies("limit=8&page=1");
      return data.data as IMovie[];
    },
    enabled: !!id,
  });

  const relatedMovies = (relatedMoviesData || [])
    .filter((m) => m.id !== (id as string))
    .slice(0, 4);

  return {
    dataMovie,
    isLoadingMovie,
    dataShowtimes,
    isLoadingShowtimes,
    selectedDate,
    setSelectedDate,
    relatedMovies,
  };
};

export default useMovieDetail;
