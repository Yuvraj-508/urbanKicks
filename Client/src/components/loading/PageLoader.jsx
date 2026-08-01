import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const messages = [
  "👟 Preparing your sneakers...",
  "🔥 Finding trending styles...",
  "✨ Curating the latest collection...",
  "🚀 Loading premium experience...",
  "💚 Almost ready...",
];

export default function PageLoader({
  title,
  subtitle,
}) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white/90 p-10 shadow-2xl backdrop-blur">
        {/* Floating Shoe */}

        <motion.img
          src="/images/hero-shoe.webp"
          alt="Loading"
          animate={{ y: [0, -12, 0] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mx-auto h-32 w-32 object-contain drop-shadow-2xl"
        />

        {/* Animated Message */}

        <AnimatePresence mode="wait">
          <motion.h2
            key={messageIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="mt-8 text-center text-2xl font-bold text-slate-900"
          >
            {title || messages[messageIndex]}
          </motion.h2>
        </AnimatePresence>

        <p className="mt-3 text-center text-sm leading-6 text-slate-500">
          {subtitle ||
            "Loading the latest collection for you. Your first visit may take a few extra seconds."}
        </p>

        {/* Progress Dots */}

        <div className="mt-8 flex justify-center gap-2">
          {[0, 1, 2].map((dot) => (
            <motion.div
              key={dot}
              animate={{
                y: [0, -6, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: dot * 0.15,
              }}
              className="h-3 w-3 rounded-full bg-emerald-500"
            />
          ))}
        </div>
      </div>
    </div>
  );
}