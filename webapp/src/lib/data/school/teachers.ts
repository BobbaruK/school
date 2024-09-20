"use server";

import db from "@/lib/db";

export const getTeacher = async (id: string) => {
  const teacher = await db.teacher.findUnique({
    where: { id },
  });

  return teacher;
};

export const getTeachers = async () => {
  const teacher = await db.teacher.findMany();

  return teacher;
};
