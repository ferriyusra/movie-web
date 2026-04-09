import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import movieServices from "@/services/movie.service";
import showtimeServices from "@/services/showtime.service";
import { useRouter } from "next/router";
import { IShowtime } from "@/types/Showtime";

const useMovieDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  const {
    data: dataMovie,
    isLoading: isLoadingMovie,
  } = useQuery({
    queryKey: ["Movie", id],
    queryFn: async () => {
      const { data } = await movieServices.getMovieById(id as string);
      return data.data;
    },
    enabled: !!id,
  });

  const { data: dataShowtimes, isLoading: isLoadingShowtimes } = useQuery({
    queryKey: ["MovieShowtimes", id, selectedDate],
    queryFn: async () => {
      const { data } = await showtimeServices.getShowtimes(
        `date=${selectedDate}`,
      );
      return (data.data as IShowtime[]).filter(
        (s) => s.movieId === id,
      );
    },
    enabled: !!id && !!selectedDate,
  });

  return {
    dataMovie,
    isLoadingMovie,
    dataShowtimes: dataShowtimes || [],
    isLoadingShowtimes,
    selectedDate,
    setSelectedDate,
  };
};

export default useMovieDetail;
