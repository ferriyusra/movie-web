import { cn } from "@/utils/cn";
import {
  Avatar,
  Button,
  ButtonProps,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { BUTTON_ITEMS, NAV_ITEMS } from "../LandingPageLayout.constants";
import { CiSearch } from "react-icons/ci";
import { signOut, useSession } from "next-auth/react";
import useLandingPageLayoutNavbar from "./useLandingPageLayoutNavbar";
import { Fragment } from "react";
import Link from "next/link";

const LandingPageLayoutNavbar = () => {
  const router = useRouter();
  const session = useSession();

  const { dataProfile } = useLandingPageLayoutNavbar();

  return (
    <Navbar
      isBordered
      isBlurred={false}
      shouldHideOnScroll
      maxWidth="full"
      className="max-w-screen-3xl 3xl:container"
    >
      <div className="flex items-center gap-8">
        <NavbarBrand as={Link} href="/">
          <Image
            src="images/general/logo.svg"
            alt="logo"
            width={100}
            height={50}
            className="cursor-pointer"
          />
        </NavbarBrand>
        <NavbarContent className="hidden lg:flex">
          {NAV_ITEMS.map((item) => (
            <NavbarItem
              key={`nav-${item.label}`}
              as={Link}
              href={item.href}
              className={cn("font-medium text-default-700 hover:text-danger", {
                "font-bold text-danger-500": router.pathname === item.href,
              })}
            >
              {item.label}
            </NavbarItem>
          ))}
        </NavbarContent>
      </div>
      <NavbarContent justify="end">
        <NavbarMenuToggle className="lg:hidden" />
        <NavbarItem className="hidden lg:relative lg:flex">
          <Input
            isClearable
            className="w-[300px]"
            placeholder="Cari Acara..."
            startContent={<CiSearch />}
            onClear={() => console.log("Clear")}
            onChange={() => console.log("Clear")}
          />
        </NavbarItem>
        {session.status === "authenticated" ? (
          <NavbarItem className="hidden lg:block">
            <Dropdown>
              <DropdownTrigger>
                <Avatar
                  src={dataProfile?.profilePicture}
                  className="cursor-pointer"
                  showFallback
                />
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key="admin"
                  href="/admin/dashboard"
                  className={cn({
                    hidden: dataProfile?.role !== "admin",
                  })}
                >
                  Admin
                </DropdownItem>
                <DropdownItem key="profile" href="/member/profile">
                  Profile
                </DropdownItem>
                <DropdownItem key="signout" onPress={() => signOut()}>
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        ) : (
          <div className="hidden lg:flex lg:gap-4">
            {BUTTON_ITEMS.map((item) => (
              <NavbarItem key={`button-${item.label}`}>
                <Button
                  as={Link}
                  color="danger"
                  href={item.href}
                  variant={item.variant as ButtonProps["variant"]}
                >
                  {item.label}
                </Button>
              </NavbarItem>
            ))}
          </div>
        )}
        <NavbarMenu className="gap-4">
          {NAV_ITEMS.map((item) => (
            <NavbarMenuItem
              className={cn("font-medium text-default-700 hover:text-danger", {
                "font-bold text-danger": router.pathname === item.href,
              })}
              key={`nav-${item.label}`}
            >
              <Link href={item.href}>{item.label}</Link>
            </NavbarMenuItem>
          ))}
          {session.status === "authenticated" ? (
            <Fragment>
              <NavbarMenuItem
                className={cn(
                  "font-medium text-default-700 hover:text-danger",
                  {
                    hidden: dataProfile?.role !== "admin",
                  },
                )}
              >
                <Link href="/admin/dashboard">Admin</Link>
              </NavbarMenuItem>
              <NavbarMenuItem className="font-medium text-default-700 hover:text-danger">
                <Link href="/member/profile">Profile</Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Button
                  color="danger"
                  onPress={() => signOut()}
                  className="mt-2 w-full"
                  variant="bordered"
                  size="md"
                >
                  Logout
                </Button>
              </NavbarMenuItem>
            </Fragment>
          ) : (
            <Fragment>
              {BUTTON_ITEMS.map((item) => (
                <NavbarMenuItem key={`button-${item.label}`}>
                  <Button
                    as={Link}
                    color="danger"
                    href={item.href}
                    fullWidth
                    variant={item.variant as ButtonProps["variant"]}
                  >
                    {item.label}
                  </Button>
                </NavbarMenuItem>
              ))}
            </Fragment>
          )}
        </NavbarMenu>
      </NavbarContent>
    </Navbar>
  );
};

export default LandingPageLayoutNavbar;
