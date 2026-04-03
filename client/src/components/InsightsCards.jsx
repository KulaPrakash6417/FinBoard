import { useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";

export default function InsightsCards() {
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

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, t) => a + t.amount, 0);

  const expense = expenses.reduce((a, t) => a + t.amount, 0);

  const savings = income - expense;

  const avg = transactions.length
    ? (
        transactions.reduce((a, t) => a + t.amount, 0) /
        transactions.length
      ).toFixed(0)
    : 0;

  const highestTxn = transactions.length
    ? transactions.reduce((max, t) => (t.amount > max.amount ? t : max))
    : { amount: 0, title: "N/A" };

  const cards = [
    { title: "Top Category", value: highestCategory },
    { title: "Net Savings", value: `${currency}${savings.toLocaleString()}`, color: "text-green-400" },
    { title: "Avg Transaction", value: `${currency}${avg}` },
    {
      title: "Highest Transaction",
      value: `${currency}${highestTxn.amount.toLocaleString()}`,
      sub: highestTxn.title,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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

            {card.sub && (
              <p className="text-xs md:text-sm text-gray-500 mt-1">{card.sub}</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}