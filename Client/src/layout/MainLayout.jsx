import { Outlet } from "react-router-dom";

import Navbar from "@/components/home/layout/Navbar";
import Footer from "@/components/home/layout/Fotter";


export default function MainLayout() {

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="overflow-hidden">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}