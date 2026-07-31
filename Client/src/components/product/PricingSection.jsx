import { IndianRupee, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function PricingSection({
  product,
  setProduct,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const price = Number(product.price) || 0;
  const offerPrice = Number(product.offerPrice) || 0;

  const discount =
    price > 0
      ? Math.round(((price - offerPrice) / price) * 100)
      : 0;

  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="text-lg font-semibold">
          Pricing
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Configure product pricing.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">

        <div>
          <label className="mb-2 block text-sm font-medium">
            Original Price
          </label>

          <div className="relative">
            <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-slate-400" />

            <Input
              type="number"
              min={0}
              name="price"
              value={product.price}
              onChange={handleChange}
              className="pl-9"
              placeholder="7999"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Selling Price
          </label>

          <div className="relative">
            <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-slate-400" />

            <Input
              type="number"
              min={0}
              name="offerPrice"
              value={product.offerPrice}
              onChange={handleChange}
              className="pl-9"
              placeholder="5999"
            />
          </div>
        </div>

      </div>

      {price > 0 && offerPrice > 0 && offerPrice <= price && (
        <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4">

          <div className="flex items-center gap-2">

            <Tag className="h-5 w-5 text-emerald-600" />

            <span className="font-medium text-emerald-700">
              {discount}% OFF
            </span>

          </div>

          <p className="mt-2 text-sm text-slate-600">
            Customer saves ₹{price - offerPrice}
          </p>

        </div>
      )}

    </section>
  );
}