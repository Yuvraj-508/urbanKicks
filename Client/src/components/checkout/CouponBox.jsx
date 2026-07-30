import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CouponBox() {
  const [coupon, setCoupon] = useState("");

  const applyCoupon = () => {
    console.log("Coupon:", coupon);

    // Future API Integration
  };

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-2xl font-bold">
        Coupon
      </h2>

      <div className="flex gap-3">

        <Input
          value={coupon}
          onChange={(e) =>
            setCoupon(e.target.value)
          }
          placeholder="Enter coupon"
        />

        <Button
          onClick={applyCoupon}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          Apply
        </Button>

      </div>

    </div>
  );
}