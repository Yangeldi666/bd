import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function LayoutAdmin() {
  return (
    <div className="flex min-h-screen">
      {/* Menu lateral */}
      <Sidebar role="admin" />

      {/* Conteúdo principal */}
      <main className="flex-1 bg-gray-50 p-6">
        <Outlet />
      </main>
    </div>
  );
}