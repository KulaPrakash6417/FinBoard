import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Receipt, BarChart3, Settings } from "lucide-react";

const navItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Transactions", path: "/transactions", icon: Receipt },
  { name: "Insights", path: "/insights", icon: BarChart3 },
  { name: "Settings", path: "/settings", icon: Settings },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-16 md:w-64 bg-gradient-to-b from-[#020617] to-[#0f172a] border-r border-white/10 p-2 md:p-4 transition-all duration-300">
      
      {/* Logo */}
      <h1 className="text-lg md:text-2xl font-bold mb-4 md:mb-8 text-white hidden md:block">FinBoard</h1>
      <h1 className="text-lg font-bold mb-4 text-white md:hidden">FB</h1>

      {/* Navigation */}
      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 p-2 md:p-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-blue-500/20 text-blue-400"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
              title={item.name} // Tooltip for mobile
            >
              <Icon size={20} />
              <span className="hidden md:inline">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}