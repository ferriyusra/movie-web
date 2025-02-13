import DropdownAction from "@/components/commons/DropdownAction";
import DataTable from "@/components/ui/DataTable";
import { convertIDR } from "@/utils/currency";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  useDisclosure,
} from "@heroui/react";
import { Fragment, Key, ReactNode, useCallback } from "react";
import { COLUMN_LISTS_TICKET } from "./TicketTab.constants";
import useTicketTab from "./useTicketTab";
import AddTicketModal from "./AddTicketModal";
import { useState } from "react";
import { ITicket } from "@/types/Ticket";
import DeleteTicketModal from "./DeleteTicketModal";
import UpdateTicketModal from "./UpdateTicketModal";

const TicketTab = () => {
  const { dataTicket, refetchTicket, isPendingTicket, isRefetchingTicket } =
    useTicketTab();
  const addTicketModal = useDisclosure();
  const deleteTicketModal = useDisclosure();
  const updateTicketModal = useDisclosure();

  const [selectedDataTicket, setSelectedDataTicket] = useState<ITicket | null>(null)

  const renderCell = useCallback(
    (ticket: Record<string, unknown>, columnKey: Key) => {
      const cellValue = ticket[columnKey as keyof typeof ticket];

      switch (columnKey) {
        case "price":
          return `${convertIDR(cellValue as number)}`;
        case "actions":
          return (
            <DropdownAction
              onPressButtonDetail={() => {
                setSelectedDataTicket(ticket as ITicket)
                updateTicketModal.onOpen();
              }}
              onPressButtonDelete={() => {
                setSelectedDataTicket(ticket as ITicket)
                deleteTicketModal.onOpen();
              }}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [],
  );

  return (
    <Fragment>
      <Card className="w-full p-4">
        <CardHeader className="items-center justify-between">
          <div className="fllex flex-col items-center">
            <h1 className="w-full text-xl font-bold">Informasi Tiket</h1>
            <p className="w-full text-small text-default-400">Atur tiket</p>
          </div>
          <Button color="danger" onPress={addTicketModal.onOpen}>Tambah Tiket</Button>
        </CardHeader>
        <CardBody className="pt-0">
          <DataTable
            isLoading={isPendingTicket || isRefetchingTicket}
            columns={COLUMN_LISTS_TICKET}
            emptyContent="Tiket kosong"
            onClickButtonTopContent={addTicketModal.onOpen}
            renderCell={renderCell}
            totalPages={1}
            data={dataTicket || []}
            showLimit={false}
            showSearch={false}
          />
        </CardBody>
      </Card>
      <AddTicketModal {...addTicketModal} refetchTicket={refetchTicket} />
      <UpdateTicketModal
        refetchTicket={refetchTicket}
        selectedDataTicket={selectedDataTicket}
        setSelectedDataTicket={setSelectedDataTicket}
        {...updateTicketModal}
      />
      <DeleteTicketModal
        refetchTicket={refetchTicket}
        selectedDataTicket={selectedDataTicket}
        setSelectedDataTicket={setSelectedDataTicket}
        {...deleteTicketModal}
      />
    </Fragment>
  );
};

export default TicketTab;
