import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function VariantSizes({
  sizes,
  onChange,
}) {
  const addSize = () => {
    onChange([
      ...sizes,
      {
        size: "",
        stock: 0,
      },
    ]);
  };

  const updateSize = (
    index,
    field,
    value
  ) => {
    const updated = [...sizes];

    updated[index][field] = value;

    onChange(updated);
  };

  const removeSize = (index) => {
    onChange(
      sizes.filter((_, i) => i !== index)
    );
  };

  return (
    <div>

      <div className="mb-4 flex items-center justify-between">

        <h4 className="font-medium">
          Sizes & Stock
        </h4>

        <Button
          type="button"
          size="sm"
          onClick={addSize}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Size
        </Button>

      </div>

      <div className="space-y-3">

        {sizes.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_1fr_auto] gap-3"
          >
            <Input
              placeholder="Size"
              value={item.size}
              onChange={(e) =>
                updateSize(
                  index,
                  "size",
                  e.target.value
                )
              }
            />

            <Input
              type="number"
              min={0}
              placeholder="Stock"
              value={item.stock}
              onChange={(e) =>
                updateSize(
                  index,
                  "stock",
                  Number(e.target.value)
                )
              }
            />

            <Button
              variant="destructive"
              size="icon"
              type="button"
              onClick={() =>
                removeSize(index)
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