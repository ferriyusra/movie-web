import categoryServices from "@/services/category.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { DateValue } from "@internationalized/date";
import { useQuery } from "@tanstack/react-query";
import router from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateInfo = yup.object().shape({
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
});

const useInfoTab = () => {
  const {
    control: controlUpdateInfo,
    handleSubmit: handleSubmitUpdateInfo,
    formState: { errors: errorsUpdateInfo },
    reset: resetUpdateInfo,
    watch: watchUpdateInfo,
    getValues: getValuesUpdateInfo,
    setValue: setValueUpdateInfo,
  } = useForm({
    resolver: yupResolver(schemaUpdateInfo),
  });

  const { data: dataCategory } = useQuery({
    queryKey: ["Categories"],
    queryFn: () => categoryServices.getCategories(),
    enabled: router.isReady,
  });


  return {
    controlUpdateInfo,
    handleSubmitUpdateInfo,
    errorsUpdateInfo,
    resetUpdateInfo,
    watchUpdateInfo,
    getValuesUpdateInfo,
    setValueUpdateInfo,
    dataCategory,
  };
};

export default useInfoTab;
