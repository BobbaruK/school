"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
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

  const isActive = (path: string | null) => {
    if (path && pathname.startsWith(path)) return true;
    return false;
  };

  const menuButtons: {
    id: number;
    path: string;
    label: string;
    icon: ReactNode;
  }[] = [
    {
      id: 1,
      path: "/dashboard",
      label: "Dashboard",
      icon: <MdSpaceDashboard size={25} />,
    },
    {
      id: 2,
      path: "/teachers",
      label: "Teachers",
      icon: <PiChalkboardTeacherFill size={25} />,
    },
    {
      id: 3,
      path: "",
      label: "Students",
      icon: <PiStudentFill size={25} />,
    },
    {
      id: 4,
      path: "",
      label: "Classroom",
      icon: <SiGoogleclassroom size={25} />,
    },
    {
      id: 5,
      path: "",
      label: "Calendar",
      icon: <IoCalendarSharp size={25} />,
    },
    {
      id: 6,
      path: "",
      label: "Grades",
      icon: <HiNewspaper size={25} />,
    },
    {
      id: 7,
      path: "",
      label: "Chats",
      icon: <BsChatSquareTextFill size={25} />,
    },
    {
      id: 8,
      path: "",
      label: "Rewards",
      icon: <PiCoinsFill size={25} />,
    },
    {
      id: 9,
      path: "",
      label: "Curriculum setup",
      icon: <TbTableColumn size={25} />,
    },
    {
      id: 10,
      path: "",
      label: "Psychological test",
      icon: <RiPsychotherapyFill size={25} />,
    },
    {
      id: 11,
      path: "/settings",
      label: "Settings",
      icon: <FaCog size={25} />,
    },
  ];

  return (
    <nav className="flex w-full items-start justify-between rounded-none">
      <div className="flex w-full flex-col gap-y-2">
        {menuButtons.map((button) => (
          <Button
            key={button.id}
            asChild
            variant={isActive(button.path) ? "default" : "link"}
            className={cn(
              `flex h-auto w-full max-w-none items-center justify-start gap-2 text-lg text-stone-500 ${button.path ? (isActive(button.path) ? "bg-primary/30 text-primary hover:text-primary-foreground" : "hover:bg-primary hover:text-primary-foreground") : ""}`,
            )}
          >
            <Link href={button.path}>
              {button.icon} {button.label}
            </Link>
          </Button>
        ))}
      </div>
    </nav>
  );
};
