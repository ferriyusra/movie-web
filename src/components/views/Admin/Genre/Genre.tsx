import { Key, useCallback } from "react";
import { Button } from "@heroui/react";
import DataTable from "@/components/ui/DataTable";
import { COLUMN_LISTS_GENRE } from "./Genre.constants";
import useGenre from "./useGenre";
import AddGenreModal from "./AddGenreModal/AddGenreModal";
import DeleteGenreModal from "./DeleteGenreModal/DeleteGenreModal";

const Genre = () => {
  const {
    dataGenres,
    isLoadingGenres,
    refetchGenres,
    selectedId,
    setSelectedId,
    addModalOpen,
    setAddModalOpen,
    deleteModalOpen,
    setDeleteModalOpen,
  } = useGenre();

  const renderCell = useCallback(
    (item: Record<string, unknown>, columnKey: Key) => {
      switch (columnKey) {
        case "name":
          return <p className="text-sm">{item.name as string}</p>;
        case "actions":
          return (
            <Button
              size="sm"
              color="danger"
              variant="flat"
              onPress={() => {
                setSelectedId(item.id as string);
                setDeleteModalOpen(true);
              }}
            >
              Delete
            </Button>
          );
        default:
          return null;
      }
    },
    [],
  );

  return (
    <section>
      <DataTable
        buttonTopContentLabel="Add Genre"
        onClickButtonTopContent={() => setAddModalOpen(true)}
        columns={COLUMN_LISTS_GENRE}
        data={dataGenres || []}
        emptyContent="No genres found"
        isLoading={isLoadingGenres}
        renderCell={renderCell}
        totalPages={1}
        showSearch={false}
        showLimit={false}
      />
      <AddGenreModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        refetchGenres={refetchGenres}
      />
      <DeleteGenreModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        genreId={selectedId}
        refetchGenres={refetchGenres}
      />
    </section>
  );
};

export default Genre;
