import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Card, CardContent } from "@/components/ui/card";

export default function MonthlyChart() {
  const transactions = useSelector((state) => state.transactions);

  const dataMap = {};

  transactions.forEach((t) => {
    const month = t.date.slice(0, 7);

    if (!dataMap[month]) {
      dataMap[month] = { month, income: 0, expense: 0 };
    }

    if (t.type === "income") {
      dataMap[month].income += t.amount;
    } else {
      dataMap[month].expense += t.amount;
    }
  });

  const data = Object.values(dataMap);

  return (
    <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl">
      <CardContent className="p-5">
        <h3 className="text-sm text-gray-400 mb-4">Monthly Comparison</h3>

        <ResponsiveContainer width="100%" height={200} className="h-[200px] md:h-[260px]">
          <BarChart data={data}>
            <XAxis dataKey="month" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />

            <Tooltip
              contentStyle={{
                backgroundColor: "#020617",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
              }}
            />

            <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expense" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}