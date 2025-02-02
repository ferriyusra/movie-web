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
import useAddTicketModal from "./useAddTicketModal";
import { Controller } from "react-hook-form";
import { useEffect } from "react";

interface PropTypes {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  refetchTicket: () => void;
}

const AddTicketModal = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refetchTicket } = props;

  const {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddTicket,
    isPendingMutateAddTicket,
    isSuccessMutateAddTicket,
  } = useAddTicketModal();

  useEffect(() => {
    if (isSuccessMutateAddTicket) {
      onClose();
      refetchTicket();
    }
  }, [isSuccessMutateAddTicket]);

  const handleOnClose = () => {
    onClose();
    reset();
  }

  return (
    <Modal
      onClose={() => handleOnClose}
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <form onSubmit={handleSubmitForm(handleAddTicket)}>
        <ModalContent className="m-4">
          <ModalHeader>Tambah Tiket</ModalHeader>
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
                      label="Nama Kategori"
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
              disabled={isPendingMutateAddTicket}
            >
              Batal
            </Button>
            <Button
              color="danger"
              type="submit"
              disabled={isPendingMutateAddTicket}
            >
              {isPendingMutateAddTicket ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Tambah Tiket"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddTicketModal;
