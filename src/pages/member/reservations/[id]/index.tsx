import { ReactElement } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import ReservationDetail from "@/components/views/ReservationDetail";
import { NextPageWithLayout } from "@/pages/_app";

const ReservationDetailPage: NextPageWithLayout = () => {
  return <ReservationDetail />;
};

ReservationDetailPage.getLayout = (page: ReactElement) => (
  <DashboardLayout
    title="Reservation Detail"
    description="View reservation details"
    type="member"
  >
    {page}
  </DashboardLayout>
);

export default ReservationDetailPage;
