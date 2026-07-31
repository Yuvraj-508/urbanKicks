import { motion } from "framer-motion";
import { Heart, ShoppingBag, Eye, Star } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import ColorSwatch from "../product/ColorSwatch";

export default function TrendingProductCard({ product }) {
  const {
    _id,
    name,
    brand,
    price,
    offerPrice,
    variants,
    totalStock,
    inStock,
    createdAt,
  } = product;

  const originalPrice = Number(price || 0);
  const sellingPrice = Number(offerPrice || price || 0);

  const discount =
    originalPrice > sellingPrice
      ? Math.round(((originalPrice - sellingPrice) / originalPrice) * 100)
      : 0;

  const isNew =
    Date.now() - new Date(createdAt).getTime() < 1000 * 60 * 60 * 24 * 14;

  const firstVariant = variants?.[0];

  const image = firstVariant?.images?.[0]?.url || "/placeholder.png";

  return (
    <motion.article
      whileHover={window.matchMedia("(hover: hover)").matches ? { y: -8 } : {}}
      transition={{ duration: 0.25 }}
      className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-2xl"
    >
      {/* Image */}

      <div className="relative overflow-hidden bg-slate-100">
        <Link to={`/products/${_id}`}>
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="aspect-square w-full object-cover object-center transition duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Discount */}

        {discount > 0 && (
          <span
            className="absolute left-3 top-3
sm:left-4 sm:top-4 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-lg"
          >
            -{discount}%
          </span>
        )}

        {/* New */}

        {isNew && (
          <span
            className=" hidden md:flex absolute left-3 top-12
sm:left-4 sm:top-14 rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold text-white shadow-lg"
          >
            NEW
          </span>
        )}

        {/* Wishlist */}

        <motion.button
          whileTap={{ scale: 0.9 }}
          className="absolute hidden right-4 top-4 rounded-full bg-white p-2 shadow-lg transition hover:bg-emerald-50"
        >
          <Heart className="h-5 w-5" />
        </motion.button>

        {/* Quick View */}

        <div className="absolute inset-x-3 bottom-3 hidden justify-center lg:flex opacity-0 transition duration-300 group-hover:opacity-100">
          {" "}
          <Button
            variant="secondary"
            className="rounded-full shadow-lg"
            asChild
          >
            <Link
              to={`/products/${_id}`}
              className="flex items-center justify-center gap-2"
            >
              <Eye className="mr-2 h-4 w-4  " />
              Quick View
            </Link>
          </Button>
        </div>
      </div>

      {/* Content */}

      <div className="space-y-4 p-4 sm:p-5">
        <div>
          <p className="text-sm font-medium text-slate-500">{brand}</p>

          <Link to={`/products/${_id}`}>
            <h3 className="mt-1 line-clamp-2 text-base sm:text-lg font-bold text-slate-900 transition hover:text-emerald-600">
              {name}
            </h3>
          </Link>
        </div>
    <div className="flex items-center gap-2">
  {variants?.slice(0, 5).map((variant, index) => (
    <ColorSwatch
      key={variant._id || index}
      swatches={variant.color?.swatches}
      title={variant.color?.name}
      size="h-4 w-4"
    />
  ))}

  {variants?.length > 5 && (
    <span className="text-xs text-slate-500">
      +{variants.length - 5}
    </span>
  )}
</div>
        {/* Rating */}

        <div className=" hidden lg:flex  items-center gap-2">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className={`h-4 w-4 ${
                  index < 5
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-slate-300"
                }`}
              />
            ))}
          </div>

          <span className="text-sm text-slate-500">Featured</span>
        </div>

        {/* Price */}

        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xlfont-black text-slate-900">
                ₹{sellingPrice.toLocaleString("en-IN")}
              </span>

              {originalPrice > sellingPrice && (
                <span className="text-sm text-slate-400 line-through">
                  ₹{originalPrice.toLocaleString("en-IN")}
                </span>
              )}
            </div>

            {inStock ? (
              <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                {totalStock} In Stock
              </span>
            ) : (
              <span className="inline-flex rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600">
                Out of Stock
              </span>
            )}
          </div>
        </div>

        {/* Button */}

        <Button
          asChild
          disabled={!inStock}
          className="h-11 sm:h-12 w-full p-2 sm:p-0 rounded-full bg-slate-900 text-white transition-all duration-300 hover:bg-emerald-600 disabled:bg-slate-300"
        >
          <Link
            to={`/products/${_id}`}
            className="flex items-center justify-center gap-2"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>View Product</span>
          </Link>
        </Button>
      </div>
    </motion.article>
  );
}
