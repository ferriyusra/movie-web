import { useQuery } from "@tanstack/react-query";
import reservationServices from "@/services/reservation.service";
import useChangeUrl from "@/hooks/useChangeUrl";
import { useEffect } from "react";
import { LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constants/list.constants";

const useReservation = () => {
  const {
    currentLimit,
    currentPage,
    currentStatus,
    setUrl,
    handleChangePage,
    handleChangeLimit,
    handleChangeStatus,
  } = useChangeUrl();

  useEffect(() => {
    if (currentPage === undefined && currentLimit === undefined) {
      setUrl();
    }
  }, []);

  const getReservations = async () => {
    let params = `limit=${currentLimit || LIMIT_DEFAULT}&page=${currentPage || PAGE_DEFAULT}`;
    if (currentStatus) params += `&status=${currentStatus}`;
    const { data } = await reservationServices.getReservations(params);
    return data;
  };

  const {
    data: dataReservations,
    isLoading: isLoadingReservations,
    refetch: refetchReservations,
  } = useQuery({
    queryKey: ["MyReservations", currentPage, currentLimit, currentStatus],
    queryFn: getReservations,
    enabled: !!currentPage,
  });

  return {
    dataReservations: dataReservations?.data || [],
    isLoadingReservations,
    refetchReservations,
    totalPages: dataReservations?.meta
      ? Math.ceil(dataReservations.meta.total / dataReservations.meta.limit)
      : 1,
    handleChangePage,
    handleChangeLimit,
    handleChangeStatus,
    currentStatus: (currentStatus as string) || "",
  };
};

export default useReservation;
