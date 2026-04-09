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
import { useContext } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import theaterServices from "@/services/theater.service";
import { ToasterContext } from "@/contexts/ToasterContext";

const theaterSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  location: yup.string().required("Location is required"),
  rows: yup
    .number()
    .typeError("Rows must be a number")
    .positive()
    .required("Rows is required"),
  seatsPerRow: yup
    .number()
    .typeError("Seats per row must be a number")
    .positive()
    .required("Seats per row is required"),
});

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  refetchTheaters: () => void;
}

const AddTheaterModal = ({ isOpen, onClose, refetchTheaters }: PropTypes) => {
  const { setToaster } = useContext(ToasterContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(theaterSchema),
    defaultValues: { name: "", location: "", rows: 5, seatsPerRow: 10 },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: theaterServices.addTheater,
    onError: (error) => {
      setToaster({ type: "error", message: error.message });
    },
    onSuccess: () => {
      reset();
      onClose();
      refetchTheaters();
      setToaster({ type: "success", message: "Theater created!" });
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <form onSubmit={handleSubmit((data) => mutate(data))}>
        <ModalContent>
          <ModalHeader>Add Theater</ModalHeader>
          <ModalBody className="flex flex-col gap-4">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Theater Name"
                  variant="bordered"
                  isInvalid={!!errors.name}
                  errorMessage={errors.name?.message}
                />
              )}
            />
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Location"
                  variant="bordered"
                  isInvalid={!!errors.location}
                  errorMessage={errors.location?.message}
                />
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="rows"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    label="Rows"
                    variant="bordered"
                    value={String(field.value)}
                    isInvalid={!!errors.rows}
                    errorMessage={errors.rows?.message}
                  />
                )}
              />
              <Controller
                name="seatsPerRow"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    label="Seats per Row"
                    variant="bordered"
                    value={String(field.value)}
                    isInvalid={!!errors.seatsPerRow}
                    errorMessage={errors.seatsPerRow?.message}
                  />
                )}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={handleClose}>
              Cancel
            </Button>
            <Button color="danger" type="submit" isDisabled={isPending}>
              {isPending ? <Spinner size="sm" color="white" /> : "Create"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddTheaterModal;
