import DataTable from "@/components/ui/DataTable";
import {
  Chip,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LISTS_EVENT } from "./Event.constants";
import useEvent from "./useEvent";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropdownAction";
import AddEventModal from "./AddEventModal";
import DeleteEventModal from "./DeleteEventModal";

const Event = () => {
  const { isReady, push, query } = useRouter();
  const {
    dataEvents,
    isLoadingEvents,
    isRefetchingEvents,
    refetchEvents,
    selectedId,
    setSelectedId,
  } = useEvent();

  const addEventModal = useDisclosure();
  const deleteEventModal = useDisclosure();
  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (event: Record<string, unknown>, columnKey: Key) => {
      const cellValue = event[columnKey as keyof typeof event];

      switch (columnKey) {
        case "banner":
          return (
            <Image
              className="aspect-video w-36 object-cover rounded-lg"
              src={`${cellValue}`}
              alt="icon"
              width={200}
              height={200}
            />
          );
        case "isPublish":
          return (
            <Chip
              color={cellValue ? "success" : "warning"}
              size="sm"
              variant="flat"
            >
              {cellValue === true ? "Publish" : "Not Publish"}
            </Chip>
          )
        case "actions":
          return (
            <DropdownAction
              onPressButtonDetail={() => push(`/admin/event/${event._id}`)}
              onPressButtonDelete={() => {
                setSelectedId(`${event._id}`);
                deleteEventModal.onOpen();
              }}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          isLoading={isLoadingEvents || isRefetchingEvents}
          columns={COLUMN_LISTS_EVENT}
          emptyContent="Kategori kosong"
          onClickButtonTopContent={addEventModal.onOpen}
          buttonTopContentLabel="Tambah Acara"
          renderCell={renderCell}
          totalPages={dataEvents?.pagination.totalPages}
          data={dataEvents?.data || []}
        />
      )}
      <AddEventModal
        refetchEvents={refetchEvents}
        {...addEventModal}
      />
      <DeleteEventModal
        refetchEvents={refetchEvents}
        setSelectedId={setSelectedId}
        selectedId={selectedId}
        {...deleteEventModal}
      />
    </section>
  );
};

export default Event;
