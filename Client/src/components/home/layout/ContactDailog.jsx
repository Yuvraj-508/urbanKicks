import {
  Mail,
  Phone,
  MessageCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

export default function ContactDialog({
  open,
  onOpenChange,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden rounded-3xl p-0 sm:max-w-xl">

        {/* Header */}

        <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 px-8 py-8 text-white">

          <h2 className="text-3xl font-bold">
            Get in Touch
          </h2>

          <p className="mt-2 text-emerald-100">
            Have a question about your order, products, or anything else?
            Our team is here to help.
          </p>

        </div>

        <div className="space-y-5 p-8">

          {/* Email */}

          <a
            href="mailto:urbankicks1122@gmail.com"
            className="flex items-center gap-4 rounded-2xl border p-5 transition hover:border-emerald-500 hover:bg-emerald-50"
          >
            <div className="rounded-2xl bg-emerald-100 p-4">
              <Mail className="size-6 text-emerald-600" />
            </div>

            <div className="flex-1">
              <h3 className="font-semibold">Email Support</h3>
              <p className="text-sm text-slate-500">
               Urbankicks1122@gmail.com
              </p>
            </div>
          </a>

          {/* Phone */}

          <a
            href="tel:+916006488288"
            className="flex items-center gap-4 rounded-2xl border p-5 transition hover:border-blue-500 hover:bg-blue-50"
          >
            <div className="rounded-2xl bg-blue-100 p-4">
              <Phone className="size-6 text-blue-600" />
            </div>

            <div className="flex-1">
              <h3 className="font-semibold">Call Us</h3>
              <p className="text-sm text-slate-500">
                +91 6006488288
              </p>
            </div>
          </a>

          {/* WhatsApp */}

          <a
            href="https://wa.me/916006488288"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-2xl border p-5 transition hover:border-green-500 hover:bg-green-50"
          >
            <div className="rounded-2xl bg-green-100 p-4">
              <MessageCircle className="size-6 text-green-600" />
            </div>

            <div className="flex-1">
              <h3 className="font-semibold">
                WhatsApp
              </h3>

              <p className="text-sm text-slate-500">
                Chat with our support team
              </p>
            </div>
          </a>

          <Button
            className="mt-2 w-full rounded-xl"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>

        </div>

      </DialogContent>
    </Dialog>
  );
}