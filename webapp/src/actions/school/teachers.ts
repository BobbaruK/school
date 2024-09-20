"use server";

import { currentUser } from "@/lib/auth";
import { getUserById } from "@/lib/data";
import db from "@/lib/db";
import { TeacherSchema } from "@/lib/schemas";
import { z } from "zod";

export const addTeacher = async (values: z.infer<typeof TeacherSchema>) => {
  const user = await currentUser();

  const validatedFields = TeacherSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { firstName, lastName, email, subject, avatar, dateOfBirth } =
    validatedFields.data;

  if (!user || !user.id) {
    return { error: "Unauthorized!" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || user.role !== "ADMIN") return { error: "Unauthorized!" };

  const existingTeacher = await db.teacher.findUnique({
    where: {
      email,
    },
  });

  if (existingTeacher) return { error: "Teacher already exists!" };

  try {
    await db.teacher.create({
      data: {
        firstName,
        lastName,
        email,
        subject,
        avatar,
        dateOfBirth,
        numberOfClasses: Math.floor(Math.random() * 20) + 1,
        reviewScore: parseFloat((Math.random() * 5).toFixed(1)),
      },
    });

    return {
      success: "Teacher added!",
    };
  } catch (error) {
    return { error: "Could not add the teacher!" };
  }
};

export const editTeacher = async (
  values: z.infer<typeof TeacherSchema>,
  id: string,
) => {
  const user = await currentUser();

  const validatedFields = TeacherSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { firstName, lastName, email, avatar, dateOfBirth, subject } =
    validatedFields.data;

  if (!user || !user.id) {
    return { error: "Unauthorized!" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || user.role !== "ADMIN") return { error: "Unauthorized!" };

  const existingTeacher = await db.teacher.findUnique({
    where: {
      id,
    },
  });

  if (!existingTeacher) {
    return { error: "Teacher does not exist" };
  }

  try {
    await db.teacher.update({
      where: {
        id,
      },
      data: {
        firstName,
        lastName,
        email,
        subject,
        avatar: avatar || null,
        dateOfBirth: dateOfBirth || null,
        numberOfClasses: existingTeacher.numberOfClasses,
        reviewScore: existingTeacher.reviewScore,
      },
    });

    return {
      success: "Teacher updated!",
    };
  } catch (error) {
    return { error: "Could not update teacher!" };
  }
};

export const deleteTeacher = async (id: string) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: "Unauthorized!" };
  }

  const dbUser = await getUserById(user.id!);

  if (!dbUser || user.role !== "ADMIN") return { error: "Unauthorized!" };

  try {
    await db.teacher.delete({
      where: { id },
    });

    return {
      success: "Teacher deleted!",
    };
  } catch (error) {
    return { error: "Could not delete teacher!" };
  }
};

export const getTeacher = async (id: string) => {
  const teacher = await db.teacher.findUnique({
    where: { id },
  });

  return teacher;
};
