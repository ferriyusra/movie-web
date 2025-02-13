import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Spinner } from "@heroui/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import useDeleteTicketModal from "./useDeleteTicketModal";
import { ITicket } from "@/types/Ticket";

interface PropTypes {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  refetchTicket: () => void;
  selectedDataTicket: ITicket | null;
  setSelectedDataTicket: Dispatch<SetStateAction<ITicket | null>>
}

const DeleteTicketModal = (props: PropTypes) => {
  const {
    isOpen,
    onOpenChange,
    onClose,
    refetchTicket,
    selectedDataTicket,
    setSelectedDataTicket,
  } = props;

  const {
    mutateDeleteTicket,
    isPendingMutateDeleteTicket,
    isSuccessMutateDeleteTicket
  } = useDeleteTicketModal();

  useEffect(() => {
    if (isSuccessMutateDeleteTicket) {
      onClose();
      refetchTicket();
      setSelectedDataTicket(null);
    }
  }, [isSuccessMutateDeleteTicket])

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside">
      <ModalContent className="m-4">
        <ModalHeader>Hapus Tiket</ModalHeader>
        <ModalBody>
          <p className="text-medium">Apakah kamu yakin menghapus tiket ini ?</p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="flat"
            onPress={() => {
              onClose();
              setSelectedDataTicket(null)
            }}
            disabled={isPendingMutateDeleteTicket}
          >Batal</Button>
          <Button
            color="danger"
            type="submit"
            disabled={isPendingMutateDeleteTicket}
            onPress={() => mutateDeleteTicket(`${selectedDataTicket?._id}`)}
          >{
              isPendingMutateDeleteTicket ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Hapus tiket"
              )
            }</Button>
        </ModalFooter>
      </ModalContent>
    </Modal >
  )
}

export default DeleteTicketModal;