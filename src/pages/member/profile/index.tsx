import { ReactElement } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import Profile from "@/components/views/Profile";
import { NextPageWithLayout } from "@/pages/_app";

const ProfilePage: NextPageWithLayout = () => {
  return <Profile />;
};

ProfilePage.getLayout = (page: ReactElement) => (
  <DashboardLayout title="Profile" description="Your profile" type="member">
    {page}
  </DashboardLayout>
);

export default ProfilePage;
