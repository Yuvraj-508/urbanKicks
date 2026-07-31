import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Package,
  ShoppingCart,
  Users,
  IndianRupee,
  ArrowUpRight,
  AlertTriangle,
  TrendingUp,
  Clock3,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";

import { getDashboard } from "@/services/dashboard.service";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    products: 0,
    variants: 0,
    inventory: 0,
  });

  const [lowStockProducts, setLowStockProducts] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const response = await getDashboard();

      setStats(response.stats);
      setLowStockProducts(response.lowStockProducts);
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to load dashboard.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center rounded-2xl bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="rounded-full bg-emerald-50 p-5">
            <Loader2 className="h-10 w-10 animate-spin text-emerald-600" />
          </div>

          <div className="text-center">
            <h3 className="text-lg font-semibold text-slate-900">
              Loading Dashboard...
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Please wait while we prepare your dashboard.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}

      <section className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Welcome back 👋
          </h1>

          <p className="mt-2 text-slate-500">
            Here's what's happening in your store today.
          </p>
        </div>

        <Button
          onClick={() => navigate("/seller/products")}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          View Products
        </Button>
      </section>

      {/* Stats */}

      <section className="grid grid-cols-2 gap-5 xl:grid-cols-4">
        <StatCard
          title="Products"
          value={stats.products}
          change="Live"
          icon={<Package className="h-5 w-5" />}
          color="bg-blue-100 text-blue-600"
        />

        <StatCard
          title="Variants"
          value={stats.variants}
          change="Live"
          icon={<TrendingUp className="h-5 w-5" />}
          color="bg-emerald-100 text-emerald-600"
        />

        <StatCard
          title="Inventory"
          value={stats.inventory}
          change="Live"
          icon={<Package className="h-5 w-5" />}
          color="bg-violet-100 text-violet-600"
        />

        <StatCard
          title="Revenue"
          value="Coming Soon"
          change=""
          icon={<IndianRupee className="h-5 w-5" />}
          color="bg-orange-100 text-orange-600"
        />
      </section>
      <section className="grid gap-6 xl:grid-cols-3">
        {/* Recent Orders */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Recent Orders</h2>

              <p className="text-sm text-slate-500">
                Order management is under development
              </p>
            </div>

            <Badge variant="secondary" className="bg-slate-100 text-slate-600">
              Coming Soon
            </Badge>
          </div>

          <div className="flex h-72 flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50">
            <Clock3 className="mb-4 h-12 w-12 text-slate-400" />

            <h3 className="text-lg font-semibold text-slate-800">
              Orders Module Coming Soon
            </h3>

            <p className="mt-2 max-w-md text-center text-sm text-slate-500">
              Recent orders, payment status, customer purchases and order
              analytics will appear here once the Orders module is completed.
            </p>
          </div>
        </div>

        {/* Low Stock */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-orange-100 p-3">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
            </div>

            <div>
              <h2 className="font-semibold">Low Stock</h2>

              <p className="text-sm text-slate-500">
                Products that need restocking
              </p>
            </div>
          </div>

          {lowStockProducts.length === 0 ? (
            <div className="flex h-52 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50">
              <div className="text-center">
                <Package className="mx-auto mb-3 h-10 w-10 text-emerald-500" />

                <h3 className="font-semibold text-slate-800">Great Job!</h3>

                <p className="mt-1 text-sm text-slate-500">
                  No low stock products found.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {lowStockProducts.map((product) => (
                <div
                  key={product._id}
                  className="rounded-xl border border-slate-200 p-4 transition hover:border-orange-200 hover:bg-orange-50"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{product.name}</h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {product.color} • Only {product.stock} left
                      </p>
                    </div>

                    <ArrowUpRight className="h-5 w-5 text-slate-400" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
function StatCard({ title, value, icon, color, change }) {
  const isComingSoon = value === "Coming Soon";

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <h2
            className={`mt-3 font-bold ${
              isComingSoon
                ? "text-lg text-slate-400"
                : "text-3xl text-slate-900"
            }`}
          >
            {value}
          </h2>

          {isComingSoon ? (
            <div className="mt-4">
              <Badge
                variant="secondary"
                className="bg-slate-100 text-slate-600 hover:bg-slate-100"
              >
                Coming Soon
              </Badge>
            </div>
          ) : (
            <div className="mt-4 flex items-center gap-1 text-sm font-medium text-emerald-600">
              <TrendingUp className="h-4 w-4" />

              {change}

              <span className="font-normal text-slate-500">Connected</span>
            </div>
          )}
        </div>

        <div
          className={`rounded-2xl p-3 transition-transform duration-300 group-hover:scale-110 ${color}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
