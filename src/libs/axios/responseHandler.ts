import { AxiosError } from "axios";
import { getSession, signOut } from "next-auth/react";

interface ErrorResponseData {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}

const onErrorHandler = async (error: Error) => {
  const { response } = error as AxiosError;
  if (response?.status === 401) {
    const session = await getSession();
    if (session) {
      signOut({ callbackUrl: "/auth/login" });
    }
  }
};

const getErrorMessage = (error: Error): string => {
  const { response } = error as AxiosError;
  const res = response?.data as ErrorResponseData;
  return res?.message || error.message || "Something went wrong";
};

export { onErrorHandler, getErrorMessage };
