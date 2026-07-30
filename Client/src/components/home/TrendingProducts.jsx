import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
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
const messages = [
  "👟 Preparing your sneakers...",
  "🚚 Loading latest arrivals...",
  "🔥 Finding trending products...",
  "✨ Almost ready...",
];

const [loadingMessage, setLoadingMessage] = useState(messages[0]);

useEffect(() => {
  if (!loading) return;

  let current = 0;

  const interval = setInterval(() => {
    current = (current + 1) % messages.length;
    setLoadingMessage(messages[current]);
  }, 2500);

  return () => clearInterval(interval);
}, [loading]);

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
  <div className="py-10">
    {/* Loader */}
    <div className="mb-10 flex flex-col items-center justify-center">
      <div className="relative">
        <img
          src="/images/hero-shoe.png"
          alt="Loading"
          className="h-28 w-28 animate-bounce object-contain"
        />

        <div className="absolute inset-0 animate-ping rounded-full bg-emerald-400/20"></div>
      </div>

      <h3 className="mt-6 text-2xl font-bold text-slate-900 transition-all duration-500">
  {loadingMessage}
</h3>

      <p className="mt-2 max-w-md text-center text-slate-500">
        Our server is waking up and loading the latest collection.
        This usually takes a few seconds on your first visit.
      </p>

      {/* Loading Dots */}

      <div className="mt-6 flex gap-2">
        <span className="h-3 w-3 animate-bounce rounded-full bg-emerald-500 [animation-delay:-0.3s]" />
        <span className="h-3 w-3 animate-bounce rounded-full bg-emerald-500 [animation-delay:-0.15s]" />
        <span className="h-3 w-3 animate-bounce rounded-full bg-emerald-500" />
      </div>
    </div>

    {/* Skeleton Products */}

    <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-3xl border bg-white p-4 shadow-sm"
        >
          <div className="aspect-square animate-pulse rounded-2xl bg-slate-200"></div>

          <div className="mt-4 h-4 w-24 animate-pulse rounded bg-slate-200"></div>

          <div className="mt-3 h-6 w-full animate-pulse rounded bg-slate-200"></div>

          <div className="mt-5 h-8 w-32 animate-pulse rounded bg-slate-200"></div>

          <div className="mt-6 h-12 animate-pulse rounded-full bg-slate-200"></div>
        </div>
      ))}
    </div>
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