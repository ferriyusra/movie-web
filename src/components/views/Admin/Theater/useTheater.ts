import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import theaterServices from "@/services/theater.service";

const useTheater = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);

  const getTheaters = async () => {
    const { data } = await theaterServices.getTheaters();
    return data.data;
  };

  const {
    data: dataTheaters,
    isLoading: isLoadingTheaters,
    refetch: refetchTheaters,
  } = useQuery({
    queryKey: ["Theaters"],
    queryFn: getTheaters,
  });

  return {
    dataTheaters,
    isLoadingTheaters,
    refetchTheaters,
    addModalOpen,
    setAddModalOpen,
  };
};

export default useTheater;
