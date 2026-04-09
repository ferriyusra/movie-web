import { Input, Pagination, Select, SelectItem } from "@heroui/react";
import { CiSearch } from "react-icons/ci";
import MovieCard, { MovieCardSkeleton } from "@/components/ui/MovieCard";
import useMovie from "./useMovie";
import { IMovie } from "@/types/Movie";
import { IGenre } from "@/types/Genre";

const Movie = () => {
  const {
    dataMovies,
    isLoadingMovies,
    totalPages,
    dataGenres,
    currentPage,
    currentGenreId,
    handleChangePage,
    handleSearch,
    handleClearSearch,
    handleChangeGenre,
  } = useMovie();

  return (
    <section className="mx-auto max-w-7xl px-4">
      <h1 className="mb-6 text-3xl font-bold">Movies</h1>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <Input
          isClearable
          className="w-full sm:max-w-xs"
          placeholder="Search movies..."
          startContent={<CiSearch />}
          onClear={handleClearSearch}
          onChange={handleSearch}
        />
        <Select
          className="w-full sm:max-w-xs"
          placeholder="All Genres"
          selectedKeys={currentGenreId ? [currentGenreId] : []}
          onChange={(e) => handleChangeGenre(e.target.value)}
        >
          {dataGenres.map((genre: IGenre) => (
            <SelectItem key={genre.id} value={genre.id}>
              {genre.name}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {isLoadingMovies
          ? Array.from({ length: 8 }).map((_, i) => (
              <MovieCardSkeleton key={i} />
            ))
          : dataMovies.map((movie: IMovie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
      </div>

      {!isLoadingMovies && dataMovies.length === 0 && (
        <p className="py-10 text-center text-default-400">No movies found</p>
      )}

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination
            isCompact
            showControls
            color="danger"
            page={currentPage}
            total={totalPages}
            onChange={handleChangePage}
          />
        </div>
      )}
    </section>
  );
};

export default Movie;
