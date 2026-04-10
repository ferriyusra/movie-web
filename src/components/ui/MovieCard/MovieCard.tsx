import { Card, CardBody, CardFooter, Chip, Skeleton } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { IMovie } from "@/types/Movie";
import { FaStar, FaClock } from "react-icons/fa6";

interface PropTypes {
  movie: IMovie;
}

const MovieCard = ({ movie }: PropTypes) => {
  return (
    <Card
      as={Link}
      href={`/movies/${movie.id}`}
      isPressable
      className="group w-full overflow-hidden"
    >
      <CardBody className="relative overflow-hidden p-0">
        <Image
          src={movie.posterUrl || "/images/general/no-image.png"}
          alt={movie.title}
          width={400}
          height={600}
          className="aspect-[2/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {movie.rating > 0 && (
          <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-xs font-semibold text-yellow-400 backdrop-blur-sm">
            <FaStar className="text-[10px]" />
            {movie.rating}
          </div>
        )}
      </CardBody>
      <CardFooter className="flex flex-col items-start gap-1.5 p-3">
        <h3 className="line-clamp-1 text-sm font-semibold">{movie.title}</h3>
        <div className="flex flex-wrap gap-1">
          {movie.genres?.slice(0, 2).map((genre) => (
            <Chip key={genre.id} size="sm" variant="flat" color="danger">
              {genre.name}
            </Chip>
          ))}
        </div>
        <p className="flex items-center gap-1 text-xs text-default-400">
          <FaClock className="text-[10px]" />
          {movie.durationMin} min
          <span className="mx-1">&middot;</span>
          {movie.language}
        </p>
      </CardFooter>
    </Card>
  );
};

const MovieCardSkeleton = () => (
  <Card className="w-full">
    <CardBody className="p-0">
      <Skeleton className="aspect-[2/3] w-full rounded-b-none" />
    </CardBody>
    <CardFooter className="flex flex-col items-start gap-2 p-3">
      <Skeleton className="h-4 w-3/4 rounded" />
      <Skeleton className="h-3 w-1/2 rounded" />
      <Skeleton className="h-3 w-1/3 rounded" />
    </CardFooter>
  </Card>
);

export default MovieCard;
export { MovieCardSkeleton };
