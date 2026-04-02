import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function BalanceChart() {
  const transactions = useSelector((state) => state.transactions);
  const darkMode = useSelector((state) => state.ui.darkMode);

  const sorted = [...transactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  let balance = 0;

  const data = sorted.map((t) => {
    balance += t.type === "income" ? t.amount : -t.amount;
    return {
      date: t.date,
      balance,
    };
  });

  return (
    <div
      className={`p-4 rounded-xl shadow ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <h3 className="mb-4 font-bold">Balance Trend</h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="balance" stroke="#3b82f6" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}