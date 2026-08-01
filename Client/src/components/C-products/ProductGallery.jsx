import { optimizeCloudinaryImage } from "@/lib/cloudinary";
import { useEffect, useState } from "react";

export default function ProductGallery({
  product,
  selectedVariant,
}) {
  const currentVariant =
    product?.variants?.[selectedVariant] ||
    product?.variants?.[0];

 const images =
  currentVariant?.images?.map((img) =>
    optimizeCloudinaryImage(img.url, 900, 900)
  ) || [];
  const [selectedImage, setSelectedImage] = useState("");
  
useEffect(() => {
  if (currentVariant?.images?.length) {
    setSelectedImage(currentVariant.images[0].url);
  } else {
    setSelectedImage("");
  }
}, [selectedVariant]);

  // ✅ return AFTER hooks
  if (!product) return null;

  return (
    <div className="space-y-4">
      {/* Main Image */}

      <div className="flex h-[350px] items-center justify-center overflow-hidden rounded-2xl border bg-slate-50 p-4 lg:h-[470px]">
        {selectedImage ? (
          <img
            src={selectedImage}
            alt={product.name}
              loading="eager"
  fetchPriority="high"
  decoding="async"

            className="max-h-full max-w-full object-contain transition duration-300 hover:scale-105"
          />
        ) : (
          <div className="text-sm text-slate-400">
            No Image Available
          </div>
        )}
      </div>

      {/* Thumbnails */}

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setSelectedImage(image)}
              className={`overflow-hidden rounded-xl border p-2 transition ${
                selectedImage === image
                  ? "border-emerald-600 ring-2 ring-emerald-200"
                  : "border-slate-200 hover:border-emerald-400"
              }`}
            >
              <img
                src={image}
                  loading="lazy"
  decoding="async"
                alt={`${product.name} ${index + 1}`}
                className="h-16 w-full object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}