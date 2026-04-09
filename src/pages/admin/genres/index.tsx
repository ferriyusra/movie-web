import { ReactElement } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import Genre from "@/components/views/Admin/Genre";
import { NextPageWithLayout } from "@/pages/_app";

const AdminGenrePage: NextPageWithLayout = () => {
  return <Genre />;
};

AdminGenrePage.getLayout = (page: ReactElement) => (
  <DashboardLayout title="Genres" description="Manage movie genres" type="admin">
    {page}
  </DashboardLayout>
);

export default AdminGenrePage;
