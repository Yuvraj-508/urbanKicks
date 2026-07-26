import { useState } from "react";

const shoeSizes = [6, 7, 8, 9, 10, 11];

export default function SizeSelector({ value, onChange }) {
  const [showCustomInput, setShowCustomInput] = useState(false);
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

    if (!value.includes(size)) {
      onChange([...value, size]);
    }

    setCustomSize("");
    setShowCustomInput(false);
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

        <button
          type="button"
          onClick={() => setShowCustomInput((prev) => !prev)}
          className="flex h-11 items-center justify-center rounded-xl border border-dashed border-slate-300 px-4 text-sm font-semibold text-slate-600 transition hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700"
        >
          + Other
        </button>
      </div>

      {/* Custom Size */}

      {showCustomInput && (
        <div className="mt-4 flex gap-2">
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
            placeholder="e.g. 11.5, 12, Free Size"
            className="flex-1 rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500"
          />

          <button
            type="button"
            onClick={addCustomSize}
            className="rounded-xl bg-emerald-600 px-5 text-white hover:bg-emerald-700"
          >
            Add
          </button>
        </div>
      )}

      {/* Selected Sizes */}

      {value.length > 0 && (
        <div className="mt-4 rounded-xl bg-slate-50 px-3 py-2">
          <p className="text-sm text-slate-600">
            Selected Sizes:
            <span className="ml-2 font-semibold text-slate-900">
              {value.join(", ")}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}