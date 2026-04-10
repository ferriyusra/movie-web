import { Key, useCallback } from "react";
import { Chip, Input } from "@heroui/react";
import DataTable from "@/components/ui/DataTable";
import DropdownAction from "@/components/commons/DropdownAction";
import { COLUMN_LISTS_SHOWTIME } from "./Showtime.constants";
import useAdminShowtime from "./useShowtime";
import AddShowtimeModal from "./AddShowtimeModal/AddShowtimeModal";
import DeleteShowtimeModal from "./DeleteShowtimeModal/DeleteShowtimeModal";
import { formatCurrency } from "@/utils/currency";

const AdminShowtime = () => {
  const {
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
  } = useAdminShowtime();

  const renderCell = useCallback(
    (item: Record<string, unknown>, columnKey: Key) => {
      switch (columnKey) {
        case "movie":
          return (
            <p className="text-sm font-medium">
              {(item.movieTitle as string) || "-"}
            </p>
          );
        case "theater":
          return (
            <p className="text-sm text-default-600">
              {(item.theaterName as string) || "-"}
            </p>
          );
        case "startTime":
          return (
            <p className="text-sm">
              {new Date(item.startTime as string).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          );
        case "price":
          return (
            <p className="text-sm font-medium">
              {formatCurrency(item.price as number)}
            </p>
          );
        case "availableSeats":
          return (
            <Chip
              size="sm"
              variant="flat"
              color={
                (item.availableSeats as number) > 0 ? "success" : "default"
              }
            >
              {item.availableSeats as number}
            </Chip>
          );
        case "actions":
          return (
            <DropdownAction
              onPressButtonDetail={() => {}}
              onPressButtonDelete={() => {
                setSelectedId(item.id as string);
                setDeleteModalOpen(true);
              }}
              hideButtonDelete={false}
            />
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
        <Input
          type="date"
          variant="bordered"
          size="sm"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="max-w-[180px]"
          label="Date"
        />
      </div>
      <DataTable
        buttonTopContentLabel="Add Showtime"
        onClickButtonTopContent={() => setAddModalOpen(true)}
        columns={COLUMN_LISTS_SHOWTIME}
        data={dataShowtimes || []}
        emptyContent="No showtimes found for this date"
        isLoading={isLoadingShowtimes}
        renderCell={renderCell}
        totalPages={1}
        showSearch={false}
        showLimit={false}
      />
      <AddShowtimeModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        refetchShowtimes={refetchShowtimes}
      />
      <DeleteShowtimeModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        showtimeId={selectedId}
        refetchShowtimes={refetchShowtimes}
      />
    </section>
  );
};

export default AdminShowtime;
