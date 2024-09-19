"use client";

import { reset } from "@/actions";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-success";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ResetSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { FaKey } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export const ResetForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [emailSent, setEmailSent] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      reset(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);

        if (data.success) {
          setEmailSent(values.email);
        }
      });
    });
  };
  return (
    <>
      {!emailSent ? (
        <div className="flex w-full max-w-[400px] flex-col items-stretch justify-center gap-4">
          <div className="flex w-full flex-col items-center justify-center gap-y-4">
            <h1 className="flex items-center gap-4 text-2xl font-semibold text-foreground drop-shadow-md">
              <FaKey />
              Forgot password?
            </h1>
            <p className="text-sm text-muted-foreground">
              No worries, we&apos;ll send you reset instructions.
            </p>
          </div>
          <div className="flex flex-col items-stretch justify-center gap-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="john.doe@example.com"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormError message={error} />
                <FormSuccess message={success} />
                <Button type="submit" className="w-full" disabled={isPending}>
                  Send reset email
                </Button>
              </form>
            </Form>{" "}
          </div>
        </div>
      ) : (
        <div className="flex w-full max-w-[400px] flex-col items-stretch justify-center gap-4">
          <div className="flex w-full flex-col items-center justify-center gap-y-4">
            <h1 className="flex items-center gap-4 text-2xl font-semibold text-foreground drop-shadow-md">
              <MdEmail />
              Check your email
            </h1>
            <p className="max-w-[30ch] text-center text-sm text-muted-foreground">
              We sent a password reset link to {emailSent}
            </p>
          </div>
        </div>
      )}
    </>
  );
};
