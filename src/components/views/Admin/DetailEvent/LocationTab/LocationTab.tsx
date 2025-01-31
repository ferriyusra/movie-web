import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Skeleton,
  Spinner,
} from "@nextui-org/react";
import useLocationTab from "./useLocationTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { IEventForm, IRegions } from "@/types/Event";

interface PropTypes {
  dataEvent: IEventForm;
  dataDefaultRegion: string;
  isPendingDefaultRegion: boolean;
  onUpdate: (data: IEventForm) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const LocationTab = (props: PropTypes) => {
  const {
    dataEvent,
    dataDefaultRegion,
    isPendingDefaultRegion,
    onUpdate,
    isPendingUpdate,
    isSuccessUpdate,
  } = props;
  const {
    dataRegion,
    searchRegion,
    handleSearchRegion,
    controlUpdateLocation,
    handleSubmitUpdateLocation,
    errorsUpdateLocation,
    resetUpdateLocation,
    setValueUpdateLocation,
  } = useLocationTab();

  useEffect(() => {
    if (dataEvent) {
      setValueUpdateLocation("isOnline", `${dataEvent?.isOnline}`);
      setValueUpdateLocation("address", `${dataEvent?.location?.address}`);
      setValueUpdateLocation("region", `${dataEvent?.location?.region}`);
      setValueUpdateLocation(
        "latitude",
        `${dataEvent?.location?.coordinates[0]}`,
      );
      setValueUpdateLocation(
        "longitude",
        `${dataEvent?.location?.coordinates[1]}`,
      );
    }
  }, [dataEvent]);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateLocation();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Informasi Lokasi Acara</h1>
        <p className="w-full text-small text-default-400">Atur lokasi acara</p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateLocation(onUpdate)}
        >
          <Skeleton isLoaded={!!dataEvent} className="rounded-lg">
            <Controller
              name="isOnline"
              control={controlUpdateLocation}
              render={({ field }) => (
                <Select
                  {...field}
                  labelPlacement="outside"
                  label="Status Online / Offline"
                  variant="bordered"
                  isInvalid={errorsUpdateLocation.isOnline !== undefined}
                  errorMessage={errorsUpdateLocation.isOnline?.message}
                  disallowEmptySelection
                  defaultSelectedKeys={[
                    dataEvent?.isOnline === true ? "true" : "false",
                  ]}
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
          </Skeleton>

          <Skeleton
            isLoaded={!!dataEvent?.location?.region && !isPendingDefaultRegion}
            className="rounded-lg"
          >
            {
              !isPendingDefaultRegion ? (
                <Controller
                  name="region"
                  control={controlUpdateLocation}
                  render={({ field: { onChange, ...field } }) => (
                    <Autocomplete
                      {...field}
                      defaultItems={
                        dataRegion?.data.data && searchRegion !== ""
                          ? dataRegion?.data.data
                          : []
                      }
                      defaultInputValue={dataDefaultRegion}
                      label="Lokasi Kota Acara"
                      labelPlacement="outside"
                      variant="bordered"
                      isInvalid={errorsUpdateLocation.region !== undefined}
                      errorMessage={errorsUpdateLocation.region?.message}
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
              ) : (
                <div className="w-full h-16" />
              )
            }
          </Skeleton>
          <Skeleton
            isLoaded={!!dataEvent?.location?.coordinates[0]}
            className="rounded-lg"
          >
            <Controller
              name="latitude"
              control={controlUpdateLocation}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Latitude"
                  labelPlacement="outside"
                  variant="bordered"
                  type="text"
                  isInvalid={errorsUpdateLocation.latitude !== undefined}
                  errorMessage={errorsUpdateLocation.latitude?.message}
                ></Input>
              )}
            />
          </Skeleton>
          <Skeleton
            isLoaded={!!dataEvent?.location?.address}
            className="rounded-lg"
          >
            <Controller
              name="address"
              control={controlUpdateLocation}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Alamat Acara"
                  labelPlacement="outside"
                  variant="bordered"
                  type="text"
                  isInvalid={errorsUpdateLocation.address !== undefined}
                  errorMessage={errorsUpdateLocation.address?.message}
                ></Input>
              )}
            />
          </Skeleton>
          <Skeleton
            isLoaded={!!dataEvent?.location?.coordinates[1]}
            className="rounded-lg"
          >
            <Controller
              name="longitude"
              control={controlUpdateLocation}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Longitude"
                  labelPlacement="outside"
                  variant="bordered"
                  type="text"
                  isInvalid={errorsUpdateLocation.longitude !== undefined}
                  errorMessage={errorsUpdateLocation.longitude?.message}
                ></Input>
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

export default LocationTab;
