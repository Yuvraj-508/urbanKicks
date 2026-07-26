const colorOptions = [
  { name: "Black", value: "#000000" },
  { name: "White", value: "#FFFFFF" },
  { name: "Grey", value: "#9CA3AF" },
  { name: "Blue", value: "#2563EB" },
  { name: "Red", value: "#DC2626" },
  { name: "Green", value: "#16A34A" },
  { name: "Brown", value: "#92400E" },
  { name: "Navy", value: "#1E3A8A" },
  { name: "Other", value: null },
];  import { useState } from "react";


export default function ColorSelector({ value, onChange }) {
const [customColor, setCustomColor] = useState("");
  const toggleColor = (color) => {
    if (value.includes(color.name)) {
      onChange(value.filter((item) => item !== color.name));
    } else {
      onChange([...value, color.name]);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Header */}

      <div className="mb-4">
        <h2 className="text-base font-semibold text-slate-900">
          Available Colors
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Select the colors available for this product.
        </p>
      </div>

      {/* Colors */}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
       {colorOptions.map((color) => {
  if (color.name === "Other") {
    return (
      <button
        key="other"
        type="button"
        onClick={() => toggleColor(color)}
        className={`rounded-xl border p-3 text-center transition-all ${
          value.includes("Other")
            ? "border-emerald-500 bg-emerald-50"
            : "border-slate-200 hover:border-emerald-400 hover:bg-emerald-50"
        }`}
      >
        <span className="text-sm font-medium">
          + Other
        </span>
      </button>
    );
  }

  const selected = value.includes(color.name);

  return (
    <button
      key={color.name}
      type="button"
      onClick={() => toggleColor(color)}
      className={`flex items-center gap-3 rounded-xl border p-3 transition-all ${
        selected
          ? "border-emerald-500 bg-emerald-50"
          : "border-slate-200 hover:border-emerald-400 hover:bg-emerald-50"
      }`}
    >
      <span
        className={`h-5 w-5 rounded-full ${
          color.name === "White"
            ? "border border-slate-300"
            : ""
        }`}
        style={{ backgroundColor: color.value }}
      />

      <span>{color.name}</span>
    </button>
  );
})}

{value.includes("Other") && (
  <div className="mt-4">
    <label className="mb-2 block text-sm font-medium text-slate-700">
      Custom Color
    </label>

    <div className="flex gap-2">
      <input
        value={customColor}
        onChange={(e) => setCustomColor(e.target.value)}
        placeholder="e.g. Beige, Olive, Maroon"
        className="flex-1 rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500"
      />

      <button
        type="button"
        onClick={() => {
          const color = customColor.trim();

          if (!color) return;

          if (!value.includes(color)) {
            onChange(
              value
                .filter((c) => c !== "Other")
                .concat(color)
            );
          }

          setCustomColor("");
        }}
        className="rounded-xl bg-emerald-600 px-4 text-white hover:bg-emerald-700"
      >
        Add
      </button>
    </div>
  </div>
)}
      </div>

      {/* Selected Colors */}

      {value.length > 0 && (
        <div className="mt-4 rounded-xl bg-slate-50 px-3 py-2">
          <p className="text-sm text-slate-600">
            Selected Colors:
            <span className="ml-2 font-semibold text-slate-900">
              {value.join(", ")}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}