import { User, Mail, ThumbsUp } from "lucide-react";

import { Input } from "@/components/ui/input";

export default function CustomerInfo({
  customer,
  setCustomer,
  recommend,
  setRecommend,
}) {
  const updateField = (field, value) => {
    setCustomer({
      ...customer,
      [field]: value,
    });
  };

  return (
    <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-lg">
      <div className="flex items-center gap-2">
        <User className="h-5 w-5 text-emerald-600" />

        <h2 className="text-xl font-bold">
          Your Details
        </h2>
      </div>

      <p className="mt-2 text-sm text-slate-500">
        Only your name will be shown publicly.
      </p>

      <div className="mt-6 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-semibold">
            Name *
          </label>

          <Input
            value={customer.name}
            placeholder="Enter your name"
            onChange={(e) =>
              updateField("name", e.target.value)
            }
            className="h-12 rounded-xl"
          />
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
            <Mail className="h-4 w-4" />
            Email (Optional)
          </label>

          <Input
            type="email"
            value={customer.email}
            placeholder="example@gmail.com"
            onChange={(e) =>
              updateField("email", e.target.value)
            }
            className="h-12 rounded-xl"
          />
        </div>
      </div>

      <div className="mt-8">
        <div className="mb-3 flex items-center gap-2">
          <ThumbsUp className="h-5 w-5 text-emerald-600" />

          <h3 className="font-bold">
            Would you recommend Urban Kicks?
          </h3>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            {
              id: "yes",
              label: "😍 Yes",
            },
            {
              id: "maybe",
              label: "🙂 Maybe",
            },
            {
              id: "no",
              label: "😕 No",
            },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() =>
                setRecommend(item.id)
              }
              className={`rounded-2xl border p-4 font-semibold transition ${
                recommend === item.id
                  ? "border-emerald-600 bg-emerald-600 text-white"
                  : "border-slate-200 hover:border-emerald-300"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-slate-50 p-4">
        <label className="flex items-start gap-3">
          <input
            defaultChecked
            type="checkbox"
            className="mt-1 accent-emerald-600"
          />

          <span className="text-sm leading-6 text-slate-600">
            I allow Urban Kicks to display my review
            publicly on its website.
          </span>
        </label>
      </div>
    </div>
  );
}