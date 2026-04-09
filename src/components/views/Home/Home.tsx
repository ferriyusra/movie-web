import { Button } from "@heroui/react";
import Link from "next/link";

const Home = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-8 px-4 py-20 text-center">
      <h1 className="text-4xl font-bold lg:text-6xl">
        Book Your Movie Experience
      </h1>
      <p className="max-w-2xl text-lg text-default-500">
        Browse the latest movies, pick your favorite seats, and reserve your
        tickets — all in one place.
      </p>
      <div className="flex gap-4">
        <Button as={Link} href="/movies" color="danger" size="lg">
          Browse Movies
        </Button>
      </div>
    </section>
  );
};

export default Home;
