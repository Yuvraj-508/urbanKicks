import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import VariantCard from "./VariantCard";

import { v4 as uuidv4 } from "uuid";

const createVariant = () => ({
  id: uuidv4(),

  color: {
    name: "",
    swatches: [
      {
        name: "",
        value: "#000000",
      },
    ],
  },

  sku: "",

  images: [],

  sizes: [],

  inStock: true,
});

export default function VariantSection({
  product,
  setProduct,
}) {
  const addVariant = () => {
    setProduct((prev) => ({
      ...prev,
      variants: [
        ...prev.variants,
        createVariant(),
      ],
    }));
  };

  const updateVariant = (index, variant) => {
    setProduct((prev) => {
      const variants = [...prev.variants];

      variants[index] = variant;

      return {
        ...prev,
        variants,
      };
    });
  };

  const removeVariant = (index) => {
    setProduct((prev) => ({
      ...prev,
      variants: prev.variants.filter(
        (_, i) => i !== index
      ),
    }));
  };

  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">

      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-lg font-semibold">
            Product Variants
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Every color has its own sizes and images.
          </p>
        </div>

        <Button onClick={addVariant}>
          <Plus className="mr-2 h-4 w-4" />
          Add Variant
        </Button>

      </div>

      <div className="mt-6 space-y-6">

        {product.variants.map((variant, index) => (
          <VariantCard
            key={variant.id}
            index={index}
            variant={variant}
            onChange={(v) =>
              updateVariant(index, v)
            }
            onRemove={() =>
              removeVariant(index)
            }
          />
        ))}

      </div>

    </section>
  );
}