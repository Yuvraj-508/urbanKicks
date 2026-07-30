import { Link } from "react-router";

import { Button } from "@/components/ui/button";

import useCartStore from "@/store/cartStore";

export default function CartSummary() {
  const subtotal = useCartStore((state) =>
    state.subtotal()
  );

  const clearCart = useCartStore(
    (state) => state.clearCart
  );

  const shipping = subtotal > 999 ? 0 : 99;

  const discount = 0;

  const total = subtotal + shipping - discount;

  return (
    <div className="sticky top-24 rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold">
        Order Summary
      </h2>

      <div className="mt-6 space-y-4">
        <div className="flex justify-between">
          <span>Subtotal</span>

          <span>
            ₹{subtotal.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>

          <span>
            {shipping === 0
              ? "Free"
              : `₹${shipping}`}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Discount</span>

          <span>₹{discount}</span>
        </div>

        <hr />

        <div className="flex justify-between text-xl font-bold">
          <span>Total</span>

          <span>
            ₹{total.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      <Link to="/checkout">
        <Button className="mt-8 h-12 w-full rounded-xl bg-emerald-600 hover:bg-emerald-700">
          Proceed to Checkout
        </Button>
      </Link>

      <Button
        variant="outline"
        onClick={clearCart}
        className="mt-3 h-12 w-full rounded-xl"
      >
        Clear Cart
      </Button>
    </div>
  );
}