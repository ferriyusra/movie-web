import { useState, useContext } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import showtimeServices from "@/services/showtime.service";
import theaterServices from "@/services/theater.service";
import reservationServices from "@/services/reservation.service";
import { ToasterContext } from "@/contexts/ToasterContext";
import { ISeat, ITheaterDetail } from "@/types/Theater";
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

  const { data: theater, isLoading: isLoadingTheater } = useQuery({
    queryKey: ["Theater", showtime?.theaterId],
    queryFn: async () => {
      const { data } = await theaterServices.getTheaterById(
        showtime!.theaterId,
      );
      return data.data as ITheaterDetail;
    },
    enabled: !!showtime?.theaterId,
  });

  // For now, we don't have reserved seat IDs from the API directly.
  // The seat availability is represented by availableSeats count.
  // A real implementation would fetch reserved seat IDs for this showtime.
  const reservedSeatIds = new Set<string>();

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
      const reservationId = res.data.data.id;
      setToaster({
        type: "success",
        message: `Booking confirmed! Ref: ${res.data.data.bookingReference}`,
      });
      router.push(`/member/reservations/${reservationId}`);
    },
  });

  return {
    showtime,
    theater,
    isLoading: isLoadingShowtime || isLoadingTheater,
    selectedSeatIds,
    reservedSeatIds,
    handleSeatClick,
    totalAmount,
    confirmOpen,
    setConfirmOpen,
    mutateBook,
    isPendingBook,
  };
};

export default useSeatPicker;
