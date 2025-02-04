import { ToasterContext } from "@/contexts/ToasterContext";
import bannerServices from "@/services/banner.service";
import { IBanner } from "@/types/Banner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useDetailBanner = () => {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const getBannerById = async () => {
    const { data } = await bannerServices.getBannerById(`${query.id}`);
    return data.data;
  };

  const { data: dataBanner, refetch: refetchBanner } = useQuery({
    queryKey: ["Banner"],
    queryFn: getBannerById,
    enabled: isReady,
  });

  const updateBanner = async (payload: IBanner) => {
    const { data } = await bannerServices.updateBanner(
      `${query.id}`,
      payload,
    );
    return data.data;
  };

  const {
    mutate: mutateUpdateBanner,
    isPending: isPendingMutateUpdateBanner,
    isSuccess: isSuccessMutateUpdateBanner,
  } = useMutation({
    mutationFn: (payload: IBanner) => updateBanner(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      refetchBanner();
      setToaster({
        type: "success",
        message: "Berhasil update spanduk",
      });
    },
  });

  const handleUpdateBanner = (data: IBanner) => mutateUpdateBanner(data);

  return {
    dataBanner,
    handleUpdateBanner,
    isPendingMutateUpdateBanner,
    isSuccessMutateUpdateBanner,
  };
};

export default useDetailBanner;
