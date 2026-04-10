import { Button } from "@heroui/react";
import { signOut } from "next-auth/react";
import { CiLogout } from "react-icons/ci";
import Image from "next/image";
import { useRouter } from "next/router";
import { cn } from "@/utils/cn";
import { JSX } from "react";
import Link from "next/link";

interface SidebarItem {
  key: string;
  label: string;
  href: string;
  icon: JSX.Element;
}

interface PropTypes {
  sidebarItems: SidebarItem[];
  isOpen: boolean;
}

const DashboardLayoutSidebar = (props: PropTypes) => {
  const { sidebarItems, isOpen } = props;
  const router = useRouter();

  const isActive = (href: string) =>
    router.pathname === href || router.pathname.startsWith(href + "/");

  return (
    <div
      className={cn(
        "fixed z-50 flex h-screen w-full max-w-[260px] -translate-x-full flex-col justify-between border-r border-default-100 bg-white px-3 py-5 transition-all lg:relative lg:translate-x-0",
        { "translate-x-0": isOpen },
      )}
    >
      <div>
        <Link href="/" className="mb-6 flex items-center px-3">
          <Image
            src="/images/general/logo.svg"
            alt="Cinema"
            width={80}
            height={40}
          />
        </Link>
        <nav className="flex flex-col gap-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "bg-danger-50 font-semibold text-danger-600"
                  : "text-default-600 hover:bg-default-100",
              )}
            >
              <span
                className={cn(
                  "text-lg",
                  isActive(item.href)
                    ? "text-danger-500"
                    : "text-default-400",
                )}
              >
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="px-1">
        <Button
          color="danger"
          fullWidth
          variant="light"
          className="h-10 justify-start rounded-lg px-3 text-sm font-medium"
          onPress={() => signOut()}
          startContent={<CiLogout className="text-lg" />}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default DashboardLayoutSidebar;
