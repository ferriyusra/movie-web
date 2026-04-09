import { ReactElement } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import AdminMovie from "@/components/views/Admin/Movie";
import { NextPageWithLayout } from "@/pages/_app";

const AdminMoviesPage: NextPageWithLayout = () => {
  return <AdminMovie />;
};

AdminMoviesPage.getLayout = (page: ReactElement) => (
  <DashboardLayout title="Movies" description="Manage movies" type="admin">
    {page}
  </DashboardLayout>
);

export default AdminMoviesPage;
