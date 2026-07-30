import { Link, useNavigate } from "react-router";
import {
  Heart,
  ShoppingBag,
  Eye,
  Minus,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import useCartStore from "@/store/cartStore";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const {
    cartItems,
    addItem,
    updateQuantity,
    removeItem,
  } = useCartStore();

  const image =
    product?.images?.[0]?.url ||
    "/images/placeholder.png";

  const secondImage =
    product?.images?.[1]?.url || image;

  const originalPrice = Number(product.price ?? 0);

  const sellingPrice = Number(
    product.offerPrice ?? product.price ?? 0
  );

  const discount =
    originalPrice > sellingPrice
      ? Math.round(
          ((originalPrice - sellingPrice) /
            originalPrice) *
            100
        )
      : 0;

  const cartItem = cartItems.find(
    (item) => item.product._id === product._id
  );

  const quantity = cartItem?.quantity || 0;

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      product,
      quantity: 1,
    });
  };

  const handleIncrease = (e) => {
    e.preventDefault();
    e.stopPropagation();

    updateQuantity(
      cartItem.id,
      quantity + 1
    );
  };

  const handleDecrease = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (quantity === 1) {
      removeItem(cartItem.id);
    } else {
      updateQuantity(
        cartItem.id,
        quantity - 1
      );
    }
  };

  return (
    <Link
      to={`/products/${product._id}`}
      className="group block overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* IMAGE */}

      <div className="relative overflow-hidden bg-slate-50">

        {discount > 0 && (
          <span className="absolute left-3 top-3 z-20 rounded-full bg-red-500 px-2.5 py-1 text-[11px] font-bold text-white">
            {discount}% OFF
          </span>
        )}

        {!product.inStock ? (
          <span className="absolute right-3 top-3 z-20 rounded-full bg-red-600 px-2.5 py-1 text-[11px] font-semibold text-white">
            SOLD OUT
          </span>
        ) : product.stock <= 5 ? (
          <span className="absolute right-3 top-3 z-20 rounded-full bg-orange-500 px-2.5 py-1 text-[11px] font-semibold text-white">
            {product.stock} Left
          </span>
        ) : null}

        <Button
          size="icon"
          variant="secondary"
          className="absolute bottom-3 left-3 z-20 h-9 w-9 rounded-full"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Heart className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant="secondary"
          className="absolute bottom-3 right-3 z-20 h-9 w-9 rounded-full"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            navigate(`/products/${product._id}`);
          }}
        >
          <Eye className="h-4 w-4" />
        </Button>

        <img
          src={image}
          alt={product.name}
          className={`aspect-square w-full object-contain p-4 transition duration-500 ${
            product.images?.length > 1
              ? "group-hover:scale-105 group-hover:opacity-0"
              : "group-hover:scale-105"
          }`}
        />

        {product.images?.length > 1 && (
          <img
            src={secondImage}
            alt={product.name}
            className="absolute inset-0 aspect-square w-full object-contain p-4 opacity-0 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
          />
        )}
      </div>

      {/* CONTENT */}

      <div className="space-y-3 p-4">

        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
          {product.brand}
        </p>

        <h3 className="line-clamp-2 min-h-[48px] text-base font-bold leading-6 text-slate-900 group-hover:text-emerald-600">
          {product.name}
        </h3>

        {product.sizes?.length > 0 && (
          <div className="flex gap-2">
            {product.sizes
              .slice(0, 3)
              .map((size) => (
                <span
                  key={size}
                  className="flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold"
                >
                  {size}
                </span>
              ))}

            {product.sizes.length > 3 && (
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold">
                +{product.sizes.length - 3}
              </span>
            )}
          </div>
        )}
                {/* Price */}

        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-emerald-600">
                ₹{sellingPrice.toLocaleString("en-IN")}
              </span>

              {originalPrice > sellingPrice && (
                <span className="text-sm text-slate-400 line-through">
                  ₹{originalPrice.toLocaleString("en-IN")}
                </span>
              )}
            </div>

            {discount > 0 && (
              <p className="text-xs font-medium text-red-500">
                Save ₹
                {(originalPrice - sellingPrice).toLocaleString(
                  "en-IN"
                )}
              </p>
            )}
          </div>
        </div>

        {/* Add To Cart / Quantity */}

        {quantity === 0 ? (
          <Button
            disabled={!product.inStock}
            onClick={handleAdd}
            className="h-11 w-full rounded-xl bg-emerald-600 text-sm font-semibold transition hover:bg-emerald-700"
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        ) : (
          <div className="flex h-11 items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={handleDecrease}
              className="h-8 w-8 rounded-full hover:bg-white"
            >
              <Minus className="h-4 w-4" />
            </Button>

            <span className="text-base font-bold text-emerald-700">
              {quantity}
            </span>

            <Button
              size="icon"
              variant="ghost"
              onClick={handleIncrease}
              className="h-8 w-8 rounded-full hover:bg-white"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </Link>
  );
}