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
  subtitle: "₹200 advance required. Adjusted in your final bill.",
  icon: Truck,
  badge: "₹200 Advance",
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
  type="button"
  onClick={() => !method.disabled && setPayment(method.id)}
  className={`rounded-xl border p-3 text-left transition-all ${
    method.disabled
      ? "cursor-not-allowed opacity-70"
      : payment === method.id
        ? "border-emerald-600 bg-emerald-50 ring-1 ring-emerald-200"
        : "hover:border-emerald-400"
  }`}
>
  {/* Desktop Icon */}
  <div className="mb-2 hidden h-10 w-10 items-center justify-center rounded-lg bg-slate-100 sm:flex">
    <Icon className="h-5 w-5 text-emerald-600" />
  </div>

  {/* Mobile: Icon + Title */}
  <div className="flex items-center justify-between gap-3 sm:block">

    <div className="flex items-center gap-3">

      {/* Mobile Icon */}
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 sm:hidden">
        <Icon className="h-5 w-5 text-emerald-600" />
      </div>

      <h3 className="text-sm font-semibold">
        {method.title}
      </h3>

    </div>

  {method.badge && (
  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
    {method.badge}
  </span>
)}
  </div>

  <p className="mt-2 text-xs text-slate-500 line-clamp-2">
    {method.subtitle}
  </p>
</button>
          );
        })}

      </div>
    </div>
  );
}