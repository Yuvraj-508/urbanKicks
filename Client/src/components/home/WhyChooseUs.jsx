import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description:
      "Enjoy free delivery across India on orders above ₹999.",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description:
      "Hassle-free 7-day return and exchange policy.",
  },
  {
    icon: ShieldCheck,
    title: "100% Authentic",
    description:
      "Every sneaker is sourced from trusted brands and verified suppliers.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Our support team is always ready to help you.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-slate-50  py-8 lg:py-20">
      <div className="mx-auto max-w-7xl px-5">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >

          <p className="font-semibold uppercase tracking-[0.3em] text-emerald-600">
            WHY CHOOSE US
          </p>

          <h2 className="mt-4 text-3xl  sm:text-4xl font-black text-slate-900 lg:text-5xl">
            Premium Experience,
            <br />
            Every Step of the Way
          </h2>

          <p className="mt-5 text-lg text-slate-500">
            We don't just sell sneakers—we deliver quality,
            comfort, and a shopping experience you'll love.
          </p>

        </motion.div>

        <div className="grid gap-6 grid-cols-2 xl:grid-cols-4">

{features.map((feature, index) => {
  const Icon = feature.icon;

  return (
    <motion.div
      key={feature.title}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: "easeOut",
      }}
      whileHover={{
        y: -10,
        scale: 1.03,
      }}
      className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 lg:p-8 shadow-md transition-all duration-500 hover:border-emerald-300 hover:shadow-2xl"
    >
      {/* Animated Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-transparent to-blue-50 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Icon */}
      <motion.div
        whileHover={{ rotate: 8, scale: 1.12 }}
        transition={{ type: "spring", stiffness: 250 }}
        className="relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-emerald-100 transition-colors duration-300 group-hover:bg-emerald-600"
      >
        <Icon className="h-7 w-7 text-emerald-600 transition-colors duration-300 group-hover:text-white" />
      </motion.div>

      {/* Title */}
      <h3 className="relative mt-5 text-sm sm:text-xl font-bold text-slate-900">
        {feature.title}
      </h3>

      {/* Description */}
      <p className="relative mt-3 text-sm sm:text-base leading-6 sm:leading-7 text-slate-600">
        {feature.description}
      </p>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 h-1 w-0 rounded-r-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500 group-hover:w-full" />
    </motion.div>
  );
})}

        </div>

      </div>
    </section>
  );
}