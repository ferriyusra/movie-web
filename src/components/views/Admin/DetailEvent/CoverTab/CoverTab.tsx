import InputFile from "@/components/ui/InputFile";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  Spinner,
} from "@heroui/react";
import Image from "next/image";
import useCoverTab from "./useCoverTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { IEventForm, IEvent } from "@/types/Event";

interface PropTypes {
  currentCover: string;
  onUpdate: (data: IEvent) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const CoverTab = (props: PropTypes) => {
  const { currentCover, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
  const {
    handleDeleteCover,
    handleUploadCover,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,

    controlUpdateCover,
    errorsUpdateCover,
    handleSubmitUpdateCover,
    resetUpdateCover,

    preview,
  } = useCoverTab();

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateCover();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Sampul Acara</h1>
        <p className="w-full text-small text-default-400">Atur sampul acara</p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateCover(onUpdate)}
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-default-700">
              Sampul acara saat ini
            </p>
            <Skeleton
              className="aspect-video rounded-lg"
              isLoaded={!!currentCover}
            >
              <Image
                src={currentCover}
                alt="banner"
                fill
                className="!relative rounded-lg"
              />
            </Skeleton>
          </div>
          <div className="flex flex-col gap-2">
            <Controller
              name="banner"
              control={controlUpdateCover}
              render={({ field: { onChange, value, ...field } }) => (
                <InputFile
                  {...field}
                  onUpload={(files) => handleUploadCover(files, onChange)}
                  onDelete={() => handleDeleteCover(onChange)}
                  isUploading={isPendingMutateUploadFile}
                  isDeleting={isPendingMutateDeleteFile}
                  isInvalid={errorsUpdateCover.banner !== undefined}
                  isDropable
                  errorMessage={errorsUpdateCover.banner?.message}
                  preview={typeof preview === "string" ? preview : ""}
                  label={
                    <p className="text-sm font-medium text-default-700">
                      Unggah sampul baru
                    </p>
                  }
                />
              )}
            />
          </div>

          <Button
            type="submit"
            color="danger"
            className="mt-2 disabled:bg-default-500"
            disabled={isPendingMutateUploadFile || isPendingUpdate || !preview}
          >
            {" "}
            {isPendingUpdate ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Simpan Perubahan"
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default CoverTab;
