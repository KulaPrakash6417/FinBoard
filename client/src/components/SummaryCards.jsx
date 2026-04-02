import { useSelector } from "react-redux";

export default function SummaryCards() {
  const transactions = useSelector((state) => state.transactions);
  const darkMode = useSelector((state) => state.ui.darkMode);

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expense;

  const cardStyle = `p-4 rounded-xl shadow ${
    darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
  }`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className={cardStyle}>
        <h3 className="text-gray-500">Balance</h3>
        <p className="text-2xl font-bold">₹{balance}</p>
      </div>

      <div className={cardStyle}>
        <h3 className="text-gray-500">Income</h3>
        <p className="text-2xl font-bold text-green-500">₹{income}</p>
      </div>

      <div className={cardStyle}>
        <h3 className="text-gray-500">Expenses</h3>
        <p className="text-2xl font-bold text-red-500">₹{expense}</p>
      </div>
    </div>
  );
}