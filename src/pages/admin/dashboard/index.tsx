import { ReactElement } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/components/views/Admin/Dashboard";
import { NextPageWithLayout } from "@/pages/_app";

const AdminDashboardPage: NextPageWithLayout = () => {
  return <Dashboard />;
};

AdminDashboardPage.getLayout = (page: ReactElement) => (
  <DashboardLayout title="Dashboard" description="Overview" type="admin">
    {page}
  </DashboardLayout>
);

export default AdminDashboardPage;
