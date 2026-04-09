import { ReactElement } from "react";
import AuthLayout from "@/components/layouts/AuthLayout";
import Login from "@/components/views/Auth/Login";
import { NextPageWithLayout } from "@/pages/_app";

const LoginPage: NextPageWithLayout = () => {
  return <Login />;
}

LoginPage.getLayout = (page: ReactElement) => (
  <AuthLayout title="Cinema | Login">{page}</AuthLayout>
);

export default LoginPage;