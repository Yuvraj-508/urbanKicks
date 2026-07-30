import { ArrowRight, Clock3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { motion } from "framer-motion";

export default function FlashSale() {
  return (
    <section className="px-5 lg:py-10 py-5">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-700 p-8 text-white lg:p-12"
      >
        {/* Background Glow */}

        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          {/* Left */}

          <div className="max-w-xl">

            <div className="inline-flex items-center gap-2 rounded-full bg-red-500 px-4 py-2 text-sm font-semibold">

              <Clock3 className="h-4 w-4" />

              Flash Sale

            </div>

            <h2 className="mt-5 text-4xl font-black leading-tight lg:text-6xl">
              Up to
              <span className="block text-yellow-300">
                50% OFF
              </span>
            </h2>

            <p className="mt-4 text-slate-200">
              Limited-time offers on premium sneakers. Don't miss
              your chance to grab your favourite pair at the best
              price.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">

              <Button
                size="lg"
                className="h-12 rounded-full bg-white px-8 text-slate-900 hover:bg-slate-100"
              >
                Shop Deals

                <ArrowRight className="ml-2 h-4 w-4" />

              </Button>

              <Button
                variant="outline"
                size="lg"
                className="h-12 rounded-full border-white  hover:bg-white text-slate-900 hover:text-slate-900"
                asChild
              >
                <Link to="/all-products">
                  View All
                </Link>
              </Button>

            </div>

          </div>

          {/* Right */}

          <div className="grid grid-cols-3 gap-3">

            <div className="rounded-2xl bg-white/10 p-5 text-center backdrop-blur">

              <p className="text-3xl font-black">
                12
              </p>

              <span className="text-sm text-slate-300">
                Hours
              </span>

            </div>

            <div className="rounded-2xl bg-white/10 p-5 text-center backdrop-blur">

              <p className="text-3xl font-black">
                45
              </p>

              <span className="text-sm text-slate-300">
                Minutes
              </span>

            </div>

            <div className="rounded-2xl bg-white/10 p-5 text-center backdrop-blur">

              <p className="text-3xl font-black">
                29
              </p>

              <span className="text-sm text-slate-300">
                Seconds
              </span>

            </div>

          </div>

        </div>

      </motion.div>
    </section>
  );
}