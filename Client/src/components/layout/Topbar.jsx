import { Bell, Plus, Search, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Topbar() {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Left */}

        <div className="flex flex-1 items-center gap-4">
          {/* Space for Mobile Menu */}

          <div className="w-12 lg:hidden" />

          {/* Search */}

          <div className="relative hidden w-full max-w-lg md:block">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <Input
              placeholder="Search products, orders..."
              className="h-11 rounded-xl border-slate-200 bg-slate-50 pl-10 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Right */}

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Add Product */}

          <Button
            onClick={() => navigate("/seller/products/add")}
            className="hidden rounded-xl bg-emerald-600 px-5 hover:bg-emerald-700 sm:flex"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>

          {/* Mobile Add */}

          <Button
            size="icon"
            onClick={() => navigate("/seller/products/add")}
            className="rounded-xl bg-emerald-600 transition-all hover:scale-105 hover:bg-emerald-700 sm:hidden"
          >
            <Plus className="h-5 w-5" />
          </Button>

          {/* Notifications */}

          <Button
            variant="outline"
            size="icon"
            className="relative h-11 w-11 rounded-xl border-slate-200"
          >
            <Bell className="h-5 w-5 text-slate-600" />

            <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
          </Button>

          {/* User */}

          <button className="flex items-center gap-3 rounded-xl border border-slate-200 px-2 py-1.5 transition hover:bg-slate-50">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-emerald-700 font-semibold text-white">
                K
              </AvatarFallback>
            </Avatar>

            <div className="hidden text-left lg:block">
              <p className="text-sm font-semibold text-slate-900">Krishna</p>

              <p className="text-xs text-slate-500">Owner</p>
            </div>

            <ChevronDown className="hidden h-4 w-4 text-slate-500 lg:block" />
          </button>
        </div>
      </div>

      {/* Mobile Search */}

      <div className="border-t border-slate-200 bg-white p-4 md:hidden">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <Input
            placeholder="Search..."
            className="h-11 rounded-xl border-slate-200 bg-slate-50 pl-10 focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>
      </div>
    </header>
  );
}
