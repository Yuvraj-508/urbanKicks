import {
  Truck,
  RotateCcw,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

export default function PolicyDialog({
  open,
  onOpenChange,
  type,
}) {
  const isShipping = type === "shipping";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl rounded-3xl p-0 overflow-hidden">

        {/* Header */}

        <div
          className={`px-8 py-7 text-white ${
            isShipping
              ? "bg-gradient-to-r from-blue-600 to-cyan-500"
              : "bg-gradient-to-r from-orange-500 to-red-500"
          }`}
        >
          <div className="flex items-center gap-3">

            <div className="rounded-2xl bg-white/20 p-3">

              {isShipping ? (
                <Truck className="size-7" />
              ) : (
                <RotateCcw className="size-7" />
              )}

            </div>

            <div>

              <DialogTitle className="text-3xl">

                {isShipping
                  ? "Shipping Policy"
                  : "Return Policy"}

              </DialogTitle>

              <p className="mt-1 text-white/90">

                {isShipping
                  ? "Fast, secure and reliable delivery."
                  : "Easy and hassle-free returns."}

              </p>

            </div>

          </div>
        </div>

        {/* Content */}

        <div className="space-y-6 p-8">

          {isShipping ? (
            <>
              <div>
                <h3 className="font-semibold">
                  🚚 Delivery Time
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Orders are processed within 24 hours and
                  delivered in approximately 3–7 business days,
                  depending on your location.
                </p>
              </div>

              <div>
                <h3 className="font-semibold">
                  📦 Order Tracking
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Once your order ships, you'll receive a
                  tracking number by email.
                </p>
              </div>

              <div>
                <h3 className="font-semibold">
                  🌍 Shipping Coverage
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  We currently deliver across India.
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <h3 className="font-semibold">
                  🔄 7-Day Returns
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  Return unused products within 7 days of
                  delivery with original packaging.
                </p>
              </div>

              <div>
                <h3 className="font-semibold">
                  ✅ Eligible Items
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  Items must be unworn, undamaged and include
                  all original tags.
                </p>
              </div>

              <div>
                <h3 className="font-semibold">
                  💳 Refunds
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  Approved refunds are processed within
                  5–7 business days to your original payment
                  method.
                </p>
              </div>
            </>
          )}

          <Button
            className="w-full"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>

        </div>

      </DialogContent>
    </Dialog>
  );
}