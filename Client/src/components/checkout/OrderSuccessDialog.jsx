import { useEffect, useState } from "react";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import useCartStore from "@/store/cartStore";

export default function OrderSuccessDialog({
  open,
  setOpen,
  orderId,
}) {  const [countdown, setCountdown] = useState(6);
  const navigate = useNavigate();

  const clearCart = useCartStore((state) => state.clearCart);


 useEffect(() => {
  if (!open) return;

  clearCart();

  setCountdown(6);

  const interval = setInterval(() => {
    setCountdown((prev) => {
      if (prev <= 1) {
        clearInterval(interval);
        setOpen(false);
        navigate("/all-products", { replace: true });
        return 0;
      }

      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(interval);
}, [open, clearCart, navigate, setOpen]);
const handleContinue = () => {
  setOpen(false);
  navigate("/all-products", { replace: true });
};

const handleClose = () => {
  setOpen(false);
  navigate("/", { replace: true });
};
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md rounded-3xl p-8">
        <div className="flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2 className="h-12 w-12 text-emerald-600" />
          </div>
        </div>

        <DialogHeader className="space-y-3 text-center">
          <DialogTitle className="text-3xl font-bold">
            Order Placed!
          </DialogTitle>

          <DialogDescription className="text-base text-slate-500">
            Thank you for shopping with Urban Kicks.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-2xl bg-slate-50 p-5 text-center">
          <p className="text-sm text-slate-500">Order ID</p>

<p className="mt-1 text-lg font-bold">
  {orderId || "Generating..."}
</p>
          <div className="mt-4 space-y-2 text-sm text-slate-600">
            <div className="flex justify-between">
              <span>Status</span>
              <span className="font-medium text-emerald-600">Confirmed</span>
            </div>

            <div className="flex justify-between">
              <span>Estimated Delivery</span>
              <span>3–5 Business Days</span>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-slate-500">
          Redirecting to products in{" "}
          <span className="font-semibold text-emerald-600">{countdown}</span>{" "}
          second{countdown !== 1 ? "s" : ""}...
        </p>

        <div className="space-y-3">
          <Button
            className="h-12 w-full rounded-xl bg-emerald-600 hover:bg-emerald-700"
            onClick={handleContinue}
          >
            <ShoppingBag className="mr-2 h-5 w-5" />
            Continue Shopping
          </Button>

          <Button
            variant="outline"
            className="h-12 w-full rounded-xl"
            onClick={handleClose}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
