import {
  Building2,
  ShieldCheck,
  FileText,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

export default function CompanyDialog({
  open,
  onOpenChange,
  type,
}) {
  const data = {
    about: {
      title: "About Urban Kicks",
      icon: <Building2 className="size-7" />,
      color: "from-emerald-600 to-teal-500",
      content:
        "Urban Kicks is a modern sneaker destination offering premium footwear that combines comfort, quality, and street style. Our goal is to deliver an exceptional shopping experience with authentic products and reliable service.",
    },

    privacy: {
      title: "Privacy Policy",
      icon: <ShieldCheck className="size-7" />,
      color: "from-blue-600 to-cyan-500",
      content:
        "Your privacy matters to us. We securely store your information, never sell your personal data, and use it only to process orders, improve your shopping experience, and provide customer support.",
    },

    terms: {
      title: "Terms & Conditions",
      icon: <FileText className="size-7" />,
      color: "from-orange-500 to-red-500",
      content:
        "By using Urban Kicks, you agree to our policies regarding orders, payments, returns, and acceptable website usage. Please review these terms before making a purchase.",
    },
  };

  const item = data[type];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden rounded-3xl p-0 sm:max-w-2xl">

        <div className={`bg-gradient-to-r ${item.color} px-8 py-7 text-white`}>
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-white/20 p-3">
              {item.icon}
            </div>

            <DialogHeader>
              <DialogTitle className="text-3xl">
                {item.title}
              </DialogTitle>
            </DialogHeader>
          </div>
        </div>

        <div className="space-y-6 p-8">

          <p className="leading-7 text-muted-foreground">
            {item.content}
          </p>

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