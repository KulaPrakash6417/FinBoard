import Layout from "../components/Layout";
import SummaryCards from "../components/SummaryCards";
import BalanceChart from "../components/BalanceChart";
import CategoryChart from "../components/CategoryChart";
import MonthlyChart from "../components/MonthlyChart";
import Insights from "../components/Insights";

export default function Dashboard() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <SummaryCards />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <BalanceChart />
        <CategoryChart />
      </div>

      <MonthlyChart />

      <div className="mt-6">
        <Insights />
      </div>
    </Layout>
  );
}