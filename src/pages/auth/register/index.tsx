import { ReactElement } from "react";
import AuthLayout from "@/components/layouts/AuthLayout";
import Register from "@/components/views/Auth/Register";
import { NextPageWithLayout } from "@/pages/_app";

const RegisterPage: NextPageWithLayout = () => {
  return <Register />;
}

RegisterPage.getLayout = (page: ReactElement) => (
  <AuthLayout title="Cinema | Register">{page}</AuthLayout>
);

export default RegisterPage;