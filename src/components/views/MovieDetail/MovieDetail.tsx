import { Button, Card, CardBody, Chip, Input, Spinner } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import useMovieDetail from "./useMovieDetail";
import { IMovie } from "@/types/Movie";
import { IShowtimeDetail } from "@/types/Showtime";
import { formatCurrency } from "@/utils/currency";

const MovieDetail = () => {
  const {
    dataMovie,
    isLoadingMovie,
    dataShowtimes,
    isLoadingShowtimes,
    selectedDate,
    setSelectedDate,
  } = useMovieDetail();
  const movie: IMovie | undefined = dataMovie;

  if (isLoadingMovie) {
    return (
      <div className="flex justify-center py-20">
        <Spinner color="danger" size="lg" />
      </div>
    );
  }

  if (!movie) {
    return (
      <p className="py-20 text-center text-default-400">Movie not found</p>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-4">
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="w-full shrink-0 md:w-1/3">
          <Image
            src={movie.posterUrl || "/images/general/no-image.png"}
            alt={movie.title}
            width={400}
            height={600}
            className="aspect-[2/3] w-full rounded-xl object-cover"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <div className="flex flex-wrap gap-2">
            {movie.genres?.map((genre) => (
              <Chip key={genre.id} color="danger" variant="flat">
                {genre.name}
              </Chip>
            ))}
          </div>
          <div className="flex gap-4 text-sm text-default-500">
            <span>{movie.durationMin} min</span>
            <span>{movie.language}</span>
            {movie.releaseDate && (
              <span>
                {new Date(movie.releaseDate).toLocaleDateString()}
              </span>
            )}
            {movie.rating > 0 && <span>Rating: {movie.rating}/10</span>}
          </div>
          <p className="leading-relaxed text-default-600">
            {movie.description}
          </p>
        </div>
      </div>

      <div className="mt-12" id="showtimes">
        <h2 className="mb-4 text-2xl font-bold">Showtimes</h2>
        <Input
          type="date"
          variant="bordered"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="mb-4 max-w-xs"
          label="Select date"
        />
        {isLoadingShowtimes ? (
          <Spinner color="danger" />
        ) : dataShowtimes.length === 0 ? (
          <p className="text-default-400">
            No showtimes for this movie on {selectedDate}.
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {dataShowtimes.map((showtime: IShowtimeDetail) => (
              <Card key={showtime.id}>
                <CardBody className="flex flex-row items-center justify-between gap-3 p-4">
                  <div>
                    <p className="font-medium">
                      {new Date(showtime.startTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    {showtime.theater && (
                      <p className="text-sm text-default-500">
                        {showtime.theater.name}
                      </p>
                    )}
                    <p className="text-sm text-default-400">
                      {formatCurrency(showtime.price)}
                    </p>
                    <p className="text-xs text-default-400">
                      {showtime.availableSeats} seats left
                    </p>
                  </div>
                  <Button
                    as={Link}
                    href={`/showtimes/${showtime.id}/seats`}
                    color="danger"
                    size="sm"
                  >
                    Book
                  </Button>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MovieDetail;
