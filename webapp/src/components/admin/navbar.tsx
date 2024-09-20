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
import { RiPsychotherapyFill } from "react-icons/ri";
import { SiGoogleclassroom } from "react-icons/si";
import { TbTableColumn } from "react-icons/tb";

export const Navbar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="flex w-full items-start justify-between rounded-none">
      <div className="flex w-full flex-col gap-y-2">
        <Button
          asChild
          variant={isActive("/dashboard") ? "default" : "link"}
          className={cn(
            `flex h-auto w-full max-w-none items-center justify-start gap-2 text-lg text-stone-500 ${isActive("/dashboard") ? "bg-primary/30 text-primary hover:text-primary-foreground" : "hover:bg-primary hover:text-primary-foreground"}`,
          )}
        >
          <Link href={"/dashboard"}>
            <MdSpaceDashboard size={25} /> Dashboard
          </Link>
        </Button>
        <Button
          asChild
          variant={isActive("/teachers") ? "default" : "link"}
          className={cn(
            `flex h-auto w-full max-w-none items-center justify-start gap-2 text-lg text-stone-500 ${isActive("/teachers") ? "bg-primary/10 text-primary hover:text-primary-foreground" : "hover:bg-primary hover:text-primary-foreground"}`,
          )}
        >
          <Link href={"/teachers"} className={``}>
            <PiChalkboardTeacherFill size={25} /> Teachers
          </Link>
        </Button>
        <Button
          asChild
          variant={isActive("/settings") ? "default" : "link"}
          className={cn(
            `flex h-auto w-full max-w-none items-center justify-start gap-2 text-lg text-stone-500 ${isActive("/settings") ? "bg-primary/20" : "hover:bg-primary hover:text-primary-foreground"}`,
          )}
        >
          <Link href={"/settings"}>
            <PiStudentFill size={25} /> Students
          </Link>
        </Button>
        <Button
          asChild
          variant={isActive("/settings") ? "default" : "link"}
          className={cn(
            "flex h-auto w-full max-w-none items-center justify-start gap-2 text-lg text-stone-500",
          )}
        >
          <Link href={"/settings"}>
            <SiGoogleclassroom size={25} /> Classroom
          </Link>
        </Button>
        <Button
          asChild
          variant={isActive("/settings") ? "default" : "link"}
          className={cn(
            "flex h-auto w-full max-w-none items-center justify-start gap-2 text-lg text-stone-500",
          )}
        >
          <Link href={"/settings"}>
            <IoCalendarSharp size={25} /> Calendar
          </Link>
        </Button>
        <Button
          asChild
          variant={isActive("/settings") ? "default" : "link"}
          className={cn(
            "flex h-auto w-full max-w-none items-center justify-start gap-2 text-lg text-stone-500",
          )}
        >
          <Link href={"/settings"}>
            <HiNewspaper size={25} /> Grades
          </Link>
        </Button>
        <Button
          asChild
          variant={isActive("/settings") ? "default" : "link"}
          className={cn(
            "flex h-auto w-full max-w-none items-center justify-start gap-2 text-lg text-stone-500",
          )}
        >
          <Link href={"/settings"}>
            <BsChatSquareTextFill size={25} /> Chats
          </Link>
        </Button>
        <Button
          asChild
          variant={isActive("/settings") ? "default" : "link"}
          className={cn(
            "flex h-auto w-full max-w-none items-center justify-start gap-2 text-lg text-stone-500",
          )}
        >
          <Link href={"/settings"}>
            <PiCoinsFill size={25} /> Rewards
          </Link>
        </Button>
        <Button
          asChild
          variant={isActive("/settings") ? "default" : "link"}
          className={cn(
            "flex h-auto w-full max-w-none items-center justify-start gap-2 text-lg text-stone-500",
          )}
        >
          <Link href={"/settings"}>
            <TbTableColumn size={25} /> Curriculum setup
          </Link>
        </Button>
        <Button
          asChild
          variant={isActive("/settings") ? "default" : "link"}
          className={cn(
            "flex h-auto w-full max-w-none items-center justify-start gap-2 text-lg text-stone-500",
          )}
        >
          <Link href={"/settings"}>
            <RiPsychotherapyFill size={25} /> Psychological test
          </Link>
        </Button>
        <Button
          asChild
          variant={isActive("/settings") ? "default" : "link"}
          className={cn(
            "flex h-auto w-full max-w-none items-center justify-start gap-2 text-lg text-stone-500",
          )}
        >
          <Link href={"/settings"}>
            <FaCog size={25} /> Settings
          </Link>
        </Button>
      </div>
    </nav>
  );
};
