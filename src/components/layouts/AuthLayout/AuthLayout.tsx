import PageHead from "@/components/commons/PageHead";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { FaFilm } from "react-icons/fa6";

interface PropTypes {
  children: ReactNode;
  title?: string;
}

const AuthLayout = (props: PropTypes) => {
  const { children, title } = props;
  return (
    <div className="flex min-h-screen w-full bg-gray-950">
      <PageHead title={title} />

      {/* Left — cinematic poster panel (hidden on mobile) */}
      <div className="relative hidden w-1/2 overflow-hidden lg:block">
        <Image
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&q=80"
          alt="Cinema"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/30 to-gray-950" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-gray-950/60" />

        <div className="absolute bottom-12 left-12 right-12 z-10">
          <Link href="/">
            <Image
              src="/images/general/logo.svg"
              alt="Cinema"
              width={100}
              height={50}
            />
          </Link>
          <h2 className="mt-6 text-3xl font-bold leading-tight text-white">
            Your next
            <br />
            <span className="text-danger-400">movie experience</span>
            <br />
            starts here.
          </h2>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/50">
            Browse movies, pick your favorite seats, and reserve tickets in
            seconds.
          </p>
          <div className="mt-6 flex items-center gap-6 text-xs text-white/30">
            <span className="flex items-center gap-1.5">
              <FaFilm className="text-danger-400/60" />
              8+ Movies
            </span>
            <span>3 Theaters</span>
            <span>200+ Seats</span>
          </div>
        </div>
      </div>

      {/* Right — form panel */}
      <div className="relative flex w-full flex-1 flex-col items-center justify-center overflow-hidden px-6 py-12 lg:w-1/2">
        {/* BG effects */}
        <div className="absolute -left-40 top-1/4 h-[400px] w-[400px] rounded-full bg-danger-500/[0.05] blur-[120px]" />
        <div className="absolute -right-40 bottom-1/4 h-[300px] w-[300px] rounded-full bg-pink-500/[0.03] blur-[120px]" />

        <div className="relative z-10 w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
