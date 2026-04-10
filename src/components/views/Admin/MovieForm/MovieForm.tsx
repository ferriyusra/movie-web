import {
  Button,
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
  Spinner,
  Textarea,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import useMovieForm from "./useMovieForm";
import { IGenre } from "@/types/Genre";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

interface PropTypes {
  movieId?: string;
}

const MovieForm = ({ movieId }: PropTypes) => {
  const {
    control,
    handleSubmit,
    handleSave,
    isPendingSave,
    errors,
    dataGenres,
    isEdit,
  } = useMovieForm({ movieId });

  return (
    <div className="mx-auto max-w-2xl">
      <Button
        as={Link}
        href="/admin/movies"
        variant="light"
        size="sm"
        startContent={<FaArrowLeft className="text-xs" />}
        className="mb-4 text-default-500"
      >
        Back to Movies
      </Button>

      <Card className="border border-default-100 bg-white shadow-none">
        <CardBody className="p-6">
          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(handleSave)}
          >
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Title"
                  variant="bordered"
                  size="sm"
                  isInvalid={!!errors.title}
                  errorMessage={errors.title?.message}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="Description"
                  variant="bordered"
                  size="sm"
                  minRows={3}
                  isInvalid={!!errors.description}
                  errorMessage={errors.description?.message}
                />
              )}
            />
            <Controller
              name="posterUrl"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Poster URL"
                  variant="bordered"
                  size="sm"
                  isInvalid={!!errors.posterUrl}
                  errorMessage={errors.posterUrl?.message}
                />
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="durationMin"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    label="Duration (min)"
                    variant="bordered"
                    size="sm"
                    value={String(field.value)}
                    isInvalid={!!errors.durationMin}
                    errorMessage={errors.durationMin?.message}
                  />
                )}
              />
              <Controller
                name="language"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Language"
                    variant="bordered"
                    size="sm"
                    isInvalid={!!errors.language}
                    errorMessage={errors.language?.message}
                  />
                )}
              />
            </div>
            <Controller
              name="releaseDate"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="date"
                  label="Release Date"
                  variant="bordered"
                  size="sm"
                  placeholder=" "
                  isInvalid={!!errors.releaseDate}
                  errorMessage={errors.releaseDate?.message}
                />
              )}
            />
            <Controller
              name="genreIds"
              control={control}
              render={({ field }) => (
                <Select
                  label="Genres"
                  variant="bordered"
                  size="sm"
                  selectionMode="multiple"
                  selectedKeys={new Set(field.value)}
                  onSelectionChange={(keys) =>
                    field.onChange(Array.from(keys) as string[])
                  }
                  isInvalid={!!errors.genreIds}
                  errorMessage={errors.genreIds?.message}
                >
                  {dataGenres.map((genre: IGenre) => (
                    <SelectItem key={genre.id} value={genre.id}>
                      {genre.name}
                    </SelectItem>
                  ))}
                </Select>
              )}
            />
            <div className="flex justify-end gap-2 pt-2">
              <Button
                as={Link}
                href="/admin/movies"
                variant="flat"
                size="sm"
              >
                Cancel
              </Button>
              <Button
                color="danger"
                type="submit"
                size="sm"
                isDisabled={isPendingSave}
                className="font-medium"
              >
                {isPendingSave ? (
                  <Spinner size="sm" color="white" />
                ) : isEdit ? (
                  "Update Movie"
                ) : (
                  "Create Movie"
                )}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default MovieForm;
