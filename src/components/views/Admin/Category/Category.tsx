import DataTable from "@/components/ui/DataTable";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { COLUMN_LISTS_CATEGORY } from "./Category.constants";
import useCategory from "./useCategory";
import InputFile from "@/components/ui/InputFile";
import AddCategoryModal from "./AddCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";

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
    refetchCategory,
    selectedId,
    setSelectedId,
    setURL,
  } = useCategory();

  const addCategoryModal = useDisclosure();
  const deleteCategoryModal = useDisclosure();

  useEffect(() => {
    if (isReady) {
      setURL();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (category: Record<string, unknown>, columnKey: Key) => {
      const cellValue = category[columnKey as keyof typeof category];

      switch (columnKey) {
        case "icon":
          return (
            <Image src={`${cellValue}`} alt="icon" width={100} height={200} />
          );
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
                <DropdownItem
                  key="delete-category"
                  onPress={() => {
                    setSelectedId(`${category._id}`);
                    deleteCategoryModal.onOpen();
                  }}
                  className="text-danger-500"
                >
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
          onClickButtonTopContent={addCategoryModal.onOpen}
          buttonTopContentLabel="Tambah Kategori"
          renderCell={renderCell}
          totalPages={dataCategory?.pagination.totalPages}
          data={dataCategory?.data || []}
        />
      )}
      <AddCategoryModal
        refetchCategory={refetchCategory}
        {...addCategoryModal}
      />
      <DeleteCategoryModal
        refetchCategory={refetchCategory}
        setSelectedId={setSelectedId}
        selectedId={selectedId}
        {...deleteCategoryModal}
      />
    </section>
  );
};

export default Category;
