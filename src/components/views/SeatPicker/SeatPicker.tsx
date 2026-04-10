import {
  Button,
  Card,
  CardBody,
  Chip,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import Link from "next/link";
import {
  FaCircleCheck,
  FaClock,
  FaLocationDot,
  FaCalendarDay,
  FaCouch,
  FaTicket,
} from "react-icons/fa6";
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

  /* ── Success splash ── */
  if (bookingSuccess) {
    return (
      <div className="-mt-10 md:-mx-6 md:-mt-6">
        <section className="flex min-h-[80vh] flex-col items-center justify-center bg-gray-950 px-6 py-20 text-center">
          <div className="flex flex-col items-center gap-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success-500/10">
              <FaCircleCheck className="text-5xl text-success-500" />
            </div>
            <h1 className="text-3xl font-bold text-white">
              Booking Confirmed!
            </h1>
            <p className="max-w-md text-white/60">
              Your reservation has been placed successfully. Show your booking
              reference at the counter on the day of the show.
            </p>

            <Card className="w-full max-w-sm">
              <CardBody className="flex flex-col items-center gap-1 py-8">
                <p className="text-xs font-medium uppercase tracking-widest text-default-400">
                  Booking Reference
                </p>
                <p className="mt-1 font-mono text-3xl font-bold tracking-wider text-danger-500">
                  {bookingSuccess.bookingReference}
                </p>
              </CardBody>
            </Card>

            <Button
              color="danger"
              size="lg"
              onPress={goToReservation}
              startContent={<FaTicket />}
            >
              View Reservation Detail
            </Button>
            <Button
              as={Link}
              href="/movies"
              variant="light"
              className="text-white/50"
            >
              Back to Movies
            </Button>
          </div>
        </section>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner color="danger" size="lg" />
      </div>
    );
  }

  if (!showtime) {
    return (
      <p className="py-20 text-center text-default-400">Showtime not found</p>
    );
  }

  const selectedSeats = seats.filter((s) => selectedSeatIds.has(s.id));
  const availableCount = seats.filter(
    (s) => !reservedSeatIds.has(s.id),
  ).length;

  return (
    <div className="-mt-10 md:-mx-6 md:-mt-6">
      {/* ── Top info bar ── */}
      <section className="border-b border-default-100 bg-default-50">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:gap-6">
          <div className="flex-1">
            <h1 className="text-lg font-bold">{showtime.movieTitle}</h1>
            <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-default-500">
              <span className="flex items-center gap-1">
                <FaLocationDot className="text-danger-400" />
                {showtime.theaterName}
              </span>
              <span className="flex items-center gap-1">
                <FaCalendarDay className="text-danger-400" />
                {new Date(showtime.startTime).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1">
                <FaClock className="text-danger-400" />
                {new Date(showtime.startTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              <span className="font-semibold text-danger-500">
                {formatCurrency(showtime.price)}/seat
              </span>
            </div>
          </div>
          <Chip size="sm" variant="flat" color="default" className="shrink-0">
            <FaCouch className="mr-1 inline text-[10px]" />
            {availableCount} available
          </Chip>
        </div>
      </section>

      {/* ── Main content: seat map + sidebar ── */}
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8 lg:flex-row">
        {/* Seat map */}
        <div className="flex-1">
          <Card className="overflow-visible">
            <CardBody className="overflow-x-auto px-4 py-8">
              <SeatGrid
                seats={seats}
                selectedSeatIds={selectedSeatIds}
                reservedSeatIds={reservedSeatIds}
                onSeatClick={handleSeatClick}
                interactive
              />
            </CardBody>
          </Card>
          <p className="mt-3 text-center text-[11px] text-default-400">
            Tap a seat to select. Maximum 10 seats per booking.
          </p>
        </div>

        {/* Booking sidebar */}
        <div className="w-full shrink-0 lg:w-72">
          <Card className="sticky top-20">
            <CardBody className="flex flex-col gap-4 p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-default-500">
                Your Selection
              </h2>

              {selectedSeats.length === 0 ? (
                <p className="py-4 text-center text-sm text-default-400">
                  No seats selected yet.
                  <br />
                  <span className="text-xs">
                    Click on available seats to add them.
                  </span>
                </p>
              ) : (
                <>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedSeats.map((s) => (
                      <Chip
                        key={s.id}
                        size="sm"
                        variant="flat"
                        color="primary"
                        onClose={() => handleSeatClick(s)}
                      >
                        {s.label}
                      </Chip>
                    ))}
                  </div>

                  <Divider />

                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex justify-between text-default-500">
                      <span>Seats</span>
                      <span>{selectedSeats.length}x</span>
                    </div>
                    <div className="flex justify-between text-default-500">
                      <span>Price/seat</span>
                      <span>{formatCurrency(showtime.price)}</span>
                    </div>
                    <Divider />
                    <div className="flex justify-between text-base font-bold">
                      <span>Total</span>
                      <span className="text-danger-500">
                        {formatCurrency(totalAmount)}
                      </span>
                    </div>
                  </div>
                </>
              )}

              <Button
                color="danger"
                size="lg"
                fullWidth
                isDisabled={selectedSeatIds.size === 0}
                onPress={() => setConfirmOpen(true)}
                className="mt-1"
              >
                {selectedSeatIds.size > 0
                  ? `Book ${selectedSeatIds.size} Seat${selectedSeatIds.size > 1 ? "s" : ""}`
                  : "Select Seats"}
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* ── Movie info + tips ── */}
      <section className="border-t border-default-100 bg-default-50">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 md:grid-cols-2">
          {/* Showtime info card */}
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-bold">{showtime.movieTitle}</h3>
            <div className="flex flex-col gap-2 text-sm text-default-500">
              <p className="flex items-center gap-2">
                <FaLocationDot className="text-xs text-danger-400" />
                {showtime.theaterName}
              </p>
              <p className="flex items-center gap-2">
                <FaCalendarDay className="text-xs text-danger-400" />
                {new Date(showtime.startTime).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <p className="flex items-center gap-2">
                <FaClock className="text-xs text-danger-400" />
                {new Date(showtime.startTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                &mdash;{" "}
                {new Date(showtime.endTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p className="flex items-center gap-2">
                <FaTicket className="text-xs text-danger-400" />
                {formatCurrency(showtime.price)} per seat
              </p>
            </div>
          </div>

          {/* Booking tips */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-default-500">
              Booking Tips
            </h3>
            <ul className="flex flex-col gap-3">
              {[
                {
                  icon: <FaCouch className="text-danger-400" />,
                  text: "You can select up to 10 seats per reservation.",
                },
                {
                  icon: <FaTicket className="text-danger-400" />,
                  text: "Your booking reference will be provided instantly after confirmation.",
                },
                {
                  icon: <FaClock className="text-danger-400" />,
                  text: "Reservations can be cancelled up to 1 hour before showtime.",
                },
                {
                  icon: <FaCalendarDay className="text-danger-400" />,
                  text: "Present your booking reference at the counter on the day of the show.",
                },
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-default-600">
                  <span className="mt-0.5 shrink-0">{tip.icon}</span>
                  {tip.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Seat type guide ── */}
      <section className="border-t border-default-100">
        <div className="mx-auto grid max-w-6xl gap-4 px-6 py-8 sm:grid-cols-3">
          {[
            {
              type: "Standard",
              desc: "Regular comfortable seats with great view of the screen.",
              color: "bg-success-100 text-success-700",
            },
            {
              type: "Premium",
              desc: "Extra legroom and wider seats in the center rows for the best experience.",
              color: "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-300/40",
            },
            {
              type: "Accessible",
              desc: "Wheelchair-accessible seats with easy aisle access.",
              color: "bg-blue-50 text-blue-700",
            },
          ].map((item) => (
            <div
              key={item.type}
              className="flex items-start gap-3 rounded-lg border border-default-100 p-4"
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-t-lg text-[10px] font-semibold ${item.color}`}
              >
                1
              </div>
              <div>
                <p className="text-sm font-semibold">{item.type}</p>
                <p className="text-xs leading-relaxed text-default-400">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Confirm modal ── */}
      <Modal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        size="lg"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <span>Confirm Reservation</span>
            <span className="text-sm font-normal text-default-400">
              Please review your booking before confirming.
            </span>
          </ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-2 text-sm">
                <p className="text-base font-bold">{showtime.movieTitle}</p>
                <p className="flex items-center gap-1.5 text-default-500">
                  <FaLocationDot className="text-xs text-danger-400" />
                  {showtime.theaterName}
                </p>
                <p className="flex items-center gap-1.5 text-default-500">
                  <FaCalendarDay className="text-xs text-danger-400" />
                  {new Date(showtime.startTime).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <p className="flex items-center gap-1.5 text-default-500">
                  <FaClock className="text-xs text-danger-400" />
                  {new Date(showtime.startTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  &mdash;{" "}
                  {new Date(showtime.endTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
            </div>

            <Divider className="my-2" />

            <div className="flex flex-col gap-3">
              <div>
                <p className="mb-1.5 text-xs font-medium uppercase tracking-wider text-default-400">
                  Selected Seats
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedSeats.map((s) => (
                    <Chip key={s.id} size="sm" variant="flat" color="primary">
                      {s.label}
                    </Chip>
                  ))}
                </div>
              </div>

              <div className="rounded-lg bg-default-50 p-4">
                <div className="flex justify-between text-sm text-default-500">
                  <span>
                    {selectedSeats.length} seat{selectedSeats.length > 1 ? "s" : ""}{" "}
                    &times; {formatCurrency(showtime.price)}
                  </span>
                  <span className="font-semibold">
                    {formatCurrency(totalAmount)}
                  </span>
                </div>
                <Divider className="my-2" />
                <div className="flex justify-between text-base font-bold">
                  <span>Total</span>
                  <span className="text-danger-500">
                    {formatCurrency(totalAmount)}
                  </span>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={() => setConfirmOpen(false)}>
              Go Back
            </Button>
            <Button
              color="danger"
              onPress={() => mutateBook()}
              isDisabled={isPendingBook}
              size="lg"
            >
              {isPendingBook ? (
                <Spinner size="sm" color="white" />
              ) : (
                `Pay ${formatCurrency(totalAmount)}`
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SeatPicker;
