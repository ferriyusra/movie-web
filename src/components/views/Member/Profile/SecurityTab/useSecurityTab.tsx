import { ToasterContext } from "@/contexts/ToasterContext";
import authServices from "@/services/auth.service";
import { IUpdatePassword } from "@/types/Auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdatePassword = yup.object().shape({
  oldPassword: yup.string().required("Mohon masukkan kata sandi lama"),
  password: yup.string().required("Mohon masukkan kata sandi baru"),
  confirmPassword: yup.string().required("Mohon masukkan konfirmasi kata sandi"),
});

const useSecurityTab = () => {
  const { setToaster } = useContext(ToasterContext);
  const {
    control: controlUpdatePassword,
    handleSubmit: handleSubmitUpdatePassword,
    formState: { errors: errorsUpdatePassword },
    reset: resetUpdatePassword,
    setValue: setValueUpdatePassword,
  } = useForm({
    resolver: yupResolver(schemaUpdatePassword),
  });

  const [visiblePassword, setVisiblePassword] = useState({
    oldPassword: false,
    password: false,
    confirmPassword: false,
  });

  const handleVisiblePassword = (key: "password" | "confirmPassword" | "oldPassword") => {
    setVisiblePassword({
      ...visiblePassword,
      [key]: !visiblePassword[key],
    });
  };

  const updatePassword = async (payload: IUpdatePassword) => {
    const { data } = await authServices.updatePassword(payload);
    return data;
  };

  const {
    mutate: mutateUpdatePassword,
    isPending: isPendingMutateUpdatePassword,
  } = useMutation({
    mutationFn: (payload: IUpdatePassword) => updatePassword(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      resetUpdatePassword();
      setValueUpdatePassword("oldPassword", "");
      setValueUpdatePassword("password", "");
      setValueUpdatePassword("confirmPassword", "");
      setToaster({
        type: "success",
        message: "Berhasil Ubah Kata Sandi",
      });
    },
  });

  const handleUpdatePassword = (data: IUpdatePassword) =>
    mutateUpdatePassword(data);

  return {
    visiblePassword,
    handleVisiblePassword,
    controlUpdatePassword,
    errorsUpdatePassword,
    handleSubmitUpdatePassword,

    handleUpdatePassword,
    isPendingMutateUpdatePassword,
  };
};

export default useSecurityTab;
