import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import showtimeServices from "@/services/showtime.service";

const useAdminShowtime = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("2026-04-10");

  const getShowtimes = async () => {
    const { data } = await showtimeServices.getShowtimes(
      `date=${selectedDate}`,
    );
    return data.data;
  };

  const {
    data: dataShowtimes,
    isLoading: isLoadingShowtimes,
    refetch: refetchShowtimes,
  } = useQuery({
    queryKey: ["AdminShowtimes", selectedDate],
    queryFn: getShowtimes,
  });

  return {
    dataShowtimes,
    isLoadingShowtimes,
    refetchShowtimes,
    selectedId,
    setSelectedId,
    addModalOpen,
    setAddModalOpen,
    deleteModalOpen,
    setDeleteModalOpen,
    selectedDate,
    setSelectedDate,
  };
};

export default useAdminShowtime;
