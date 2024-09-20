import { Subject } from "@prisma/client";

export const teacherSubjects = () => {
  const VALUES = [
    Subject.Arabic,
    Subject.English,
    Subject.Geography,
    Subject.History,
    Subject.Mathematics,
  ] as const;

  return VALUES;
};
