import { Outlet } from "react-router-dom";

import Navbar from "@/components/home/layout/Navbar";
import Footer from "@/components/home/layout/Fotter";
import { lazy, Suspense } from "react";
// import WelcomeModal from "@/components/WelcomeModal";
const WelcomePopup = lazy(() =>
    import("../components/WelcomePopup")
);
export default function MainLayout() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Welcome Popup */}
    <Suspense fallback={null}>
    <WelcomePopup />
</Suspense>

      <main className="overflow-hidden">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}