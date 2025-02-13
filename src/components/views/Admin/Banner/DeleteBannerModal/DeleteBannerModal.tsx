import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Spinner,
} from "@heroui/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import useDeleteBannerModal from "./useDeleteBannerModal";

interface PropTypes {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  refetchBanners: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteBannerModal = (props: PropTypes) => {
  const {
    isOpen,
    onOpenChange,
    onClose,
    selectedId,
    setSelectedId,
    refetchBanners,
  } = props;

  const {
    mutateDeleteBanner,
    isPendingMutateDeleteBanner,
    isSuccessMutateDeleteBanner,
  } = useDeleteBannerModal();

  useEffect(() => {
    if (isSuccessMutateDeleteBanner) {
      onClose();
      refetchBanners();
      setSelectedId("");
    }
  }, [isSuccessMutateDeleteBanner]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Hapus Spanduk</ModalHeader>
        <ModalBody>
          <p className="text-medium">
            Apakah kamu yakin menghapus spanduk ini ?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="flat"
            onPress={() => {
              onClose();
              setSelectedId("");
            }}
            disabled={isPendingMutateDeleteBanner}
          >
            Batal
          </Button>
          <Button
            color="danger"
            type="submit"
            disabled={isPendingMutateDeleteBanner}
            onPress={() => mutateDeleteBanner(selectedId)}
          >
            {isPendingMutateDeleteBanner ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Hapus Spanduk"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteBannerModal;
