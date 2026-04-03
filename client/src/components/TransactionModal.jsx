import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addTransaction,
  updateTransaction,
} from "../features/transactionsSlice";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TransactionModal({ isOpen, onClose, existingData }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

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

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!form.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) {
      newErrors.amount = "Amount must be a positive number";
    }

    if (!form.date) {
      newErrors.date = "Date is required";
    }

    if (!form.category.trim()) {
      newErrors.category = "Category is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const newTransaction = {
        ...form,
        id: existingData ? existingData.id : Date.now(),
        amount: Number(form.amount),
      };

      existingData
        ? dispatch(updateTransaction(newTransaction))
        : dispatch(addTransaction(newTransaction));

      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#020617] border border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">
            {existingData ? "Edit Transaction" : "Add Transaction"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4" role="form" aria-labelledby="transaction-form-title">
          <div>
            <label htmlFor="title-input" className="block text-sm text-gray-400 mb-1">Title</label>
            <Input
              id="title-input"
              className={`text-white placeholder:text-gray-400 ${errors.title ? "border-red-500" : ""}`}
              placeholder="Enter transaction title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              aria-describedby={errors.title ? "title-error" : undefined}
              aria-invalid={!!errors.title}
            />
            {errors.title && <p id="title-error" className="text-red-400 text-sm mt-1" role="alert">{errors.title}</p>}
          </div>

          <div>
            <label htmlFor="amount-input" className="block text-sm text-gray-400 mb-1">Amount</label>
            <Input
              id="amount-input"
              className={`text-white placeholder:text-gray-400 ${errors.amount ? "border-red-500" : ""}`}
              type="number"
              placeholder="0.00"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              min="0"
              step="0.01"
              aria-describedby={errors.amount ? "amount-error" : undefined}
              aria-invalid={!!errors.amount}
            />
            {errors.amount && <p id="amount-error" className="text-red-400 text-sm mt-1" role="alert">{errors.amount}</p>}
          </div>

          <div>
            <label htmlFor="date-input" className="block text-sm text-gray-400 mb-1">Date</label>
            <Input
              id="date-input"
              className={`text-white placeholder:text-gray-400 ${errors.date ? "border-red-500" : ""}`}
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              aria-describedby={errors.date ? "date-error" : undefined}
              aria-invalid={!!errors.date}
            />
            {errors.date && <p id="date-error" className="text-red-400 text-sm mt-1" role="alert">{errors.date}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={Object.keys(errors).length > 0 || isLoading}>
            {isLoading ? "Saving..." : (existingData ? "Update Transaction" : "Add Transaction")}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}