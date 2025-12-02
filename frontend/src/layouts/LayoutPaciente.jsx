import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function LayoutPaciente() {
  return (
    <div className="flex min-h-screen">
      <Sidebar role="paciente" />
      <main className="flex-1 bg-gray-50 p-6">
        <Outlet />
      </main>
    </div>
  );
}