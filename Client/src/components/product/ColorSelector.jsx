const colorOptions = [
  { name: "Black", value: "#000000" },
  { name: "White", value: "#FFFFFF" },
  { name: "Grey", value: "#9CA3AF" },
  { name: "Blue", value: "#2563EB" },
  { name: "Red", value: "#DC2626" },
  { name: "Brown", value: "#92400E" },
];

import { useState } from "react";

export default function ColorSelector({ value, onChange }) {
  const [customHex, setCustomHex] = useState("#000000");
  const [customColor, setCustomColor] = useState("");
  const toggleColor = (color) => {
    const exists = value.some((item) => item.name === color.name);

    if (exists) {
      onChange(value.filter((item) => item.name !== color.name));
    } else {
      onChange([
        ...value,
        {
          ...color,
          custom: false,
        },
      ]);
    }
  };

  const addCustomColor = () => {
    const name = customColor.trim();

    if (!name) return;

    const exists = value.some(
      (item) => item.name.toLowerCase() === name.toLowerCase(),
    );

    if (exists) return;

    onChange([
      ...value,
      {
        name,
        value: customHex,
        custom: true,
      },
    ]);

    setCustomColor("");

    setCustomHex("#000000");
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

          const selected = value.some((item) => item.name === color.name);
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
                  color.name === "White" ? "border border-slate-300" : ""
                }`}
                style={{ backgroundColor: color.value }}
              />

              <span>{color.name}</span>
            </button>
          );
        })}
</div>
        <div className="mt-6 rounded-xl border border-dashed border-slate-300 p-4">
          <label className="mb-3 block text-sm font-medium text-slate-700">
            Add Custom Color
          </label>

         <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
  {/* Hidden Color Picker */}
  <input
    id="custom-color-picker"
    type="color"
    value={customHex}
    onChange={(e) => setCustomHex(e.target.value)}
    className="hidden"
  />

  {/* Color Preview */}
  <label
    htmlFor="custom-color-picker"
    className="h-12 w-12 cursor-pointer rounded-full border-2 border-slate-300 shadow-sm transition hover:scale-105"
    style={{ backgroundColor: customHex }}
  />

  {/* Color Name */}
  <input
    value={customColor}
    onChange={(e) => setCustomColor(e.target.value)}
    placeholder="e.g. Beige, Olive, Light Brown"
    className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500"
  />

  {/* Add Button */}
  <button
    type="button"
    onClick={addCustomColor}
    className="rounded-xl bg-emerald-600 px-6 py-3 font-medium text-white transition hover:bg-emerald-700"
  >
    Add
  </button>
</div>
        </div>


      {/* Selected Colors */}

     {value.length > 0 && (
  <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
    <h3 className="mb-3 text-sm font-medium text-slate-700">
      Selected Colors
    </h3>

    <div className="flex flex-wrap gap-2">
      {value.map((color) => (
        <div
          key={color.name}
          className="flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-sm"
        >
          <span
            className="h-4 w-4 rounded-full border"
            style={{
              backgroundColor: color.value,
            }}
          />

          <span className="text-sm font-medium">
            {color.name}
          </span>

          <button
            type="button"
            onClick={() =>
              onChange(
                value.filter(
                  (item) => item.name !== color.name
                )
              )
            }
            className="text-red-500 transition hover:text-red-700"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  </div>
)}
    </div>
  );
}
