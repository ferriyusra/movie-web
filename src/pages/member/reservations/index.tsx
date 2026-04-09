import { ReactElement } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import Reservation from "@/components/views/Reservation";
import { NextPageWithLayout } from "@/pages/_app";

const MyReservationsPage: NextPageWithLayout = () => {
  return <Reservation />;
};

MyReservationsPage.getLayout = (page: ReactElement) => (
  <DashboardLayout
    title="My Reservations"
    description="View and manage your reservations"
    type="member"
  >
    {page}
  </DashboardLayout>
);

export default MyReservationsPage;
