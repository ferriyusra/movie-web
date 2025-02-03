import DataTable from "@/components/ui/DataTable";
import {
  Chip,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LISTS_BANNER } from "./Banner.constants";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropdownAction";
import useBanner from "./useBanner";
import AddBannerModal from "./AddBannerModal";
import DeleteBannerModal from "./DeleteBannerModal";

const Category = () => {
  const { isReady, push, query } = useRouter();
  const {
    dataBanners,
    isRefetchingBanners,
    isLoadingBanners,
    refetchBanners,
    selectedId,
    setSelectedId,
  } = useBanner();

  const addBannerModal = useDisclosure();
  const deleteBannerModal = useDisclosure();
  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (banners: Record<string, unknown>, columnKey: Key) => {
      const cellValue = banners[columnKey as keyof typeof banners];

      switch (columnKey) {
        case "image":
          return (
            <Image
              className="rounded-lg"
              src={`${cellValue}`} alt="image" width={300} height={200} />
          );

        case "isShow":
          return (
            <Chip
              color={cellValue ? "success" : "warning"}
              size="sm"
              variant="flat"
            >
              {cellValue === true ? "Tampilkan" : "Tidak ditampilkan"}
            </Chip>
          )
        case "actions":
          return (
            <DropdownAction
              onPressButtonDetail={() => push(`/admin/banner/${banners._id}`)}
              onPressButtonDelete={() => {
                setSelectedId(`${banners._id}`);
                deleteBannerModal.onOpen();
              }}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          isLoading={isLoadingBanners || isRefetchingBanners}
          columns={COLUMN_LISTS_BANNER}
          emptyContent="Spanduk kosong"
          onClickButtonTopContent={addBannerModal.onOpen}
          buttonTopContentLabel="Tambah Spanduk"
          renderCell={renderCell}
          totalPages={dataBanners?.pagination.totalPages}
          data={dataBanners?.data || []}
        />
      )}
      <AddBannerModal
        {...addBannerModal}
        refetchBanners={refetchBanners}
      />
      <DeleteBannerModal
        {...deleteBannerModal}
        refetchBanners={refetchBanners}
        setSelectedId={setSelectedId}
        selectedId={selectedId}
      />
    </section>
  );
};

export default Category;
