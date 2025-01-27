import InputFile from "@/components/ui/InputFile";
import { Button, Card, CardBody, CardHeader, Skeleton, Spinner } from "@nextui-org/react";
import Image from "next/image";
import useIconTab from "./useIconTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { ICategory } from "@/types/Category";

interface PropTypes {
  currentIcon: string;
  onUpdate: (data: ICategory) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean
}

const IconTab = (props: PropTypes) => {
  const { currentIcon, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
  const {
    handleDeleteIcon,
    handleUploadIcon,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,

    controlUpdateIcon,
    errorsUpdateIcon,
    handleSubmitUpdateIcon,
    resetUpdateIcon,

    preview
  } = useIconTab();

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateIcon()
    }
  }, [isSuccessUpdate])

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Kategori ikon</h1>
        <p className="w-full text-small text-default-400">Atur ikon kategori</p>
      </CardHeader>
      <CardBody>
        <form className="flex flex-col gap-4" onSubmit={handleSubmitUpdateIcon(onUpdate)}>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-default-700">
              Ikon saat ini
            </p>
            <Skeleton
              className="aspect-square rounded-lg"
              isLoaded={!!currentIcon}
            >
              <Image src={currentIcon} alt="icon" fill className="!relative" />
            </Skeleton>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-bold">Informasi</p>
            <p className="text-sm font-bold">Ikon</p>
            <Controller
              name="icon"
              control={controlUpdateIcon}
              render={({ field: { onChange, value, ...field } }) => (
                <InputFile
                  {...field}
                  onUpload={(files) => handleUploadIcon(files, onChange)}
                  onDelete={() => handleDeleteIcon(onChange)}
                  isUploading={isPendingMutateUploadFile}
                  isDeleting={isPendingMutateDeleteFile}
                  isInvalid={errorsUpdateIcon.icon !== undefined}
                  isDropable
                  errorMessage={errorsUpdateIcon.icon?.message}
                  preview={typeof preview === 'string' ? preview : ""}
                  label={<p className="text-sm font-medium text-default-700">Unggah ikon baru</p>}
                />
              )}
            />
          </div>

          <Button
            type="submit"
            color="danger"
            className="mt-2 disabled:bg-default-500"
            disabled={isPendingMutateUploadFile || isPendingUpdate || !preview}
          > {isPendingUpdate ? (
            <Spinner size="sm" color="white" />
          ) : (
            "Simpan Perubahan"
          )}</Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default IconTab;
