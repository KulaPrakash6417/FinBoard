import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { deleteTransaction } from "../features/transactionsSlice";
import TransactionModal from "./TransactionModal";
import TransactionDetails from "./TransactionDetails";

export default function TransactionList({ filters }) {
  const transactions = useSelector((state) => state.transactions);
  const darkMode = useSelector((state) => state.ui.darkMode);
  const role = useSelector((state) => state.role.role);
  const dispatch = useDispatch();

  const [editData, setEditData] = useState(null);
  const [selectedTxn, setSelectedTxn] = useState(null);
  const isAdmin = role === "admin";

  let filtered = [...transactions];

  // filters...
  if (filters.category !== "all") {
    filtered = filtered.filter((t) => t.category === filters.category);
  }

  if (filters.type !== "all") {
    filtered = filtered.filter((t) => t.type === filters.type);
  }

  if (filters.minAmount) {
    filtered = filtered.filter((t) => t.amount >= Number(filters.minAmount));
  }

  if (filters.maxAmount) {
    filtered = filtered.filter((t) => t.amount <= Number(filters.maxAmount));
  }

  if (filters.sort === "newest") {
    filtered = [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  if (filtered.length === 0) {
    return <p className="text-center mt-10">No transactions found</p>;
  }

  return (
    <>
      <div className={`rounded-xl shadow p-4 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th>Title</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Category</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((txn) => (
              <tr key={txn.id} className="border-b cursor-pointer"
                onClick={() => setSelectedTxn(txn)}
              >
                <td>{txn.title}</td>
                <td className={txn.type === "expense" ? "text-red-500" : "text-green-500"}>
                  ₹{txn.amount}
                </td>
                <td>{txn.type}</td>
                <td>{txn.category}</td>
                <td>{txn.date}</td>

                <td>
                  {isAdmin && (
                    <>
                      <button onClick={(e) => {
                        e.stopPropagation();
                        setEditData(txn);
                      }} className="text-blue-500 hover:text-blue-700 mr-3">
                        Edit
                      </button>

                      <button onClick={(e) => {
                        e.stopPropagation();
                        dispatch(deleteTransaction(txn.id));
                      }} className="text-red-500 hover:text-red-700">
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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