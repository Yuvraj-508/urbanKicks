import { useMemo } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function RatingSelector({
  rating,
  setRating,
}) {
  const message = useMemo(() => {
    switch (rating) {
      case 1:
        return {
          emoji: "😞",
          text: "We're sorry to hear that.",
        };

      case 2:
        return {
          emoji: "😕",
          text: "We'll do better next time.",
        };

      case 3:
        return {
          emoji: "🙂",
          text: "Thanks for your feedback.",
        };

      case 4:
        return {
          emoji: "😍",
          text: "Awesome! Glad you liked it.",
        };

      case 5:
        return {
          emoji: "🤩",
          text: "Fantastic! You made our day.",
        };

      default:
        return {
          emoji: "👟",
          text: "Tap a star to rate your purchase.",
        };
    }
  }, [rating]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-lg"
    >
      <h2 className="text-xl font-bold text-slate-900">
        How was your purchase?
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Your honest feedback helps other shoppers.
      </p>

      <div className="mt-8 flex justify-center gap-3">
        {Array.from({ length: 5 }).map((_, index) => {
          const active = rating >= index + 1;

          return (
            <motion.button
              whileHover={{
                scale: 1.2,
              }}
              whileTap={{
                scale: 0.9,
              }}
              key={index}
              onClick={() => setRating(index + 1)}
              className="rounded-full"
            >
              <Star
                className={`h-12 w-12 transition-all ${
                  active
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-slate-300"
                }`}
              />
            </motion.button>
          );
        })}
      </div>

      <motion.div
        key={rating}
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="mt-8 text-center"
      >
        <div className="text-5xl">
          {message.emoji}
        </div>

        <p className="mt-3 font-semibold text-slate-700">
          {message.text}
        </p>
      </motion.div>
    </motion.div>
  );
}