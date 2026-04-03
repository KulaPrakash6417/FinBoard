import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

import { Card, CardContent } from "@/components/ui/card";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function CategoryChart() {
  const transactions = useSelector((state) => state.transactions);

  const dataMap = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      dataMap[t.category] = (dataMap[t.category] || 0) + t.amount;
    }
  });

  const data = Object.keys(dataMap).map((key) => ({
    name: key,
    value: dataMap[key],
  }));

  return (
    <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl">
      <CardContent className="p-5">
        <h3 className="text-sm text-gray-400 mb-4">Spending Breakdown</h3>

        <ResponsiveContainer width="100%" height={200} className="h-[200px] md:h-[260px]">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={90}
              innerRadius={50}
              paddingAngle={3}
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: "#020617",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}