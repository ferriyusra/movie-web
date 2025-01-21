import { Button, Card, CardBody, Input } from "@nextui-org/react";
import Image from "next/image"
import Link from "next/link";
import useRegister from "./useRegister";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const Register = () => {

  const { visiblePassword, handleVisiblePassword } = useRegister();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-10 lg:gap-20 lg:flex-row">
      <div className="flex w-full lg:w-1/3 flex-col items-center justify-center gap-10 py-10 lg:py">
        <Image
          src="/images/general/logo.svg"
          alt="logo"
          width={180}
          height={180}
        />
        <Image
          src="/images/illustrations/login.svg"
          alt="login"
          className="w-2/3 lg:w-full"
          width={1024}
          height={1024}
        />
      </div>
      <Card>
        <CardBody className="p-8">
          <h2 className="text-xl font-bold text-danger-500">Buat Akun</h2>
          <p className="mb-4 text-small">Apakah sudah punya akun?&nbsp;
            <Link href="/auth/login" className="font-semibold text-danger-400">Login disini</Link>
          </p>
          <form className="flex w-80 flex-col gap-4">
            <Input
              type="text"
              label="Nama Lengkap"
              autoComplete="off"
              variant="bordered"
            />
            <Input
              type="text"
              label="Nama Pengguna"
              autoComplete="off"
              variant="bordered"
            />
            <Input
              type="email"
              label="Email"
              autoComplete="off"
              variant="bordered"
            />
            <Input
              type={visiblePassword.password ? "text" : "password"}
              label="Kata Sandi"
              autoComplete="off"
              variant="bordered"
              endContent={
                <>
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={() => handleVisiblePassword("password")}
                  >
                    {
                      visiblePassword.password ? (
                        <FaEye className="pointer-events-none text-xl text-default-400" />
                      ) : (
                        <FaEyeSlash className="pointer-events-none text-xl text-default-400" />
                      )
                    }
                  </button>
                </>
              }
            />
            <Input
              type={visiblePassword.passwordConfirmation ? "text" : "password"}
              label="Konfirmasi Kata Sandi"
              autoComplete="off"
              variant="bordered"
              endContent={
                <>
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={() => handleVisiblePassword("passwordConfirmation")}
                  >
                    {
                      visiblePassword.passwordConfirmation ? (
                        <FaEye className="pointer-events-none text-xl text-default-400" />
                      ) : (
                        <FaEyeSlash className="pointer-events-none text-xl text-default-400" />
                      )
                    }
                  </button>
                </>
              }
            />
            <Button color="danger" size="lg" type="submit">Daftar</Button>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}

export default Register;