import { DashboardTotalCard } from "@/components/cards/dashboard-total-card";
import { AttendanceChart } from "@/components/charts/attendance";
import { TopPerformerChart } from "@/components/charts/top-performer";
import { CustomAvatar } from "@/components/custom-avatar";
import { PageTtle } from "@/components/page-title";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import db from "@/lib/db";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { PiChalkboardTeacherFill, PiStudentFill } from "react-icons/pi";
import { RiParentFill } from "react-icons/ri";

const AdminDashboardPage = async () => {
  const teachersCount = await db.teacher.count();
  const topRatedTeachers = await db.teacher.findMany({
    orderBy: {
      reviewScore: "desc",
    },
    take: 6,
  });

  const top5Students: {
    id: number;
    name: string;
    grade: number;
    reward: number;
    absences: number;
    avatar?: string;
  }[] = [
    {
      id: 1,
      name: "Kathryn Murphy",
      grade: 9.8,
      reward: 95,
      absences: 12,
      avatar: "https://avatar.iran.liara.run/public/girl",
    },
    {
      id: 2,
      name: "Darrell Steward",
      grade: 9.6,
      reward: 82,
      absences: 16,
      avatar: "https://avatar.iran.liara.run/public/boy",
    },
    {
      id: 3,
      name: "Arlene McCoy",
      grade: 9.2,
      reward: 89,
      absences: 20,
      avatar: "https://avatar.iran.liara.run/public",
    },
    {
      id: 4,
      name: "Eleanor Pena",
      grade: 8.9,
      reward: 85,
      absences: 28,
    },
    {
      id: 5,
      name: "Guy Hawkins",
      grade: 5.2,
      reward: 82,
      absences: 32,
      avatar: "https://avatar.iran.liara.run/public/boy",
    },
  ];

  const topPerformerClassroom: {
    id: number;
    class: string;
    performance: number;
  }[] = [
    { id: 1, class: "Class 11", performance: 85 },
    { id: 2, class: "Class 05", performance: 75 },
    { id: 3, class: "Class 01", performance: 60 },
    { id: 4, class: "Class 07", performance: 56 },
    { id: 5, class: "Class 12", performance: 53 },
  ];

  const attendanceData = [
    { month: "January", present: 75, absent: 25 },
    { month: "February", present: 35, absent: 65 },
    { month: "March", present: 37, absent: 63 },
    { month: "April", present: 73, absent: 27 },
    { month: "May", present: 79, absent: 21 },
    { month: "June", present: 69, absent: 31 },
  ];

  return (
    <div className="flex flex-col gap-6 px-4 pb-9 pt-8 md:px-8">
      <PageTtle label="Dashboard" />
      {/* dashboar grid */}
      {/* <div className="grid-cols-dashboard-layout grid-rows-dashboard-layout grid gap-8"> */}
      <div className="custom-desktop:grid-cols-dashboard-layout-desktop row-auto grid grid-cols-1 gap-8 md:grid-cols-3">
        <DashboardTotalCard
          icon={<PiStudentFill size={25} />}
          title={"Total Students"}
          total={3350}
        />
        <DashboardTotalCard
          icon={<PiChalkboardTeacherFill size={25} />}
          title={"Total Teachers"}
          total={teachersCount}
        />
        <DashboardTotalCard
          icon={<RiParentFill size={25} />}
          title={"Total Parents"}
          total={1450}
        />
        <Card className="custom-desktop:row-span-2 custom-desktop:col-span-1 md:col-span-3 lg:col-span-1">
          <CardContent className="space-y-6 p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[18px] font-semibold">Top Rated Teachers</h2>
              <Button
                asChild
                variant={"link"}
                size={"sm"}
                className="text-gray-500"
              >
                <Link href={`/teachers`}>see all</Link>
              </Button>
            </div>
            <div>
              {/* <pre>{JSON.stringify(topRatedTeachers, null, 2)}</pre> */}
              <ol>
                {topRatedTeachers.map((teacher, ind) => (
                  <li
                    key={teacher.id}
                    className={`flex items-center justify-start gap-3 py-3 ${ind !== 0 ? "border-t border-secondary" : ""}`}
                  >
                    <div>
                      <CustomAvatar image={teacher.avatar} />
                    </div>
                    <div className="space-y-[2px]">
                      <h3 className="text-[14px]">
                        {teacher.firstName} {teacher.lastName}
                      </h3>
                      <p className="text-[12px] text-gray-500">
                        Subject: {teacher.subject}
                      </p>
                    </div>

                    <Badge
                      variant="outline"
                      className="ms-auto inline-flex min-w-[80px] items-center justify-between gap-1 px-2 py-1 text-[14px]"
                    >
                      <FaStar size={15} className="text-yellow-400" />{" "}
                      {teacher.reviewScore} / 5
                    </Badge>
                  </li>
                ))}
              </ol>
            </div>
          </CardContent>
        </Card>
        <Card className="custom-desktop:col-span-3 col-span-1 md:col-span-3 lg:col-span-2">
          <CardContent className="space-y-6 p-4">
            <div>
              <h2 className="text-[18px] font-semibold">Attendance</h2>
            </div>
            <AttendanceChart attendanceChartData={attendanceData} />
          </CardContent>
        </Card>
        <div className="custom-desktop:col-span-4 flex flex-col items-stretch justify-stretch gap-8 md:col-span-3 lg:flex-row">
          <Card className="w-full grow">
            <CardContent className="space-y-4 p-4">
              <h2 className="text-[18px] font-semibold">Top 5 Students</h2>
              <div className="overflow-hidden rounded-md border border-secondary">
                <Table>
                  <TableHeader className="bg-accent/50">
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Reward (%)</TableHead>
                      <TableHead>Absences</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {top5Students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="flex items-center gap-2 font-medium">
                          <CustomAvatar image={student.avatar} />
                          {student.name}
                        </TableCell>
                        <TableCell
                          className={`font-medium ${student.grade < 6 ? "text-red-600" : "text-green-600"}`}
                        >
                          {student.grade}
                        </TableCell>
                        <TableCell>{student.reward}%</TableCell>
                        <TableCell>{student.absences}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          <Card className="w-full grow lg:max-w-[532px]">
            <CardContent className="space-y-6 p-4">
              <div>
                <h2 className="text-[18px] font-semibold">
                  Top Performer Classrooms
                </h2>
              </div>
              <TopPerformerChart
                topPerformanceChartData={topPerformerClassroom}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
