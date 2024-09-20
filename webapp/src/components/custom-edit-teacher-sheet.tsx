import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";
import { RiEdit2Line } from "react-icons/ri";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { EditTeacher } from "@/app/(admin)/teachers/editTeacher";

interface Props {
  id: string;
}

export const CustomEditTeacherSheet = ({ id }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant={"default"}
          size={"sm"}
          className="flex h-auto items-center gap-2 px-2 py-1"
        >
          <RiEdit2Line /> Edit
        </Button>
      </SheetTrigger>
      <SheetContent
        className={cn("flex min-w-[483px] max-w-none flex-col p-8")}
      >
        <SheetHeader className="mb-12">
          <SheetTitle className="text-[20px] font-medium">
            Edit Teacher
          </SheetTitle>
        </SheetHeader>
        <EditTeacher teacherId={id} closeSheet={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
};
