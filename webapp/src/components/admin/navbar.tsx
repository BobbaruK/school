"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsChatSquareTextFill } from "react-icons/bs";
import { FaCog } from "react-icons/fa";
import { HiNewspaper } from "react-icons/hi2";
import { IoCalendarSharp } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import {
  PiChalkboardTeacherFill,
  PiCoinsFill,
  PiStudentFill,
} from "react-icons/pi";
import { SiGoogleclassroom } from "react-icons/si";
import { TbTableColumn } from "react-icons/tb";
import { MdOutlinePsychology } from "react-icons/md";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex w-full items-start justify-between rounded-none">
      <div className="flex w-full flex-col gap-y-2">
        <Button
          asChild
          variant={pathname === "/dashboard" ? "default" : "link"}
          className={cn(
            "flex h-auto w-full max-w-none items-center justify-start gap-2 text-lg text-foreground",
          )}
        >
          <Link href={"/dashboard"}>
            <MdSpaceDashboard /> Dashboard
          </Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/teachers" ? "default" : "link"}
          className={cn(
            "flex h-auto w-full max-w-none items-center justify-start gap-2 text-lg text-foreground",
          )}
        >
          <Link href={"/teachers"}>
            <PiChalkboardTeacherFill /> Teachers
          </Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/settings" ? "default" : "link"}
          className={cn(
            "flex h-auto w-full max-w-none items-center justify-start gap-2 text-lg text-foreground",
          )}
        >
          <Link href={"/settings"}>
            <PiStudentFill /> Students
          </Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/settings" ? "default" : "link"}
          className={cn(
            "flex h-auto w-full max-w-none items-center justify-start gap-2 text-lg text-foreground",
          )}
        >
          <Link href={"/settings"}>
            <SiGoogleclassroom /> Classroom
          </Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/settings" ? "default" : "link"}
          className={cn(
            "flex h-auto w-full max-w-none items-center justify-start gap-2 text-lg text-foreground",
          )}
        >
          <Link href={"/settings"}>
            <IoCalendarSharp /> Calendar
          </Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/settings" ? "default" : "link"}
          className={cn(
            "flex h-auto w-full max-w-none items-center justify-start gap-2 text-lg text-foreground",
          )}
        >
          <Link href={"/settings"}>
            <HiNewspaper /> Grades
          </Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/settings" ? "default" : "link"}
          className={cn(
            "flex h-auto w-full max-w-none items-center justify-start gap-2 text-lg text-foreground",
          )}
        >
          <Link href={"/settings"}>
            <BsChatSquareTextFill /> Chats
          </Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/settings" ? "default" : "link"}
          className={cn(
            "flex h-auto w-full max-w-none items-center justify-start gap-2 text-lg text-foreground",
          )}
        >
          <Link href={"/settings"}>
            <PiCoinsFill /> Rewards
          </Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/settings" ? "default" : "link"}
          className={cn(
            "flex h-auto w-full max-w-none items-center justify-start gap-2 text-lg text-foreground",
          )}
        >
          <Link href={"/settings"}>
            <TbTableColumn /> Curriculum setup
          </Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/settings" ? "default" : "link"}
          className={cn(
            "flex h-auto w-full max-w-none items-center justify-start gap-2 text-lg text-foreground",
          )}
        >
          <Link href={"/settings"}>
            <MdOutlinePsychology /> Psychological test
          </Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/settings" ? "default" : "link"}
          className={cn(
            "flex h-auto w-full max-w-none items-center justify-start gap-2 text-lg text-foreground",
          )}
        >
          <Link href={"/settings"}>
            <FaCog /> Settings
          </Link>
        </Button>
      </div>
    </nav>
  );
};
