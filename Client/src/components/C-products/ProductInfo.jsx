import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import useCartStore from "@/store/cartStore";
import { useEffect, useState } from "react";
import ColorSwatch from "../product/ColorSwatch";
export default function ProductInfo({
  product,
  selectedVariant,
  setSelectedVariant,
}) {
  const cartItems = useCartStore((state) => state.cartItems);

  const addItem = useCartStore((state) => state.addItem);

  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const removeItem = useCartStore((state) => state.removeItem);

  const [selectedSize, setSelectedSize] = useState("");

  const variant = product.variants?.[selectedVariant] || product.variants?.[0];

  const sizes = variant?.sizes || [];

  const selectedColor = variant?.color?.name || "";

  const totalStock = sizes.reduce((sum, item) => sum + item.stock, 0);
  console.log(totalStock);
  useEffect(() => {
    if (sizes.length) {
      setSelectedSize(sizes[0].size);
    }
  }, [sizes]);

const cartItem = cartItems.find(
  (item) =>
    item.product._id === product._id &&
    item.variantId === variant._id &&
    item.size === selectedSize
);
console.log(cartItems);
  const quantity = cartItem?.quantity || 0;

  const originalPrice = Number(product.price || 0);
  const sellingPrice = Number(product.offerPrice || product.price || 0);

  const discount =
    originalPrice > sellingPrice
      ? Math.round(((originalPrice - sellingPrice) / originalPrice) * 100)
      : 0;

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size.");
      return;
    }

  addItem({
  product,
  quantity: 1,
  size: selectedSize,
  color: variant.color.name,
  variantId: variant._id,
});

    toast.success("Product added to cart!");
  };

  const handleIncrease = () => {
    if (quantity === 0) {
      handleAddToCart();
      return;
    }

    updateQuantity(cartItem.id, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity === 1) {
      removeItem(cartItem.id);
      return;
    }

    updateQuantity(cartItem.id, quantity - 1);
  };

  return (
    <div className="py-2">
      {/* Brand */}

      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
        {product.brand}
      </span>

      {/* Product Name */}

      <h1 className="mt-2 text-3xl font-black leading-tight lg:text-4xl">
        {product.name}
      </h1>

      {/* Category */}

      <p className="mt-2 text-sm text-slate-500">{product.category}</p>

      {/* Price */}

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <span className="text-3xl font-black text-emerald-600">
          ₹{sellingPrice.toLocaleString("en-IN")}
        </span>

        {originalPrice > sellingPrice && (
          <>
            <span className="text-lg text-slate-400 line-through">
              ₹{originalPrice.toLocaleString("en-IN")}
            </span>

            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-600">
              {discount}% OFF
            </span>
          </>
        )}
      </div>

      {/* Stock */}

      <div className="mt-3">
        {totalStock > 0 ? (
          <span className="font-medium text-green-600">
            ✓ In Stock ({totalStock} available)
          </span>
        ) : (
          <span className="font-medium text-red-600">Out of Stock</span>
        )}
      </div>

      {/* Description */}

      <p className="mt-5 text-sm leading-6 text-slate-600">
        {product.description || "No description available."}
      </p>

      {/* Sizes */}

      {sizes.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-bold">Select Size</h3>

          <div className="mt-3 flex flex-wrap gap-2">
            {sizes.map((item) => (
              <button
                key={item.size}
                onClick={() => setSelectedSize(item.size)}
                disabled={item.stock === 0}
                className={`flex h-11 w-11 items-center justify-center rounded-lg border text-sm font-semibold transition ${
                  selectedSize === item.size
                    ? "border-emerald-600 bg-emerald-600 text-white"
                    : item.stock === 0
                      ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
                      : "border-slate-300 hover:border-emerald-600"
                }`}
              >
                {item.size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Colors */}

    <div className="mt-3 flex gap-3">
  {product.variants.map((variant, index) => (
    <button
      key={variant._id || variant.id || index}
      type="button"
      onClick={() => setSelectedVariant(index)}
      title={variant.color?.name}
      className={`rounded-full transition-all ${
        selectedVariant === index
          ? "scale-110 ring-2 ring-emerald-200"
          : "hover:scale-105"
      }`}
    >
      <ColorSwatch
        swatches={variant.color?.swatches}
        title={variant.color?.name}
        size="h-9 w-9"
      />
    </button>
  ))}
</div>
      {/* Buttons */}

      <div className="mt-8 flex gap-3">
        {quantity === 0 ? (
          <Button
            onClick={handleAddToCart}
            disabled={totalStock === 0}
            className="h-12 flex-1 rounded-xl bg-emerald-600 text-base hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ShoppingBag className="mr-2 h-5 w-5" />
            {totalStock > 0 ? "Add to Cart" : "Out of Stock"}
          </Button>
        ) : (
          <div className="flex h-12 flex-1 items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDecrease}
              className="h-9 w-9 rounded-full"
            >
              -
            </Button>

            <span className="text-lg font-bold text-emerald-700">
              {quantity}
            </span>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleIncrease}
              className="h-9 w-9 rounded-full"
            >
              +
            </Button>
          </div>
        )}

        {/* <Button
          variant="outline"
          className="h-12 rounded-xl px-5"
        >
          <Heart className="mr-2 h-5 w-5" />
          Wishlist
        </Button> */}
      </div>
    </div>
  );
}
