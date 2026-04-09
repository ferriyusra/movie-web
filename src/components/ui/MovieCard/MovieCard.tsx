import { Card, CardBody, CardFooter, Chip, Skeleton } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { IMovie } from "@/types/Movie";

interface PropTypes {
  movie: IMovie;
}

const MovieCard = ({ movie }: PropTypes) => {
  return (
    <Card
      as={Link}
      href={`/movies/${movie.id}`}
      isPressable
      className="w-full"
    >
      <CardBody className="overflow-hidden p-0">
        <Image
          src={movie.posterUrl || "/images/general/no-image.png"}
          alt={movie.title}
          width={400}
          height={600}
          className="aspect-[2/3] w-full object-cover"
        />
      </CardBody>
      <CardFooter className="flex flex-col items-start gap-1 p-3">
        <h3 className="line-clamp-1 text-sm font-semibold">{movie.title}</h3>
        <div className="flex flex-wrap gap-1">
          {movie.genres?.map((genre) => (
            <Chip key={genre.id} size="sm" variant="flat" color="danger">
              {genre.name}
            </Chip>
          ))}
        </div>
        <p className="text-xs text-default-400">
          {movie.durationMin} min &middot; {movie.language}
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
    </CardFooter>
  </Card>
);

export default MovieCard;
export { MovieCardSkeleton };
