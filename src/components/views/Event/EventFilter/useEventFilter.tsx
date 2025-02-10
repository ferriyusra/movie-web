import { LIMIT_CATEGORY, PAGE_DEFAULT } from "@/constants/list.constants";
import categoryServices from "@/services/category.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";



import * as yup from "yup";

const schema = yup.object().shape({
  category: yup.string(),
  isFeatured: yup.string(),
  isOnline: yup.string(),
});

const useEventFilter = () => {
  const {
    control,
    reset,
    watch,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { data: dataCategories, isSuccess: isSuccessGetCategories } = useQuery({
    queryKey: ["Categories"],
    queryFn: () => categoryServices.getCategories(),
  });

  return {
    control,
    dataCategories,
    isSuccessGetCategories,
    reset,
    watch,
    getValues,
    setValue
  }
}

export default useEventFilter;