import { useSelector } from "react-redux";
import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Card, CardContent } from "@/components/ui/card";

export default function BalanceChart() {
  const transactions = useSelector((state) => state.transactions);
  const currency = useSelector((state) => state.ui.currency);

  const data = useMemo(() => {
    const sorted = [...transactions].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    return sorted.reduce((acc, t) => {
      const lastItem = acc[acc.length - 1];
      const incomeTotal = (lastItem?.income || 0) + (t.type === "income" ? t.amount : 0);
      const expensesTotal = (lastItem?.expenses || 0) + (t.type === "expense" ? t.amount : 0);
      const balance = incomeTotal - expensesTotal;

      acc.push({
        date: t.date,
        balance,
        income: incomeTotal,
        expenses: expensesTotal,
      });

      return acc;
    }, []);
  }, [transactions]);

  return (
    <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl">
      <CardContent className="p-5">
        <h3 className="text-sm text-gray-400 mb-4">Balance Trend</h3>

        <ResponsiveContainer width="100%" height={200} className="h-[200px] md:h-[260px]">
          <LineChart data={data}>
            <XAxis
              dataKey="date"
              stroke="#9ca3af"
              tickFormatter={(value) => {
                const d = new Date(value);
                return isNaN(d) ? value : `${d.getMonth() + 1}/${d.getDate()}`;
              }}
              minTickGap={20}
              tick={{ fontSize: 12, fill: '#9ca3af' }}
            />
            <YAxis
              stroke="#9ca3af"
              domain={[0, 'dataMax']}
              tickFormatter={(value) =>
                `${currency}${Math.abs(value).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
              }
              tick={{ fontSize: 12, fill: '#9ca3af' }}
              width={90}
            />
            <Tooltip
              formatter={(value) =>
                `${currency}${Number(value).toLocaleString(undefined, { maximumFractionDigits: 2 })}`
              }
              labelFormatter={(label) => {
                const d = new Date(label);
                return isNaN(d) ? label : d.toLocaleDateString();
              }}
              contentStyle={{
                backgroundColor: "#020617",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
              }}
            />
            <Line
              type="monotone"
              dataKey="balance"
              name="Balance"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="income"
              name="Income"
              stroke="#22c55e"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="expenses"
              name="Expenses"
              stroke="#ef4444"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}