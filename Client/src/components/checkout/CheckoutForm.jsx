import { useState } from "react";

import AddressCard from "./AddressCard";
import PaymentMethod from "./PaymentMethods";
// import CouponBox from "./CouponBox";

export default function CheckoutForm({
  address,
  setAddress,
  delivery,
  setDelivery,
   payment,
  setPayment,
}) {

  return (
    <div className="space-y-3">
<AddressCard
  address={address}
  setAddress={setAddress}
/>
      {/* Delivery Method */}

      <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <h2 className="mb-5 text-xl font-bold">Delivery Method</h2>

        <div className="grid gap-3 md:grid-cols-2">
          <button
            onClick={() => setDelivery("standard")}
            className={`rounded-xl border p-4 text-left transition-all ${
              delivery === "standard"
                ? "border-emerald-600 bg-emerald-50 ring-1 ring-emerald-200"
                : "hover:border-emerald-400"
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">Standard</h3>

              <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                FREE
              </span>
            </div>

            <p className="mt-1 text-sm text-slate-500">3–5 Business Days</p>
          </button>

          <button
            onClick={() => setDelivery("express")}
            className={`rounded-xl border p-4 text-left transition-all ${
              delivery === "express"
                ? "border-emerald-600 bg-emerald-50 ring-1 ring-emerald-200"
                : "hover:border-emerald-400"
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">Express</h3>

              <span className="rounded-full bg-orange-100 px-2.5 py-1 text-xs font-semibold text-orange-700">
                ₹199
              </span>
            </div>

            <p className="mt-1 text-sm text-slate-500">1–2 Business Days</p>
          </button>
        </div>
      </div>

      <PaymentMethod payment={payment} setPayment={setPayment} />
    </div>
  );
}
