import { motion } from "framer-motion";
import { ChevronRight, Package2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProductHero({products}) {
  return (
    <section className="relative overflow-hidden border-b bg-gradient-to-b from-slate-50 via-white to-slate-100">
      {/* Background Glow */}

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-emerald-300/20 blur-[130px]" />

        <div className="absolute -left-20 top-24 h-72 w-72 rounded-full bg-blue-200/15 blur-[120px]" />

        <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-emerald-200/20 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-5 lg:py-8">
        {/* Breadcrumb */}

        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 text-sm text-slate-500"
        >
          <Link to="/" className="transition hover:text-emerald-600">
            Home
          </Link>

          <ChevronRight className="h-4 w-4" />

          <span className="font-medium text-slate-900">Products</span>
        </motion.div>

        {/* Hero Content */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          {/* Left */}

          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              <Package2 className="h-4 w-4" />
              ALL COLLECTIONS
            </span>

            <h1 className="mt-4 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Premium Sneakers
            </h1>

            <p className="mt-5 hidden lg:flex max-w-[480px] text-base leading-8 text-slate-600"> Explore our latest collection of premium sneakers designed for comfort, performance, and everyday style. </p>

          </div>



  
        </motion.div>
      </div>
    </section>
  );
}
