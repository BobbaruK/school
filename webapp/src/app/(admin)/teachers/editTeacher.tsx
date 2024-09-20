"use client";

import { revalidate } from "@/actions/reavalidate";
import {
  deleteTeacher,
  editTeacher,
  getTeacher,
} from "@/actions/school/teachers";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-success";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

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
import { AddTeacherSchema } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Teacher } from "@prisma/client";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { DeleteDialog } from "@/components/delete-dialog";
import { z } from "zod";
import { toast } from "sonner";

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

  const form = useForm<z.infer<typeof AddTeacherSchema>>({
    resolver: zodResolver(AddTeacherSchema),
    defaultValues: {
      firstName: data?.firstName || undefined,
      lastName: data?.lastName || undefined,
      email: data?.email || undefined,
      avatar: data?.avatar || undefined,
      subject: data?.subject || undefined,
    },
  });

  useEffect(() => {
    const getTheTeacher = async () => {
      try {
        const res = await getTeacher(teacherId);

        setData(res);

        form.setValue("firstName", res?.firstName!);
        form.setValue("lastName", res?.lastName!);
        form.setValue("email", res?.email!);
        form.setValue("avatar", res?.avatar!);
        form.setValue("subject", res?.subject!);
        form.setValue("dateOfBirth", res?.dateOfBirth!);
      } catch {
        setError("Something went wrong!");
      }
    };

    getTheTeacher();
    return () => {};
  }, [teacherId, setData]);

  const onSubmit = (values: z.infer<typeof AddTeacherSchema>) => {
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
        // toast.error(
        //   <div className="">
        //     Could not delete teacher
        //     <code>
        //       {data?.firstName} {data?.lastName}
        //     </code>
        //     .
        //   </div>,
        // );
        toast.error('dksalpdsk;')
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
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
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
