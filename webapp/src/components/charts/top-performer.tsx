"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A bar chart";

interface Props {
  topPerformanceChartData: {
    id: number;
    class: string;
    performance: number;
  }[];
}

export function TopPerformerChart({ topPerformanceChartData }: Props) {
  const chartConfig = {
    performance: {
      label: "Performance",
      color: "#3671F4",
    },
  } satisfies ChartConfig;
  return (
    <ChartContainer config={chartConfig} className="h-[400px] w-full">
      <BarChart accessibilityLayer data={topPerformanceChartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="class"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          // axisLine={{ stroke: "red", strokeWidth: 2 }}
          // tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
          type="number"
          ticks={[0, 25, 50, 75, 100]}
          axisLine={false}
          tickLine={false}
          fill="red"
          stroke="red"
          // mirror
          tickMargin={0}
          width={25}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Bar
          dataKey="performance"
          fill="var(--color-performance)"
          radius={4}
          barSize={18}
          background={{ fill: "#eee" }}
        />
      </BarChart>
    </ChartContainer>
  );
}
