import { ReactElement } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import AdminTheater from "@/components/views/Admin/Theater";
import { NextPageWithLayout } from "@/pages/_app";

const AdminTheatersPage: NextPageWithLayout = () => {
  return <AdminTheater />;
};

AdminTheatersPage.getLayout = (page: ReactElement) => (
  <DashboardLayout
    title="Theaters"
    description="Manage theaters"
    type="admin"
  >
    {page}
  </DashboardLayout>
);

export default AdminTheatersPage;
