import { Link } from "react-router";

import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import EmptyCart from "@/components/cart/EmptyCart";

import useCartStore from "@/store/cartStore";

export default function Cart() {
  const cartItems = useCartStore((state) => state.cartItems);

  if (!cartItems.length) {
    return <EmptyCart />;
  }

  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-black">
            Shopping Cart
          </h1>

          <Link
            to="/all-products"
            className="font-medium text-emerald-600"
          >
            Continue Shopping
          </Link>
        </div>

        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-5">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
              />
            ))}
          </div>

          <CartSummary />
        </div>
      </div>
    </section>
  );
}