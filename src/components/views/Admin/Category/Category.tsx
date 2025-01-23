import DataTable from "@/components/ui/DataTable";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { COLUMN_LISTS_CATEGORY } from "./Category.constants";
import useCategory from "./useCategory";

const Category = () => {
  const { push, isReady, query } = useRouter();
  const {
    currentPage,
    currentLimit,
    dataCategory,
    handleChangePage,
    handleChangeLimit,
    handleSearch,
    handleClearSearch,
    isLoadingCategory,
    isRefetchingCategory,

    setURL,
  } = useCategory();

  useEffect(() => {
    if (isReady) {
      setURL();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (category: Record<string, unknown>, columnKey: Key) => {
      const cellValue = category[columnKey as keyof typeof category];

      switch (columnKey) {
        // case "icon":
        //   return (
        //     <Image src={`${cellValue}`} alt="icon" width={100} height={200} />
        //   );
        case "actions":
          return (
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <CiMenuKebab className="text-default-700" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key="detail-category-button"
                  onPress={() => push(`/admin/category/${category._id}`)}
                >
                  Detail
                </DropdownItem>
                <DropdownItem key="delete-category" className="text-danger-500">
                  Hapus
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
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
          isLoading={isLoadingCategory || isRefetchingCategory}
          currentPage={Number(currentPage)}
          columns={COLUMN_LISTS_CATEGORY}
          emptyContent="Kategori kosong"
          limit={String(currentLimit)}
          onChangeLimit={handleChangeLimit}
          onChangePage={handleChangePage}
          onChangeSearch={handleSearch}
          onClearSearch={handleClearSearch}
          onClickButtonTopContent={() => { }}
          buttonTopContentLabel="Tambah Kategori"
          renderCell={renderCell}
          totalPages={dataCategory?.pagination.totalPages}
          data={dataCategory?.data || []}
        />
      )}
    </section>
  );
};

export default Category;
