import Confetti from "react-confetti";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ReviewSuccess() {
  return (
    <>
      <Confetti
        recycle={false}
        numberOfPieces={250}
      />

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        className="overflow-hidden rounded-[36px] border border-slate-200 bg-white p-10 shadow-xl"
      >
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 className="h-14 w-14 text-emerald-600" />
        </div>

        <h1 className="mt-8 text-center text-4xl font-black text-slate-900">
          Thank You!
        </h1>

        <p className="mx-auto mt-4 max-w-md text-center leading-7 text-slate-500">
          Your review has been submitted successfully.

          <br />

          Thank you for helping other sneaker lovers
          make better buying decisions.
        </p>

        <div className="mt-10 rounded-3xl bg-emerald-50 p-6 text-center">
          <h3 className="text-lg font-bold text-emerald-700">
            ❤️ We Appreciate Your Support
          </h3>

          <p className="mt-3 text-sm text-slate-600">
            Every review helps us improve our products
            and service.
          </p>
        </div>

        <Button
          className="mt-10 h-14 w-full rounded-2xl bg-emerald-600 text-lg hover:bg-emerald-700"
        >
          Continue Shopping

          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </motion.div>
    </>
  );
}