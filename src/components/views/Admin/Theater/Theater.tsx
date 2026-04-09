import { Key, useCallback } from "react";
import { useRouter } from "next/router";
import DataTable from "@/components/ui/DataTable";
import { COLUMN_LISTS_THEATER } from "./Theater.constants";
import useTheater from "./useTheater";
import AddTheaterModal from "./AddTheaterModal/AddTheaterModal";
import { Button } from "@heroui/react";

const AdminTheater = () => {
  const router = useRouter();
  const {
    dataTheaters,
    isLoadingTheaters,
    refetchTheaters,
    addModalOpen,
    setAddModalOpen,
  } = useTheater();

  const renderCell = useCallback(
    (item: Record<string, unknown>, columnKey: Key) => {
      switch (columnKey) {
        case "name":
          return <p className="font-medium">{item.name as string}</p>;
        case "location":
          return <p>{item.location as string}</p>;
        case "totalSeats":
          return <p>{item.totalSeats as number}</p>;
        case "layout":
          return (
            <p className="text-xs text-default-400">
              {item.rows as number} rows x {item.seatsPerRow as number} seats
            </p>
          );
        case "actions":
          return (
            <Button
              size="sm"
              variant="flat"
              onPress={() => router.push(`/theaters/${item.id}`)}
            >
              View Seats
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
      <DataTable
        buttonTopContentLabel="Add Theater"
        onClickButtonTopContent={() => setAddModalOpen(true)}
        columns={COLUMN_LISTS_THEATER}
        data={dataTheaters || []}
        emptyContent="No theaters found"
        isLoading={isLoadingTheaters}
        renderCell={renderCell}
        totalPages={1}
        showSearch={false}
        showLimit={false}
      />
      <AddTheaterModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        refetchTheaters={refetchTheaters}
      />
    </section>
  );
};

export default AdminTheater;
