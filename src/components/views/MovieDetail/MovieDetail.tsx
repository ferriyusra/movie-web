import { Button, Card, CardBody, Chip, Input, Spinner } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import useMovieDetail from "./useMovieDetail";
import MovieCard from "@/components/ui/MovieCard";
import { IMovie } from "@/types/Movie";
import { IShowtimeDetail } from "@/types/Showtime";
import { formatCurrency } from "@/utils/currency";
import {
  FaStar,
  FaClock,
  FaLanguage,
  FaCalendar,
  FaCouch,
  FaFilm,
  FaGlobe,
} from "react-icons/fa6";

const MovieDetail = () => {
  const {
    dataMovie,
    isLoadingMovie,
    dataShowtimes,
    isLoadingShowtimes,
    selectedDate,
    setSelectedDate,
    relatedMovies,
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
    <div className="-mt-10 md:-mx-6 md:-mt-6">
      {/* ── Hero Banner ── */}
      <section className="relative overflow-hidden bg-gray-950">
        <div className="absolute inset-0">
          <Image
            src={movie.posterUrl || "/images/general/no-image.png"}
            alt=""
            fill
            className="object-cover opacity-30 blur-sm"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/70 to-gray-950/40" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-8 px-6 pb-12 pt-16 md:flex-row md:items-start md:gap-10 md:pb-16 md:pt-20">
          <div className="mx-auto w-52 shrink-0 md:mx-0 md:w-64">
            <Image
              src={movie.posterUrl || "/images/general/no-image.png"}
              alt={movie.title}
              width={256}
              height={384}
              className="aspect-[2/3] w-full rounded-xl object-cover shadow-2xl ring-1 ring-white/10"
            />
          </div>

          <div className="flex flex-1 flex-col gap-4">
            <h1 className="text-3xl font-bold text-white md:text-4xl">
              {movie.title}
            </h1>

            <div className="flex flex-wrap gap-2">
              {movie.genres?.map((genre) => (
                <Chip
                  key={genre.id}
                  size="sm"
                  variant="bordered"
                  classNames={{
                    base: "border-white/20",
                    content: "text-white/80 text-xs",
                  }}
                >
                  {genre.name}
                </Chip>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/60">
              {movie.rating > 0 && (
                <span className="flex items-center gap-1.5 font-semibold text-yellow-400">
                  <FaStar className="text-xs" />
                  {movie.rating}/10
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <FaClock className="text-xs" />
                {movie.durationMin} min
              </span>
              <span className="flex items-center gap-1.5">
                <FaLanguage className="text-sm" />
                {movie.language}
              </span>
              {movie.releaseDate && (
                <span className="flex items-center gap-1.5">
                  <FaCalendar className="text-xs" />
                  {new Date(movie.releaseDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              )}
            </div>

            <p className="max-w-2xl leading-relaxed text-white/70">
              {movie.description}
            </p>

            <div className="mt-2 flex gap-3">
              <Button as="a" href="#showtimes" color="danger" size="lg">
                View Showtimes
              </Button>
              <Button
                as={Link}
                href="/movies"
                variant="bordered"
                size="lg"
                className="border-white/30 text-white hover:border-white"
              >
                All Movies
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick Info Cards ── */}
      <section className="border-b border-default-100 bg-default-50">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px sm:grid-cols-4">
          {[
            {
              icon: <FaClock className="text-danger-500" />,
              label: "Duration",
              value: `${movie.durationMin} min`,
            },
            {
              icon: <FaGlobe className="text-danger-500" />,
              label: "Language",
              value: movie.language,
            },
            {
              icon: <FaStar className="text-danger-500" />,
              label: "Rating",
              value: movie.rating > 0 ? `${movie.rating}/10` : "N/A",
            },
            {
              icon: <FaFilm className="text-danger-500" />,
              label: "Genres",
              value:
                movie.genres?.map((g) => g.name).join(", ") || "N/A",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-1.5 bg-white px-4 py-5 text-center"
            >
              <div className="text-lg">{item.icon}</div>
              <p className="text-xs font-medium uppercase tracking-wider text-default-400">
                {item.label}
              </p>
              <p className="text-sm font-semibold">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Synopsis ── */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="mb-4 text-xl font-bold">Synopsis</h2>
        <p className="max-w-3xl leading-relaxed text-default-600">
          {movie.description}
        </p>

        {movie.releaseDate && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-default-400">
                Release Date
              </p>
              <p className="mt-1 text-sm font-medium">
                {new Date(movie.releaseDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-default-400">
                Runtime
              </p>
              <p className="mt-1 text-sm font-medium">
                {Math.floor(movie.durationMin / 60)}h {movie.durationMin % 60}m
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-default-400">
                Language
              </p>
              <p className="mt-1 text-sm font-medium">{movie.language}</p>
            </div>
          </div>
        )}
      </section>

      {/* ── Showtimes Section ── */}
      <section
        className="border-t border-default-100 bg-default-50 px-6 py-12"
        id="showtimes"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-1 text-sm font-semibold uppercase tracking-widest text-danger-500">
                Available Showtimes
              </p>
              <h2 className="text-2xl font-bold">Pick a Showtime</h2>
            </div>
            <Input
              type="date"
              variant="bordered"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="max-w-[200px]"
              label="Date"
              size="sm"
            />
          </div>

          {isLoadingShowtimes ? (
            <div className="flex justify-center py-10">
              <Spinner color="danger" />
            </div>
          ) : dataShowtimes.length === 0 ? (
            <Card>
              <CardBody className="py-10 text-center">
                <p className="text-default-400">
                  No showtimes for this movie on{" "}
                  {selectedDate
                    ? new Date(
                        selectedDate + "T00:00:00",
                      ).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      })
                    : "the selected date"}
                  .
                </p>
                <p className="mt-1 text-sm text-default-300">
                  Try selecting a different date.
                </p>
              </CardBody>
            </Card>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {dataShowtimes.map((showtime: IShowtimeDetail) => (
                <Card
                  key={showtime.id}
                  className="border border-default-200 bg-white transition-shadow hover:shadow-md"
                >
                  <CardBody className="flex flex-row items-center gap-4 p-4">
                    <div className="flex shrink-0 flex-col items-center rounded-lg bg-danger-50 px-4 py-3">
                      <span className="text-xl font-bold text-danger-600">
                        {new Date(showtime.startTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <span className="text-[10px] text-danger-400">
                        {new Date(showtime.endTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col gap-1">
                      {showtime.theater && (
                        <p className="text-sm font-medium">
                          {showtime.theater.name}
                        </p>
                      )}
                      <p className="text-sm font-semibold text-danger-500">
                        {formatCurrency(showtime.price)}
                      </p>
                      <p className="flex items-center gap-1 text-xs text-default-400">
                        <FaCouch className="text-[10px]" />
                        {showtime.availableSeats} seats available
                      </p>
                    </div>

                    <Button
                      as={Link}
                      href={`/showtimes/${showtime.id}/seats`}
                      color="danger"
                      size="sm"
                      variant="flat"
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

      {/* ── You Might Also Like ── */}
      {relatedMovies.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-2xl font-bold">You Might Also Like</h2>
            <Button
              as={Link}
              href="/movies"
              variant="light"
              color="danger"
              className="hidden sm:flex"
            >
              View All
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {relatedMovies.map((m: IMovie) => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default MovieDetail;
