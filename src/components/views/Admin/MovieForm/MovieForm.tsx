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
    <Card className="mx-auto max-w-2xl">
      <CardBody className="p-6">
        <h2 className="mb-6 text-2xl font-bold">
          {isEdit ? "Edit Movie" : "Create Movie"}
        </h2>
        <form
          className="flex flex-col gap-4"
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
          <Button
            color="danger"
            type="submit"
            size="lg"
            isDisabled={isPendingSave}
          >
            {isPendingSave ? (
              <Spinner size="sm" color="white" />
            ) : isEdit ? (
              "Update Movie"
            ) : (
              "Create Movie"
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default MovieForm;
