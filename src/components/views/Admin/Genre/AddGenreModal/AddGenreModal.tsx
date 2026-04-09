import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import useAddGenreModal from "./useAddGenreModal";
import { Controller } from "react-hook-form";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  refetchGenres: () => void;
}

const AddGenreModal = (props: PropTypes) => {
  const { isOpen, onClose, refetchGenres } = props;
  const { control, handleSubmit, handleAdd, isPendingAdd, errors, reset } =
    useAddGenreModal({ onClose, refetchGenres });

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <form onSubmit={handleSubmit(handleAdd)}>
        <ModalContent>
          <ModalHeader>Add Genre</ModalHeader>
          <ModalBody>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Genre Name"
                  variant="bordered"
                  autoComplete="off"
                  isInvalid={errors.name !== undefined}
                  errorMessage={errors.name?.message}
                />
              )}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={handleClose}>
              Cancel
            </Button>
            <Button color="danger" type="submit" isDisabled={isPendingAdd}>
              {isPendingAdd ? <Spinner size="sm" color="white" /> : "Add"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddGenreModal;
