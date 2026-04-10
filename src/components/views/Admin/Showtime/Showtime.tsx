import { Key, useCallback } from "react";
import { Input } from "@heroui/react";
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
          return <p className="font-medium">{(item.movieTitle as string) || "-"}</p>;
        case "theater":
          return <p>{(item.theaterName as string) || "-"}</p>;
        case "startTime":
          return (
            <p className="text-sm">
              {new Date(item.startTime as string).toLocaleString()}
            </p>
          );
        case "price":
          return <p>{formatCurrency(item.price as number)}</p>;
        case "availableSeats":
          return <p>{item.availableSeats as number}</p>;
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
          label="Filter by date"
          variant="bordered"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="max-w-xs"
        />
      </div>
      <DataTable
        buttonTopContentLabel="Add Showtime"
        onClickButtonTopContent={() => setAddModalOpen(true)}
        columns={COLUMN_LISTS_SHOWTIME}
        data={dataShowtimes || []}
        emptyContent="No showtimes found"
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
