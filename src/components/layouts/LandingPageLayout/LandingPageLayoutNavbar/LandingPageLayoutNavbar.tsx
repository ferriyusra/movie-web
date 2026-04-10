import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
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
  Spinner,
} from "@heroui/react";
import Image from "next/image";
import { NAV_ITEMS } from "../LandingPageLayout.constants";
import { cn } from "@/utils/cn";
import { useRouter } from "next/router";
import {
  FaMagnifyingGlass,
  FaTicket,
  FaUser,
  FaGear,
  FaArrowRightFromBracket,
} from "react-icons/fa6";
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
    dataMoviesSearch,
    isLoadingMoviesSearch,
    isRefetchingMoviesSearch,
    handleSearch,
    search,
    setSearch,
  } = useLandingPageLayoutNavbar();

  return (
    <Navbar
      maxWidth="full"
      isBlurred
      shouldHideOnScroll
      classNames={{
        base: "bg-white/80 backdrop-blur-lg border-b border-default-100",
        wrapper: "px-4 sm:px-6",
      }}
    >
      {/* ── Left: Logo + Nav ── */}
      <NavbarContent className="gap-8">
        <NavbarBrand as={Link} href="/" className="shrink-0">
          <Image
            src="/images/general/logo.svg"
            alt="Cinema"
            width={90}
            height={45}
            className="cursor-pointer"
          />
        </NavbarBrand>
        <div className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <NavbarItem key={`nav-${item.label}`}>
              <Link
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium text-default-600 transition-colors hover:bg-default-100 hover:text-default-900",
                  {
                    "bg-danger-50 font-semibold text-danger-600":
                      router.pathname === item.href,
                  },
                )}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      {/* ── Right: Search + Auth ── */}
      <NavbarContent justify="end" className="gap-2">
        <NavbarMenuToggle className="lg:hidden" />

        {/* Search */}
        <NavbarItem className="hidden lg:relative lg:flex">
          <Input
            isClearable
            className="w-64"
            placeholder="Search movies..."
            size="sm"
            radius="lg"
            startContent={
              <FaMagnifyingGlass className="text-xs text-default-400" />
            }
            classNames={{
              inputWrapper:
                "bg-default-100 border-0 hover:bg-default-200/70 h-9",
              input: "text-sm",
            }}
            onClear={() => setSearch("")}
            onChange={handleSearch}
          />
          {search !== "" && (
            <div className="absolute right-0 top-11 z-50 w-80 overflow-hidden rounded-xl border border-default-200 bg-white shadow-lg">
              {isRefetchingMoviesSearch || isLoadingMoviesSearch ? (
                <div className="flex justify-center py-6">
                  <Spinner color="danger" size="sm" />
                </div>
              ) : (dataMoviesSearch?.data || []).length === 0 ? (
                <p className="py-6 text-center text-sm text-default-400">
                  No movies found
                </p>
              ) : (
                <div className="max-h-80 overflow-y-auto py-1">
                  {(dataMoviesSearch?.data || []).map((item: IMovie) => (
                    <Link
                      key={item.id}
                      href={`/movies/${item.id}`}
                      className="flex items-center gap-3 px-3 py-2 transition-colors hover:bg-default-100"
                    >
                      {item.posterUrl && (
                        <Image
                          src={item.posterUrl}
                          alt={item.title}
                          width={36}
                          height={54}
                          className="h-12 w-8 shrink-0 rounded object-cover"
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">
                          {item.title}
                        </p>
                        <p className="text-xs text-default-400">
                          {item.genres?.map((g) => g.name).join(", ")}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </NavbarItem>

        {/* Auth */}
        {session.status === "authenticated" ? (
          <NavbarItem className="hidden lg:block">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  size="sm"
                  className="cursor-pointer ring-2 ring-danger-500/20 transition-all hover:ring-danger-500/40"
                  showFallback
                  name={user?.name?.charAt(0).toUpperCase()}
                  classNames={{
                    base: "bg-danger-100 text-danger-600",
                  }}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="User menu" className="w-56">
                <DropdownSection showDivider>
                  <DropdownItem
                    key="user-info"
                    isReadOnly
                    className="opacity-100"
                    textValue="User info"
                  >
                    <p className="text-sm font-semibold">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-default-400">
                      {user?.email}
                    </p>
                  </DropdownItem>
                </DropdownSection>
                <DropdownSection showDivider>
                  <DropdownItem
                    key="reservations"
                    href="/member/reservations"
                    startContent={
                      <FaTicket className="text-default-400" />
                    }
                  >
                    My Reservations
                  </DropdownItem>
                  <DropdownItem
                    key="profile"
                    href="/member/profile"
                    startContent={
                      <FaUser className="text-default-400" />
                    }
                  >
                    Profile
                  </DropdownItem>
                  <DropdownItem
                    key="admin"
                    href="/admin/movies"
                    startContent={
                      <FaGear className="text-default-400" />
                    }
                    className={cn({ hidden: !isAdmin })}
                  >
                    Admin Dashboard
                  </DropdownItem>
                </DropdownSection>
                <DropdownSection>
                  <DropdownItem
                    key="signout"
                    onPress={() => signOut()}
                    startContent={
                      <FaArrowRightFromBracket className="text-danger-400" />
                    }
                    className="text-danger-500"
                    color="danger"
                  >
                    Log Out
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        ) : (
          <div className="hidden items-center gap-2 lg:flex">
            <NavbarItem>
              <Button
                as={Link}
                href="/auth/login"
                variant="light"
                size="sm"
                className="font-medium text-default-600"
              >
                Sign In
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                href="/auth/register"
                color="danger"
                size="sm"
                className="font-semibold"
              >
                Get Started
              </Button>
            </NavbarItem>
          </div>
        )}

        {/* ── Mobile menu ── */}
        <NavbarMenu className="gap-1 bg-white pt-6">
          <NavbarMenuItem className="mb-4">
            <Input
              isClearable
              fullWidth
              placeholder="Search movies..."
              size="lg"
              radius="lg"
              startContent={
                <FaMagnifyingGlass className="text-sm text-default-400" />
              }
              classNames={{
                inputWrapper: "bg-default-100 border-0",
              }}
              onClear={() => setSearch("")}
              onChange={handleSearch}
            />
          </NavbarMenuItem>

          {NAV_ITEMS.map((item) => (
            <NavbarMenuItem key={`nav-${item.label}`}>
              <Link
                href={item.href}
                className={cn(
                  "block rounded-lg px-3 py-3 text-base font-medium text-default-600 transition-colors hover:bg-default-100",
                  {
                    "bg-danger-50 font-semibold text-danger-600":
                      router.pathname === item.href,
                  },
                )}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}

          <div className="my-3 h-px bg-default-100" />

          {session.status === "authenticated" ? (
            <Fragment>
              <NavbarMenuItem className="mb-2 px-3">
                <p className="text-sm font-semibold">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-default-400">{user?.email}</p>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link
                  href="/member/reservations"
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium text-default-600 hover:bg-default-100"
                >
                  <FaTicket className="text-sm text-default-400" />
                  My Reservations
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link
                  href="/member/profile"
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium text-default-600 hover:bg-default-100"
                >
                  <FaUser className="text-sm text-default-400" />
                  Profile
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem className={cn({ hidden: !isAdmin })}>
                <Link
                  href="/admin/movies"
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium text-default-600 hover:bg-default-100"
                >
                  <FaGear className="text-sm text-default-400" />
                  Admin
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem className="mt-4 px-3">
                <Button
                  color="danger"
                  variant="flat"
                  onPress={() => signOut()}
                  fullWidth
                  startContent={<FaArrowRightFromBracket />}
                >
                  Log Out
                </Button>
              </NavbarMenuItem>
            </Fragment>
          ) : (
            <NavbarMenuItem className="mt-2 flex flex-col gap-2 px-3">
              <Button
                as={Link}
                href="/auth/login"
                variant="bordered"
                fullWidth
                className="font-medium"
              >
                Sign In
              </Button>
              <Button
                as={Link}
                href="/auth/register"
                color="danger"
                fullWidth
                className="font-semibold"
              >
                Get Started
              </Button>
            </NavbarMenuItem>
          )}
        </NavbarMenu>
      </NavbarContent>
    </Navbar>
  );
};

export default LandingPageLayoutNavbar;
