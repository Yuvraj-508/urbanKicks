import { motion } from "framer-motion";

const options = [
  "Comfortable",
  "Premium Quality",
  "Worth the Price",
  "Perfect Fit",
  "Looks Amazing",
  "Fast Delivery",
  "Stylish",
  "Good Packaging",
  "Highly Recommend",
  "Lightweight",
];

export default function ExperienceTags({
  tags,
  setTags,
}) {
  const toggleTag = (tag) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((item) => item !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  return (
    <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-lg">
      <h2 className="text-xl font-bold">
        What did you like?
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Select all that apply.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        {options.map((tag) => {
          const active = tags.includes(tag);

          return (
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                active
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-emerald-50"
              }`}
            >
              {tag}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}