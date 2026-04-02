import { useSelector } from "react-redux";

export default function TransactionDetails({ txn, onClose }) {
  const darkMode = useSelector((state) => state.ui.darkMode);

  if (!txn) return null;

  return (
    <div className={`fixed right-0 top-0 h-full w-80 shadow-lg p-4 ${
      darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
    }`}>
      <h2 className="text-xl font-bold mb-4">Details</h2>

      <p><strong>Title:</strong> {txn.title}</p>
      <p><strong>Amount:</strong> ₹{txn.amount}</p>
      <p><strong>Type:</strong> {txn.type}</p>
      <p><strong>Category:</strong> {txn.category}</p>
      <p><strong>Date:</strong> {txn.date}</p>

      <button
        onClick={onClose}
        className="mt-4 bg-gray-300 px-4 py-2 rounded"
      >
        Close
      </button>
    </div>
  );
}