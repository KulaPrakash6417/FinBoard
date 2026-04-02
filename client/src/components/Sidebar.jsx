import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { LayoutDashboard, Receipt, BarChart3, Settings } from "lucide-react";

const navItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Transactions", path: "/transactions", icon: Receipt },
  { name: "Insights", path: "/insights", icon: BarChart3 },
  { name: "Settings", path: "/settings", icon: Settings },
];

export default function Sidebar() {
  const location = useLocation();
  const darkMode = useSelector((state) => state.ui.darkMode);

  return (
    <div className={`w-64 shadow-md p-4 ${
      darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
    }`}>
      <h1 className="text-2xl font-bold mb-8">FinBoard</h1>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-lg transition ${
                isActive
                  ? "bg-blue-500 text-white"
                  : darkMode
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}