import { ReactElement } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import AdminShowtime from "@/components/views/Admin/Showtime";
import { NextPageWithLayout } from "@/pages/_app";

const AdminShowtimesPage: NextPageWithLayout = () => {
  return <AdminShowtime />;
};

AdminShowtimesPage.getLayout = (page: ReactElement) => (
  <DashboardLayout
    title="Showtimes"
    description="Manage showtimes"
    type="admin"
  >
    {page}
  </DashboardLayout>
);

export default AdminShowtimesPage;
