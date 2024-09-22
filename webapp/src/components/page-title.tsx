"use client";

import { SidebarMenu } from "@/components/sidebar-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { TbMenu2 } from "react-icons/tb";
import { useMediaQuery } from "usehooks-ts";

interface Props {
  label: string;
}

export const PageTtle = ({ label }: Props) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const matches = useMediaQuery("(min-width: 1440px)");

  useEffect(() => {
    setIsMobile(matches ? false : true);

    return () => {};
  }, [setIsMobile, matches]);

  // if (isMobile) return null;

  return (
    <div className="flex items-center justify-between gap-4">
      <h1 className="text-3xl font-medium">{label}</h1>

      {isMobile && (
        <Sheet>
          <SheetTrigger asChild className="cursor-pointer">
            <TbMenu2 size={40} />
          </SheetTrigger>
          <SheetContent side={"left"} className="max-w-[280px] p-0">
            <SheetHeader className="hidden">
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
            <SidebarMenu />
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
};
