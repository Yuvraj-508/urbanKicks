import { useState } from "react";

const shoeSizes = [6, 7, 8, 9, 10, 11];

export default function SizeSelector({ value, onChange }) {
  const [customSize, setCustomSize] = useState("");

  const toggleSize = (size) => {
    if (value.includes(size)) {
      onChange(value.filter((item) => item !== size));
    } else {
      onChange([...value, size]);
    }
  };

 const addCustomSize = () => {
  const size = customSize.trim();

  if (!size) return;

  const exists = value.some(
    (item) =>
      item.toString().toLowerCase() === size.toLowerCase()
  );

  if (exists) return;

  onChange([...value, size]);

  setCustomSize("");
};

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Header */}

      <div className="mb-4">
        <h2 className="text-base font-semibold text-slate-900">
          Available Sizes
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Select the shoe sizes available for this product.
        </p>
      </div>

      {/* Sizes */}

      <div className="flex flex-wrap gap-2.5">
        {shoeSizes.map((size) => {
          const active = value.includes(size);

          return (
            <button
              key={size}
              type="button"
              onClick={() => toggleSize(size)}
              className={`flex h-11 min-w-[44px] items-center justify-center rounded-xl border px-3 text-sm font-semibold transition-all duration-200 ${
                active
                  ? "border-emerald-600 bg-emerald-600 text-white shadow-sm"
                  : "border-slate-200 bg-white text-slate-700 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700"
              }`}
            >
              {size}
            </button>
          );
        })}

   
      </div>

      {/* Custom Size */}

    <div className="mt-6 rounded-xl border border-dashed border-slate-300 p-4">
  <label className="mb-3 block text-sm font-medium text-slate-700">
    Add Custom Size
  </label>

  <div className="flex flex-col gap-3 sm:flex-row">
    <input
      type="text"
      value={customSize}
      onChange={(e) => setCustomSize(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          addCustomSize();
        }
      }}
      placeholder="e.g. 11.5, 12.5, Free Size"
      className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-500"
    />

    <button
      type="button"
      onClick={addCustomSize}
      className="rounded-xl bg-emerald-600 px-6 py-3 font-medium text-white transition hover:bg-emerald-700"
    >
      Add
    </button>
  </div>
</div>

      {/* Selected Sizes */}

     {value.length > 0 && (
  <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
    <h3 className="mb-3 text-sm font-medium text-slate-700">
      Selected Sizes
    </h3>

    <div className="flex flex-wrap gap-2">
      {value.map((size) => (
        <div
          key={size}
          className="flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-sm"
        >
          <span className="text-sm font-medium">{size}</span>

          <button
            type="button"
            onClick={() =>
              onChange(value.filter((item) => item !== size))
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