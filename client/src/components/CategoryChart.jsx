import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function CategoryChart() {
  const transactions = useSelector((state) => state.transactions);
  const darkMode = useSelector((state) => state.ui.darkMode);

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
    <div
      className={`p-4 rounded-xl shadow ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <h3 className="mb-4 font-bold">Spending Breakdown</h3>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={data} dataKey="value" outerRadius={80}>
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}