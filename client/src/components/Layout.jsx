import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#020617] to-[#0f172a] text-white">
      <Sidebar />
      <main className="flex-1 p-4 md:p-6 space-y-4 md:space-y-6 overflow-auto">
        {children}
      </main>
    </div>
  );
}