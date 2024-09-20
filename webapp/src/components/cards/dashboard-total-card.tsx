import { ReactNode } from "react";
import { Card, CardContent } from "../ui/card";

interface Props {
  icon: ReactNode;
  title: string;
  total: number;
}

export const DashboardTotalCard = ({ icon, title, total }: Props) => {
  return (
    <Card className="border border-primary/40 bg-primary/20">
      <CardContent className="flex items-start gap-4 p-4">
        <div className="grid size-10 place-items-center rounded-full bg-background text-primary">
          {icon}
        </div>
        <div>
          <h2 className="font-medium">{title}</h2>
          <p className="text-[24px] font-semibold text-primary">{total}</p>
        </div>
      </CardContent>
    </Card>
  );
};
