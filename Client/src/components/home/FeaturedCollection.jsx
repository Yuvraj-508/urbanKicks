import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";

export default function FeaturedCollection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[2rem] bg-slate-900"
        >
          {/* Background */}

          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-900" />

          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />

          <div className="absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

          <div className="relative grid items-center gap-12 px-8 py-12 lg:grid-cols-2 lg:px-16 lg:py-16">

            {/* Left */}

            <div className="text-center lg:text-left">

              <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold tracking-wider text-emerald-300">
                FEATURED COLLECTION
              </span>

              <h2 className="mt-6 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
                Summer
                <span className="block text-emerald-400">
                  Street Edition
                </span>
              </h2>

              <p className="mt-6 max-w-lg text-lg leading-8 text-slate-300">
                Discover lightweight sneakers crafted for
                everyday comfort, modern fashion, and
                all-day performance.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">

                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-emerald-600 hover:bg-emerald-700"
                >
                  <Link to="/products">

                    Shop Collection

                    <ArrowRight className="ml-2 h-5 w-5" />

                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="rounded-full"
                >
                  <Link to="/products?featured=true">
                    Explore More
                  </Link>
                </Button>

              </div>

            </div>

            {/* Right */}

            <div className="relative flex justify-center">

              <motion.img
                animate={{
                  y: [0, -12, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                }}
                src="/images/featured-shoe.png"
                alt="Featured Sneaker"
                className="relative z-10 w-full max-w-md drop-shadow-[0_40px_80px_rgba(0,0,0,0.45)]"
              />

              <div className="absolute inset-0 rounded-full bg-emerald-400/20 blur-[120px]" />

            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}