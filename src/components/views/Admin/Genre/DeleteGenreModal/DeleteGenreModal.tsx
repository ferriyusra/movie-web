import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import useDeleteGenreModal from "./useDeleteGenreModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  genreId: string;
  refetchGenres: () => void;
}

const DeleteGenreModal = (props: PropTypes) => {
  const { isOpen, onClose, genreId, refetchGenres } = props;
  const { handleDelete, isPendingDelete } = useDeleteGenreModal({
    onClose,
    genreId,
    refetchGenres,
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Delete Genre</ModalHeader>
        <ModalBody>
          <p>Are you sure you want to delete this genre?</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button
            color="danger"
            onPress={handleDelete}
            isDisabled={isPendingDelete}
          >
            {isPendingDelete ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteGenreModal;
