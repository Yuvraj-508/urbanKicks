import { Badge } from "@/components/ui/badge";

export default function ProductPreview({
  product,
}) {
  const firstVariant = product.variants[0];

const firstImage = firstVariant?.images?.[0];

const previewImage = firstImage
  ? firstImage instanceof File
    ? URL.createObjectURL(firstImage)
    : firstImage.url
  : null;

  return (
    <div className="sticky top-6 rounded-2xl border bg-white p-5 shadow-sm">

      <h2 className="mb-5 text-lg font-semibold">
        Live Preview
      </h2>

      <div className="overflow-hidden rounded-xl border">

        <div className="aspect-square bg-slate-100">

       {previewImage ? (
  <img
    src={previewImage}
    className="h-full w-full object-cover"
    alt={product.name}
  />
) : (
            <div className="flex h-full items-center justify-center text-slate-400">
              No Image
            </div>
          )}

        </div>

        <div className="space-y-3 p-4">

          <h3 className="font-semibold">
            {product.name || "Product Name"}
          </h3>

          <div className="flex gap-3">

            <span className="font-bold text-emerald-600">
              ₹{product.offerPrice || 0}
            </span>

            <span className="text-slate-400 line-through">
              ₹{product.price || 0}
            </span>

          </div>

          <div className="flex flex-wrap gap-2">

            {product.featured && (
              <Badge>Featured</Badge>
            )}

            {product.sale && (
              <Badge variant="secondary">
                Sale
              </Badge>
            )}

            {product.newArrival && (
              <Badge>
                New Arrival
              </Badge>
            )}

          </div>

          <p className="text-sm text-slate-500">
            {product.description ||
              "Description"}
          </p>

        </div>

      </div>

    </div>
  );
}