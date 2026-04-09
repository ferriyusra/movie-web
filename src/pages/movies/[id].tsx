import { ReactElement } from "react";
import LandingPageLayout from "@/components/layouts/LandingPageLayout";
import MovieDetail from "@/components/views/MovieDetail";
import { NextPageWithLayout } from "@/pages/_app";

const MovieDetailPage: NextPageWithLayout = () => {
  return <MovieDetail />;
};

MovieDetailPage.getLayout = (page: ReactElement) => (
  <LandingPageLayout title="Movie Detail">{page}</LandingPageLayout>
);

export default MovieDetailPage;
