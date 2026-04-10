import { Button, Input, Spinner } from "@heroui/react";
import Link from "next/link";
import useRegister from "./useRegister";
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock } from "react-icons/fa6";
import { Controller } from "react-hook-form";
import { cn } from "@/utils/cn";

const inputClassNames = {
  inputWrapper:
    "border-white/[0.08] bg-white/[0.03] hover:border-white/20 group-data-[focus=true]:border-danger-500/50",
  input: "text-white text-sm placeholder-white/30",
  label: "text-white/40 group-data-[filled-within=true]:text-white/40",
  innerWrapper: "text-white",
};

const Register = () => {
  const {
    isVisible,
    toggleVisibility,
    control,
    handleSubmit,
    handleRegister,
    isPendingRegister,
    errors,
  } = useRegister();

  return (
    <div className="flex flex-col">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Create account</h1>
        <p className="mt-2 text-sm text-white/40">
          Join us and start booking your favorite movies.
        </p>
      </div>

      {errors.root && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-danger-500/20 bg-danger-500/10 px-4 py-3">
          <div className="h-2 w-2 shrink-0 rounded-full bg-danger-400" />
          <p className="text-sm text-danger-400">{errors.root.message}</p>
        </div>
      )}

      <form
        className={cn(
          "flex flex-col",
          Object.keys(errors).length > 0 ? "gap-4" : "gap-5",
        )}
        onSubmit={handleSubmit(handleRegister)}
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              label="Full name"
              autoComplete="off"
              variant="bordered"
              size="lg"
              startContent={<FaUser className="text-sm text-white/20" />}
              classNames={inputClassNames}
              isInvalid={errors.name !== undefined}
              errorMessage={errors.name?.message}
            />
          )}
        />
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
              startContent={<FaEnvelope className="text-sm text-white/20" />}
              classNames={inputClassNames}
              isInvalid={errors.email !== undefined}
              errorMessage={errors.email?.message}
            />
          )}
        />
        <div>
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
                classNames={inputClassNames}
                isInvalid={errors.password !== undefined}
                errorMessage={errors.password?.message}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                    aria-label={isVisible ? "Hide password" : "Show password"}
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
          <p className="mt-2 text-xs text-white/20">
            Min 8 characters, one uppercase letter, one number.
          </p>
        </div>

        <Button
          color="danger"
          size="lg"
          type="submit"
          fullWidth
          className="mt-1 h-12 text-base font-semibold"
        >
          {isPendingRegister ? (
            <Spinner color="white" size="sm" />
          ) : (
            "Create Account"
          )}
        </Button>
      </form>

      <div className="my-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-white/[0.06]" />
        <span className="text-xs text-white/20">or</span>
        <div className="h-px flex-1 bg-white/[0.06]" />
      </div>

      <Button
        as={Link}
        href="/auth/login"
        variant="bordered"
        fullWidth
        className="h-12 border-white/[0.08] text-sm font-medium text-white/60 hover:border-white/15 hover:text-white"
      >
        Sign in to existing account
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

export default Register;
