import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Spinner,
} from "@heroui/react";
import useAddBannerModal from "./useAddBannerModal";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";
import { useEffect } from "react";

interface PropTypes {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  refetchBanners: () => void;
}

const AddBannerModal = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refetchBanners } = props;

  const {
    control,
    errors,
    preview,
    handleSubmitForm,
    handleAddBanner,
    isPendingMutateAddBanner,
    isSuccessMutateAddBanner,
    isPendingMutateUploadFile,
    handleUploadImage,
    handleDeleteImage,
    handleOnClose,
    isPendingMutateDeleteFile,
  } = useAddBannerModal();

  useEffect(() => {
    if (isSuccessMutateAddBanner) {
      onClose();
      refetchBanners();
    }
  }, [isSuccessMutateAddBanner]);

  const disbaledSubmit =
    isPendingMutateAddBanner ||
    isPendingMutateUploadFile ||
    isPendingMutateDeleteFile;

  return (
    <Modal
      onClose={() => handleOnClose(onClose)}
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <form onSubmit={handleSubmitForm(handleAddBanner)}>
        <ModalContent className="m-4">
          <ModalHeader>Tambah Spanduk</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold">Informasi</p>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
                    label="Title"
                    variant="bordered"
                    type="text"
                    isInvalid={errors.title !== undefined}
                    errorMessage={errors.title?.message}
                    className="mb-2"
                  />
                )}
              />
              <Controller
                name="isShow"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Status"
                    variant="bordered"
                    isInvalid={errors.isShow !== undefined}
                    errorMessage={errors.isShow?.message}
                    disallowEmptySelection
                  >
                    <SelectItem key="true" value="true">
                      Tampilkan
                    </SelectItem>
                    <SelectItem key="false" value="false">
                      Tidak ditampilkan
                    </SelectItem>
                  </Select>
                )}
              />
              <p className="text-sm font-bold">Gambar</p>
              <Controller
                name="image"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <InputFile
                    {...field}
                    onUpload={(files) => handleUploadImage(files, onChange)}
                    onDelete={() => handleDeleteImage(onChange)}
                    isUploading={isPendingMutateUploadFile}
                    isDeleting={isPendingMutateDeleteFile}
                    isInvalid={errors.image !== undefined}
                    isDropable
                    errorMessage={errors.image?.message}
                    preview={typeof preview === "string" ? preview : ""}
                  />
                )}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="flat"
              onPress={() => handleOnClose(onClose)}
              disabled={disbaledSubmit}
            >
              Batal
            </Button>
            <Button color="danger" type="submit" disabled={disbaledSubmit}>
              {isPendingMutateAddBanner ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Tambah spanduk"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddBannerModal;
