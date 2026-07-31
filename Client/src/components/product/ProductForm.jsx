import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import BasicInformation from "./BasicInformation";
import PricingSection from "./PricingSection";
import VariantSection from "./VariantSection";
import ProductPreview from "./ProductPreview";
import ProductDetailss from "./ProductDetailss";

export default function ProductForm({
  onSubmit,
  initialData = null,
  loading = false,
}) {


const emptyProduct = {
  name: "",
  brand: "",
  category: "",
  gender: "men",

  description: "",

  price: "",
  offerPrice: "",

  featured: false,
  bestseller: false,
  newArrival: false,
  sale: false,

  active: true,

  tags: [],

  variants: [],
};

  const [product, setProduct] = useState(emptyProduct);


  useEffect(() => {
  if (!initialData) return;

  setProduct({
    ...initialData,

    tags: initialData.tags || [],

variants: (initialData.variants || []).map((variant) => ({
  ...variant,

  id: variant.id || variant._id || crypto.randomUUID(),

  color: {
    name: variant.color?.name || "",

    swatches:
      variant.color?.swatches ||
      [
        {
          name: variant.color?.name || "",
          value: variant.color?.value || "#000000",
        },
      ],
  },

  images: variant.images || [],

  sizes: variant.sizes || [],
})),
  });
}, [initialData]);


  const validate = () => {
    if (!product.name.trim())
      return toast.error("Product name is required.");

    if (!product.brand.trim())
      return toast.error("Brand is required.");

    if (!product.category)
      return toast.error("Please select a category.");

    if (!product.price)
      return toast.error("Original price is required.");

    if (!product.offerPrice)
      return toast.error("Selling price is required.");

    if (Number(product.offerPrice) > Number(product.price))
      return toast.error(
        "Selling price cannot be greater than original price."
      );

    if (product.variants.length === 0)
      return toast.error("Please add at least one variant.");

    for (const variant of product.variants) {
      if (!variant.color.name.trim())
        return toast.error("Variant color is required.");

      if (variant.images.length === 0)
        return toast.error(
          `${variant.color.name || "Variant"} needs at least one image.`
        );

      if (variant.sizes.length === 0)
        return toast.error(
          `${variant.color.name || "Variant"} needs at least one size.`
        );

      for (const size of variant.sizes) {
        if (!size.size)
          return toast.error(
            `Please enter a size for ${variant.color.name}.`
          );

        if (size.stock < 0)
          return toast.error("Stock cannot be negative.");
      }
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    if (validate() !== true) return;

    onSubmit(product);
  };

  return (
    <div className="relative">
      {loading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/70 backdrop-blur-sm">
          <div className="w-[320px] rounded-2xl border bg-white p-6 shadow-xl">
            <div className="flex flex-col items-center">
              <Loader2 className="h-10 w-10 animate-spin text-emerald-600" />

              <h3 className="mt-4 text-lg font-semibold">
                {initialData
                  ? "Updating Product"
                  : "Creating Product"}
              </h3>

              <p className="mt-2 text-center text-sm text-slate-500">
                Please wait while we save your product.
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <fieldset
          disabled={loading}
          className={`transition-all ${
            loading ? "opacity-70" : ""
          }`}
        >
          <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
            {/* Left Column */}
            <div className="space-y-6">
              <BasicInformation
                product={product}
                setProduct={setProduct}
              />

              <PricingSection
                product={product}
                setProduct={setProduct}
              />

              <ProductDetailss
                product={product}
                setProduct={setProduct}
              />

              <VariantSection
                product={product}
                setProduct={setProduct}
              />

              {/* <SeoSection
                product={product}
                setProduct={setProduct}
              /> */}
            </div>

            {/* Right Column */}
            <div>
              <ProductPreview product={product} />
            </div>
          </div>

          <div className="sticky bottom-0 mt-8 border-t bg-white/95 px-6 py-4 backdrop-blur">
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={loading}
                className="min-w-[180px]"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />

                    {initialData
                      ? "Updating..."
                      : "Publishing..."}
                  </>
                ) : initialData ? (
                  "Update Product"
                ) : (
                  "Publish Product"
                )}
              </Button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
}