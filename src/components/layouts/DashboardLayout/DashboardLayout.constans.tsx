import {
  CiWallet,
  CiViewList,
  CiShoppingTag,
  CiUser,
  CiGrid41,
  CiCalendar,
  CiBoxes,
} from "react-icons/ci";

const SIDEBAR_MEMBER = [
  {
    key: "reservations",
    label: "Reservations",
    href: "/member/reservations",
    icon: <CiWallet />,
  },
  {
    key: "profile",
    label: "Profile",
    href: "/member/profile",
    icon: <CiUser />,
  },
];

const SIDEBAR_ADMIN = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: <CiGrid41 />,
  },
  {
    key: "movies",
    label: "Movies",
    href: "/admin/movies",
    icon: <CiViewList />,
  },
  {
    key: "genres",
    label: "Genres",
    href: "/admin/genres",
    icon: <CiShoppingTag />,
  },
  {
    key: "theaters",
    label: "Theaters",
    href: "/admin/theaters",
    icon: <CiBoxes />,
  },
  {
    key: "showtimes",
    label: "Showtimes",
    href: "/admin/showtimes",
    icon: <CiCalendar />,
  },
  {
    key: "reservations",
    label: "Reservations",
    href: "/admin/reservations",
    icon: <CiWallet />,
  },
  {
    key: "users",
    label: "Users",
    href: "/admin/users",
    icon: <CiUser />,
  },
];

export { SIDEBAR_ADMIN, SIDEBAR_MEMBER };
