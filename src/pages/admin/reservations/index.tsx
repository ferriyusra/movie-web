import { ReactElement } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import AdminReservation from "@/components/views/Admin/Reservation";
import { NextPageWithLayout } from "@/pages/_app";

const AdminReservationsPage: NextPageWithLayout = () => {
  return <AdminReservation />;
};

AdminReservationsPage.getLayout = (page: ReactElement) => (
  <DashboardLayout
    title="Reservations"
    description="Manage all reservations"
    type="admin"
  >
    {page}
  </DashboardLayout>
);

export default AdminReservationsPage;
