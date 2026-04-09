import {
  Button,
  Card,
  CardBody,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@tanstack/react-query";
import reservationServices from "@/services/reservation.service";
import { ToasterContext } from "@/contexts/ToasterContext";
import { IReservationDetail } from "@/types/Reservation";
import { formatCurrency } from "@/utils/currency";

const ReservationDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { setToaster } = useContext(ToasterContext);
  const [cancelOpen, setCancelOpen] = useState(false);

  const {
    data: reservation,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["Reservation", id],
    queryFn: async () => {
      const { data } = await reservationServices.getReservationById(
        id as string,
      );
      return data.data as IReservationDetail;
    },
    enabled: !!id,
  });

  const { mutate: mutateCancel, isPending: isPendingCancel } = useMutation({
    mutationFn: () => reservationServices.cancelReservation(id as string),
    onError: (error) => {
      setToaster({ type: "error", message: error.message });
      setCancelOpen(false);
    },
    onSuccess: () => {
      setCancelOpen(false);
      refetch();
      setToaster({ type: "success", message: "Reservation cancelled" });
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner color="danger" size="lg" />
      </div>
    );
  }

  if (!reservation) {
    return (
      <p className="py-20 text-center text-default-400">
        Reservation not found
      </p>
    );
  }

  return (
    <section className="mx-auto max-w-2xl">
      <Card>
        <CardBody className="flex flex-col gap-4 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Reservation Detail</h2>
            <Chip
              color={reservation.status === "confirmed" ? "success" : "default"}
              variant="flat"
            >
              {reservation.status}
            </Chip>
          </div>

          <div className="rounded-lg bg-default-50 p-4">
            <p className="mb-1 text-sm text-default-400">Booking Reference</p>
            <p className="font-mono text-lg font-bold">
              {reservation.bookingReference}
            </p>
          </div>

          {reservation.movie && (
            <div>
              <p className="text-sm text-default-400">Movie</p>
              <p className="font-medium">{reservation.movie.title}</p>
            </div>
          )}

          {reservation.theater && (
            <div>
              <p className="text-sm text-default-400">Theater</p>
              <p className="font-medium">{reservation.theater.name}</p>
            </div>
          )}

          {reservation.showtime && (
            <div>
              <p className="text-sm text-default-400">Showtime</p>
              <p className="font-medium">
                {new Date(reservation.showtime.startTime).toLocaleString()}
              </p>
            </div>
          )}

          <div>
            <p className="text-sm text-default-400">Seats</p>
            <div className="flex flex-wrap gap-2">
              {reservation.seats?.map((seat) => (
                <Chip key={seat.id} size="sm" variant="bordered">
                  {seat.label}
                </Chip>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm text-default-400">Total Amount</p>
            <p className="text-xl font-bold">
              {formatCurrency(reservation.totalAmount)}
            </p>
          </div>

          <div>
            <p className="text-sm text-default-400">Booked On</p>
            <p>{new Date(reservation.createdAt).toLocaleString()}</p>
          </div>

          {reservation.status === "confirmed" && (
            <Button
              color="danger"
              variant="bordered"
              onPress={() => setCancelOpen(true)}
            >
              Cancel Reservation
            </Button>
          )}
        </CardBody>
      </Card>

      <Modal isOpen={cancelOpen} onClose={() => setCancelOpen(false)}>
        <ModalContent>
          <ModalHeader>Cancel Reservation</ModalHeader>
          <ModalBody>
            <p>
              Are you sure you want to cancel this reservation? This action
              cannot be undone.
            </p>
            <p className="mt-2 text-sm text-default-400">
              Note: Cancellation must be at least 1 hour before showtime.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={() => setCancelOpen(false)}>
              Keep Reservation
            </Button>
            <Button
              color="danger"
              onPress={() => mutateCancel()}
              isDisabled={isPendingCancel}
            >
              {isPendingCancel ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Yes, Cancel"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </section>
  );
};

export default ReservationDetail;
