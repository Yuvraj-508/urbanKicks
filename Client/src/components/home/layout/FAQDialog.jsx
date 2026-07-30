import {
  CircleHelp,
  Package,
  Truck,
 RotateCcw,
  CreditCard,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQDialog({
  open,
  onOpenChange,
}) {
  const faqs = [
    {
      icon: <Package className="size-5 text-emerald-600" />,
      question: "Are all products authentic?",
      answer:
        "Yes. Every sneaker sold by Urban Kicks is 100% authentic and quality checked before shipping.",
    },
    {
      icon: <Truck className="size-5 text-blue-600" />,
      question: "How long does delivery take?",
      answer:
        "Orders are usually delivered within 3–7 business days depending on your location.",
    },
    {
      icon: <RotateCcw className="size-5 text-orange-600" />,
      question: "Can I return my order?",
      answer:
        "Yes. Returns are accepted within 7 days of delivery if the product is unused and in its original packaging.",
    },
    {
      icon: <CreditCard className="size-5 text-purple-600" />,
      question: "Which payment methods do you accept?",
      answer:
        "We accept UPI, Credit Cards, Debit Cards, Net Banking and Cash on Delivery (where available).",
    },
    {
      icon: <CircleHelp className="size-5 text-red-600" />,
      question: "How can I contact support?",
      answer:
        "You can reach us through Email, WhatsApp or Phone from the Contact Us section in the footer.",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden rounded-3xl p-0 sm:max-w-2xl">

        {/* Header */}

        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-7 text-white">

          <DialogHeader>

            <DialogTitle className="text-3xl">
              Frequently Asked Questions
            </DialogTitle>

            <p className="mt-2 text-white/90">
              Find quick answers to the questions customers ask most.
            </p>

          </DialogHeader>

        </div>

        {/* FAQ */}

        <div className="p-8">

          <Accordion
            type="single"
            collapsible
            className="w-full"
          >
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
              >
                <AccordionTrigger>

                  <div className="flex items-center gap-3">

                    {faq.icon}

                    <span className="font-medium">
                      {faq.question}
                    </span>

                  </div>

                </AccordionTrigger>

                <AccordionContent className="pl-8 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>

              </AccordionItem>
            ))}
          </Accordion>

        </div>

      </DialogContent>
    </Dialog>
  );
}