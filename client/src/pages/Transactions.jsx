import { useState } from "react";
import { useSelector } from "react-redux";

import Layout from "../components/Layout";
import TransactionList from "../components/TransactionList";
import TransactionModal from "../components/TransactionModal";
import TransactionFilters from "../components/TransactionFilters";

import { Button } from "@/components/ui/button";

export default function Transactions() {
  const [open, setOpen] = useState(false);

  const [filters, setFilters] = useState({
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
      <div className="space-y-6">

        <div className="flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-semibold text-white">Transactions</h1>

          {role === "admin" && (
            <Button onClick={() => setOpen(true)}>
              + Add Transaction
            </Button>
          )}
        </div>

        <TransactionFilters filters={filters} setFilters={setFilters} />

        <TransactionList filters={filters} />

        <TransactionModal
          isOpen={open}
          onClose={() => setOpen(false)}
        />

      </div>
    </Layout>
  );
}
