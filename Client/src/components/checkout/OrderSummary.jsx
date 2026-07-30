import { useState } from "react";
import { ShieldCheck, RotateCcw, Truck, Tag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import useCartStore from "@/store/cartStore";
import OrderSuccessDialog from "./OrderSuccessDialog";
import ButtonLoader from "../loading/ButtonLoader";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export default function OrderSummary({ address, delivery, payment }) {
  const Navigate = useNavigate();
  const [orderId, setOrderId] = useState("");
  const [open, setOpen] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const cartItems = useCartStore((state) => state.cartItems);

  const subtotal = cartItems.reduce((total, item) => {
    const price = item.product.offerPrice ?? item.product.price;

    return total + price * item.quantity;
  }, 0);
  const generateOrderId = () => {
    return `UK-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  };

  const shipping = delivery === "express" ? 199 : subtotal >= 999 ? 0 : 99;

  const total = Math.max(subtotal + shipping - discount, 0);

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();

    if (code === "SAVE100") {
      setDiscount(100);
    } else if (code === "SAVE500" && subtotal >= 7000) {
      setDiscount(500);
    } else {
      toast.error("Invalid Coupon");
      setDiscount(0);
    }
  };

  const sendOrderEmail = async (id) => {
    const formData = new FormData();

    formData.append("access_key", "9b609585-2571-4097-9603-87e7295cc943");

    formData.append("subject", `🛒 New Urban Kicks Order - ${id}`);

    formData.append("Order ID", id);

    formData.append("Customer Name", address.name);

    formData.append("Phone", address.phone);

    formData.append(
      "Delivery Address",
      `${address.address},
${address.city},
${address.state} - ${address.pincode}`,
    );

    formData.append(
      "Delivery Method",
      delivery === "express"
        ? "Express (1–2 Business Days)"
        : "Standard (3–5 Business Days)",
    );

    formData.append("Subtotal", `₹${subtotal}`);

    formData.append("Shipping", shipping === 0 ? "Free" : `₹${shipping}`);

    formData.append("Discount", `₹${discount}`);

    formData.append("Total", `₹${total}`);

    formData.append(
      "Payment Method",
      payment === "cod"
        ? "Cash on Delivery (₹200 Advance Required)"
        : payment === "upi"
          ? "UPI"
          : "Card",
    );

    formData.append(
      "Products",
      cartItems
        .map(
          (item) =>
            `
Product : ${item.product.name}
Quantity : ${item.quantity}
Size : ${item.size ?? "-"}
Price : ₹${item.product.offerPrice ?? item.product.price}
`,
        )
        .join("\n-----------------------\n"),
    );

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    return await response.json();
  };

  const handlePlaceOrder = async () => {
    if (!address) {
      toast.error("Please add a delivery address.");
      return;
    }

    setLoading(true);

    try {
      const id = generateOrderId();

      setOrderId(id);

      const response = await sendOrderEmail(id);

      if (!response.success) {
        alert("Unable to place order.");
        return;
      }

      setOpen(true);
    } catch (err) {
      console.error(err);

      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="sticky top-24 rounded-2xl border bg-white p-5 shadow-sm">
        <h2 className="mb-5 text-xl font-bold">Order Summary</h2>

        {/* Products */}

        <div className="space-y-3">
          {cartItems.length === 0 ? (
            <p className="py-6 text-center text-sm text-slate-500">
              Your cart is empty.
            </p>
          ) : (
            cartItems.map((item) => {
              const product = item.product || {};

              const image =
                product.images?.[0]?.url || "https://placehold.co/80x80";

              const price = product.offerPrice ?? product.price ?? 0;

              return (
                <div key={item.id} className="flex items-center gap-3">
                  <img
                    src={image}
                    alt={product.name || "Product"}
                    className="h-16 w-16 rounded-lg border object-contain"
                  />

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-semibold">
                      {product.name || "Product"}
                    </h3>

                    <p className="text-xs text-slate-500">
                      Qty : {item.quantity}
                    </p>

                    {item.size && (
                      <p className="text-xs text-slate-400">
                        Size : {item.size}
                      </p>
                    )}
                  </div>

                  <span className="text-sm font-semibold">
                    ₹{(price * item.quantity).toLocaleString("en-IN")}
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* Coupon */}

        <div className="my-5 rounded-xl border bg-slate-50 p-3">
          <div className="mb-2 flex items-center gap-2">
            <Tag className="h-4 w-4 text-emerald-600" />

            <h3 className="text-sm font-semibold">Apply Coupon</h3>
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Coupon Code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="h-10"
            />

            <Button
              onClick={applyCoupon}
              className="h-10 bg-emerald-600 hover:bg-emerald-700"
            >
              Apply
            </Button>
          </div>

          <p className="mt-1 text-xs text-slate-500">
            Try <b>SAVE100</b> or <b>SAVE500</b>
          </p>
        </div>

        {/* Price */}

        <div className="border-t pt-4">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Subtotal</span>

              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-600">Shipping</span>

              <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-600">Payment</span>

              <span className="capitalize">
                {payment === "cod"
                  ? "Cash on Delivery"
                  : payment === "upi"
                    ? "UPI"
                    : "Card"}
              </span>
            </div>

            <div className="flex justify-between text-emerald-600">
              <span>Discount</span>

              <span>
                -₹
                {discount.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          <div className="mt-4 border-t pt-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>

              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>

        {/* Trust */}

        <div className="my-5 grid gap-2 rounded-xl bg-slate-50 p-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>100% Secure Payment</span>
          </div>

          <div className="flex items-center gap-2">
            <Truck className="h-4 w-4 text-emerald-600" />
            <span>Free Shipping above ₹999</span>
          </div>

          <div className="flex items-center gap-2">
            <RotateCcw className="h-4 w-4 text-emerald-600" />
            <span>Easy 7-Day Returns</span>
          </div>
        </div>
        {payment === "cod" && (
          <div className="my-4 rounded-xl border border-amber-200 bg-amber-50 p-3">
            <p className="text-sm font-semibold text-amber-800">
              ₹200 advance payment is required for Cash on Delivery.
            </p>

            <p className="mt-1 text-xs text-amber-700">
              This advance will be adjusted in your final bill at the time of
              delivery.
            </p>
          </div>
        )}
        <Button
          className="h-11 w-full rounded-xl bg-emerald-600 text-sm font-semibold hover:bg-emerald-700"
          disabled={cartItems.length === 0 || loading}
          onClick={handlePlaceOrder}
        >
          {loading ? (
            <ButtonLoader text="Placing Order..." />
          ) : (
            <>Place Order • ₹{total.toLocaleString("en-IN")}</>
          )}
        </Button>
        <p className="mb-3 mt-3 rounded-lg bg-blue-50 p-3 text-xs leading-5 text-blue-700">
          We'll contact you on WhatsApp to confirm your order and share payment
          details !
        </p>
      </div>
      <OrderSuccessDialog
        open={open}
        setOpen={setOpen}
        orderId={orderId}
      />{" "}
    </>
  );
}
