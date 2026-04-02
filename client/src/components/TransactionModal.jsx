import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction, updateTransaction } from "../features/transactionsSlice";

export default function TransactionModal({ isOpen, onClose, existingData }) {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.ui.darkMode);

  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "Food",
    date: "",
  });

  useEffect(() => {
    if (existingData) setForm(existingData);
  }, [existingData]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      ...form,
      id: existingData ? existingData.id : Date.now(),
      amount: Number(form.amount),
    };

    existingData
      ? dispatch(updateTransaction(newTransaction))
      : dispatch(addTransaction(newTransaction));

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className={`p-6 rounded-xl w-[400px] shadow-lg ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}>
        <h2 className="text-xl font-bold mb-4">
          {existingData ? "Edit" : "Add"} Transaction
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input className={`p-2 border rounded ${darkMode
              ? "bg-gray-700 text-white"
              : "bg-white text-black"
            }`}
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />

          <input type="number" className={`p-2 border rounded ${darkMode
              ? "bg-gray-700 text-white"
              : "bg-white text-black"
            }`}
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            required
          />

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}