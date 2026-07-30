import { useEffect, useState } from "react";

export default function ProductGallery({ product }) {
  console.log(product);
const images = product?.images?.map((img) => img.url) || [];
const [selectedImage, setSelectedImage] = useState("");

useEffect(() => {
  if (images.length) {
    setSelectedImage(images[0]);
  }
}, [product?._id]);

  if (!product) return null;

  return (
    <div className="space-y-4">

      {/* Main Image */}

      <div className="flex h-[350px] lg:h-[470px] items-center justify-center overflow-hidden rounded-2xl border bg-slate-50 p-4">

        <img
          src={selectedImage}
          alt={product.name}
          className="max-h-full max-w-full object-contain transition duration-300 hover:scale-105"
        />

      </div>

      {/* Thumbnails */}

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">

          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(image)}
              className={`overflow-hidden rounded-xl border p-2 transition ${
                selectedImage === image
                  ? "border-emerald-600 ring-2 ring-emerald-200"
                  : "border-slate-200 hover:border-emerald-400"
              }`}
            >
              <img
                src={image}
                alt={`${product.name} ${index + 1}`}
                className="h-16  w-full object-contain"
              />
            </button>
          ))}

        </div>
      )}

    </div>
  );
}