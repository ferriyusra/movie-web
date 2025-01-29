import { DELAY } from "@/constants/list.constants";
import { ToasterContext } from "@/contexts/ToasterContext";
import useDebounce from "@/hooks/useDebounce";
import useMediaHandling from "@/hooks/useMediaHandling";
import categoryServices from "@/services/category.service";
import eventServices from "@/services/event.service";
import { IEvent, IEventForm } from "@/types/Event";
import { toDateStandard } from "@/utils/date";
import { yupResolver } from "@hookform/resolvers/yup";
import { getLocalTimeZone, now } from "@internationalized/date";
import { DateValue } from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Mohon masukkan nama acara"),
  slug: yup.string().required("Mohon masukkan slug acara"),
  category: yup.string().required("Mohon pilih kategori acara"),
  startDate: yup
    .mixed<DateValue>()
    .required("Mohon masukkan tanggal mulai acara"),
  endDate: yup
    .mixed<DateValue>()
    .required("Mohon masukkan tanggal akhir acara"),
  isPublish: yup.string().required("Mohon pilih status acara"),
  isFeatured: yup.string().required("Mohon pilih publikasi acara"),
  description: yup.string().required("Mohon masukkan deskripsi acara"),
  isOnline: yup.string().required("Mohon masukkan online atau offline acara"),
  region: yup.string().required("Mohon pilih wilayah acara"),
  latitude: yup.string().required("Mohon pilih titik latitude koordinat acara"),
  longitude: yup
    .string()
    .required("Mohon pilih titik longitude koordinat acara"),
  banner: yup
    .mixed<FileList | string>()
    .required("Mohon masukkan foto sampul acara"),
});

const useAddEventModal = () => {
  const { setToaster } = useContext(ToasterContext);
  const router = useRouter();
  const debounce = useDebounce();
  const {
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
    handleDeleteFile,
    handleUploadFile,
  } = useMediaHandling();

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
    watch,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const preview = watch("banner");
  const fileUrl = getValues("banner");

  setValue("startDate", now(getLocalTimeZone()));
  setValue("endDate", now(getLocalTimeZone()));

  const handleUploadBanner = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValue("banner", fileUrl);
      }
    });
  };

  const handleDeleteBanner = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleDeleteFile(fileUrl, () => onChange(undefined));
  };

  const handleOnClose = (onClose: () => void) => {
    handleDeleteFile(fileUrl, () => {
      reset();
      onClose();
    });
  };

  const { data: dataCategory } = useQuery({
    queryKey: ["Categories"],
    queryFn: () => categoryServices.getCategories(),
    enabled: router.isReady,
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

  const addEvent = async (payload: IEvent) => {
    const res = await eventServices.addEvent(payload);
    return res;
  };

  const {
    mutate: mutateAddEvent,
    isPending: isPendingMutateAddEvent,
    isSuccess: isSuccessMutateAddEvent,
  } = useMutation({
    mutationFn: addEvent,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Acara berhasil ditambahkan!",
      });
      reset();
    },
  });

  const handleAddEvent = (data: IEventForm) => {
    const payload = {
      ...data,
      isFeatured: data.isFeatured === "true" ? true : false,
      isPublish: data.isPublish === "true" ? true : false,
      isOnline: data.isOnline === "true" ? true : false,
      startDate: toDateStandard(data.startDate),
      endDate: toDateStandard(data.endDate),
      location: {
        region: data.region,
        coordinates: [Number(data.latitude), Number(data.longitude)],
      },
      banner: data.banner,
    };
    mutateAddEvent(payload);
  };

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddEvent,
    isPendingMutateAddEvent,
    isSuccessMutateAddEvent,

    preview,
    handleUploadBanner,
    isPendingMutateUploadFile,
    handleDeleteBanner,
    isPendingMutateDeleteFile,
    handleOnClose,
    dataCategory,

    handleSearchRegion,
    dataRegion,
    searchRegion,
  };
};

export default useAddEventModal;
