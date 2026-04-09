import { Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import theaterServices from "@/services/theater.service";
import SeatGrid from "@/components/ui/SeatGrid";
import { ITheaterDetail } from "@/types/Theater";

const TheaterDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = useQuery({
    queryKey: ["Theater", id],
    queryFn: async () => {
      const { data } = await theaterServices.getTheaterById(id as string);
      return data.data as ITheaterDetail;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner color="danger" size="lg" />
      </div>
    );
  }

  if (!data) {
    return (
      <p className="py-20 text-center text-default-400">Theater not found</p>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-4">
      <h1 className="mb-2 text-3xl font-bold">{data.name}</h1>
      <p className="mb-2 text-default-500">{data.location}</p>
      <p className="mb-8 text-sm text-default-400">
        {data.totalSeats} seats &middot; {data.rows} rows x {data.seatsPerRow}{" "}
        per row
      </p>
      <SeatGrid seats={data.seats || []} />
    </section>
  );
};

export default TheaterDetail;
