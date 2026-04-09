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
  Link,
  Listbox,
  ListboxItem,
  Spinner,
} from "@heroui/react";
import Image from "next/image";
import { BUTTON_ITEMS, NAV_ITEMS } from "../LandingPageLayout.constants";
import { cn } from "@/utils/cn";
import { useRouter } from "next/router";
import { CiSearch } from "react-icons/ci";
import { signOut, useSession } from "next-auth/react";
import useLandingPageLayoutNavbar from "./useLandingPageLayoutNavbar";
import { Fragment } from "react";
import { IMovie } from "@/types/Movie";
import { UserExtended } from "@/types/Auth";

const LandingPageLayoutNavbar = () => {
  const router = useRouter();
  const session = useSession();
  const user = session.data?.user as UserExtended | undefined;
  const isAdmin = user?.role === "admin";
  const {
    dataProfile,
    dataMoviesSearch,
    isLoadingMoviesSearch,
    isRefetchingMoviesSearch,
    handleSearch,
    search,
    setSearch,
  } = useLandingPageLayoutNavbar();

  return (
    <Navbar maxWidth="full" isBordered isBlurred={false} shouldHideOnScroll>
      <div className="flex items-center gap-8">
        <NavbarBrand as={Link} href="/">
          <Image
            src="/images/general/logo.svg"
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
            placeholder="Search movies..."
            startContent={<CiSearch />}
            onClear={() => setSearch("")}
            onChange={handleSearch}
          />
          {search !== "" && (
            <Listbox
              items={dataMoviesSearch?.data || []}
              className="absolute right-0 top-12 rounded-xl border bg-white"
            >
              {!isRefetchingMoviesSearch && !isLoadingMoviesSearch ? (
                (item: IMovie) => (
                  <ListboxItem key={item.id} href={`/movies/${item.id}`}>
                    <div className="flex items-center gap-2">
                      {item.posterUrl && (
                        <Image
                          src={item.posterUrl}
                          alt={item.title}
                          className="w-2/5 rounded-md"
                          width={100}
                          height={40}
                        />
                      )}
                      <p className="line-clamp-2 w-3/5 text-wrap">
                        {item.title}
                      </p>
                    </div>
                  </ListboxItem>
                )
              ) : (
                <ListboxItem key="loading">
                  <Spinner color="danger" size="sm" />
                </ListboxItem>
              )}
            </Listbox>
          )}
        </NavbarItem>
        {session.status === "authenticated" ? (
          <NavbarItem className="hidden lg:block">
            <Dropdown>
              <DropdownTrigger>
                <Avatar className="cursor-pointer" showFallback />
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key="admin"
                  href="/admin/movies"
                  className={cn({
                    hidden: !isAdmin,
                  })}
                >
                  Admin
                </DropdownItem>
                <DropdownItem key="reservations" href="/member/reservations">
                  My Reservations
                </DropdownItem>
                <DropdownItem key="profile" href="/member/profile">
                  Profile
                </DropdownItem>
                <DropdownItem key="signout" onPress={() => signOut()}>
                  Log Out
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
            <NavbarMenuItem key={`nav-${item.label}`}>
              <Link
                href={item.href}
                className={cn(
                  "font-medium text-default-700 hover:text-danger",
                  {
                    "font-bold text-danger": router.pathname === item.href,
                  },
                )}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
          {session.status === "authenticated" ? (
            <Fragment>
              <NavbarMenuItem
                className={cn({
                  hidden: !isAdmin,
                })}
              >
                <Link
                  href="/admin/movies"
                  className="font-medium text-default-700 hover:text-danger"
                >
                  Admin
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link
                  className="font-medium text-default-700 hover:text-danger"
                  href="/member/reservations"
                >
                  My Reservations
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link
                  className="font-medium text-default-700 hover:text-danger"
                  href="/member/profile"
                >
                  Profile
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Button
                  color="danger"
                  onPress={() => signOut()}
                  className="mt-2 w-full"
                  variant="bordered"
                  size="md"
                >
                  Log Out
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
                    size="md"
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
