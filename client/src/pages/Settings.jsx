import { useDispatch, useSelector } from "react-redux";
import { setCurrency } from "../features/uiSlice";
import { setRole } from "../features/roleSlice";
import { exportJSON, exportCSV } from "../utils/exportUtils";
import { mergeTransactions } from "../features/transactionsSlice";

import Layout from "../components/Layout";
import { useRef } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Settings() {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const currency = useSelector((state) => state.ui.currency);
  const role = useSelector((state) => state.role.role);
  const transactions = useSelector((state) => state.transactions);

  return (
    <Layout>
      <div className="space-y-6">

        <h1 className="text-xl md:text-2xl font-semibold text-white">Settings</h1>

        {/* Currency */}
        <Card className="bg-white/5 border border-white/10">
          <CardContent className="p-5 space-y-2">
            <p className="text-white">Currency</p>
            <Select value={currency} onValueChange={(value) => dispatch(setCurrency(value))}>
              <SelectTrigger className="w-full text-white">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border border-white/10">
                <SelectItem value="₹" className="text-white hover:bg-gray-700 focus:bg-gray-700">₹ (INR)</SelectItem>
                <SelectItem value="$" className="text-white hover:bg-gray-700 focus:bg-gray-700">$ (USD)</SelectItem>
                <SelectItem value="€" className="text-white hover:bg-gray-700 focus:bg-gray-700">€ (EUR)</SelectItem>
                <SelectItem value="£" className="text-white hover:bg-gray-700 focus:bg-gray-700">£ (GBP)</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Role */}
        <Card className="bg-white/5 border border-white/10">
          <CardContent className="p-5 space-y-2">
            <p className="text-white">Role</p>
            <Select value={role} onValueChange={(value) => dispatch(setRole(value))}>
              <SelectTrigger className="w-full text-white">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border border-white/10">
                <SelectItem value="admin" className="text-white hover:bg-gray-700 focus:bg-gray-700">Admin</SelectItem>
                <SelectItem value="user" className="text-white hover:bg-gray-700 focus:bg-gray-700">User</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Export */}
        <Card className="bg-white/5 border border-white/10">
          <CardContent className="p-5 space-y-3">
            <p className="text-white">Export Data</p>

            <div className="flex gap-3">
              <Button onClick={() => exportJSON(transactions)}>
                Export JSON
              </Button>

              <Button onClick={() => exportCSV(transactions)}>
                Export CSV
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Import */}
        {role === "admin" && (
          <Card className="bg-white/5 border border-white/10">
            <CardContent className="p-5 space-y-3">

              <p className="text-white">Import Data</p>

              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;

                  const reader = new FileReader();

                  reader.onload = (event) => {
                    try {
                      const data = JSON.parse(event.target.result);
                      dispatch(mergeTransactions(data));
                      alert("Imported successfully");
                    } catch {
                      alert("Invalid file");
                    }
                  };

                  reader.readAsText(file);
                }}
              />

              <Button onClick={() => fileInputRef.current?.click()}>
                Upload JSON
              </Button>

            </CardContent>
          </Card>
        )}

      </div>
    </Layout>
  );
}
