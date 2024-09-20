import { MAX_USERNAME, MIN_USERNAME } from "@/lib/constants";
import { teacherSubjects } from "@/lib/constants/teacher-subjects";
import { z } from "zod";

export const TeacherSchema = z.object({
  firstName: z
    .string()
    .min(MIN_USERNAME, {
      message: `First Name must be ${MIN_USERNAME} or more characters long`,
    })
    .max(MAX_USERNAME, {
      message: `First Name must be ${MAX_USERNAME} or fewer characters long`,
    }),
  lastName: z
    .string()
    .min(MIN_USERNAME, {
      message: `Last Name must be ${MIN_USERNAME} or more characters long`,
    })
    .max(MAX_USERNAME, {
      message: `Last Name must be ${MAX_USERNAME} or fewer characters long`,
    }),
  email: z.string().email({ message: "Invalid email address" }),
  avatar: z
    .union([
      z.string().length(0),
      z.string().startsWith("https://", { message: "Must provide secure URL" }),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),

  // z.optional(
  //   z.string().startsWith("https://", { message: "Must provide secure URL" }),
  // ),
  dateOfBirth: z
    .date({
      // required_error: "Please select a date and time",
      invalid_type_error: "That's not a date!",
    })
    .optional(),
  subject: z.enum(teacherSubjects()),
});
