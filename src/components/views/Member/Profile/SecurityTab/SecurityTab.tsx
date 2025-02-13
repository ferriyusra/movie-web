import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Skeleton,
  Spinner,
} from "@heroui/react";
import useSecurityTab from "./useSecurityTab";
import { Controller } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const SecurityTab = () => {
  const {
    visiblePassword,
    handleVisiblePassword,
    controlUpdatePassword,
    errorsUpdatePassword,
    handleSubmitUpdatePassword,

    handleUpdatePassword,
    isPendingMutateUpdatePassword,
  } = useSecurityTab();


  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Informasi Kata Sandi</h1>
        <p className="w-full text-small text-default-400">
          Atur kata sandi akun
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdatePassword(handleUpdatePassword)}
        >

          <Controller
            name="oldPassword"
            control={controlUpdatePassword}
            render={({ field }) => (
              <Input
                {...field}
                label="Kata Sandi Lama"
                variant="bordered"
                labelPlacement="outside"
                placeholder="Masukkan kata sandi lama"
                isInvalid={errorsUpdatePassword.oldPassword !== undefined}
                errorMessage={errorsUpdatePassword.oldPassword?.message}
                type={visiblePassword.oldPassword ? "text" : "password"}
                endContent={
                  <>
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={() => handleVisiblePassword("oldPassword")}
                    >
                      {visiblePassword.oldPassword ? (
                        <FaEye className="pointer-events-none text-xl text-default-400" />
                      ) : (
                        <FaEyeSlash className="pointer-events-none text-xl text-default-400" />
                      )}
                    </button>
                  </>
                }
              />
            )}
          />
          <Controller
            name="password"
            control={controlUpdatePassword}
            render={({ field }) => (
              <Input
                {...field}
                label="Kata Sandi Baru"
                variant="bordered"
                labelPlacement="outside"
                placeholder="Masukkan kata sandi baru"
                isInvalid={errorsUpdatePassword.password !== undefined}
                errorMessage={errorsUpdatePassword.password?.message}
                type={visiblePassword.password ? "text" : "password"}
                endContent={
                  <>
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={() => handleVisiblePassword("password")}
                    >
                      {visiblePassword.password ? (
                        <FaEye className="pointer-events-none text-xl text-default-400" />
                      ) : (
                        <FaEyeSlash className="pointer-events-none text-xl text-default-400" />
                      )}
                    </button>
                  </>
                }
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={controlUpdatePassword}
            render={({ field }) => (
              <Input
                {...field}
                label="Konfirmasi Kata Sandi"
                variant="bordered"
                labelPlacement="outside"
                placeholder="Masukkan konfirmasi kata sandi baru"
                isInvalid={errorsUpdatePassword.confirmPassword !== undefined}
                errorMessage={errorsUpdatePassword.confirmPassword?.message}
                type={visiblePassword.confirmPassword ? "text" : "password"}
                endContent={
                  <>
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={() => handleVisiblePassword("confirmPassword")}
                    >
                      {visiblePassword.confirmPassword ? (
                        <FaEye className="pointer-events-none text-xl text-default-400" />
                      ) : (
                        <FaEyeSlash className="pointer-events-none text-xl text-default-400" />
                      )}
                    </button>
                  </>
                }
              />
            )}
          />
          <Button
            color="danger"
            className="mt-2 disabled:bg-default-500"
            type="submit"
            disabled={isPendingMutateUpdatePassword}
          >
            {isPendingMutateUpdatePassword ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Ubah Kata Sandi"
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default SecurityTab;
