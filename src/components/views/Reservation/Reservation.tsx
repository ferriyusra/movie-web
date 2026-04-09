import { Key, useCallback } from "react";
import { useRouter } from "next/router";
import { Button, Chip, Select, SelectItem } from "@heroui/react";
import DataTable from "@/components/ui/DataTable";
import { COLUMN_LISTS_RESERVATION } from "./Reservation.constants";
import useReservation from "./useReservation";
import { formatCurrency } from "@/utils/currency";
import { ISeat } from "@/types/Theater";

const Reservation = () => {
  const router = useRouter();
  const {
    dataReservations,
    isLoadingReservations,
    totalPages,
    handleChangeStatus,
    currentStatus,
  } = useReservation();

  const renderCell = useCallback(
    (item: Record<string, unknown>, columnKey: Key) => {
      switch (columnKey) {
        case "bookingReference":
          return (
            <p className="font-mono text-sm">
              {item.bookingReference as string}
            </p>
          );
        case "seats":
          return (
            <p className="text-sm">
              {(item.seats as ISeat[])?.map((s) => s.label).join(", ") || "-"}
            </p>
          );
        case "totalAmount":
          return <p>{formatCurrency(item.totalAmount as number)}</p>;
        case "status":
          return (
            <Chip
              size="sm"
              color={item.status === "confirmed" ? "success" : "default"}
              variant="flat"
            >
              {item.status as string}
            </Chip>
          );
        case "createdAt":
          return (
            <p className="text-sm">
              {new Date(item.createdAt as string).toLocaleDateString()}
            </p>
          );
        case "actions":
          return (
            <Button
              size="sm"
              variant="flat"
              onPress={() =>
                router.push(`/member/reservations/${item.id}`)
              }
            >
              Detail
            </Button>
          );
        default:
          return null;
      }
    },
    [],
  );

  return (
    <section>
      <div className="mb-4">
        <Select
          className="max-w-xs"
          placeholder="All Statuses"
          selectedKeys={currentStatus ? [currentStatus] : []}
          onChange={(e) => handleChangeStatus(e.target.value)}
        >
          <SelectItem key="confirmed" value="confirmed">
            Confirmed
          </SelectItem>
          <SelectItem key="cancelled" value="cancelled">
            Cancelled
          </SelectItem>
        </Select>
      </div>
      <DataTable
        columns={COLUMN_LISTS_RESERVATION}
        data={dataReservations}
        emptyContent="No reservations found"
        isLoading={isLoadingReservations}
        renderCell={renderCell}
        totalPages={totalPages}
        showSearch={false}
      />
    </section>
  );
};

export default Reservation;
