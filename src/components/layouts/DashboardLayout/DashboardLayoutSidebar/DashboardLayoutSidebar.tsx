import { Button, Listbox, ListboxItem } from "@heroui/react";
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
        <Listbox
          items={sidebarItems}
          variant="flat"
          aria-label="Dashboard Menu"
          className="gap-1 p-0"
        >
          {(item) => (
            <ListboxItem
              key={item.key}
              className={cn(
                "my-0.5 h-10 rounded-lg px-3 text-sm font-medium text-default-600 transition-colors",
                {
                  "bg-danger-50 font-semibold text-danger-600": isActive(
                    item.href,
                  ),
                  "hover:bg-default-100": !isActive(item.href),
                },
              )}
              startContent={
                <span
                  className={cn("text-lg", {
                    "text-danger-500": isActive(item.href),
                    "text-default-400": !isActive(item.href),
                  })}
                >
                  {item.icon}
                </span>
              }
              textValue={item.label}
              aria-labelledby={item.label}
              aria-describedby={item.label}
              as={Link}
              href={item.href}
            >
              <span>{item.label}</span>
            </ListboxItem>
          )}
        </Listbox>
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
