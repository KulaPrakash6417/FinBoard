import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  const darkMode = useSelector((state) => state.ui.darkMode);

  return (
    <div
      className={`flex min-h-screen ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}