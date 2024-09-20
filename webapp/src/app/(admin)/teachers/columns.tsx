"use client";

import { CustomAvatar } from "@/components/custom-avatar";
import { CustomEditTeacherSheet } from "@/components/custom-edit-teacher-sheet";
import { SortingArrows } from "@/components/sorting-arrows";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Teacher } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";

export const columns: ColumnDef<Teacher>[] = [
  // Name
  {
    id: "name",
    accessorKey: "name",
    accessorFn: (originalRow) => originalRow.firstName.toLowerCase(),
    enableHiding: false,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex gap-2 shadow-none"
          onClick={() => column.toggleSorting()}
        >
          Name
          <SortingArrows sort={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-4">
          <CustomAvatar image={row.original.avatar} />
          <div className="flex flex-col gap-[2px]">
            <p className="text-[14px] font-medium">
              {row.original.firstName} {row.original.lastName}
            </p>
            <p className="flex items-center gap-2">
              ID:
              <span className="max-w-[10ch] overflow-hidden truncate">
                {row.original.id}
              </span>
            </p>
          </div>
        </div>
      );
    },
  },
  // Email
  {
    id: "email",
    accessorKey: "email",
    accessorFn: (originalRow) => originalRow.email,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex gap-2"
          onClick={() => column.toggleSorting()}
        >
          Email
          <SortingArrows sort={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <Button asChild variant={"link"} className="text-foreground">
          <Link href={`mailto:${row.original.email}`}>
            {row.original.email}
          </Link>
        </Button>
      );
    },
  },
  // Subject
  {
    id: "subject",
    accessorKey: "subject",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex gap-2"
          onClick={() => column.toggleSorting()}
        >
          Subject
          <SortingArrows sort={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      return row.original.subject;
    },
  },
  // Number of classes
  {
    id: "numberOfClasses",
    accessorKey: "numberOfClasses",
    accessorFn: (originalRow) => originalRow.numberOfClasses,
    sortingFn: "alphanumeric",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex gap-2"
          onClick={() => column.toggleSorting()}
        >
          Number of classes
          <SortingArrows sort={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const output =
        row.original.numberOfClasses < 10
          ? `0${row.original.numberOfClasses}`
          : row.original.numberOfClasses;

      return output;
    },
  },
  // Review Score
  {
    id: "reviewScore",
    accessorKey: "reviewScore",
    accessorFn: (originalRow) => originalRow.reviewScore,
    sortingFn: "alphanumeric",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex gap-2"
          onClick={() => column.toggleSorting()}
        >
          Review Score
          <SortingArrows sort={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <Badge
          variant="secondary"
          className="inline-flex min-w-[85px] items-center justify-between gap-2 px-2 py-1 text-[14px]"
        >
          <FaStar size={15} className="text-yellow-400" />{" "}
          {row.original.reviewScore} / 5
        </Badge>
      );
    },
  },
  // Actions
  {
    id: "actions",
    accessorKey: "actions",
    enableHiding: false,
    header: () => {
      return (
        <div className="grid w-full place-items-center">
          <Button variant="ghost" className="flex gap-2">
            Action
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex w-full items-center justify-center gap-4">
          <CustomEditTeacherSheet id={row.original.id} />

          <Button
            variant={"default"}
            size={"sm"}
            className="flex h-auto items-center gap-2 bg-green-400/20 px-2 py-1 text-green-500 hover:text-primary-foreground"
          >
            <FaRegEye /> View
          </Button>
        </div>
      );
    },
  },
];
