import { Button, Input, Spinner } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import useLogin from "./useLogin";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa6";
import { Controller } from "react-hook-form";
import { cn } from "@/utils/cn";

const Login = () => {
  const {
    isVisible,
    toggleVisibility,
    control,
    handleSubmit,
    handleLogin,
    isPendingLogin,
    errors,
  } = useLogin();

  return (
    <div className="flex flex-col">
      {/* Mobile logo */}
      <Link href="/" className="mb-10 self-center lg:hidden">
        <Image
          src="/images/general/logo.svg"
          alt="Cinema"
          width={100}
          height={50}
        />
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Sign in</h1>
        <p className="mt-2 text-sm text-white/40">
          Welcome back. Enter your credentials to continue.
        </p>
      </div>

      {/* Error */}
      {errors.root && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-danger-500/20 bg-danger-500/10 px-4 py-3">
          <div className="h-2 w-2 shrink-0 rounded-full bg-danger-400" />
          <p className="text-sm text-danger-400">{errors.root.message}</p>
        </div>
      )}

      {/* Form */}
      <form
        className={cn(
          "flex flex-col",
          Object.keys(errors).length > 0 ? "gap-4" : "gap-5",
        )}
        onSubmit={handleSubmit(handleLogin)}
      >
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="email"
              label="Email address"
              autoComplete="off"
              variant="bordered"
              size="lg"
              startContent={
                <FaEnvelope className="text-sm text-white/20" />
              }
              classNames={{
                inputWrapper:
                  "border-white/[0.08] bg-white/[0.03] hover:border-white/15 focus-within:border-danger-500/50",
                input: "text-white text-sm",
                label: "text-white/40",
              }}
              isInvalid={errors.email !== undefined}
              errorMessage={errors.email?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type={isVisible ? "text" : "password"}
              label="Password"
              autoComplete="off"
              variant="bordered"
              size="lg"
              startContent={<FaLock className="text-sm text-white/20" />}
              classNames={{
                inputWrapper:
                  "border-white/[0.08] bg-white/[0.03] hover:border-white/15 focus-within:border-danger-500/50",
                input: "text-white text-sm",
                label: "text-white/40",
              }}
              isInvalid={errors.password !== undefined}
              errorMessage={errors.password?.message}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                  aria-label={
                    isVisible ? "Hide password" : "Show password"
                  }
                >
                  {isVisible ? (
                    <FaEye className="text-base text-white/30 transition-colors hover:text-white/50" />
                  ) : (
                    <FaEyeSlash className="text-base text-white/30 transition-colors hover:text-white/50" />
                  )}
                </button>
              }
            />
          )}
        />

        <Button
          color="danger"
          size="lg"
          type="submit"
          fullWidth
          className="mt-1 h-12 text-base font-semibold"
        >
          {isPendingLogin ? (
            <Spinner color="white" size="sm" />
          ) : (
            "Sign In"
          )}
        </Button>
      </form>

      {/* Divider */}
      <div className="my-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-white/[0.06]" />
        <span className="text-xs text-white/20">or</span>
        <div className="h-px flex-1 bg-white/[0.06]" />
      </div>

      {/* Register CTA */}
      <Button
        as={Link}
        href="/auth/register"
        variant="bordered"
        fullWidth
        className="h-12 border-white/[0.08] text-sm font-medium text-white/60 hover:border-white/15 hover:text-white"
      >
        Create a new account
      </Button>

      <Link
        href="/"
        className="mt-8 self-center text-xs text-white/20 transition-colors hover:text-white/40"
      >
        Back to home
      </Link>
    </div>
  );
};

export default Login;
