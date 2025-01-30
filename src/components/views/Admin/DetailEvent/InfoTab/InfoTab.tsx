import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  DatePicker,
  Input,
  Select,
  SelectItem,
  Skeleton,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import useInfoTab from "./useInfoTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { IEventForm } from "@/types/Event";
import { ICategory } from "@/types/Category";
import { toInputDate } from "@/utils/date";

interface PropTypes {
  dataEvent: IEventForm;
  onUpdate: (data: IEventForm) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const InfoTab = (props: PropTypes) => {
  const { dataEvent, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
  const {
    dataCategory,
    controlUpdateInfo,
    handleSubmitUpdateInfo,
    errorsUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,
  } = useInfoTab();

  useEffect(() => {
    if (dataEvent) {
      setValueUpdateInfo("name", `${dataEvent?.name}`);
      setValueUpdateInfo("slug", `${dataEvent?.slug}`);
      setValueUpdateInfo("description", `${dataEvent?.description}`);
      setValueUpdateInfo("category", `${dataEvent?.category}`);
      setValueUpdateInfo("isPublish", `${dataEvent?.isPublish}`);
      setValueUpdateInfo("isFeatured", `${dataEvent?.isFeatured}`);
      setValueUpdateInfo("startDate", toInputDate(`${dataEvent?.startDate}`));
      setValueUpdateInfo("endDate", toInputDate(`${dataEvent?.endDate}`));
    }
  }, [dataEvent]);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateInfo();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Informasi Acara</h1>
        <p className="w-full text-small text-default-400">Atur acara</p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateInfo(onUpdate)}
        >
          <Skeleton isLoaded={!!dataEvent?.name} className="rounded-lg">
            <Controller
              name="name"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Nama Acara"
                  variant="bordered"
                  type="text"
                  isInvalid={errorsUpdateInfo.name !== undefined}
                  errorMessage={errorsUpdateInfo.name?.message}
                  labelPlacement="outside"
                ></Input>
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataEvent?.slug} className="rounded-lg">
            <Controller
              name="slug"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Slug"
                  variant="bordered"
                  type="text"
                  isInvalid={errorsUpdateInfo.slug !== undefined}
                  errorMessage={errorsUpdateInfo.slug?.message}
                  labelPlacement="outside"
                ></Input>
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataEvent?.category} className="rounded-lg">
            <Controller
              name="category"
              control={controlUpdateInfo}
              render={({ field: { onChange, ...field } }) => (
                <Autocomplete
                  {...field}
                  defaultSelectedKey={dataEvent?.category}
                  defaultItems={dataCategory?.data.data || []}
                  label="Kategori Acara"
                  labelPlacement="outside"
                  variant="bordered"
                  isInvalid={errorsUpdateInfo.category !== undefined}
                  errorMessage={errorsUpdateInfo.category?.message}
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
          </Skeleton>
          <Skeleton isLoaded={!!dataEvent?.startDate} className="rounded-lg">
            <Controller
              name="startDate"
              control={controlUpdateInfo}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="Tanggal Mulai Acara"
                  labelPlacement="outside"
                  variant="bordered"
                  isInvalid={errorsUpdateInfo.startDate !== undefined}
                  errorMessage={errorsUpdateInfo.startDate?.message}
                  hideTimeZone
                  showMonthAndYearPickers
                />
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataEvent?.endDate} className="rounded-lg">
            <Controller
              name="endDate"
              control={controlUpdateInfo}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="Tanggal Akhir Acara"
                  labelPlacement="outside"
                  variant="bordered"
                  isInvalid={errorsUpdateInfo.endDate !== undefined}
                  errorMessage={errorsUpdateInfo.endDate?.message}
                  hideTimeZone
                  showMonthAndYearPickers
                />
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataEvent} className="rounded-lg">
            <Controller
              name="isPublish"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Status Acara"
                  variant="bordered"
                  isInvalid={errorsUpdateInfo.isPublish !== undefined}
                  errorMessage={errorsUpdateInfo.isPublish?.message}
                  disallowEmptySelection
                  defaultSelectedKeys={[
                    dataEvent?.isPublish === true ? "true" : "false",
                  ]}
                >
                  <SelectItem key="true" value="true">
                    Publish
                  </SelectItem>
                  <SelectItem key="false" value="false">
                    Draft
                  </SelectItem>
                </Select>
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataEvent} className="rounded-lg">
            <Controller
              name="isFeatured"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Status Unggulan"
                  variant="bordered"
                  isInvalid={errorsUpdateInfo.isFeatured !== undefined}
                  errorMessage={errorsUpdateInfo.isFeatured?.message}
                  disallowEmptySelection
                  defaultSelectedKeys={[
                    dataEvent?.isFeatured === true ? "true" : "false",
                  ]}
                >
                  <SelectItem key="true" value="true">
                    Publish
                  </SelectItem>
                  <SelectItem key="false" value="false">
                    Draft
                  </SelectItem>
                </Select>
              )}
            />
          </Skeleton>

          <Skeleton
            isLoaded={!!dataEvent?.description}
            className="rounded-lg"
          >
            <Controller
              control={controlUpdateInfo}
              name="description"
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="Deskripsi Kategori"
                  variant="bordered"
                  isInvalid={errorsUpdateInfo.description !== undefined}
                  errorMessage={errorsUpdateInfo.description?.message}
                  labelPlacement="outside"
                ></Textarea>
              )}
            />
          </Skeleton>
          <Button
            type="submit"
            color="danger"
            className="mt-2 disabled:bg-default-500"
            disabled={isPendingUpdate || !dataEvent?._id}
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

export default InfoTab;
