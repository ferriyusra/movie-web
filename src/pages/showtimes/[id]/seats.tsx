import { ReactElement } from "react";
import LandingPageLayout from "@/components/layouts/LandingPageLayout";
import SeatPicker from "@/components/views/SeatPicker";
import { NextPageWithLayout } from "@/pages/_app";

const SeatPickerPage: NextPageWithLayout = () => {
  return <SeatPicker />;
};

SeatPickerPage.getLayout = (page: ReactElement) => (
  <LandingPageLayout title="Select Seats">{page}</LandingPageLayout>
);

export default SeatPickerPage;
