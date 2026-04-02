import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode, setCurrency } from "../features/uiSlice";
import { setRole } from "../features/roleSlice";
import { exportJSON, exportCSV } from "../utils/exportUtils";
import { mergeTransactions } from "../features/transactionsSlice";

import Layout from "../components/Layout";
import { useRef } from "react";

export default function Settings() {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const darkMode = useSelector((state) => state.ui.darkMode);
  const currency = useSelector((state) => state.ui.currency);
  const role = useSelector((state) => state.role.role);
  const transactions = useSelector((state) => state.transactions);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      {/* 🌙 Dark Mode */}
      <div className="mb-4">
        <h3 className="font-semibold">Dark Mode</h3>
        <button
          onClick={() => dispatch(toggleDarkMode())}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          {darkMode ? "Disable" : "Enable"}
        </button>
      </div>

      {/* 💱 Currency */}
      <div className="mb-4">
        <h3 className="font-semibold">Currency</h3>
        <select
          className={`p-2 border rounded ${darkMode
            ? "bg-gray-700 text-white"
            : "bg-white text-black"
            }`}
          value={currency}
          onChange={(e) => dispatch(setCurrency(e.target.value))}
        >
          <option value="₹">₹ INR</option>
          <option value="$">$ USD</option>
          <option value="€">€ EUR</option>
          <option value="£">£ GBP</option>
        </select>
      </div>

      {/* 👤 Role Switch */}
      <div className="mb-4">
        <h3 className="font-semibold">Role</h3>
        <select
          className={`p-2 border rounded ${darkMode
            ? "bg-gray-700 text-white"
            : "bg-white text-black"
            }`}
          value={role}
          onChange={(e) => dispatch(setRole(e.target.value))}
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Export Data */}
      <div className="mb-4">
        <h3 className="font-semibold">Export Data</h3>

        <div className="flex gap-2 mt-2">
          <button
            onClick={() => exportJSON(transactions)}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Export JSON
          </button>

          <button
            onClick={() => exportCSV(transactions)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* Import Data if you are an ADMIN */}
      {role === "admin" && (
        <div className="mb-4">
          <h3 className="font-semibold">Import Data</h3>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;

              const reader = new FileReader();

              reader.onload = (event) => {
                try {
                  const data = JSON.parse(event.target.result);
                  const importedData = Array.isArray(data) ? data : [data];
                  dispatch(mergeTransactions(importedData));
                  alert("Data imported and merged successfully!");
                  fileInputRef.current.value = ""; // Clear the input
                } catch (error) {
                  alert("Error importing file: " + error.message);
                }
              };

              reader.readAsText(file);
            }}
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="mt-2 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Choose File & Import
          </button>
        </div>
      )}

    </Layout>
  );
}
