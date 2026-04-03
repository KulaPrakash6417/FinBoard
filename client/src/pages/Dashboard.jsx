import Layout from "../components/Layout";
import SummaryCards from "../components/SummaryCards";
import BalanceChart from "../components/BalanceChart";
import CategoryChart from "../components/CategoryChart";
import MonthlyChart from "../components/MonthlyChart";
import Insights from "../components/Insights";

export default function Dashboard() {
  return (
    <Layout>
      <div className="space-y-6">

        <h1 className="text-xl md:text-2xl font-semibold text-white">Dashboard</h1>

        <SummaryCards />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BalanceChart />
          <CategoryChart />
        </div>

        <MonthlyChart />

        <Insights />

      </div>
    </Layout>
  );
}