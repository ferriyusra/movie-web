import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import movieServices from "@/services/movie.service";
import showtimeServices from "@/services/showtime.service";
import { useRouter } from "next/router";
import { IShowtimeDetail } from "@/types/Showtime";

const getTomorrow = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
};

const useMovieDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [selectedDate, setSelectedDate] = useState(getTomorrow);

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
      return data.data as IShowtimeDetail[];
    },
    enabled: !!selectedDate,
  });

  const dataShowtimes = (allShowtimes || []).filter(
    (s) => s.movieId === (id as string),
  );

  return {
    dataMovie,
    isLoadingMovie,
    dataShowtimes,
    isLoadingShowtimes,
    selectedDate,
    setSelectedDate,
  };
};

export default useMovieDetail;
