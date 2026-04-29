import { useState, useEffect, ChangeEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import type { DateValue } from "@heroui/react";
import showtimeServices from "@/services/showtime.service";
import useChangeUrl from "@/hooks/useChangeUrl";
import useDebounce from "@/hooks/useDebounce";
import { DELAY, LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constants/list.constants";

type DateRange = { start: DateValue; end: DateValue } | null;

const useAdminShowtime = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [movieTitle, setMovieTitle] = useState("");
  const [debouncedMovieTitle, setDebouncedMovieTitle] = useState("");
  const [dateRange, setDateRange] = useState<DateRange>(null);

  const { currentLimit, currentPage, setUrl, handleChangePage } = useChangeUrl();
  const debounce = useDebounce();

  useEffect(() => {
    if (currentPage === undefined && currentLimit === undefined) {
      setUrl();
    }
  }, []);

  const handleMovieTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMovieTitle(value);
    debounce(() => {
      setDebouncedMovieTitle(value);
      handleChangePage(PAGE_DEFAULT);
    }, DELAY);
  };

  const handleDateRangeChange = (value: DateRange) => {
    setDateRange(value);
    handleChangePage(PAGE_DEFAULT);
  };

  const getShowtimes = async () => {
    let params = `limit=${currentLimit || LIMIT_DEFAULT}&page=${currentPage || PAGE_DEFAULT}`;
    if (debouncedMovieTitle) params += `&movieTitle=${debouncedMovieTitle}`;
    if (dateRange?.start) params += `&dateFrom=${dateRange.start.toString()}`;
    if (dateRange?.end) params += `&dateTo=${dateRange.end.toString()}`;
    const { data } = await showtimeServices.getAdminShowtimes(params);
    return data;
  };

  const {
    data: dataShowtimes,
    isLoading: isLoadingShowtimes,
    refetch: refetchShowtimes,
  } = useQuery({
    queryKey: [
      "AdminShowtimes",
      currentPage,
      currentLimit,
      debouncedMovieTitle,
      dateRange?.start?.toString(),
      dateRange?.end?.toString(),
    ],
    queryFn: getShowtimes,
    enabled: !!currentPage,
  });

  return {
    dataShowtimes: dataShowtimes?.data || [],
    isLoadingShowtimes,
    refetchShowtimes,
    totalPages: dataShowtimes?.meta
      ? Math.ceil(dataShowtimes.meta.total / dataShowtimes.meta.limit)
      : 1,
    movieTitle,
    dateRange,
    handleMovieTitleChange,
    handleDateRangeChange,
    selectedId,
    setSelectedId,
    addModalOpen,
    setAddModalOpen,
    editModalOpen,
    setEditModalOpen,
    deleteModalOpen,
    setDeleteModalOpen,
  };
};

export default useAdminShowtime;
