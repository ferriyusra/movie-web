import { DELAY } from "@/constants/list.constants";
import useDebounce from "@/hooks/useDebounce";
import categoryServices from "@/services/category.service";
import eventServices from "@/services/event.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import router from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateLocation = yup.object().shape({
  isOnline: yup.string().required("Mohon masukkan online atau offline acara"),
  region: yup.string().required("Mohon pilih wilayah acara"),
  latitude: yup.string().required("Mohon pilih titik latitude koordinat acara"),
  longitude: yup
    .string()
    .required("Mohon pilih titik longitude koordinat acara"),
});

const useLocationTab = () => {
  const debounce = useDebounce();
  const {
    control: controlUpdateLocation,
    handleSubmit: handleSubmitUpdateLocation,
    formState: { errors: errorsUpdateLocation },
    reset: resetUpdateLocation,
    watch: watchUpdateLocation,
    getValues: getValuesUpdateLocation,
    setValue: setValueUpdateLocation,
  } = useForm({
    resolver: yupResolver(schemaUpdateLocation),
  });

  const [searchRegion, setSearchRegion] = useState("");
  const { data: dataRegion } = useQuery({
    queryKey: ["region", searchRegion],
    queryFn: () => eventServices.searchLocationByRegency(`${searchRegion}`),
    enabled: searchRegion !== "",
  });

  const handleSearchRegion = (region: string) => {
    debounce(() => setSearchRegion(region), DELAY);
  };

  return {
    controlUpdateLocation,
    handleSubmitUpdateLocation,
    errorsUpdateLocation,
    resetUpdateLocation,
    watchUpdateLocation,
    getValuesUpdateLocation,
    setValueUpdateLocation,

    handleSearchRegion,
    dataRegion,
    searchRegion,
  };
};

export default useLocationTab;
