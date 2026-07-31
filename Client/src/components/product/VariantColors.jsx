import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function VariantColors({
  color,
  onChange,
}) {
    const swatches = color?.swatches || [];
  const updateName = (name) => {
    onChange({
      ...color,
      name,
    });
  };

  const updateSwatch = (index, field, value) => {
    const swatches = [...color.swatches];

    swatches[index] = {
      ...swatches[index],
      [field]: value,
    };

    onChange({
      ...color,
      swatches,
    });
  };

  const addSwatch = () => {
    onChange({
      ...color,
      swatches: [
        ...color.swatches,
        {
          name: "",
          value: "#000000",
        },
      ],
    });
  };

  const removeSwatch = (index) => {
    if (color.swatches.length === 1) return;

    onChange({
      ...color,
      swatches: color.swatches.filter(
        (_, i) => i !== index
      ),
    });
  };

  return (
    <div className="space-y-5">

      {/* Display Name */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Variant Name
        </label>

        <Input
          placeholder="Yellow / Black"
          value={color.name}
          onChange={(e) =>
            updateName(e.target.value)
          }
        />
      </div>

      {/* Swatches */}

      <div className="space-y-3">

        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium">
            Color Swatches
          </h4>

          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={addSwatch}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add
          </Button>
        </div>

        {swatches.map((swatch, index) => (
          <div
            key={index}
            className="flex items-center gap-3"
          >
            <Input
              placeholder="Yellow"
              value={swatch.name}
              onChange={(e) =>
                updateSwatch(
                  index,
                  "name",
                  e.target.value
                )
              }
            />

            <Input
              type="color"
              className="h-10 w-16 p-1"
              value={swatch.value}
              onChange={(e) =>
                updateSwatch(
                  index,
                  "value",
                  e.target.value
                )
              }
            />

            <Button
              type="button"
              variant="destructive"
              size="icon"
              disabled={swatches.length === 1}
              onClick={() =>
                removeSwatch(index)
              }
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}

      </div>

    </div>
  );
}