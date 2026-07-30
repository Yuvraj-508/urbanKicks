import { useState } from "react";

import CheckoutForm from "@/components/checkout/CheckoutForm";
import OrderSummary from "@/components/checkout/OrderSummary";

export default function Checkout() {
  const [address, setAddress] = useState(null);

  return (
    <section className="py-5">
      <div className="mx-auto max-w-7xl px-5">
        <h1 className="mb-8 text-4xl font-black">
          Checkout
        </h1>

        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <CheckoutForm
            address={address}
            setAddress={setAddress}
          />

          <OrderSummary
            address={address}
          />
        </div>
      </div>
    </section>
  );
}