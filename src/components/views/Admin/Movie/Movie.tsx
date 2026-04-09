import { Key, useCallback } from "react";
import { Chip } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import DataTable from "@/components/ui/DataTable";
import DropdownAction from "@/components/commons/DropdownAction";
import { COLUMN_LISTS_MOVIE } from "./Movie.constants";
import useAdminMovie from "./useMovie";
import DeleteMovieModal from "./DeleteMovieModal/DeleteMovieModal";
import { IGenre } from "@/types/Genre";

const AdminMovie = () => {
  const router = useRouter();
  const {
    dataMovies,
    isLoadingMovies,
    refetchMovies,
    totalPages,
    selectedId,
    setSelectedId,
    deleteModalOpen,
    setDeleteModalOpen,
  } = useAdminMovie();

  const renderCell = useCallback(
    (item: Record<string, unknown>, columnKey: Key) => {
      switch (columnKey) {
        case "posterUrl":
          return (
            <Image
              src={(item.posterUrl as string) || "/images/general/no-image.png"}
              alt={item.title as string}
              width={60}
              height={90}
              className="aspect-[2/3] rounded object-cover"
            />
          );
        case "title":
          return <p className="font-medium">{item.title as string}</p>;
        case "genres":
          return (
            <div className="flex flex-wrap gap-1">
              {(item.genres as IGenre[])?.map((g) => (
                <Chip key={g.id} size="sm" variant="flat" color="danger">
                  {g.name}
                </Chip>
              ))}
            </div>
          );
        case "durationMin":
          return <p>{item.durationMin as number} min</p>;
        case "language":
          return <p>{item.language as string}</p>;
        case "actions":
          return (
            <DropdownAction
              onPressButtonDetail={() =>
                router.push(`/admin/movies/${item.id}/edit`)
              }
              onPressButtonDelete={() => {
                setSelectedId(item.id as string);
                setDeleteModalOpen(true);
              }}
            />
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
        buttonTopContentLabel="Add Movie"
        onClickButtonTopContent={() => router.push("/admin/movies/new")}
        columns={COLUMN_LISTS_MOVIE}
        data={dataMovies}
        emptyContent="No movies found"
        isLoading={isLoadingMovies}
        renderCell={renderCell}
        totalPages={totalPages}
      />
      <DeleteMovieModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        movieId={selectedId}
        refetchMovies={refetchMovies}
      />
    </section>
  );
};

export default AdminMovie;
