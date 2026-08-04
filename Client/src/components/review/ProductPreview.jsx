import { BadgeCheck, PackageCheck, Truck } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductPreview({ product }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-lg"
    >
      <div className="grid gap-6 p-5 md:grid-cols-[180px_1fr] md:p-7">
        {/* Image */}

        <div className="flex items-center justify-center rounded-3xl bg-slate-100 p-5">
          <img
            src={product.image}
            alt={product.name}
            className="h-44 object-contain transition duration-300 hover:scale-105"
          />
        </div>

        {/* Info */}

        <div className="flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              <BadgeCheck className="h-4 w-4" />
              Verified Purchase
            </div>

            <h2 className="mt-4 text-2xl font-black text-slate-900">
              {product.name}
            </h2>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-slate-50 p-3">
                <p className="text-xs text-slate-500">Color</p>
                <p className="mt-1 font-bold">
                  {product.color}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-3">
                <p className="text-xs text-slate-500">Size</p>
                <p className="mt-1 font-bold">
                  {product.size}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">
            <Truck className="h-4 w-4 text-emerald-600" />
            {product.delivered}
          </div>
        </div>
      </div>
    </motion.div>
  );
}