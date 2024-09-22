"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A multiple bar chart";

interface Props {
  attendanceChartData: {
    month: string;
    present: number;
    absent: number;
  }[];
}

export function AttendanceChart({ attendanceChartData }: Props) {
  const chartConfig = {
    present: {
      label: "Present",
      color: "hsl(var(--primary))",
    },
    absent: {
      label: "Absent",
      color: "#FFC42B",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer
      config={chartConfig}
      className="h-[280px] w-full lg:h-[400px] custom-desktop:h-[280px]"
    >
      <BarChart accessibilityLayer data={attendanceChartData}>
        <CartesianGrid vertical={false} strokeDasharray="7 7" />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          // axisLine={{ stroke: "red", strokeWidth: 2 }}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
          type="number"
          ticks={[0, 25, 50, 75, 100]}
          axisLine={false}
          tickLine={false}
          width={25}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Bar
          dataKey="present"
          fill="var(--color-present)"
          radius={4}
          barSize={24}
        />
        <Bar
          dataKey="absent"
          fill="var(--color-absent)"
          radius={4}
          barSize={24}
        />
      </BarChart>
    </ChartContainer>
  );
}
