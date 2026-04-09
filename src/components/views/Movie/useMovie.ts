import { useQuery } from "@tanstack/react-query";
import movieServices from "@/services/movie.service";
import genreServices from "@/services/genre.service";
import useChangeUrl from "@/hooks/useChangeUrl";
import { useEffect } from "react";
import { LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constants/list.constants";

const useMovie = () => {
  const {
    currentLimit,
    currentPage,
    currentSearch,
    currentGenreId,
    setUrlMovies,
    handleChangePage,
    handleSearch,
    handleClearSearch,
    handleChangeGenre,
  } = useChangeUrl();

  useEffect(() => {
    if (
      currentPage === undefined &&
      currentLimit === undefined
    ) {
      setUrlMovies();
    }
  }, []);

  const getMovies = async () => {
    let params = `limit=${currentLimit || LIMIT_DEFAULT}&page=${currentPage || PAGE_DEFAULT}`;
    if (currentSearch) params += `&title=${currentSearch}`;
    if (currentGenreId) params += `&genreId=${currentGenreId}`;
    const { data } = await movieServices.getMovies(params);
    return data;
  };

  const {
    data: dataMovies,
    isLoading: isLoadingMovies,
  } = useQuery({
    queryKey: ["Movies", currentPage, currentLimit, currentSearch, currentGenreId],
    queryFn: getMovies,
    enabled: !!currentPage,
  });

  const { data: dataGenres } = useQuery({
    queryKey: ["Genres"],
    queryFn: async () => {
      const { data } = await genreServices.getGenres();
      return data.data;
    },
  });

  return {
    dataMovies: dataMovies?.data || [],
    isLoadingMovies,
    totalPages: dataMovies?.meta
      ? Math.ceil(dataMovies.meta.total / dataMovies.meta.limit)
      : 1,
    dataGenres: dataGenres || [],
    currentPage: Number(currentPage || PAGE_DEFAULT),
    currentGenreId: (currentGenreId as string) || "",
    handleChangePage,
    handleSearch,
    handleClearSearch,
    handleChangeGenre,
  };
};

export default useMovie;
