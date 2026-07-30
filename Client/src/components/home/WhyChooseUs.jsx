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

          <h2 className="mt-4 text-4xl font-black text-slate-900 lg:text-5xl">
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
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-xl"
              >

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">

                  <Icon className="h-7 w-7 text-emerald-600" />

                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-500">
                  {feature.description}
                </p>

              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}