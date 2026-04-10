import { Button, Card, CardBody, Chip, Skeleton } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import useHome from "./useHome";
import MovieCard, { MovieCardSkeleton } from "@/components/ui/MovieCard";
import { IMovie } from "@/types/Movie";
import { IGenre } from "@/types/Genre";
import { IShowtimeDetail } from "@/types/Showtime";
import { formatCurrency } from "@/utils/currency";
import {
  FaPlay,
  FaClock,
  FaStar,
  FaFilm,
  FaCouch,
  FaTicket,
  FaArrowRight,
} from "react-icons/fa6";

const Home = () => {
  const { movies, featuredMovie, isLoading, genres, upcomingShowtimes } =
    useHome();

  return (
    <div className="-mt-10 md:-mx-6 md:-mt-6">
      {/* ── Hero Section ── */}
      <section className="relative flex min-h-[75vh] items-end overflow-hidden bg-gray-950">
        {isLoading || !featuredMovie ? (
          <Skeleton className="absolute inset-0" />
        ) : (
          <>
            <div className="absolute inset-0">
              <Image
                src={featuredMovie.posterUrl || "/images/general/no-image.png"}
                alt={featuredMovie.title}
                fill
                className="object-cover opacity-40"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-950/80 to-transparent" />
            </div>

            <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-32 lg:pb-20">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:gap-12">
                <div className="hidden w-56 shrink-0 lg:block">
                  <Image
                    src={
                      featuredMovie.posterUrl ||
                      "/images/general/no-image.png"
                    }
                    alt={featuredMovie.title}
                    width={224}
                    height={336}
                    className="aspect-[2/3] w-full rounded-xl object-cover shadow-2xl ring-1 ring-white/10"
                  />
                </div>

                <div className="flex max-w-2xl flex-col gap-4">
                  <p className="text-sm font-semibold uppercase tracking-widest text-danger-400">
                    Featured
                  </p>
                  <h1 className="text-4xl font-bold leading-tight text-white lg:text-5xl">
                    {featuredMovie.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3">
                    {featuredMovie.genres?.map((genre) => (
                      <Chip
                        key={genre.id}
                        size="sm"
                        variant="bordered"
                        classNames={{
                          base: "border-white/30",
                          content: "text-white/80",
                        }}
                      >
                        {genre.name}
                      </Chip>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-white/60">
                    {featuredMovie.rating > 0 && (
                      <span className="flex items-center gap-1 font-semibold text-yellow-400">
                        <FaStar />
                        {featuredMovie.rating}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <FaClock />
                      {featuredMovie.durationMin} min
                    </span>
                    <span>{featuredMovie.language}</span>
                  </div>
                  <p className="line-clamp-3 leading-relaxed text-white/70">
                    {featuredMovie.description}
                  </p>
                  <div className="mt-2 flex gap-3">
                    <Button
                      as={Link}
                      href={`/movies/${featuredMovie.id}`}
                      color="danger"
                      size="lg"
                      startContent={<FaPlay className="text-xs" />}
                    >
                      Get Tickets
                    </Button>
                    <Button
                      as={Link}
                      href="/movies"
                      variant="bordered"
                      size="lg"
                      className="border-white/30 text-white hover:border-white"
                    >
                      Browse All
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </section>

      {/* ── Browse by Genre ── */}
      {genres.length > 0 && (
        <section className="border-b border-default-100 bg-default-50 px-6 py-10">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3">
            <span className="mr-2 text-sm font-medium text-default-500">
              Browse by genre:
            </span>
            {genres.map((genre: IGenre) => (
              <Chip
                key={genre.id}
                as={Link}
                href={`/movies?genreId=${genre.id}`}
                variant="flat"
                className="cursor-pointer transition-colors hover:bg-danger-100 hover:text-danger-600"
              >
                {genre.name}
              </Chip>
            ))}
          </div>
        </section>
      )}

      {/* ── Now Showing ── */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-1 text-sm font-semibold uppercase tracking-widest text-danger-500">
              Now Showing
            </p>
            <h2 className="text-2xl font-bold lg:text-3xl">Latest Movies</h2>
          </div>
          <Button
            as={Link}
            href="/movies"
            variant="light"
            color="danger"
            endContent={<FaArrowRight className="text-xs" />}
            className="hidden sm:flex"
          >
            View All
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <MovieCardSkeleton key={i} />
              ))
            : movies.map((movie: IMovie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
        </div>

        {!isLoading && movies.length === 0 && (
          <p className="py-10 text-center text-default-400">
            No movies available right now.
          </p>
        )}

        <div className="mt-6 flex justify-center sm:hidden">
          <Button as={Link} href="/movies" color="danger" variant="flat">
            View All Movies
          </Button>
        </div>
      </section>

      {/* ── Upcoming Showtimes ── */}
      {upcomingShowtimes.length > 0 && (
        <section className="border-t border-default-100 bg-default-50 px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <p className="mb-1 text-sm font-semibold uppercase tracking-widest text-danger-500">
                  Coming Up
                </p>
                <h2 className="text-2xl font-bold lg:text-3xl">
                  Tomorrow&apos;s Showtimes
                </h2>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingShowtimes.map((showtime: IShowtimeDetail) => (
                <Card
                  key={showtime.id}
                  className="border border-default-100 transition-shadow hover:shadow-md"
                >
                  <CardBody className="flex flex-row items-center gap-4 p-4">
                    {/* Poster thumbnail */}
                    {showtime.movie?.posterUrl && (
                      <Image
                        src={showtime.movie.posterUrl}
                        alt={showtime.movie.title}
                        width={48}
                        height={72}
                        className="aspect-[2/3] w-12 shrink-0 rounded-md object-cover"
                      />
                    )}

                    {/* Details */}
                    <div className="flex flex-1 flex-col gap-0.5 overflow-hidden">
                      <p className="truncate text-sm font-semibold">
                        {showtime.movie?.title}
                      </p>
                      <p className="text-xs text-default-500">
                        {showtime.theater?.name}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-default-400">
                        <span className="font-medium text-danger-500">
                          {new Date(showtime.startTime).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        <span>{formatCurrency(showtime.price)}</span>
                        <span className="flex items-center gap-0.5">
                          <FaCouch className="text-[9px]" />
                          {showtime.availableSeats}
                        </span>
                      </div>
                    </div>

                    {/* Book */}
                    <Button
                      as={Link}
                      href={`/showtimes/${showtime.id}/seats`}
                      size="sm"
                      color="danger"
                      variant="flat"
                    >
                      Book
                    </Button>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── How it Works ── */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <p className="mb-1 text-center text-sm font-semibold uppercase tracking-widest text-danger-500">
            Simple &amp; Fast
          </p>
          <h2 className="mb-12 text-center text-2xl font-bold lg:text-3xl">
            How It Works
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                icon: <FaFilm className="text-2xl text-danger-500" />,
                title: "Pick a Movie",
                desc: "Browse our catalog with genre filters and find the perfect film for your mood.",
              },
              {
                icon: <FaCouch className="text-2xl text-danger-500" />,
                title: "Choose Your Seats",
                desc: "Select your favorite seats from our interactive seat map with real-time availability.",
              },
              {
                icon: <FaTicket className="text-2xl text-danger-500" />,
                title: "Confirm & Enjoy",
                desc: "Complete your reservation and get your booking reference instantly. That's it!",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-center gap-4 text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-danger-50">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="max-w-xs text-sm leading-relaxed text-default-500">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-gray-950 px-6 py-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <h2 className="text-3xl font-bold text-white lg:text-4xl">
            Ready for Movie Night?
          </h2>
          <p className="max-w-xl text-white/60">
            Sign up now to reserve your favorite seats in seconds. No lines, no
            hassle — just pick, book, and enjoy the show.
          </p>
          <div className="flex gap-3">
            <Button
              as={Link}
              href="/movies"
              color="danger"
              size="lg"
            >
              Browse Movies
            </Button>
            <Button
              as={Link}
              href="/auth/register"
              variant="bordered"
              size="lg"
              className="border-white/30 text-white hover:border-white"
            >
              Create Account
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
