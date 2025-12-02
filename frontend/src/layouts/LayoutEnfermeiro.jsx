import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function LayoutEnfermeiro() {
  return (
    <div className="flex min-h-screen">
      <Sidebar role="enfermeiro" />
      <main className="flex-1 bg-gray-50 p-6">
        <Outlet />
      </main>
    </div>
  );
}