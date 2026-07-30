import {
  CreditCard,
  Wallet,
  Truck,
} from "lucide-react";

export default function PaymentMethods({
  payment,
  setPayment,
}) {
  const methods = [
    {
      id: "cod",
      title: "Cash on Delivery",
      subtitle: "Pay when your order arrives",
      icon: Truck,
    },
    {
      id: "upi",
      title: "UPI",
      subtitle: "Google Pay, PhonePe, Paytm",
      icon: Wallet,
    },
    {
      id: "card",
      title: "Card",
      subtitle: "Visa, Mastercard & RuPay",
      icon: CreditCard,
    },
  ];

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <h2 className="mb-6 text-xl font-bold">
        Payment Method
      </h2>

      <div className="grid gap-4 lg:grid-cols-3">

        {methods.map((method) => {
          const Icon = method.icon;

          return (
           <button
  key={method.id}
  onClick={() => setPayment(method.id)}
  className={`rounded-xl border p-3 text-left transition-all ${
    payment === method.id
      ? "border-emerald-600 bg-emerald-50 ring-1 ring-emerald-200"
      : "hover:border-emerald-400"
  }`}
>
  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
    <Icon className="h-5 w-5 text-emerald-600" />
  </div>

  <h3 className="text-sm font-semibold">
    {method.title}
  </h3>

  <p className="mt-1 text-xs text-slate-500 line-clamp-2">
    {method.subtitle}
  </p>
</button>
          );
        })}

      </div>
    </div>
  );
}