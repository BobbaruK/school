import { Navbar } from "@/components/admin/navbar";
import { AdminUserButton } from "@/components/auth/admin-user-button";
import { SidebarMenu } from "@/components/sidebar-menu";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  return (
    <>
      <div className="grid min-h-dvh grid-cols-1 custom-desktop:grid-cols-admin-layout-desktop">
        <div className="hidden custom-desktop:block">
          <SidebarMenu />
        </div>
        <main>{children}</main>
      </div>
    </>
  );
};

export default AdminLayout;
