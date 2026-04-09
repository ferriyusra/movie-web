import { ReactElement } from "react";
import LandingPageLayout from "@/components/layouts/LandingPageLayout";
import Home from "@/components/views/Home";
import { NextPageWithLayout } from "@/pages/_app";

const HomePage: NextPageWithLayout = () => {
  return <Home />;
};

HomePage.getLayout = (page: ReactElement) => (
  <LandingPageLayout title="Cinema">{page}</LandingPageLayout>
);

export default HomePage;
