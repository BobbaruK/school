"use client";

import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserButton } from "./auth/user-button";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex w-full items-center justify-between rounded-xl bg-secondary p-4 shadow-sm">
      <div className="flex gap-x-2">
        <Button
          asChild
          variant={pathname === "/server-test" ? "default" : "outline"}
        >
          <Link href={"/server-test"}>Server</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/client-test" ? "default" : "outline"}
        >
          <Link href={"/client-test"}>Client</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/admin-test" ? "default" : "outline"}
        >
          <Link href={"/admin-test"}>Admin</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/settings" ? "default" : "outline"}
        >
          <Link href={"/settings"}>Settings</Link>
        </Button>
      </div>
      <UserButton />
    </nav>
  );
};
