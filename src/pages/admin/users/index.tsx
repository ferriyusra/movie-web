import { ReactElement } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import AdminUser from "@/components/views/Admin/User";
import { NextPageWithLayout } from "@/pages/_app";

const AdminUsersPage: NextPageWithLayout = () => {
  return <AdminUser />;
};

AdminUsersPage.getLayout = (page: ReactElement) => (
  <DashboardLayout title="Users" description="Manage users" type="admin">
    {page}
  </DashboardLayout>
);

export default AdminUsersPage;
