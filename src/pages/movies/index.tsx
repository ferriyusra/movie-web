import { ReactElement } from "react";
import LandingPageLayout from "@/components/layouts/LandingPageLayout";
import Movie from "@/components/views/Movie";
import { NextPageWithLayout } from "@/pages/_app";

const MoviesPage: NextPageWithLayout = () => {
  return <Movie />;
};

MoviesPage.getLayout = (page: ReactElement) => (
  <LandingPageLayout title="Movies">{page}</LandingPageLayout>
);

export default MoviesPage;
