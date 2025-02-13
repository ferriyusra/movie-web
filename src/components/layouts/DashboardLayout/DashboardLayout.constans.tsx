import { CiWallet, CiViewList, CiShoppingTag, CiBookmark, CiUser } from "react-icons/ci"

const SIDEBAR_MEMBER = [
  {
    key: "transation",
    label: "Transaction",
    href: "/member/transaction",
    icon: <CiWallet />
  },
  {
    key: "profile",
    label: "Profile",
    href: "/member/profile",
    icon: <CiUser />
  },
]

const SIDEBAR_ADMIN = [
  {
    key: "event",
    label: "Event",
    href: "/admin/event",
    icon: <CiViewList />
  },
  {
    key: "category",
    label: "Category",
    href: "/admin/category",
    icon: <CiShoppingTag />
  },
  {
    key: "banner",
    label: "Banner",
    href: "/admin/banner",
    icon: <CiBookmark />
  },
  {
    key: "transation",
    label: "Transaction",
    href: "/admin/transaction",
    icon: <CiWallet />
  },
]

export {
  SIDEBAR_ADMIN,
  SIDEBAR_MEMBER
}