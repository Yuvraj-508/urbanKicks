import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  Store,
  Plus,
} from "lucide-react";

import { Link, useLocation, useNavigate } from "react-router";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";

const navItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/seller",
  },
  {
    name: "Products",
    icon: Package,
    path: "/seller/products",
  },
  {
    name: "Orders",
    icon: ShoppingCart,
    path: "/seller/orders",
  },
  {
    name: "Customers",
    icon: Users,
    path: "/seller/customers",
  },
  {
    name: "Analytics",
    icon: BarChart3,
    path: "/seller/analytics",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/seller/settings",
  },
];

function NavLinks({ handleLogout }) {
  const location = useLocation();

  return (
    <>
      <div className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          const active =
            location.pathname === item.path ||
            location.pathname.startsWith(item.path + "/");

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`group flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-200 ${
                active
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700 shadow-sm"
                  : "border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Icon
                size={20}
                className={`transition-all duration-200 group-hover:scale-110 ${
                  active
                    ? "text-emerald-600"
                    : "text-slate-400 group-hover:text-slate-700"
                }`}
              />

              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Logout */}

      <button
        type="button"
        onClick={handleLogout}
        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition-all duration-200 hover:bg-red-50"
      >
        <LogOut size={20} />
        Logout
      </button>
    </>
  );
}

function SidebarContent({ handleLogout }) {
  return (
    <>
      {/* Logo */}

      <div className="border-b border-slate-200 px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-lg">
            <Store className="h-6 w-6 text-white" />
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              ShoeAdmin
            </h1>

            <p className="mt-0.5 text-sm text-slate-500">Seller Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}

      <div className="flex flex-1 flex-col p-4">
        <NavLinks handleLogout={handleLogout} />{" "}
      </div>
    </>
  );
}

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("sellerToken");
    localStorage.removeItem("sellerRemember"); // optional

    navigate("/seller/login", { replace: true });
  };
  return (
    <>
      {/* Desktop Sidebar */}

      <aside className="fixed inset-y-0 left-0 hidden w-72 flex-col border-r border-slate-200 bg-white lg:flex">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}

      <div className="fixed left-4 top-4 z-50 lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className=" border-slate-200 bg-white shadow-sm"
            >
              <Menu className="h-10 w-10" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="flex w-72 flex-col bg-white p-0">
            <SidebarContent handleLogout={handleLogout} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
