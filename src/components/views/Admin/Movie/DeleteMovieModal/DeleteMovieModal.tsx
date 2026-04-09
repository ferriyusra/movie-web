import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import movieServices from "@/services/movie.service";
import { ToasterContext } from "@/contexts/ToasterContext";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  movieId: string;
  refetchMovies: () => void;
}

const DeleteMovieModal = (props: PropTypes) => {
  const { isOpen, onClose, movieId, refetchMovies } = props;
  const { setToaster } = useContext(ToasterContext);

  const { mutate: mutateDelete, isPending } = useMutation({
    mutationFn: () => movieServices.deleteMovie(movieId),
    onError: (error) => {
      setToaster({ type: "error", message: error.message });
    },
    onSuccess: () => {
      onClose();
      refetchMovies();
      setToaster({ type: "success", message: "Movie deleted successfully!" });
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Delete Movie</ModalHeader>
        <ModalBody>
          <p>Are you sure you want to delete this movie?</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button color="danger" onPress={() => mutateDelete()} isDisabled={isPending}>
            {isPending ? <Spinner size="sm" color="white" /> : "Delete"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteMovieModal;
