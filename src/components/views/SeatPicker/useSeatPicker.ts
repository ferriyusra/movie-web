import { useState, useContext, useMemo } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import showtimeServices from "@/services/showtime.service";
import reservationServices from "@/services/reservation.service";
import { ToasterContext } from "@/contexts/ToasterContext";
import { ISeat } from "@/types/Theater";
import { IShowtimeDetail } from "@/types/Showtime";

const MAX_SEATS = 10;

const useSeatPicker = () => {
  const router = useRouter();
  const { id: showtimeId } = router.query;
  const { setToaster } = useContext(ToasterContext);
  const [selectedSeatIds, setSelectedSeatIds] = useState<Set<string>>(
    new Set(),
  );
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<{
    bookingReference: string;
    reservationId: string;
  } | null>(null);

  // GET /showtimes/:id — showtime detail with movie & theater
  const { data: showtime, isLoading: isLoadingShowtime } = useQuery({
    queryKey: ["Showtime", showtimeId],
    queryFn: async () => {
      const { data } = await showtimeServices.getShowtimeById(
        showtimeId as string,
      );
      return data.data as IShowtimeDetail;
    },
    enabled: !!showtimeId,
  });

  // GET /showtimes/:id/seats — seat map with status (available/reserved)
  const { data: seatMap, isLoading: isLoadingSeatMap } = useQuery({
    queryKey: ["SeatMap", showtimeId],
    queryFn: async () => {
      const { data } = await showtimeServices.getSeatMap(
        showtimeId as string,
      );
      return data.data as ISeat[];
    },
    enabled: !!showtimeId,
  });

  const reservedSeatIds = useMemo(() => {
    const set = new Set<string>();
    seatMap?.forEach((seat) => {
      if (seat.status === "reserved") {
        set.add(seat.id);
      }
    });
    return set;
  }, [seatMap]);

  const handleSeatClick = (seat: ISeat) => {
    const newSet = new Set(selectedSeatIds);
    if (newSet.has(seat.id)) {
      newSet.delete(seat.id);
    } else if (newSet.size < MAX_SEATS) {
      newSet.add(seat.id);
    } else {
      setToaster({
        type: "error",
        message: `Maximum ${MAX_SEATS} seats per reservation`,
      });
    }
    setSelectedSeatIds(newSet);
  };

  const totalAmount = selectedSeatIds.size * (showtime?.price || 0);

  const { mutate: mutateBook, isPending: isPendingBook } = useMutation({
    mutationFn: () =>
      reservationServices.createReservation({
        showtimeId: showtimeId as string,
        seatIds: Array.from(selectedSeatIds),
      }),
    onError: (error) => {
      setToaster({ type: "error", message: error.message });
      setConfirmOpen(false);
    },
    onSuccess: (res) => {
      setConfirmOpen(false);
      setBookingSuccess({
        bookingReference: res.data.data.bookingReference,
        reservationId: res.data.data.id,
      });
    },
  });

  const goToReservation = () => {
    if (bookingSuccess) {
      router.push(`/member/reservations/${bookingSuccess.reservationId}`);
    }
  };

  return {
    showtime,
    seats: seatMap || [],
    isLoading: isLoadingShowtime || isLoadingSeatMap,
    selectedSeatIds,
    reservedSeatIds,
    handleSeatClick,
    totalAmount,
    confirmOpen,
    setConfirmOpen,
    mutateBook,
    isPendingBook,
    bookingSuccess,
    goToReservation,
  };
};

export default useSeatPicker;
