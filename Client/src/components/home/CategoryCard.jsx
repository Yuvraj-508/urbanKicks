import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { motion } from "framer-motion";

export default function CategoryCard({
  title,
  subtitle,
  image,
  link,
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.25 }}
    >
      <Link
        to={link}
        className="group relative block overflow-hidden rounded-2xl"
      >
        {/* Image */}

        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-64 lg:h-72"
        />

        {/* Overlay */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

        {/* Content */}

        <div className="absolute inset-x-0 bottom-0 p-5 text-white">

          <p className="text-xs font-medium uppercase tracking-wider text-white/80">
            {subtitle}
          </p>

          <h3 className="mt-1 text-2xl font-black lg:text-3xl">
            {title}
          </h3>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur-sm transition-all group-hover:bg-emerald-500">

            <span>Explore</span>

            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />

          </div>

        </div>

      </Link>
    </motion.div>
  );
}