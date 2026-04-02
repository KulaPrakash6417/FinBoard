import { useState } from "react";
import { useSelector } from "react-redux";

import Layout from "../components/Layout";
import TransactionList from "../components/TransactionList";
import TransactionModal from "../components/TransactionModal";
import TransactionFilters from "../components/TransactionFilters";

export default function Transactions() {
  const [open, setOpen] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    type: "all",
    minAmount: "",
    maxAmount: "",
    sort: "newest",
    startDate: "",
    endDate: "",
  });

  const role = useSelector((state) => state.role.role);

  return (
    <Layout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Transactions</h1>

        {role === "admin" && (
          <button
            onClick={() => setOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            + Add Transaction
          </button>
        )}
      </div>

      <TransactionFilters filters={filters} setFilters={setFilters} />

      <TransactionList filters={filters} />

      {/* Add Modal */}
      <TransactionModal
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </Layout>
  );
}
