import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Textarea,
  DatePicker,
  Select,
  SelectItem,
} from "@nextui-org/react";
import useAddEventModal from "./useAddEventModal";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";
import { useEffect } from "react";
import { ICategory } from "@/types/Category";
import { IRegions } from "@/types/Event";
import { getLocalTimeZone, now } from "@internationalized/date";

interface PropTypes {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  refetchEvents: () => void;
}

const AddEventModal = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refetchEvents } = props;

  const {
    control,
    errors,
    preview,
    handleSubmitForm,
    handleAddEvent,
    isPendingMutateAddEvent,
    isSuccessMutateAddEvent,
    isPendingMutateUploadFile,
    handleUploadBanner,
    handleDeleteBanner,
    handleOnClose,
    handleSearchRegion,
    isPendingMutateDeleteFile,
    dataCategory,
    dataRegion,
    searchRegion,
  } = useAddEventModal();

  useEffect(() => {
    if (isSuccessMutateAddEvent) {
      onClose();
      refetchEvents();
    }
  }, [isSuccessMutateAddEvent]);

  const disbaledSubmit =
    isPendingMutateAddEvent ||
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
      <form onSubmit={handleSubmitForm(handleAddEvent)}>
        <ModalContent className="m-4">
          <ModalHeader>Tambah Acara</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold">Informasi</p>
              <div className="flex flex-col gap-4 mb-4">
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
                    />
                  )}
                />
                <Controller
                  name="slug"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Slug"
                      variant="bordered"
                      type="text"
                      isInvalid={errors.slug !== undefined}
                      errorMessage={errors.slug?.message}
                    />
                  )}
                />
                <Controller
                  name="category"
                  control={control}
                  render={({ field: { onChange, ...field } }) => (
                    <Autocomplete
                      {...field}
                      defaultItems={dataCategory?.data.data || []}
                      label="Kategori Acara"
                      variant="bordered"
                      isInvalid={errors.category !== undefined}
                      errorMessage={errors.category?.message}
                      onSelectionChange={(value) => onChange(value)}
                      placeholder="Cari Kategori disini..."
                    >
                      {(category: ICategory) => (
                        <AutocompleteItem key={`${category._id}`}>
                          {category.name}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                  )}
                />
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="Tanggal Mulai Acara"
                      variant="bordered"
                      isInvalid={errors.startDate !== undefined}
                      errorMessage={errors.startDate?.message}
                      defaultValue={now(getLocalTimeZone())}
                      hideTimeZone
                      showMonthAndYearPickers
                    />
                  )}
                />
                <Controller
                  name="endDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="Tanggal Akhir Acara"
                      variant="bordered"
                      isInvalid={errors.endDate !== undefined}
                      errorMessage={errors.endDate?.message}
                      defaultValue={now(getLocalTimeZone())}
                      hideTimeZone
                      showMonthAndYearPickers
                    />
                  )}
                />
                <Controller
                  name="isPublish"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Status Acara"
                      variant="bordered"
                      isInvalid={errors.isPublish !== undefined}
                      errorMessage={errors.isPublish?.message}
                      disallowEmptySelection
                    >
                      <SelectItem key="true" value="true">
                        Publikasi
                      </SelectItem>
                      <SelectItem key="false" value="false">
                        Tidak Publikasi
                      </SelectItem>
                    </Select>
                  )}
                />
                <Controller
                  name="isFeatured"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Status Publikasi"
                      variant="bordered"
                      isInvalid={errors.isFeatured !== undefined}
                      errorMessage={errors.isFeatured?.message}
                      disallowEmptySelection
                    >
                      <SelectItem key="true" value="true">
                        Ya
                      </SelectItem>
                      <SelectItem key="false" value="false">
                        Tidak
                      </SelectItem>
                    </Select>
                  )}
                />
                <Controller
                  name="isOnline"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Status Online / Offline"
                      variant="bordered"
                      isInvalid={errors.isOnline !== undefined}
                      errorMessage={errors.isOnline?.message}
                      disallowEmptySelection
                    >
                      <SelectItem key="true" value="true">
                        Online
                      </SelectItem>
                      <SelectItem key="false" value="false">
                        Offline
                      </SelectItem>
                    </Select>
                  )}
                />
                <Controller
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      label="Deskripsi Acara"
                      variant="bordered"
                      isInvalid={errors.description !== undefined}
                      errorMessage={errors.description?.message}
                    ></Textarea>
                  )}
                />

              </div>
              <p className="text-sm font-bold">Lokasi Acara</p>
              <div className="mb-4 flex flex-col gap-4">
                <Controller
                  name="region"
                  control={control}
                  render={({ field: { onChange, ...field } }) => (
                    <Autocomplete
                      {...field}
                      defaultItems={dataRegion?.data.data && searchRegion !== "" ? dataRegion?.data.data : []}
                      label="Lokasi Kota Acara"
                      variant="bordered"
                      isInvalid={errors.region !== undefined}
                      errorMessage={errors.region?.message}
                      onSelectionChange={(value) => onChange(value)}
                      placeholder="Cari Lokasi Kota Acara disini..."
                      onInputChange={(search) => handleSearchRegion(search)}
                    >
                      {(region: IRegions) => (
                        <AutocompleteItem key={`${region.id}`}>
                          {region.name}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                  )}
                />
                <Controller
                  name="latitude"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Titik Koordinat Latitude Lokasi"
                      variant="bordered"
                      isInvalid={errors.latitude !== undefined}
                      errorMessage={errors.latitude?.message}
                    />
                  )}
                />
                <Controller
                  name="longitude"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Titik Koordinat Longitude Lokasi"
                      variant="bordered"
                      isInvalid={errors.longitude !== undefined}
                      errorMessage={errors.longitude?.message}
                    />
                  )}
                />
              </div>
              <p className="text-sm font-bold">Sampul Gambar Acara</p>
              <Controller
                name="banner"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <InputFile
                    {...field}
                    onUpload={(files) => handleUploadBanner(files, onChange)}
                    onDelete={() => handleDeleteBanner(onChange)}
                    isUploading={isPendingMutateUploadFile}
                    isDeleting={isPendingMutateDeleteFile}
                    isInvalid={errors.banner !== undefined}
                    isDropable
                    errorMessage={errors.banner?.message}
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
              {isPendingMutateAddEvent ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Tambah Acara"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal >
  );
};

export default AddEventModal;
