import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
  const token = localStorage.getItem("sellerToken");

  return token ? <Outlet /> : <Navigate to="/seller/login" replace />;
}