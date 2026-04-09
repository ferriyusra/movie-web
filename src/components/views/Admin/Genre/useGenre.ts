import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import genreServices from "@/services/genre.service";

const useGenre = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const getGenres = async () => {
    const { data } = await genreServices.getGenres();
    return data.data;
  };

  const {
    data: dataGenres,
    isLoading: isLoadingGenres,
    refetch: refetchGenres,
  } = useQuery({
    queryKey: ["Genres"],
    queryFn: getGenres,
  });

  return {
    dataGenres,
    isLoadingGenres,
    refetchGenres,
    selectedId,
    setSelectedId,
    addModalOpen,
    setAddModalOpen,
    deleteModalOpen,
    setDeleteModalOpen,
  };
};

export default useGenre;
