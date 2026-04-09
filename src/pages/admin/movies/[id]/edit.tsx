import { ReactElement } from "react";
import { useRouter } from "next/router";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import MovieForm from "@/components/views/Admin/MovieForm";
import { NextPageWithLayout } from "@/pages/_app";

const EditMoviePage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return null;

  return <MovieForm movieId={id as string} />;
};

EditMoviePage.getLayout = (page: ReactElement) => (
  <DashboardLayout
    title="Edit Movie"
    description="Update movie details"
    type="admin"
  >
    {page}
  </DashboardLayout>
);

export default EditMoviePage;
