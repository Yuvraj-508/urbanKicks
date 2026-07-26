import { Outlet } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default function SellerLayout() {
  return (
    <div className="min-h-screen bg-slate-50">

      <Sidebar />

      <div className="lg:pl-72">

        <Topbar />

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>

      </div>

    </div>
  );
}