import { Key, useCallback, useContext, useState } from "react";
import {
  Button,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Spinner,
} from "@heroui/react";
import { useQuery, useMutation } from "@tanstack/react-query";
import DataTable from "@/components/ui/DataTable";
import { COLUMN_LISTS_ADMIN_RESERVATION } from "./Reservation.constants";
import reservationServices from "@/services/reservation.service";
import { ToasterContext } from "@/contexts/ToasterContext";
import { formatCurrency } from "@/utils/currency";
import useChangeUrl from "@/hooks/useChangeUrl";
import { LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constants/list.constants";
import { useEffect } from "react";
import { ISeat } from "@/types/Theater";

const AdminReservation = () => {
  const { setToaster } = useContext(ToasterContext);
  const [selectedId, setSelectedId] = useState("");
  const [cancelOpen, setCancelOpen] = useState(false);

  const {
    currentLimit,
    currentPage,
    currentStatus,
    setUrl,
    handleChangeStatus,
  } = useChangeUrl();

  useEffect(() => {
    if (currentPage === undefined) setUrl();
  }, []);

  const getReservations = async () => {
    let params = `limit=${currentLimit || LIMIT_DEFAULT}&page=${currentPage || PAGE_DEFAULT}`;
    if (currentStatus) params += `&status=${currentStatus}`;
    const { data } = await reservationServices.getAdminReservations(params);
    return data;
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["AdminReservations", currentPage, currentLimit, currentStatus],
    queryFn: getReservations,
    enabled: !!currentPage,
  });

  const { mutate: mutateCancel, isPending: isPendingCancel } = useMutation({
    mutationFn: () => reservationServices.adminCancelReservation(selectedId),
    onError: (error) => {
      setToaster({ type: "error", message: error.message });
      setCancelOpen(false);
    },
    onSuccess: () => {
      setCancelOpen(false);
      refetch();
      setToaster({ type: "success", message: "Reservation cancelled" });
    },
  });

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
          return item.status === "confirmed" ? (
            <Button
              size="sm"
              color="danger"
              variant="flat"
              onPress={() => {
                setSelectedId(item.id as string);
                setCancelOpen(true);
              }}
            >
              Cancel
            </Button>
          ) : null;
        default:
          return null;
      }
    },
    [],
  );

  const totalPages = data?.meta
    ? Math.ceil(data.meta.total / data.meta.limit)
    : 1;

  return (
    <section>
      <div className="mb-4">
        <Select
          className="max-w-xs"
          placeholder="All Statuses"
          selectedKeys={currentStatus ? [currentStatus as string] : []}
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
        columns={COLUMN_LISTS_ADMIN_RESERVATION}
        data={data?.data || []}
        emptyContent="No reservations found"
        isLoading={isLoading}
        renderCell={renderCell}
        totalPages={totalPages}
        showSearch={false}
      />

      <Modal isOpen={cancelOpen} onClose={() => setCancelOpen(false)}>
        <ModalContent>
          <ModalHeader>Force Cancel Reservation</ModalHeader>
          <ModalBody>
            <p>Cancel this reservation? (Admin override, no time restriction)</p>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={() => setCancelOpen(false)}>
              Keep
            </Button>
            <Button
              color="danger"
              onPress={() => mutateCancel()}
              isDisabled={isPendingCancel}
            >
              {isPendingCancel ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Cancel Reservation"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </section>
  );
};

export default AdminReservation;
