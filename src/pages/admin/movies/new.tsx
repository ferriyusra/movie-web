import { ReactElement } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import MovieForm from "@/components/views/Admin/MovieForm";
import { NextPageWithLayout } from "@/pages/_app";

const CreateMoviePage: NextPageWithLayout = () => {
  return <MovieForm />;
};

CreateMoviePage.getLayout = (page: ReactElement) => (
  <DashboardLayout
    title="Create Movie"
    description="Add a new movie"
    type="admin"
  >
    {page}
  </DashboardLayout>
);

export default CreateMoviePage;
