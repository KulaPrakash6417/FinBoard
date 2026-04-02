import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function MonthlyChart() {
  const transactions = useSelector((state) => state.transactions);
  const darkMode = useSelector((state) => state.ui.darkMode);

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
    <div className={`p-4 rounded-xl shadow ${
      darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
    }`}>
      <h3 className="mb-4 font-bold">Monthly Comparison</h3>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="income" fill="#10b981" />
          <Bar dataKey="expense" fill="#ef4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}