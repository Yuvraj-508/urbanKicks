import { useState } from "react";
import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import useCartStore from "@/store/cartStore";
export default function ProductInfo({ product }) {
const cartItems = useCartStore((state) => state.cartItems);

const addItem = useCartStore((state) => state.addItem);

const updateQuantity = useCartStore(
  (state) => state.updateQuantity
);

const removeItem = useCartStore(
  (state) => state.removeItem
);

  const [selectedSize, setSelectedSize] = useState(
    product.sizes?.[0] || ""
  );

  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0]?.value ||
      product.colors?.[0]?.hex ||
      ""
  );

  const cartItem = cartItems.find(
  (item) =>
    item.product._id === product._id &&
    item.size === selectedSize &&
    item.color === selectedColor
);

const quantity = cartItem?.quantity || 0;

  const originalPrice = Number(product.price || 0);
  const sellingPrice = Number(
    product.offerPrice || product.price || 0
  );

  const discount =
    originalPrice > sellingPrice
      ? Math.round(
          ((originalPrice - sellingPrice) /
            originalPrice) *
            100
        )
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
  color: selectedColor,
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

      <p className="mt-2 text-sm text-slate-500">
        {product.category}
      </p>

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
        {product.inStock ? (
          <span className="font-medium text-green-600">
            ✓ In Stock ({product.stock} available)
          </span>
        ) : (
          <span className="font-medium text-red-600">
            Out of Stock
          </span>
        )}
      </div>

      {/* Description */}

      <p className="mt-5 text-sm leading-6 text-slate-600">
        {product.description ||
          "No description available."}
      </p>

      {/* Sizes */}

      {product.sizes?.length > 0 && (
        <div className="mt-6">

          <h3 className="text-sm font-bold">
            Select Size
          </h3>

          <div className="mt-3 flex flex-wrap gap-2">

            {product.sizes.map((size) => (

              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`flex h-11 w-11 items-center justify-center rounded-lg border text-sm font-semibold transition ${
                  selectedSize === size
                    ? "border-emerald-600 bg-emerald-600 text-white"
                    : "border-slate-300 hover:border-emerald-600"
                }`}
              >
                {size}
              </button>

            ))}

          </div>

        </div>
      )}

      {/* Colors */}

      {product.colors?.length > 0 && (
        <div className="mt-6">

          <h3 className="text-sm font-bold">
            Colors
          </h3>

          <div className="mt-3 flex gap-3">

            {product.colors.map((color, index) => {

              const value =
                color.value ||
                color.hex ||
                "#000";

              return (
                <button
                  key={index}
                  onClick={() =>
                    setSelectedColor(value)
                  }
                  style={{
                    backgroundColor: value,
                  }}
                  className={`h-9 w-9 rounded-full border-2 transition ${
                    selectedColor === value
                      ? "scale-110 border-black"
                      : "border-slate-300"
                  }`}
                />
              );

            })}

          </div>

        </div>
      )}

      {/* Buttons */}

      <div className="mt-8 flex gap-3">

{quantity === 0 ? (
  <Button
    onClick={handleAddToCart}
    disabled={!product.inStock}
    className="h-12 flex-1 rounded-xl bg-emerald-600 text-base hover:bg-emerald-700"
  >
    <ShoppingBag className="mr-2 h-5 w-5" />
    {product.inStock ? "Add to Cart" : "Out of Stock"}
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