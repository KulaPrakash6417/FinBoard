import Layout from "../components/Layout";
import MonthlyChart from "../components/MonthlyChart";
import CategoryChart from "../components/CategoryChart";
import InsightsCards from "../components/InsightsCards";
import SummaryCards from "../components/SummaryCards";

export default function Insights() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Insights</h1>

      <InsightsCards />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 mb-4">
        <MonthlyChart />
        <CategoryChart />
      </div>

      <SummaryCards />
    </Layout>
  );
}