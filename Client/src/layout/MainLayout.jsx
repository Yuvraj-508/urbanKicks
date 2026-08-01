import { Outlet } from "react-router-dom";

import Navbar from "@/components/home/layout/Navbar";
import Footer from "@/components/home/layout/Fotter";
// import WelcomeModal from "@/components/WelcomeModal";
import WelcomePopup from "@/components/WelcomePopup";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Welcome Popup */}
      <WelcomePopup />

      <main className="overflow-hidden">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}