import { AxiosError } from "axios";
import { signOut } from "next-auth/react";

interface ErrorResponseData {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}

const onErrorHandler = (error: Error) => {
  const { response } = error as AxiosError;
  if (response?.status === 401) {
    signOut();
  }
};

const getErrorMessage = (error: Error): string => {
  const { response } = error as AxiosError;
  const res = response?.data as ErrorResponseData;
  return res?.message || error.message || "Something went wrong";
};

export { onErrorHandler, getErrorMessage };
