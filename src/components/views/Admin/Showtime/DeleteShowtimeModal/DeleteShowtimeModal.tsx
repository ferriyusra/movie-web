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
import showtimeServices from "@/services/showtime.service";
import { ToasterContext } from "@/contexts/ToasterContext";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  showtimeId: string;
  refetchShowtimes: () => void;
}

const DeleteShowtimeModal = ({
  isOpen,
  onClose,
  showtimeId,
  refetchShowtimes,
}: PropTypes) => {
  const { setToaster } = useContext(ToasterContext);

  const { mutate, isPending } = useMutation({
    mutationFn: () => showtimeServices.deleteShowtime(showtimeId),
    onError: (error) => {
      setToaster({ type: "error", message: error.message });
    },
    onSuccess: () => {
      onClose();
      refetchShowtimes();
      setToaster({ type: "success", message: "Showtime deleted!" });
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Delete Showtime</ModalHeader>
        <ModalBody>
          <p>Are you sure you want to delete this showtime?</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button color="danger" onPress={() => mutate()} isDisabled={isPending}>
            {isPending ? <Spinner size="sm" color="white" /> : "Delete"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteShowtimeModal;
