"use client";

import { login } from "@/actions";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-success";
import { Social } from "@/components/auth/social";
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
import { LoginSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { PiLockKeyFill } from "react-icons/pi";
import z from "zod";

interface Props {
  searchParamError?: string;
  callbackUrl?: string;
}

export const LoginForm = ({ searchParamError, callbackUrl }: Props) => {
  const urlError =
    searchParamError === "OAuthAccountNotLinked"
      ? "Email already in use with different provider"
      : "";

  const [isPending, startTransition] = useTransition();
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: process.env.NEXT_PUBLIC_DEFAULT_REGISTER_PASSWORD || "",
      code: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          console.log(data);
          // setError(data?.error);
          // setSuccess(data?.success);

          if (data?.error) {
            form.reset();
            setError((prev) => (prev = data.error));
          }

          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }

          // if succesfuly log in data is undefined
          if (!data) {
            /**
             * This is a workaround.
             *
             * For some reason when I login or logout from a server function
             * the SessionProvider is not updating. Works fine if I logout or
             * login from client function like: signOut from "next-auth/react".
             *
             * Hopefully auth.js will get out of beta soon(today is 3th of Sept 2024).
             *
             */
            // TODO: check out auth js for further documentation
            setTimeout(() => location.reload(), 300);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };
  return (
    <>
      {/* <CardWrapper
        headerLabel={"Welcome back! Please enter your details."}
        backButtonLabel={"Don't have an account?"}
        backButtonHref={"/auth/register/"}
        showSocial
        // icon={<PiLockKeyFill />}
        // headerTitle={"Log in to your account"}
      >
        <></>
      </CardWrapper> */}

      <div className="flex w-full max-w-[400px] flex-col items-stretch justify-center gap-4">
        <div className="flex w-full flex-col items-center justify-center gap-y-4">
          <h1 className="flex items-center gap-4 text-2xl font-semibold text-foreground drop-shadow-md">
            <PiLockKeyFill />
            Log in to your account
          </h1>
          <p className="text-sm text-muted-foreground">
            Welcome back! Please enter your details.
          </p>
        </div>
        <div className="flex flex-col items-stretch justify-center gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                {showTwoFactor && (
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Two Factor Code</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="123456"
                            disabled={isPending}
                            type="text"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {!showTwoFactor && (
                  <>
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
                          <Button
                            size={"sm"}
                            variant={"link"}
                            asChild
                            className="px-0 font-normal text-foreground"
                          >
                            <Link href={"/auth/reset"}>Forgot password?</Link>
                          </Button>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </div>
              <FormError message={error || urlError} />
              <FormSuccess message={success} />
              <Button type="submit" className="w-full" disabled={isPending}>
                {showTwoFactor ? "Confirm" : "Login"}
              </Button>
            </form>
          </Form>
          <Social />
        </div>
      </div>
    </>
  );
};
