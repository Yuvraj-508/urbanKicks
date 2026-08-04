import { motion } from "framer-motion";
import { ArrowRight, Star, Truck, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100">
      {/* Background Effects — blur radius/size scaled down on mobile.
          Large blur() filters are expensive on Android GPUs; stacking
          three of them full-size was a likely cause of the crashing /
          garbled rendering. */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-300/35 blur-[60px] sm:h-[460px] sm:w-[460px] sm:blur-[110px] lg:h-[620px] lg:w-[620px] lg:blur-[100px]" />

        <div className="absolute -left-24 top-1/3 hidden h-72 w-72 rounded-full bg-blue-200/20 blur-[80px] sm:block lg:blur-[120px]" />

        <div className="absolute -right-24 bottom-0 hidden h-80 w-80 rounded-full bg-emerald-200/30 blur-[90px] sm:block lg:blur-[140px]" />

        <div className="absolute left-20 top-24 hidden h-4 w-4 rounded-full bg-emerald-300 sm:block" />
        <div className="absolute right-32 top-40 hidden h-3 w-3 rounded-full bg-blue-300 sm:block" />
        <div className="absolute bottom-32 left-1/3 hidden h-2 w-2 rounded-full bg-emerald-500 sm:block" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col-reverse items-center justify-center gap-10 px-4 pt-10 pb-8 min-h-[80vh] sm:px-6 sm:pb-12 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:pt-24">
        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0  }}
          animate={{ opacity: 1}}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left"
        >
          <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold tracking-wide text-emerald-700 shadow-sm">
            🔥 BEST COLLECTION 2026
          </span>

          <h1 className="mt-8 text-4xl sm:text-6xl lg:text-8xl font-black leading-[0.95] tracking-tight text-slate-900">
            STEP INTO
            <span className="mt-2 block bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
              GREATNESS
            </span>
          </h1>

          <p className="mx-auto hidden mt-5 max-w-lg text-sm leading-6 text-slate-600 sm:mt-7 sm:text-base sm:leading-7 lg:mx-0 lg:text-lg lg:leading-8">
            Discover premium sneakers crafted for athletes, creators, and
            everyday explorers. Designed with modern comfort, bold
            aesthetics, and performance that keeps up with every step.
          </p>

          {/* Buttons */}

          <div className="mt-10 flex w-full items-center justify-center gap-3 md:justify-start">
            {/* Shop Now */}
            <Button
              asChild
              size="lg"
              className="group h-14 flex-1 rounded-full bg-emerald-600 px-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-emerald-700 hover:shadow-xl sm:flex-none sm:px-8"
            >
              <Link
                to="/all-products"
                className="flex h-full w-full items-center justify-center"
              >
                <span>Shop Now</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>

            {/* Explore Collection */}
            <Button
              asChild
              size="lg"
              variant="outline"
              className="group h-14 flex-1 rounded-full border-slate-300 px-4 text-base font-semibold transition-all duration-300 hover:border-emerald-600 hover:bg-emerald-50 hover:text-emerald-600 sm:flex-none sm:px-8"
            >
              <Link
                to="/all-products"
                className="flex h-full w-full items-center justify-center"
              >
                <span>Explore Collection</span>
              </Link>
            </Button>
          </div>

          {/* Feature Cards */}

          <div className="mt-15 grid grid-cols-3 gap-2 sm:grid-cols-3">
            <div className="rounded-2xl border bg-white p-4 shadow-sm">
              <Star className="mx-auto h-6 w-6 fill-yellow-400 text-yellow-400 lg:mx-0" />
              <h4 className="mt-3 font-bold">4.9 Rating</h4>
              <p className="text-sm text-slate-500">Trusted Platform</p>
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
          className="relative mt-5 flex flex-1 justify-center lg:mt-0"
        >
          {/* Continuous bob moved to a single CSS keyframe animation
              instead of two nested infinite Framer Motion loops.
              CSS animations run on the compositor thread and are far
              cheaper on Android GPUs than JS-driven transforms. */}
          <div className="relative animate-float">
            <div className="absolute inset-0 rounded-full bg-emerald-300 blur-[60px] opacity-50 sm:blur-[90px] lg:blur-[120px]" />

       <img
  src="/images/hero-shoe.webp"
  alt="Urban Kicks Sneaker"
  width="780"
  height="780"
  loading="eager"
  fetchPriority="high"
  decoding="async"
  className="relative z-10 mx-auto w-full max-w-[320px] sm:max-w-[450px] md:max-w-[550px] lg:max-w-[720px] xl:max-w-[780px] drop-shadow-[0_40px_60px_rgba(0,0,0,0.30)]"
/>

            {/* Floating Price Card — hidden on small screens, was
                previously always visible and overlapping content on
                mobile with no room for it */}
            <div className="absolute left-4 bottom-24 hidden animate-float-slow rounded-2xl bg-white p-5 shadow-2xl lg:block">
              <p className="text-sm text-slate-500">Starting From</p>
              <h3 className="mt-1 text-3xl font-black text-emerald-600">
                ₹2,299
              </h3>
            </div>

            {/* Floating Customers Card — fixed invalid "-top-30" class
                (not a real Tailwind utility, was a no-op) and hidden
                on mobile for the same reason as above */}
            <div className="absolute -right-1 -top-28 hidden animate-float-slow rounded-2xl bg-white p-5 shadow-2xl lg:block">
              <p className="text-sm text-slate-500">Happy Customers</p>
              <h3 className="mt-1 text-3xl font-black text-slate-900">1K+</h3>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Stats */}

      <div className="hidden lg:flex relative border-t border-slate-200/70 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-5 py-5">
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