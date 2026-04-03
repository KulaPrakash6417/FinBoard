import { useSelector } from "react-redux";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TransactionDetails({ txn, onClose }) {
  const currency = useSelector((state) => state.ui.currency);
  if (!txn) return null;

  return (
    <div className="fixed inset-0 flex justify-end bg-black/40 z-50">
      <div className="w-96 h-full bg-[#020617] border-l border-white/10 p-6 shadow-2xl">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-white">Transaction Details</h2>
          <Button variant="ghost" onClick={onClose}>
            <X />
          </Button>
        </div>

        <div className="space-y-4 text-sm text-gray-300">
          <div>
            <p className="text-gray-500">Title</p>
            <p className="font-medium text-white">{txn.title}</p>
          </div>

          <div>
            <p className="text-gray-500">Amount</p>
            <p className="font-medium text-white">{currency}{txn.amount.toLocaleString()}</p>
          </div>

          <div>
            <p className="text-gray-500">Type</p>
            <p className="font-medium capitalize">{txn.type}</p>
          </div>

          <div>
            <p className="text-gray-500">Category</p>
            <p className="font-medium">{txn.category}</p>
          </div>

          <div>
            <p className="text-gray-500">Date</p>
            <p className="font-medium">{txn.date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}