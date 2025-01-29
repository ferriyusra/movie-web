import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, Textarea } from "@nextui-org/react"
import useAddCategoryModal from "./useAddCategoryModal";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";
import { useEffect } from "react";

interface PropTypes {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  refetchCategory: () => void;
}

const AddCategoryModal = (props: PropTypes) => {

  const { isOpen, onClose, onOpenChange, refetchCategory } = props;

  const {
    control,
    errors,
    preview,
    handleSubmitForm,
    handleAddCategory,
    isPendingMutateAddCategory,
    isSuccessMutateAddCategory,
    isPendingMutateUploadFile,
    handleUploadIcon,
    handleDeleteIcon,
    handleOnClose,
    isPendingMutateDeleteFile,
  } = useAddCategoryModal();

  useEffect(() => {
    if (isSuccessMutateAddCategory) {
      onClose();
      refetchCategory();
    }

  }, [isSuccessMutateAddCategory])

  const disbaledSubmit = isPendingMutateAddCategory || isPendingMutateUploadFile || isPendingMutateDeleteFile;


  return (
    <Modal
      onClose={() => handleOnClose(onClose)}
      onOpenChange={onOpenChange}
      isOpen={isOpen} placement="center" scrollBehavior="inside">
      <form onSubmit={handleSubmitForm(handleAddCategory)}>
        <ModalContent className="m-4">
          <ModalHeader>Tambah Kategori</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold">Informasi</p>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
                    label="Nama Kategori"
                    variant="bordered"
                    type="text"
                    isInvalid={errors.name !== undefined}
                    errorMessage={errors.name?.message}
                    className="mb-2"
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
                    className="mb-2"
                  />
                )}
              />
              <p className="text-sm font-bold">Ikon</p>
              <Controller
                name="icon"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <InputFile
                    {...field}
                    onUpload={(files) => handleUploadIcon(files, onChange)}
                    onDelete={() => handleDeleteIcon(onChange)}
                    isUploading={isPendingMutateUploadFile}
                    isDeleting={isPendingMutateDeleteFile}
                    isInvalid={errors.icon !== undefined}
                    isDropable
                    errorMessage={errors.icon?.message}
                    preview={typeof preview === 'string' ? preview : ""}
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
            >Batal</Button>
            <Button
              color="danger"
              type="submit"
              disabled={disbaledSubmit}
            >{
                isPendingMutateAddCategory ? (
                  <Spinner size="sm" color="white" />
                ) : (
                  "Tambah kategori"
                )
              }</Button>
          </ModalFooter>
        </ModalContent>
      </form >
    </Modal >
  )
}

export default AddCategoryModal;