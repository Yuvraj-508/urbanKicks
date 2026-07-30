import { useState } from "react";

import CheckoutForm from "@/components/checkout/CheckoutForm";
import OrderSummary from "@/components/checkout/OrderSummary";

export default function Checkout() {
const [address, setAddress] = useState(null);
const [delivery, setDelivery] = useState("standard");
const [payment, setPayment] = useState("upi");

  return (
<section className="py-5">
  <div className="mx-auto w-full max-w-7xl px-4 sm:px-5">
        <h1 className="mb-8 text-4xl font-black">
          Checkout
        </h1>

      <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
  <div className="min-w-0">
<CheckoutForm
  address={address}
  setAddress={setAddress}
  delivery={delivery}
  setDelivery={setDelivery}
  payment={payment}
  setPayment={setPayment}
/>
  </div>

  <div className="min-w-0">
<OrderSummary
  address={address}
  delivery={delivery}
    payment={payment}

/>  </div>
</div>
      </div>
    </section>
  );
}