import { EditTeacher } from "@/app/(admin)/teachers/edit-teacher";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { RiEdit2Line } from "react-icons/ri";

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
          className="flex h-auto items-center gap-2 bg-blue-300/30 px-2 py-1 text-blue-500 hover:text-primary-foreground"
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
