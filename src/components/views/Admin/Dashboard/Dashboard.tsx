import { Card, CardBody, Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import movieServices from "@/services/movie.service";
import theaterServices from "@/services/theater.service";
import reservationServices from "@/services/reservation.service";
import userServices from "@/services/user.service";

const Dashboard = () => {
  const { data: moviesData, isLoading: isLoadingMovies } = useQuery({
    queryKey: ["DashboardMovies"],
    queryFn: async () => {
      const { data } = await movieServices.getMovies("limit=1&page=1");
      return data.meta;
    },
  });

  const { data: theatersData, isLoading: isLoadingTheaters } = useQuery({
    queryKey: ["DashboardTheaters"],
    queryFn: async () => {
      const { data } = await theaterServices.getTheaters();
      return data.data;
    },
  });

  const { data: reservationsData, isLoading: isLoadingReservations } =
    useQuery({
      queryKey: ["DashboardReservations"],
      queryFn: async () => {
        const { data } = await reservationServices.getAdminReservations(
          "limit=5&page=1",
        );
        return data;
      },
    });

  const { data: usersData, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["DashboardUsers"],
    queryFn: async () => {
      const { data } = await userServices.getUsers();
      return data.data;
    },
  });

  const isLoading =
    isLoadingMovies ||
    isLoadingTheaters ||
    isLoadingReservations ||
    isLoadingUsers;

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner color="danger" size="lg" />
      </div>
    );
  }

  const stats = [
    { label: "Total Movies", value: moviesData?.total || 0 },
    { label: "Total Theaters", value: theatersData?.length || 0 },
    {
      label: "Total Reservations",
      value: reservationsData?.meta?.total || 0,
    },
    { label: "Total Users", value: usersData?.length || 0 },
  ];

  return (
    <section>
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardBody className="text-center">
              <p className="text-3xl font-bold text-danger-500">
                {stat.value}
              </p>
              <p className="text-sm text-default-500">{stat.label}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      <h3 className="mb-4 text-lg font-semibold">Recent Reservations</h3>
      {reservationsData?.data?.length === 0 ? (
        <p className="text-default-400">No reservations yet.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {reservationsData?.data?.slice(0, 5).map(
            (r: {
              id: string;
              bookingReference: string;
              status: string;
              totalAmount: number;
              createdAt: string;
            }) => (
              <Card key={r.id}>
                <CardBody className="flex flex-row items-center justify-between p-3">
                  <div>
                    <p className="font-mono text-sm">{r.bookingReference}</p>
                    <p className="text-xs text-default-400">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-sm font-medium">{r.status}</p>
                </CardBody>
              </Card>
            ),
          )}
        </div>
      )}
    </section>
  );
};

export default Dashboard;
