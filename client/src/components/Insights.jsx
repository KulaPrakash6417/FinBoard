import { useSelector } from "react-redux";

export default function Insights() {
  const transactions = useSelector((state) => state.transactions);
  const darkMode = useSelector((state) => state.ui.darkMode);

  const expenses = transactions.filter((t) => t.type === "expense");

  const categoryMap = {};
  expenses.forEach((t) => {
    categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
  });

  const highestCategory = Object.keys(categoryMap).length
    ? Object.keys(categoryMap).reduce((a, b) =>
        categoryMap[a] > categoryMap[b] ? a : b
      )
    : "N/A";

  const total = transactions.reduce((acc, t) => acc + t.amount, 0);
  const avg = transactions.length ? (total / transactions.length).toFixed(2) : 0;

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, t) => a + t.amount, 0);

  const expense = expenses.reduce((a, t) => a + t.amount, 0);

  const savings = income - expense;

  const cardStyle = `p-4 rounded-xl shadow ${
    darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
  }`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className={cardStyle}>
        <h3>Top Category</h3>
        <p className="font-bold">{highestCategory}</p>
      </div>

      <div className={cardStyle}>
        <h3>Net Savings</h3>
        <p className="font-bold">₹{savings}</p>
      </div>

      <div className={cardStyle}>
        <h3>Avg Transaction</h3>
        <p className="font-bold">₹{avg}</p>
      </div>
    </div>
  );
}