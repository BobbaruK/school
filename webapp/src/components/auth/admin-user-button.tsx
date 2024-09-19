"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useTheme } from "next-themes";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";
import { LogoutButton } from "./logout-button";
import Link from "next/link";
import { IoSettingsOutline } from "react-icons/io5";
import { LoginButton } from "./login-button";
import { IoIosLogIn } from "react-icons/io";
import { Button } from "../ui/button";
import { logout } from "@/actions";
import { MdOutlineLogout } from "react-icons/md";

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
      >
        <MdOutlineLogout />
      </Button>
    </div>
  );
};
