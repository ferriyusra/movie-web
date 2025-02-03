import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Spinner } from "@nextui-org/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import useDeleteCategoryModal from "./useDeleteCategoryModal";

interface PropTypes {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  refetchCategory: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>
}

const DeleteCategoryModal = (props: PropTypes) => {
  const {
    isOpen,
    onOpenChange,
    onClose,
    selectedId,
    setSelectedId,
    refetchCategory,
  } = props;

  const {
    mutateDeleteCategory,
    isPendingMutateDeleteCategory,
    isSuccessMutateDeleteCategory
  } = useDeleteCategoryModal();

  useEffect(() => {
    if (isSuccessMutateDeleteCategory) {
      onClose();
      refetchCategory();
      setSelectedId("")
    }
  }, [isSuccessMutateDeleteCategory])

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside">
      <ModalContent className="m-4">
        <ModalHeader>Hapus Kategori</ModalHeader>
        <ModalBody>
          <p className="text-medium">Apakah kamu yakin menghapus kategori ini ?</p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="flat"
            onPress={() => {
              onClose();
              setSelectedId("")
            }}
            disabled={isPendingMutateDeleteCategory}
          >Batal</Button>
          <Button
            color="danger"
            type="submit"
            disabled={isPendingMutateDeleteCategory}
            onPress={() => mutateDeleteCategory(selectedId)}
          >{
              isPendingMutateDeleteCategory ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Hapus kategori"
              )
            }</Button>
        </ModalFooter>
      </ModalContent>
    </Modal >
  )
}

export default DeleteCategoryModal;