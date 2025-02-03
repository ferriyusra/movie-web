import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import useUpdateTicketModal from "./useUpdateTicketModal";
import { Controller } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect } from "react";
import { ITicket } from "@/types/Ticket";

interface PropTypes {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  refetchTicket: () => void;
  selectedDataTicket: ITicket | null;
  setSelectedDataTicket: Dispatch<SetStateAction<ITicket | null>>
}

const UpdateTicketModal = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refetchTicket, selectedDataTicket, setSelectedDataTicket } = props;

  const {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleUpdateTicket,
    isPendingMutateUpdateTicket,
    isSuccessMutateUpdateTicket,
    setValueUpdateTicket
  } = useUpdateTicketModal(`${selectedDataTicket?._id}`);

  useEffect(() => {
    if (isSuccessMutateUpdateTicket) {
      onClose();
      refetchTicket();
      setSelectedDataTicket(null);
    }
  }, [isSuccessMutateUpdateTicket]);

  useEffect(() => {
    if (selectedDataTicket) {
      setValueUpdateTicket("name", `${selectedDataTicket?.name}`)
      setValueUpdateTicket("description", `${selectedDataTicket?.description}`)
      setValueUpdateTicket("price", `${selectedDataTicket?.price}`)
      setValueUpdateTicket("quantity", `${selectedDataTicket?.quantity}`)
    }
  }, [selectedDataTicket])

  const handleOnClose = () => {
    onClose();
    reset();
    setSelectedDataTicket(null);
  }

  return (
    <Modal
      onClose={() => handleOnClose}
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <form onSubmit={handleSubmitForm(handleUpdateTicket)}>
        <ModalContent className="m-4">
          <ModalHeader>Update Tiket</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4">
              <p className="text-sm font-bold">Informasi</p>
              <div className="flex flex-col gap-4">
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Nama Tiket"
                      variant="bordered"
                      type="text"
                      isInvalid={errors.name !== undefined}
                      errorMessage={errors.name?.message}
                    />
                  )}
                />
                <Controller
                  name="price"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Harga"
                      variant="bordered"
                      type="text"
                      isInvalid={errors.price !== undefined}
                      errorMessage={errors.price?.message}
                    />
                  )}
                />
                <Controller
                  name="quantity"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Stok"
                      variant="bordered"
                      type="text"
                      isInvalid={errors.quantity !== undefined}
                      errorMessage={errors.quantity?.message}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      label="Deskripsi Kategori"
                      variant="bordered"
                      isInvalid={errors.description !== undefined}
                      errorMessage={errors.description?.message}
                      labelPlacement="outside"
                    ></Textarea>
                  )}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="flat"
              onPress={handleOnClose}
              disabled={isPendingMutateUpdateTicket}
            >
              Batal
            </Button>
            <Button
              color="danger"
              type="submit"
              disabled={isPendingMutateUpdateTicket}
            >
              {isPendingMutateUpdateTicket ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Update Tiket"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default UpdateTicketModal;
