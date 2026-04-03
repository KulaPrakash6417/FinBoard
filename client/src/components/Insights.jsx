import { useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";

export default function Insights() {
  const transactions = useSelector((state) => state.transactions);
  const currency = useSelector((state) => state.ui.currency);

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
  const avg = transactions.length
    ? (total / transactions.length).toFixed(2)
    : 0;

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, t) => a + t.amount, 0);

  const expense = expenses.reduce((a, t) => a + t.amount, 0);

  const savings = income - expense;

  const cards = [
    { title: "Top Category", value: highestCategory },
    { title: "Net Savings", value: `${currency}${savings.toLocaleString()}`, color: "text-green-400" },
    { title: "Avg Transaction", value: `${currency}${avg}` },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {cards.map((card, index) => (
          <Card
            key={index}
            className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
          >
            <CardContent className="p-4 md:p-6">
              <p className="text-xs md:text-sm text-gray-400">{card.title}</p>
              <h2 className={`text-lg md:text-2xl font-semibold mt-2 ${card.color || "text-white"}`}>
                {card.value}
              </h2>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}