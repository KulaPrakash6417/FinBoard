import { useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";

export default function SummaryCards() {
  const transactions = useSelector((state) => state.transactions);
  const currency = useSelector((state) => state.ui.currency);

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expense;

  const cards = [
    { title: "Balance", value: balance },
    { title: "Income", value: income, color: "text-green-400" },
    { title: "Expenses", value: expense, color: "text-red-400" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {cards.map((card, index) => (
        <Card
          key={index}
          className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
        >
          <CardContent className="p-4 md:p-6">
            <p className="text-xs md:text-sm text-gray-400">{card.title}</p>

            <h2
              className={`text-2xl md:text-3xl font-semibold mt-2 ${
                card.color || "text-white"
              }`}
            >
              {currency}{card.value.toLocaleString()}
            </h2>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}