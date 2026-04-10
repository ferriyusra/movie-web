import PageHead from "@/components/commons/PageHead";
import { Fragment, ReactNode, useState } from "react";
import DashboardLayoutSidebar from "./DashboardLayoutSidebar";
import { SIDEBAR_ADMIN, SIDEBAR_MEMBER } from "./DashboardLayout.constans";
import { NavbarMenuToggle } from "@heroui/react";

interface PropTypes {
  children: ReactNode;
  title?: string;
  type: string;
  description?: string;
}

const DashboardLayout = (props: PropTypes) => {
  const { children, description, title, type = "admin" } = props;
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <PageHead title={title} />
      <div className="flex min-h-screen bg-default-50">
        <DashboardLayoutSidebar
          sidebarItems={type === "admin" ? SIDEBAR_ADMIN : SIDEBAR_MEMBER}
          isOpen={open}
        />
        <div className="flex-1 overflow-y-auto">
          <header className="sticky top-0 z-40 flex items-center justify-between border-b border-default-100 bg-white/80 px-6 py-4 backdrop-blur-lg lg:px-8">
            <div>
              <h1 className="text-lg font-bold text-default-900">{title}</h1>
              {description && (
                <p className="text-xs text-default-400">{description}</p>
              )}
            </div>
            <NavbarMenuToggle
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen(!open)}
              className="lg:hidden"
            />
          </header>
          <main className="px-6 py-6 lg:px-8">{children}</main>
        </div>
      </div>
    </Fragment>
  );
};

export default DashboardLayout;
