"use client";

import { logout } from "@/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useTheme } from "next-themes";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { Button } from "../ui/button";

export const AdminUserButton = () => {
  const user = useCurrentUser();

  const { setTheme, theme } = useTheme();
  const [theTheme, setTheTheme] = useState(theme);

  return (
    <div className="flex w-full items-center gap-2 border-t border-secondary pt-5">
      <Avatar>
        <AvatarImage src={user?.image || ""} />
        <AvatarFallback className="bg-foreground text-background">
          <FaUser />
        </AvatarFallback>
      </Avatar>
      <div className="text-sm">
        <p className="text-[16px] font-medium">{user?.name}</p>
        <p className="text-[12px]">{user?.email}</p>
      </div>
      <Button
        onClick={() => {
          logout();
        }}
        size={"icon"}
        variant={"ghost"}
        className="ms-auto"
      >
        <MdOutlineLogout />
      </Button>
    </div>
  );
};
