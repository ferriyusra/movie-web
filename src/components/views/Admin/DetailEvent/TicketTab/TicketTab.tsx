import DropdownAction from "@/components/commons/DropdownAction";
import DataTable from "@/components/ui/DataTable";
import { convertIDR } from "@/utils/currency";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Key, ReactNode, useCallback } from "react";
import { COLUMN_LISTS_TICKET } from "./TicketTab.constants";
import useTicketTab from "./useTicketTab";

const TicketTab = () => {
  const { dataTicket, refetchTicket, isPendingTicket, isRefetchingTicket } =
    useTicketTab();
  const addTicketModal = useDisclosure();
  const deleteTicketModal = useDisclosure();
  const updateTicketModal = useDisclosure();

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
                updateTicketModal.onOpen();
              }}
              onPressButtonDelete={() => {
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
    <Card className="w-full p-4">
      <CardHeader className="items-center justify-between">
        <div className="fllex flex-col items-center">
          <h1 className="w-full text-xl font-bold">Informasi Tiket</h1>
          <p className="w-full text-small text-default-400">Atur tiket</p>
        </div>
        <Button color="danger">Tambah Tiket</Button>
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
  );
};

export default TicketTab;
