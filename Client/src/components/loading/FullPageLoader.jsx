import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function FullPageLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="text-center">
        <motion.img
          src="/images/hero-shoe.webp"
          alt="Urban Kicks"
          className="mx-auto w-40 drop-shadow-xl"
          animate={{
            y: [0, -12, 0],
            rotate: [-5, 5, -5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.h1
          className="mt-6 text-3xl font-black tracking-tight text-slate-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.6,
          }}
        >
          URBAN
        </motion.h1>

        <p className="text-sm font-bold tracking-[0.4em] text-emerald-600">
          KICKS
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Loader2 className="h-5 w-5 animate-spin text-emerald-600" />

          <span className="text-sm text-slate-600">
            Loading your next pair...
          </span>
        </div>

        <div className="mx-auto mt-6 h-1 w-56 overflow-hidden rounded-full bg-slate-200">
          <motion.div
            className="h-full rounded-full bg-emerald-600"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.4,
              ease: "linear",
            }}
          />
        </div>
      </div>
    </div>
  );
}