import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import TrendingProductCard from "./TrendingProductCard";
import { Button } from "@/components/ui/button";

import useProductStore from "@/store/productStore";

export default function TrendingProducts() {
  const products = useProductStore((state) => state.products);
  const loading = useProductStore((state) => state.loading);
  const error = useProductStore((state) => state.error);

  const trendingProducts = products
    .filter((product) => product.inStock)
    .slice(0, 4);

  return (
    <section className="py-8">
      <div className="mx-auto max-w-7xl px-5">
        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <p className="font-semibold uppercase tracking-[0.25em] text-emerald-600">
            Trending
          </p>

          <h2 className="mt-2 text-4xl font-black text-slate-900 lg:text-5xl">
            Trending Products
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-500">
            Discover our latest arrivals and customer-favorite sneakers,
            designed for comfort, performance, and everyday style.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="h-[420px] animate-pulse rounded-3xl bg-slate-100"
              />
            ))}
          </div>
        ) : error ? (
          <div className="py-20 text-center text-red-500">
            {error}
          </div>
        ) : (
          <>
            <div className="grid  gap-6 grid-cols-2 lg:grid-cols-4">
              {trendingProducts.map((product) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35 }}
                >
                  <TrendingProductCard product={product} />
                </motion.div>
              ))}
            </div>

            <div className="mt-14 flex justify-center">
              <Button
                asChild
                className="rounded-full px-8 py-6 text-base"
              >
                <Link to="/all-products"
                className=" flex items-center justify-center top-2  gap-2">
                  View All Products
                  <ArrowRight className="ml-2 relative  h-4 w-4" />
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}