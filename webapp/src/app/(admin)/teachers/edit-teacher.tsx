"use client";

import { revalidate } from "@/actions/reavalidate";
import { deleteTeacher, editTeacher } from "@/actions/school";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-success";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { teacherSubjects } from "@/lib/constants/teacher-subjects";
import { TeacherSchema } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Teacher } from "@prisma/client";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { DeleteDialog } from "@/components/delete-dialog";
import { getTeacher } from "@/lib/data/school";
import { toast } from "sonner";
import { z } from "zod";
import { CustomTeacherCalendar } from "./custom-teacher-calendar";

interface Props {
  teacherId: string;
  closeSheet: () => void;
}

export const EditTeacher = ({ teacherId, closeSheet }: Props) => {
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<Teacher | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof TeacherSchema>>({
    resolver: zodResolver(TeacherSchema),
    defaultValues: {
      firstName: data?.firstName || undefined,
      lastName: data?.lastName || undefined,
      email: data?.email || undefined,
      avatar: data?.avatar || undefined,
      dateOfBirth: data?.dateOfBirth || undefined,
      subject: data?.subject || undefined,
    },
  });

  useEffect(() => {
    const getTheTeacher = async () => {
      try {
        const teacher = await getTeacher(teacherId);

        setData(teacher);

        form.setValue("firstName", teacher?.firstName || "");
        form.setValue("lastName", teacher?.lastName || "");
        form.setValue("email", teacher?.email || "");
        form.setValue("avatar", teacher?.avatar || "");
        form.setValue("subject", teacher?.subject || "English");
        form.setValue("dateOfBirth", teacher?.dateOfBirth || undefined);
      } catch {
        setError("Something went wrong!");
      }
    };

    getTheTeacher();
    return () => {};
  }, [teacherId, setData, form]);

  const onSubmit = (values: z.infer<typeof TeacherSchema>) => {
    setSuccess(undefined);
    setError(undefined);

    startTransition(() => {
      editTeacher(values, teacherId)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            setSuccess(data.success);
            setTimeout(closeSheet, 700);
          }
          revalidate();
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  const onDelete = () => {
    closeSheet();
    deleteTeacher(teacherId).then((leData) => {
      if (leData.error) {
        toast.error(
          <div>
            Could not delete teacher
            <code>
              {data?.firstName} {data?.lastName}
            </code>
          </div>,
        );
      }
      if (leData.success) {
        toast.success(
          <div>
            Teacher{" "}
            <code>
              {data?.firstName} {data?.lastName}
            </code>{" "}
            deleted!
          </div>,
        );
      }
      revalidate();
    });
  };

  if (data)
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex grow flex-col gap-6"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your first name here"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your last name here"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your email here"
                      type="email"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar URL</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Link to the avatar picture"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CustomTeacherCalendar
                        selectedDate={field.value}
                        onChange={(e) => form.setValue("dateOfBirth", e)}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Your date of birth is used to calculate your age.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select subject</FormLabel>
                  <Select
                    disabled={isPending}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Please select subject" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {teacherSubjects().map((subject) => (
                        <SelectItem value={subject} key={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormSuccess message={success} />
            <FormError message={error} />
          </div>
          <div className="mt-auto flex gap-4">
            <DeleteDialog
              label={data.firstName + " " + data.lastName}
              asset={"teacher"}
              onDelete={onDelete}
              open={isDialogOpen}
              onOpenChange={setIsDialogOpen}
              // showTrigger={false}
              disabled={isPending}
            />
            <Button
              type="submit"
              className="w-full grow"
              size={"lg"}
              disabled={isPending}
            >
              Update
            </Button>
          </div>
        </form>
      </Form>
    );

  return <p>Loading...</p>;
};
