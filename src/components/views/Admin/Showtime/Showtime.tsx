import { Key, useCallback } from "react";
import { Button, Chip, DateRangePicker, Input } from "@heroui/react";
import { FaMagnifyingGlass, FaPlus } from "react-icons/fa6";
import DataTable from "@/components/ui/DataTable";
import DropdownAction from "@/components/commons/DropdownAction";
import { COLUMN_LISTS_SHOWTIME } from "./Showtime.constants";
import useAdminShowtime from "./useShowtime";
import AddShowtimeModal from "./AddShowtimeModal/AddShowtimeModal";
import EditShowtimeModal from "./EditShowtimeModal/EditShowtimeModal";
import DeleteShowtimeModal from "./DeleteShowtimeModal/DeleteShowtimeModal";
import { formatCurrency } from "@/utils/currency";
import { formatShowtimeDate } from "@/utils/date";

const AdminShowtime = () => {
  const {
    dataShowtimes,
    isLoadingShowtimes,
    refetchShowtimes,
    selectedId,
    setSelectedId,
    addModalOpen,
    setAddModalOpen,
    editModalOpen,
    setEditModalOpen,
    deleteModalOpen,
    setDeleteModalOpen,
    totalPages,
    movieTitle,
    dateRange,
    handleMovieTitleChange,
    handleDateRangeChange,
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
        case "startTime": {
          const start = formatShowtimeDate(item.startTime as string);
          const end = formatShowtimeDate(item.endTime as string);
          const sameDay = start.day === end.day;
          return (
            <div className="flex flex-col gap-0.5 text-sm">
              <span className="font-medium text-default-700">{start.day}</span>
              {sameDay ? (
                <span className="text-default-500">
                  {start.time} – {end.time}
                </span>
              ) : (
                <span className="text-default-500">
                  {start.time} – {end.day} · {end.time}
                </span>
              )}
            </div>
          );
        }
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
              onPressButtonDetail={() => {
                setSelectedId(item.id as string);
                setEditModalOpen(true);
              }}
              onPressButtonDelete={() => {
                setSelectedId(item.id as string);
                setDeleteModalOpen(true);
              }}
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
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-3">
          <Input
            size="sm"
            variant="bordered"
            placeholder="Search movie..."
            value={movieTitle}
            onChange={handleMovieTitleChange}
            startContent={<FaMagnifyingGlass className="text-xs text-default-400" />}
            classNames={{ inputWrapper: "h-9" }}
            className="w-full sm:max-w-[220px]"
          />
          <DateRangePicker
            size="sm"
            variant="bordered"
            value={dateRange}
            onChange={handleDateRangeChange}
            className="w-full sm:max-w-[280px]"
          />
        </div>
        <Button
          color="danger"
          size="sm"
          onPress={() => setAddModalOpen(true)}
          startContent={<FaPlus className="text-xs" />}
          className="w-full font-medium sm:w-auto"
        >
          Add Showtime
        </Button>
      </div>
      <DataTable
        columns={COLUMN_LISTS_SHOWTIME}
        data={dataShowtimes || []}
        emptyContent="No showtimes found"
        isLoading={isLoadingShowtimes}
        renderCell={renderCell}
        totalPages={totalPages}
        showSearch={false}
      />
      <AddShowtimeModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        refetchShowtimes={refetchShowtimes}
      />
      <EditShowtimeModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        showtimeId={selectedId}
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
