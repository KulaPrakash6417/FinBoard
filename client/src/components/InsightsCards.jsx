import { useSelector } from "react-redux";

export default function InsightsCards() {
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

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, t) => a + t.amount, 0);

  const expense = expenses.reduce((a, t) => a + t.amount, 0);

  const savings = income - expense;

  const avg = transactions.length
    ? (transactions.reduce((a, t) => a + t.amount, 0) / transactions.length).toFixed(0)
    : 0;

  const highestTxn = transactions.length
    ? transactions.reduce((max, t) => (t.amount > max.amount ? t : max))
    : { amount: 0, title: "N/A" };

  const cardStyle = `p-4 rounded-xl shadow ${
    darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
  }`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className={cardStyle}>
        <h3 className="text-gray-500">Top Category</h3>
        <p className="text-xl font-bold">{highestCategory}</p>
      </div>

      <div className={cardStyle}>
        <h3 className="text-gray-500">Net Savings</h3>
        <p className="text-xl font-bold text-green-500">₹{savings}</p>
      </div>

      <div className={cardStyle}>
        <h3 className="text-gray-500">Avg Transaction</h3>
        <p className="text-xl font-bold">₹{avg}</p>
      </div>

      <div className={cardStyle}>
        <h3 className="text-gray-500">Highest Transaction</h3>
        <p className="text-xl font-bold">₹{highestTxn.amount}</p>
        <p className="text-sm text-gray-400">{highestTxn.title}</p>
      </div>
    </div>
  );
}