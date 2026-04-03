import { useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function TransactionFilters({ filters, setFilters }) {
  const transactions = useSelector((state) => state.transactions);

  // Get unique categories from transactions
  const categories = [...new Set(transactions.map(t => t.category))];

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
      <CardContent className="p-5">
        <h3 className="text-base md:text-lg font-semibold text-white mb-4">Filters</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Category</label>
            <Select value={filters.category} onValueChange={(value) => updateFilter('category', value)}>
              <SelectTrigger className="w-full text-white">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border border-white/10">
                <SelectItem value="all" className="text-white hover:bg-gray-700 focus:bg-gray-700">All Categories</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat} className="text-white hover:bg-gray-700 focus:bg-gray-700">{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Type Filter */}
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Type</label>
            <Select value={filters.type} onValueChange={(value) => updateFilter('type', value)}>
              <SelectTrigger className="w-full text-white">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border border-white/10">
                <SelectItem value="all" className="text-white hover:bg-gray-700 focus:bg-gray-700">All Types</SelectItem>
                <SelectItem value="income" className="text-white hover:bg-gray-700 focus:bg-gray-700">Income</SelectItem>
                <SelectItem value="expense" className="text-white hover:bg-gray-700 focus:bg-gray-700">Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Amount Range */}
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Min Amount</label>
            <Input
              type="number"
              placeholder="0"
              value={filters.minAmount}
              onChange={(e) => updateFilter('minAmount', e.target.value)}
              className="text-white placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Max Amount</label>
            <Input
              type="number"
              placeholder="10000"
              value={filters.maxAmount}
              onChange={(e) => updateFilter('maxAmount', e.target.value)}
              className="text-white placeholder:text-gray-400"
            />
          </div>

          {/* Sort */}
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Sort By</label>
            <Select value={filters.sort} onValueChange={(value) => updateFilter('sort', value)}>
              <SelectTrigger className="w-full text-white">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border border-white/10">
                <SelectItem value="newest" className="text-white hover:bg-gray-700 focus:bg-gray-700">Newest First</SelectItem>
                <SelectItem value="oldest" className="text-white hover:bg-gray-700 focus:bg-gray-700">Oldest First</SelectItem>
                <SelectItem value="highest" className="text-white hover:bg-gray-700 focus:bg-gray-700">Highest Amount</SelectItem>
                <SelectItem value="lowest" className="text-white hover:bg-gray-700 focus:bg-gray-700">Lowest Amount</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Range */}
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Start Date</label>
            <Input
              type="date"
              value={filters.startDate}
              onChange={(e) => updateFilter('startDate', e.target.value)}
              className="text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">End Date</label>
            <Input
              type="date"
              value={filters.endDate}
              onChange={(e) => updateFilter('endDate', e.target.value)}
              className="text-white"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}