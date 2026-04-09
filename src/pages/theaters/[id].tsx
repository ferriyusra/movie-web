import { ReactElement } from "react";
import LandingPageLayout from "@/components/layouts/LandingPageLayout";
import TheaterDetail from "@/components/views/TheaterDetail";
import { NextPageWithLayout } from "@/pages/_app";

const TheaterDetailPage: NextPageWithLayout = () => {
  return <TheaterDetail />;
};

TheaterDetailPage.getLayout = (page: ReactElement) => (
  <LandingPageLayout title="Theater Detail">{page}</LandingPageLayout>
);

export default TheaterDetailPage;
