import {
  MAX_PASSWORD,
  MAX_USERNAME,
  MIN_PASSWORD,
  MIN_USERNAME,
} from "@/lib/constants";
import { passwordRefine } from "@/lib/password-refine";
import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, {
    message: `Password is required`,
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  name: z
    .string()
    .min(MIN_USERNAME, {
      message: `Username must be ${MIN_USERNAME} or more characters long`,
    })
    .max(MAX_USERNAME, {
      message: `Username must be ${MAX_USERNAME} or fewer characters long`,
    }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(MIN_PASSWORD, {
      message: `Password must be ${MIN_PASSWORD} or more characters long`,
    })
    .max(MAX_PASSWORD, {
      message: `Password must be ${MAX_PASSWORD} or fewer characters long`,
    })
    .superRefine((password, ctx) => passwordRefine(password, ctx)),
});

export const ResetSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export const NewPasswordSchema = z.object({
  password: z
    .string()
    .min(MIN_PASSWORD, {
      message: `Password must be ${MIN_PASSWORD} or more characters long`,
    })
    .max(MAX_PASSWORD, {
      message: `Password must be ${MAX_PASSWORD} or fewer characters long`,
    })
    .superRefine((password, ctx) => passwordRefine(password, ctx)),
  confirmPassword: z
    .string()
    .min(MIN_PASSWORD, {
      message: `Password must be ${MIN_PASSWORD} or more characters long`,
    })
    .max(MAX_PASSWORD, {
      message: `Password must be ${MAX_PASSWORD} or fewer characters long`,
    })
    .superRefine((password, ctx) => passwordRefine(password, ctx)),
});
