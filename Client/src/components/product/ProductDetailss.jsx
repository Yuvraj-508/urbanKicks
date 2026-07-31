import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

const tags = [
  "Running",
  "Lifestyle",
  "Sports",
  "Gym",
  "Walking",
  "Training",
];

export default function ProductDetailss({
  product,
  setProduct,
}) {
  const toggleSwitch = (field) => {
    setProduct((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const toggleTag = (tag) => {
    const exists = product.tags.includes(tag);

    setProduct((prev) => ({
      ...prev,
      tags: exists
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="text-lg font-semibold">
          Product Details
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Configure visibility and merchandising.
        </p>
      </div>

      <div className="space-y-5">

        <div className="flex items-center justify-between">
          <span>Featured Product</span>

          <Switch
            checked={product.featured}
            onCheckedChange={() =>
              toggleSwitch("featured")
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <span>Best Seller</span>

          <Switch
            checked={product.bestseller}
            onCheckedChange={() =>
              toggleSwitch("bestseller")
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <span>New Arrival</span>

          <Switch
            checked={product.newArrival}
            onCheckedChange={() =>
              toggleSwitch("newArrival")
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <span>Sale Product</span>

          <Switch
            checked={product.sale}
            onCheckedChange={() =>
              toggleSwitch("sale")
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <span>Active</span>

          <Switch
            checked={product.active}
            onCheckedChange={() =>
              toggleSwitch("active")
            }
          />
        </div>

      </div>

      <div className="mt-8">

        <label className="mb-3 block text-sm font-medium">
          Tags
        </label>

        <div className="flex flex-wrap gap-3">

          {tags.map((tag) => (
            <button
              type="button"
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`rounded-full border px-4 py-2 text-sm transition
                ${
                  product.tags.includes(tag)
                    ? "border-emerald-600 bg-emerald-600 text-white"
                    : "border-slate-200 bg-white hover:border-emerald-500"
                }`}
            >
              {tag}
            </button>
          ))}

        </div>

      </div>

      {/* <div className="mt-8">

        <label className="mb-2 block text-sm font-medium">
          Slug
        </label>

        <Input
          value={product.slug}
          onChange={(e) =>
            setProduct((prev) => ({
              ...prev,
              slug: e.target.value,
            }))
          }
          placeholder="nike-air-max-270-black"
        />

      </div> */}

    </section>
  );
}