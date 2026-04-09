import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import movieServices from "@/services/movie.service";
import useChangeUrl from "@/hooks/useChangeUrl";
import { useEffect } from "react";
import { LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constants/list.constants";

const useAdminMovie = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const {
    currentLimit,
    currentPage,
    currentSearch,
    setUrl,
    handleChangePage,
    handleChangeLimit,
    handleSearch,
    handleClearSearch,
  } = useChangeUrl();

  useEffect(() => {
    if (currentPage === undefined && currentLimit === undefined) {
      setUrl();
    }
  }, []);

  const getMovies = async () => {
    let params = `limit=${currentLimit || LIMIT_DEFAULT}&page=${currentPage || PAGE_DEFAULT}`;
    if (currentSearch) params += `&title=${currentSearch}`;
    const { data } = await movieServices.getMovies(params);
    return data;
  };

  const {
    data: dataMovies,
    isLoading: isLoadingMovies,
    refetch: refetchMovies,
  } = useQuery({
    queryKey: ["AdminMovies", currentPage, currentLimit, currentSearch],
    queryFn: getMovies,
    enabled: !!currentPage,
  });

  return {
    dataMovies: dataMovies?.data || [],
    isLoadingMovies,
    refetchMovies,
    totalPages: dataMovies?.meta
      ? Math.ceil(dataMovies.meta.total / dataMovies.meta.limit)
      : 1,
    selectedId,
    setSelectedId,
    deleteModalOpen,
    setDeleteModalOpen,
  };
};

export default useAdminMovie;
