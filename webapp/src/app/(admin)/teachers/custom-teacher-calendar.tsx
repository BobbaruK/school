"use client";

import { Button } from "@/components/ui/button";
import { Calendar, CalendarProps } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { CaptionProps, useNavigation } from "react-day-picker";

const fromYear = 1940;
const toYear = 2024;

type Props = {
  selectedDate: Date | undefined;
  onChange: (event: Date | undefined) => void;
} & CalendarProps;

export const CustomTeacherCalendar = ({
  selectedDate,
  onChange,
  ...restProps
}: Props) => {
  return (
    <Calendar
      {...restProps}
      mode="single"
      selected={selectedDate}
      // month={date}
      onSelect={(e) => {
        onChange(e);
      }}
      components={{
        Caption: CustomCaptionComponent,
      }}
      weekStartsOn={1}
      fromYear={fromYear}
      toYear={toYear}
    />
  );
};

function CustomCaptionComponent(props: CaptionProps) {
  const { goToMonth, nextMonth, previousMonth, currentMonth, goToDate } =
    useNavigation();

  const today = new Date();
  const longMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  // const shortMonths = [
  //   "Jan",
  //   "Feb",
  //   "Mar",
  //   "Apr",
  //   "May",
  //   "Jun",
  //   "Jul",
  //   "Aug",
  //   "Sep",
  //   "Oct",
  //   "Nov",
  //   "Dec",
  // ];

  const years: number[] = [];
  for (let i = fromYear; i <= toYear; i++) {
    years.push(i);
  }

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <Button
          size={"icon"}
          disabled={!previousMonth}
          onClick={() => previousMonth && goToMonth(previousMonth)}
          className="w-full grow"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        {toYear >= today.getFullYear() && (
          <Button
            size={"icon"}
            className="w-full grow"
            onClick={() => goToDate(today)}
          >
            Today
          </Button>
        )}
        <Button
          size={"icon"}
          className="w-full grow"
          disabled={!nextMonth}
          onClick={() => nextMonth && goToMonth(nextMonth)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center justify-between gap-4">
        <Select
          onValueChange={(e) =>
            goToDate(
              new Date(`${currentMonth.getFullYear()} ${parseInt(e) + 1}`),
            )
          }
          value={`${currentMonth.getMonth()}`}
        >
          <SelectTrigger className="">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent>
            {longMonths.map((leMonth, index) => (
              <SelectItem key={index} value={`${index}`}>
                {leMonth}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          onValueChange={(e) =>
            goToDate(new Date(`${parseInt(e)} ${currentMonth.getMonth() + 1}`))
          }
          value={`${currentMonth.getFullYear()}`}
        >
          <SelectTrigger className="">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((leYear) => (
              <SelectItem key={leYear} value={`${leYear}`}>
                {leYear}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
