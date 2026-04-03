import Layout from "../components/Layout";
import MonthlyChart from "../components/MonthlyChart";
import CategoryChart from "../components/CategoryChart";
import InsightsCards from "../components/InsightsCards";
import SummaryCards from "../components/SummaryCards";

export default function InsightsPage() {
  return (
    <Layout>
      <div className="space-y-6">

        <h1 className="text-xl md:text-2xl font-semibold text-white">Insights</h1>

        <InsightsCards />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MonthlyChart />
          <CategoryChart />
        </div>

        <SummaryCards />

      </div>
    </Layout>
  );
}