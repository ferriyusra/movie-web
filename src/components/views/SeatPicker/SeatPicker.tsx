import {
  Button,
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import { FaCircleCheck } from "react-icons/fa6";
import SeatGrid from "@/components/ui/SeatGrid";
import useSeatPicker from "./useSeatPicker";
import { formatCurrency } from "@/utils/currency";

const SeatPicker = () => {
  const {
    showtime,
    seats,
    isLoading,
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
  } = useSeatPicker();

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner color="danger" size="lg" />
      </div>
    );
  }

  if (bookingSuccess) {
    return (
      <section className="mx-auto flex max-w-lg flex-col items-center gap-6 px-4 py-20 text-center">
        <FaCircleCheck className="text-7xl text-success-500" />
        <h1 className="text-3xl font-bold">Booking Confirmed!</h1>
        <p className="text-default-500">
          Your reservation has been successfully placed.
        </p>
        <Card className="w-full">
          <CardBody className="flex flex-col items-center gap-2 p-6">
            <p className="text-sm text-default-400">Booking Reference</p>
            <p className="text-2xl font-bold tracking-wider">
              {bookingSuccess.bookingReference}
            </p>
          </CardBody>
        </Card>
        <p className="text-sm text-default-400">
          Please save your booking reference for check-in.
        </p>
        <Button color="danger" size="lg" onPress={goToReservation}>
          View Reservation Detail
        </Button>
      </section>
    );
  }

  if (!showtime) {
    return (
      <p className="py-20 text-center text-default-400">
        Showtime not found
      </p>
    );
  }

  const selectedSeats = seats.filter((s) => selectedSeatIds.has(s.id));

  return (
    <section className="mx-auto max-w-4xl px-4">
      <h1 className="mb-2 text-2xl font-bold">Select Your Seats</h1>
      <div className="mb-6 text-sm text-default-500">
        <p>
          {showtime.movie?.title} &middot; {showtime.theater?.name} &middot;{" "}
          {new Date(showtime.startTime).toLocaleString()}
        </p>
        <p>{formatCurrency(showtime.price)} per seat</p>
      </div>

      <div className="mb-8 overflow-x-auto">
        <SeatGrid
          seats={seats}
          selectedSeatIds={selectedSeatIds}
          reservedSeatIds={reservedSeatIds}
          onSeatClick={handleSeatClick}
          interactive
        />
      </div>

      <Card className="sticky bottom-4">
        <CardBody className="flex flex-row items-center justify-between p-4">
          <div>
            <p className="text-sm text-default-500">
              {selectedSeatIds.size} seat(s) selected
            </p>
            <p className="text-lg font-bold">{formatCurrency(totalAmount)}</p>
          </div>
          <Button
            color="danger"
            size="lg"
            isDisabled={selectedSeatIds.size === 0}
            onPress={() => setConfirmOpen(true)}
          >
            Confirm Booking
          </Button>
        </CardBody>
      </Card>

      <Modal isOpen={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <ModalContent>
          <ModalHeader>Confirm Reservation</ModalHeader>
          <ModalBody>
            <p className="mb-2">
              <strong>Movie:</strong> {showtime.movie?.title}
            </p>
            <p className="mb-2">
              <strong>Theater:</strong> {showtime.theater?.name}
            </p>
            <p className="mb-2">
              <strong>Time:</strong>{" "}
              {new Date(showtime.startTime).toLocaleString()}
            </p>
            <p className="mb-2">
              <strong>Seats:</strong>{" "}
              {selectedSeats.map((s) => s.label).join(", ")}
            </p>
            <p className="text-lg font-bold">
              Total: {formatCurrency(totalAmount)}
            </p>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button
              color="danger"
              onPress={() => mutateBook()}
              isDisabled={isPendingBook}
            >
              {isPendingBook ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Confirm & Pay"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </section>
  );
};

export default SeatPicker;
