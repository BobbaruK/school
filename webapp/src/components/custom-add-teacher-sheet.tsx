"use client";

import { AddTeacher } from "@/app/(admin)/teachers/addTeacher";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const CustomAddTeacherSheet = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant={"default"} className="flex items-center gap-2">
          <AiOutlinePlus size={20} />
          Add Teacher
        </Button>
      </SheetTrigger>
      <SheetContent
        className={cn("flex min-w-[483px] max-w-none flex-col p-8")}
      >
        <SheetHeader className="mb-12">
          <SheetTitle className="text-[20px] font-medium">
            Add Teacher
          </SheetTitle>
        </SheetHeader>
        <AddTeacher closeSheet={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
};
