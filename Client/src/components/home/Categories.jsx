import CategoryCard from "./CategoryCard";

const categories = [
  {
    title: "Sneakers",
    subtitle: "Everyday style",
    image:
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f",
    link: "/all-products?category=sneakers",
  },
  {
    title: "Sports",
    subtitle: "High-performance footwear",
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
    link: "/all-products?category=sports",
  },
  {
    title: "Boots",
    subtitle: "Rugged & durable",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772",
    link: "/all-products?category=boots",
  },
  {
    title: "Casual",
    subtitle: "Comfort for every day",
    image:
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
    link: "/all-products?category=casual",
  },
];

export default function Categories() {
  return (
    <section className="py-6 lg:py-20">

      <div className="mx-auto max-w-7xl px-5">

        <div className="mb-10 text-center">

          <p className="font-semibold uppercase tracking-[0.3em] text-emerald-600">
            Categories
          </p>

          <h2 className="mt-3 text-4xl font-black text-slate-900 lg:text-5xl">
            Shop by Category
          </h2>

          <p className="mt-4 text-slate-500">
            Find the perfect pair for every occasion.
          </p>

        </div>

        <div className="grid gap-6 grid-cols-2 ">

          {categories.map((category) => (
            <CategoryCard
              key={category.title}
              {...category}
            />
          ))}

        </div>

      </div>

    </section>
  );
}