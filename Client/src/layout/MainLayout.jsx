import { Outlet } from "react-router";

import Navbar from "@/components/Navbar";
import Fotter from "@/components/Fotter";
import TopBanner from "@/components/TopBanner";
import WelcomePopup from "@/components/WelcomePopup";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-700">
      <TopBanner />
      <Navbar />
      <WelcomePopup />

      <main className="flex-1 px-4 md:px-16 lg:px-14 xl:px-20">
        <Outlet />
      </main>

      <Fotter />
    </div>
  );
}