import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { deleteTransaction } from "../features/transactionsSlice";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import TransactionModal from "./TransactionModal";
import TransactionDetails from "./TransactionDetails";

export default function TransactionList({ filters }) {
  const transactions = useSelector((state) => state.transactions);
  const role = useSelector((state) => state.role.role);
  const currency = useSelector((state) => state.ui.currency);
  const dispatch = useDispatch();

  const [editData, setEditData] = useState(null);
  const [selectedTxn, setSelectedTxn] = useState(null);

  const isAdmin = role === "admin";

  let filtered = [...transactions];

  if (filters.category && filters.category !== "all") {
    filtered = filtered.filter((t) => t.category === filters.category);
  }

  if (filters.type && filters.type !== "all") {
    filtered = filtered.filter((t) => t.type === filters.type);
  }

  if (filters.minAmount) {
    filtered = filtered.filter((t) => t.amount >= Number(filters.minAmount));
  }

  if (filters.maxAmount) {
    filtered = filtered.filter((t) => t.amount <= Number(filters.maxAmount));
  }

  if (filters.startDate) {
    filtered = filtered.filter((t) => new Date(t.date) >= new Date(filters.startDate));
  }

  if (filters.endDate) {
    filtered = filtered.filter((t) => new Date(t.date) <= new Date(filters.endDate));
  }

  // Sorting
  if (filters.sort === "newest") {
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (filters.sort === "oldest") {
    filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (filters.sort === "highest") {
    filtered.sort((a, b) => b.amount - a.amount);
  } else if (filters.sort === "lowest") {
    filtered.sort((a, b) => a.amount - b.amount);
  }

  if (filtered.length === 0) {
    return <p className="text-center mt-10 text-gray-400">No transactions found</p>;
  }

  return (
    <>
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-white">Title</TableHead>
              <TableHead className="text-white">Amount</TableHead>
              <TableHead className="text-white">Type</TableHead>
              <TableHead className="text-white">Category</TableHead>
              <TableHead className="text-white">Date</TableHead>
              <TableHead className="text-white">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filtered.map((txn) => (
              <TableRow
                key={txn.id}
                className="hover:bg-white/5 cursor-pointer transition"
                onClick={() => setSelectedTxn(txn)}
              >
                <TableCell>{txn.title}</TableCell>

                <TableCell
                  className={
                    txn.type === "expense" ? "text-red-400" : "text-green-400"
                  }
                >
                  {currency}{txn.amount.toLocaleString()}
                </TableCell>

                <TableCell>
                  <Badge variant={txn.type === "expense" ? "destructive" : "default"}>
                    {txn.type}
                  </Badge>
                </TableCell>

                <TableCell>{txn.category}</TableCell>
                <TableCell>{txn.date}</TableCell>

                <TableCell className="space-x-2">
                  {isAdmin && (
                    <>
                      <Button
                        className="text-black"
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditData(txn);
                        }}
                      >
                        Edit
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(deleteTransaction(txn.id));
                        }}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <TransactionModal
        isOpen={!!editData}
        existingData={editData}
        onClose={() => setEditData(null)}
      />

      <TransactionDetails
        txn={selectedTxn}
        onClose={() => setSelectedTxn(null)}
      />
    </>
  );
}