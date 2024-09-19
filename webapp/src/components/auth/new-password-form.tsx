"use client";

import { newPassword } from "@/actions";
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
import { NewPasswordSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { FaKey } from "react-icons/fa";
import z from "zod";

interface Props {
  searchParamToken: string;
}

export const NewPasswordForm = ({ searchParamToken }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      newPassword(values, searchParamToken).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };
  return (
    <div className="flex w-full max-w-[400px] flex-col items-stretch justify-center gap-4">
      <div className="flex w-full flex-col items-center justify-center gap-y-4">
        <h1 className="flex items-center gap-4 text-2xl font-semibold text-foreground drop-shadow-md">
          <FaKey />
          Set new password
        </h1>
        <p className="max-w-[30ch] text-center text-sm text-muted-foreground">
          Your new password must be different to previously used passwords.
        </p>
      </div>
      <div className="flex flex-col items-stretch justify-center gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="******"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Re-enter your password"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormDescription>
                      Password must contain at least one of each: lowercase
                      letters, uppercase letters, numbers and special characters
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button type="submit" className="w-full" disabled={isPending}>
              Reset password
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
