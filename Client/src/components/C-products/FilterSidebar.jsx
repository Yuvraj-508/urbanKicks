import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

const brands = [
  "Nike",
  "Adidas",
  "Puma",
  "New Balance",
  "Jordan",
];

const sizes = [6, 7, 8, 9, 10, 11];

const colors = [
  "#000",
  "#fff",
  "#16a34a",
  "#2563eb",
  "#dc2626",
];

export default function FilterSidebar() {
  return (
    <div className="sticky top-28 space-y-8 rounded-3xl border bg-white p-6 shadow-sm">

      {/* Brand */}

      <div>

        <h3 className="font-bold">
          Brand
        </h3>

        <div className="mt-4 space-y-3">

          {brands.map((brand) => (

            <label
              key={brand}
              className="flex items-center gap-3"
            >
              <Checkbox />

              <span>{brand}</span>

            </label>

          ))}

        </div>

      </div>

      {/* Price */}

      <div>

        <h3 className="font-bold">
          Price
        </h3>

        <Slider
          defaultValue={[2500]}
          max={10000}
          step={100}
          className="mt-5"
        />

        <div className="mt-3 flex justify-between text-sm text-slate-500">

          <span>₹500</span>

          <span>₹10,000</span>

        </div>

      </div>

      {/* Colors */}

      <div>

        <h3 className="font-bold">
          Colors
        </h3>

        <div className="mt-4 flex flex-wrap gap-3">

          {colors.map((color) => (

            <button
              key={color}
              style={{ background: color }}
              className="h-8 w-8 rounded-full border shadow"
            />

          ))}

        </div>

      </div>

      {/* Sizes */}

      <div>

        <h3 className="font-bold">
          Sizes
        </h3>

        <div className="mt-4 grid grid-cols-3 gap-3">

          {sizes.map((size) => (

            <button
              key={size}
              className="rounded-xl border py-2 text-sm transition hover:bg-emerald-600 hover:text-white"
            >
              {size}
            </button>

          ))}

        </div>

      </div>

    </div>
  );
}