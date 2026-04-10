import { Card, CardBody, Chip, Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import movieServices from "@/services/movie.service";
import theaterServices from "@/services/theater.service";
import reservationServices from "@/services/reservation.service";
import userServices from "@/services/user.service";
import { formatCurrency } from "@/utils/currency";
import {
  CiViewList,
  CiBoxes,
  CiWallet,
  CiUser,
} from "react-icons/ci";

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
    {
      label: "Movies",
      value: moviesData?.total || 0,
      icon: <CiViewList className="text-xl" />,
      color: "bg-danger-50 text-danger-500",
    },
    {
      label: "Theaters",
      value: theatersData?.length || 0,
      icon: <CiBoxes className="text-xl" />,
      color: "bg-blue-50 text-blue-500",
    },
    {
      label: "Reservations",
      value: reservationsData?.meta?.total || 0,
      icon: <CiWallet className="text-xl" />,
      color: "bg-green-50 text-green-500",
    },
    {
      label: "Users",
      value: usersData?.length || 0,
      icon: <CiUser className="text-xl" />,
      color: "bg-purple-50 text-purple-500",
    },
  ];

  return (
    <section>
      {/* Stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            className="border border-default-100 bg-white shadow-none"
          >
            <CardBody className="flex flex-row items-center gap-4 p-4">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${stat.color}`}
              >
                {stat.icon}
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-default-400">{stat.label}</p>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Recent Reservations */}
      <Card className="border border-default-100 bg-white shadow-none">
        <CardBody className="p-0">
          <div className="flex items-center justify-between border-b border-default-100 px-5 py-4">
            <h3 className="text-sm font-semibold">Recent Reservations</h3>
            <Chip size="sm" variant="flat">
              Last 5
            </Chip>
          </div>
          {reservationsData?.data?.length === 0 ? (
            <p className="px-5 py-10 text-center text-sm text-default-400">
              No reservations yet.
            </p>
          ) : (
            <div className="divide-y divide-default-100">
              {reservationsData?.data?.slice(0, 5).map(
                (r: {
                  id: string;
                  bookingReference: string;
                  status: string;
                  totalAmount: number;
                  createdAt: string;
                }) => (
                  <div
                    key={r.id}
                    className="flex items-center justify-between px-5 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-default-100">
                        <CiWallet className="text-default-500" />
                      </div>
                      <div>
                        <p className="font-mono text-sm font-medium">
                          {r.bookingReference}
                        </p>
                        <p className="text-xs text-default-400">
                          {new Date(r.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="text-sm font-medium">
                        {formatCurrency(r.totalAmount)}
                      </p>
                      <Chip
                        size="sm"
                        variant="flat"
                        color={
                          r.status === "confirmed" ? "success" : "default"
                        }
                      >
                        {r.status}
                      </Chip>
                    </div>
                  </div>
                ),
              )}
            </div>
          )}
        </CardBody>
      </Card>
    </section>
  );
};

export default Dashboard;
