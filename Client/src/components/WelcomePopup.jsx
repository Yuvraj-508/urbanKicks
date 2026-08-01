import { lazy, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
const Confetti = lazy(() =>
    import("react-confetti")
);
import {
  Sparkles,
  Footprints,
  Star,
  Truck,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Suspense } from "react";

export default function WelcomePopup() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [celebrate, setCelebrate] = useState(false);
  const [savedName, setSavedName] = useState("");

  const openTimerRef = useRef(null);
  const closeTimerRef = useRef(null);

  const hour = new Date().getHours();

  const greeting =
    hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  useEffect(() => {
    const expiry = localStorage.getItem("uk_welcome_expiry");
    const storedName = localStorage.getItem("uk_user_name") || "";

    setSavedName(storedName);

    if (storedName) {
      setName(storedName);
    }

    // remove expiry
    if (expiry && Date.now() > Number(expiry)) {
      localStorage.removeItem("uk_welcome");
      localStorage.removeItem("uk_welcome_expiry");
    }

    const shouldShow = !localStorage.getItem("uk_welcome");

    if (shouldShow) {
      openTimerRef.current = setTimeout(() => {
        setOpen(true);

        closeTimerRef.current = setTimeout(() => {
          finish(false);
        }, 20000);
      }, 2500);
    }

    return () => {
      clearTimeout(openTimerRef.current);
      clearTimeout(closeTimerRef.current);
    };
  }, []);

  const stopAutoClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
  };

const finish = (showConfetti = true) => {
  clearTimeout(closeTimerRef.current);

  const finalName = savedName || name.trim();

  if (finalName) {
    localStorage.setItem("uk_user_name", finalName);
    localStorage.setItem("uk_welcome", "true");
    localStorage.setItem(
      "uk_welcome_expiry",
      (Date.now() + 4 * 60 * 60 * 1000).toString()
    );
  }

if (showConfetti && finalName) {
  setCelebrate(true);

  setTimeout(() => {
    setOpen(false);
  }, 300);

  setTimeout(() => {
    setCelebrate(false);
  }, 2000);
} else {
  setOpen(false);
}
};

  return (
    <AnimatePresence>
      {open && (
        <motion.div>
   

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 p-5 backdrop-blur-md"
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 40,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: 30,
              }}
              transition={{
                duration: 0.35,
              }}
              className="relative w-full max-w-lg overflow-hidden rounded-[34px] border border-white/30 bg-white shadow-[0_30px_80px_rgba(0,0,0,0.25)]"
            >
              {/* Background */}

              <div className="absolute -left-28 -top-28 h-72 w-72 rounded-full bg-emerald-400/20 blur-[120px]" />

              <div className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-blue-500/20 blur-[120px]" />

              {/* Floating Sneaker */}

              <motion.img
                src="/images/hero-shoe.webp"
                alt="Sneaker"
                 loading="lazy"
                animate={{
                  y: [0, -12, 0],
                  rotate: [-18, -15, -18],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                }}
                className="pointer-events-none absolute -right-12 top-6 w-44 opacity-20 select-none"
              />

              <div className="relative z-10 p-6 sm:p-8">
                {/* Logo */}

                <motion.div
                  animate={{
                    rotate: [0, -8, 8, -8, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                  }}
                  className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-xl"
                >
                  <Sparkles className="h-10 w-10 text-white" />
                </motion.div>

                <h1 className="mt-6 text-center text-4xl font-black tracking-tight text-slate-900">
                  URBAN
                </h1>

                <p className="text-center text-xs font-bold tracking-[0.45em] text-emerald-600">
                  KICKS
                </p>

                <motion.h2
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="mt-8 text-center text-3xl font-black text-slate-900"
                >
                  {greeting} 👋
                </motion.h2>

                <p className="mx-auto mt-4 max-w-md text-center leading-7 text-slate-600">
                  Welcome to <strong>Urban Kicks</strong>.
                  <br />
                  Discover premium sneakers designed for athletes, creators and
                  everyday explorers.
                </p>

                {/* Input Card */}

                <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  {savedName ? (
                    <div className="text-center">
                      <div className="mb-3 flex items-center justify-center gap-2">
                        <Star className="h-5 w-5 text-emerald-600" />
                        <span className="font-semibold">Welcome back!</span>
                      </div>

                      <h3 className="text-2xl font-bold text-slate-900">
                        {savedName.toLocaleUpperCase()} 👋
                      </h3>

                      <p className="mt-2 text-sm text-slate-500">
                        Glad to see you again. Explore our latest premium
                        sneakers.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="mb-4 flex items-center gap-2">
                        <Footprints className="h-5 w-5 text-emerald-600" />

                        <span className="font-semibold">
                          What should we call you?
                        </span>
                      </div>

                      <Input
                        value={name}
                        placeholder="Enter your name..."
                        className="h-12 rounded-xl border-slate-300 focus-visible:ring-emerald-500"
                        onFocus={stopAutoClose}
                        onChange={(e) => setName(e.target.value.toUpperCase())}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            finish();
                          }
                        }}
                      />
                    </>
                  )}
                </div>
                {/* Buttons */}

                <div className="mt-8 flex gap-3">
                  <Button
                    variant="outline"
                    className="h-12 flex-1 rounded-xl border-slate-300"
                    onClick={() => {
                      if (savedName) {
                        finish(false);
                      } else {
                        setOpen(false); // Don't save anything
                      }
                    }}
                  >
                    Skip
                  </Button>

                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex-1"
                  >
                    <Button
                      onClick={() => finish(true)}
                      className="h-12 w-full rounded-xl bg-emerald-600 font-semibold text-white transition hover:bg-emerald-700"
                    >
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
       <Suspense fallback={null}>
  {celebrate && (
    <Confetti
      recycle={false}
      numberOfPieces={280}
      width={window.innerWidth}
      height={window.innerHeight}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
      }}
    />
  )}
</Suspense>
    </AnimatePresence>
  );
}
