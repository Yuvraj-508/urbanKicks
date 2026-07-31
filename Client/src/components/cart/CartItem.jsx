import { Minus, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import useCartStore from "@/store/cartStore";
import { Badge } from "../ui/badge";
import ColorSwatch from "../product/ColorSwatch";

export default function CartItem({ item }) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const removeItem = useCartStore((state) => state.removeItem);

  const product = item.product;

  const price = Number(product.offerPrice || product.price || 0);

  const currentVariant =
    product.variants?.find((variant) => variant._id === item.variantId) ||
    product.variants?.[0];

  const image =
    currentVariant?.images?.[0]?.url ||
    product.variants?.[0]?.images?.[0]?.url ||
    "/placeholder.png";

  const increaseQty = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const decreaseQty = () => {
    if (item.quantity === 1) return;

    updateQuantity(item.id, item.quantity - 1);
  };

  const handleRemove = () => {
    removeItem(item.id);
  };

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:shadow-md">
      {/* Mobile Layout */}

      <div className="flex gap-4 lg:hidden">
        {/* Product Image */}

        <div className="flex h-28 w-28 flex-shrink-0 items-center justify-center rounded-xl bg-slate-100">
          <img
            src={image}
            alt={product.name}
            className="h-24 w-24 object-contain transition duration-300 group-hover:scale-105"
          />
        </div>

        {/* Right */}

        <div className="flex flex-1 flex-col">
          {/* Header */}

          <div className="flex items-start justify-between">
            <div>
              <h2 className="line-clamp-1 text-base font-bold">
                {product.name}
              </h2>

              <p className="mt-1 text-sm text-slate-500">{product.brand}</p>
            </div>

            <Button
              variant="ghost"
              size="icon-sm"
              className="rounded-full text-red-500 hover:bg-red-50 hover:text-red-600"
              onClick={handleRemove}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>

          {/* Chips */}

          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium">
              Size {item.size}
            </span>

            <span className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium">
              <ColorSwatch
                swatches={currentVariant?.color?.swatches}
                title={currentVariant?.color?.name}
                size="h-3.5 w-3.5"
              />

              {currentVariant?.color?.name}
            </span>
          </div>

          {/* Price */}

          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-xl font-bold text-emerald-600">
                ₹{price.toLocaleString("en-IN")}
              </p>

              {product.offerPrice && (
                <p className="text-xs text-slate-400 line-through">
                  ₹{Number(product.price).toLocaleString("en-IN")}
                </p>
              )}
            </div>

            <div className="rounded-xl bg-emerald-50 px-3 py-2">
              <p className="text-[10px] uppercase tracking-wide text-slate-500">
                Total
              </p>

              <p className="font-bold text-emerald-700">
                ₹{(price * item.quantity).toLocaleString("en-IN")}
              </p>
            </div>
          </div>
          {/* Quantity */}

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 p-1">
              <Button
                variant="ghost"
                size="icon-sm"
                className="rounded-lg"
                onClick={decreaseQty}
                disabled={item.quantity === 1}
              >
                <Minus className="size-4" />
              </Button>

              <span className="w-8 text-center text-sm font-bold">
                {item.quantity}
              </span>

              <Button
                variant="ghost"
                size="icon-sm"
                className="rounded-lg"
                onClick={increaseQty}
              >
                <Plus className="size-4" />
              </Button>
            </div>

            <p className="text-xs font-medium text-slate-500">Qty</p>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}

      {/* Desktop Layout */}

      <div className="hidden lg:flex gap-6 items-center">
        {/* Image */}
        <div className="flex h-36 w-36 items-center justify-center rounded-2xl bg-slate-100">
          <img
            src={image}
            alt={product.name}
            className="h-32 w-32 object-contain"
          />
        </div>

        {/* Product Info */}
        {/* Product Info */}

        <div className="flex-1">
          <h2 className="text-xl font-bold">{product.name}</h2>

          <p className="mt-1 text-slate-500">{product.brand}</p>

          <div className="mt-4 flex gap-3">
            <Badge variant="secondary">Size {item.size}</Badge>

            <Badge variant="secondary" className="gap-2">
              <ColorSwatch
                swatches={currentVariant?.color?.swatches}
                title={currentVariant?.color?.name}
                size="h-3.5 w-3.5"
              />

              {currentVariant?.color?.name}
            </Badge>
          </div>

          {/* Price */}

          <div className="mt-5">
            <p className="text-2xl font-bold text-emerald-600">
              ₹{price.toLocaleString("en-IN")}
            </p>

            {product.offerPrice && (
              <p className="mt-1 text-sm text-slate-400 line-through">
                ₹{Number(product.price).toLocaleString("en-IN")}
              </p>
            )}
          </div>
        </div>

        {/* Right Side */}

        {/* Right Section */}

        <div className="flex h-full min-w-[220px] flex-col justify-between">
          {/* Quantity */}

          <div className="flex flex-col items-end">
            <p className="mb-3 text-sm font-semibold text-slate-600">
              Quantity
            </p>

            <div className="flex w-fit items-center rounded-2xl border border-slate-200 bg-slate-50 p-1">
              <Button
                variant="ghost"
                size="icon-sm"
                className="rounded-xl hover:bg-white"
                onClick={decreaseQty}
                disabled={item.quantity === 1}
              >
                <Minus className="size-4" />
              </Button>

              <span className="flex w-10 items-center justify-center text-lg font-bold">
                {item.quantity}
              </span>

              <Button
                variant="ghost"
                size="icon-sm"
                className="rounded-xl hover:bg-white"
                onClick={increaseQty}
              >
                <Plus className="size-4" />
              </Button>
            </div>
          </div>

          {/* Subtotal */}

          <div className="my-8 rounded-2xl bg-emerald-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Subtotal
            </p>

            <p className="mt-1 text-3xl font-bold text-emerald-600">
              ₹{(price * item.quantity).toLocaleString("en-IN")}
            </p>
          </div>

          {/* Remove */}

          <Button
            variant="outline"
            className="w-full rounded-2xl border-red-200 text-red-600 hover:border-red-300 hover:bg-red-50 hover:text-red-700"
            onClick={handleRemove}
          >
            <Trash2 className="mr-2 size-4" />
            Remove Item
          </Button>
        </div>
      </div>
    </div>
  );
}
