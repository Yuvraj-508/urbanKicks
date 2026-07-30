import { motion } from "framer-motion";
import { ArrowRight, Star, Truck, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100">
      {/* Background Effects */}

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-300/35 blur-[170px]" />
        <div className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-blue-200/20 blur-[120px]" />

        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-emerald-200/30 blur-[140px]" />

        <div className="absolute left-20 top-24 h-4 w-4 rounded-full bg-emerald-300" />

        <div className="absolute right-32 top-40 h-3 w-3 rounded-full bg-blue-300" />

        <div className="absolute bottom-32 left-1/3 h-2 w-2 rounded-full bg-emerald-500" />
      </div>

      <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-center px-5 lg:pt-25 pt-10 pb-16 lg:min-h-screen lg:flex-row lg:items-center lg:justify-between">
        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left"
        >
          <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold tracking-wide text-emerald-700 shadow-sm">
            🔥 NEW COLLECTION 2026
          </span>

          <h1 className="mt-8 text-[44px] font-black leading-[0.95] tracking-tight text-slate-900 sm:text-6xl lg:text-8xl">
            STEP INTO
            <span className="mt-2 block bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
              GREATNESS
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-lg text-base leading-8 text-slate-600 sm:text-lg lg:mx-0">
            Discover premium sneakers crafted for athletes, creators, and
            everyday explorers. Designed with modern comfort, bold aesthetics,
            and performance that keeps up with every step.
          </p>

          {/* Buttons */}

          <div className="mt-10 flex  items-center justify-center gap-4 sm:items-start sm:justify-start">
            <Button 
              asChild
              size="lg"
              className="h-14  rounded-full bg-emerald-600 px-8 text-base font-semibold shadow-lg transition hover:bg-emerald-700 sm:w-auto"
            >
              <Link
                to="/all-products"
                className="flex items-center justify-center"
              >
                Shop Now
                <ArrowRight className="ml-2 size-5" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-14  rounded-full border-slate-300 px-8 text-base sm:w-auto"
            >
              <Link
                to="/all-products"
                className="flex items-center justify-center"
              >
                Explore Collection
              </Link>
            </Button>
          </div>

          {/* Feature Cards */}

          <div className="mt-10 grid grid-cols-3 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border bg-white p-4 shadow-sm">
              <Star className="mx-auto h-6 w-6 fill-yellow-400 text-yellow-400 lg:mx-0" />

              <h4 className="mt-3 font-bold">4.9 Rating</h4>

              <p className="text-sm text-slate-500">Trusted worldwide</p>
            </div>

            <div className="rounded-2xl border bg-white p-4 shadow-sm">
              <Truck className="mx-auto h-6 w-6 text-emerald-600 lg:mx-0" />

              <h4 className="mt-3 font-bold">Free Shipping</h4>

              <p className="text-sm text-slate-500">Across India</p>
            </div>

            <div className="rounded-2xl border bg-white p-4 shadow-sm">
              <RotateCcw className="mx-auto h-6 w-6 text-emerald-600 lg:mx-0" />

              <h4 className="mt-3 font-bold">Easy Returns</h4>

              <p className="text-sm text-slate-500">7-day returns</p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mt-14 flex flex-1 justify-center lg:mt-0"
        >
          <motion.div
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
            }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-full bg-emerald-300 blur-[120px] opacity-50" />

            <img
              src="/images/hero-shoe.png"
              alt="Urban Kicks Sneaker"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="relative z-10 w-full max-w-[780px] drop-shadow-[0_70px_90px_rgba(0,0,0,0.35)]"
            />

            {/* Floating Price Card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
              }}
            >
              <div className="absolute left-4 bottom-24  rounded-2xl bg-white p-5 shadow-2xl lg:block">
                <p className="text-sm text-slate-500">Starting From</p>

                <h3 className="mt-1 text-3xl font-black text-emerald-600">
                  ₹2,299
                </h3>
              </div>
            </motion.div>
            {/* Floating Customers Card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
              }}
            >
              <div className="absolute -right-1 -top-30  rounded-2xl bg-white p-5 shadow-2xl lg:block">
                <p className="text-sm text-slate-500">Happy Customers</p>

                <h3 className="mt-1 text-3xl font-black text-slate-900">
                  18K+
                </h3>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Stats */}

      <div className="hidden lg:flex relative border-t border-slate-200/70 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-5 py-10">
          <div className="grid gap-4 grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="text-4xl font-black text-emerald-600">18K+</h3>

              <p className="mt-2 text-slate-500">Happy Customers</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="text-4xl font-black text-emerald-600">250+</h3>

              <p className="mt-2 text-slate-500">Premium Styles</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="text-4xl font-black text-emerald-600">40+</h3>

              <p className="mt-2 text-slate-500">Premium Brands</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
