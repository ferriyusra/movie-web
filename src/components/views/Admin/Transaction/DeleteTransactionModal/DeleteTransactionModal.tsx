import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Spinner } from "@heroui/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import useDeleteTransactionModal from "./useDeleteTransactionModal";

interface PropTypes {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  refetchTransactions: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>
}

const DeleteTransactionModal = (props: PropTypes) => {
  const {
    isOpen,
    onOpenChange,
    onClose,
    selectedId,
    setSelectedId,
    refetchTransactions,
  } = props;

  const {
    mutateDeleteTransaction,
    isPendingMutateDeleteTransaction,
    isSuccessMutateDeleteTransaction,
  } = useDeleteTransactionModal();

  useEffect(() => {
    if (isSuccessMutateDeleteTransaction) {
      onClose();
      refetchTransactions();
      setSelectedId("")
    }
  }, [isSuccessMutateDeleteTransaction])

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside">
      <ModalContent className="m-4">
        <ModalHeader>Hapus Transaksi</ModalHeader>
        <ModalBody>
          <p className="text-medium">Apakah kamu yakin menghapus transaksi ini ?</p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="flat"
            onPress={() => {
              onClose();
              setSelectedId("")
            }}
            disabled={isPendingMutateDeleteTransaction}
          >Batal</Button>
          <Button
            color="danger"
            type="submit"
            disabled={isPendingMutateDeleteTransaction}
            onPress={() => mutateDeleteTransaction(selectedId)}
          >{
              isPendingMutateDeleteTransaction ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Hapus Transaksi"
              )
            }</Button>
        </ModalFooter>
      </ModalContent>
    </Modal >
  )
}

export default DeleteTransactionModal;