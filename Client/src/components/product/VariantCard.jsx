import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import VariantSizes from "./VariantSizes";
import VariantImages from "./VariantImages";
import VariantColors from "./VariantColors";

export default function VariantCard({
  variant,
  index,
  onChange,
  onRemove,
}) {
  const update = (field, value) => {
    onChange({
      ...variant,
      [field]: value,
    });
  };

  return (
    <div className="rounded-xl border bg-slate-50 p-5">

      <div className="mb-5 flex items-center justify-between">

        <h3 className="font-semibold">
          Variant {index + 1}
        </h3>

        <Button
          variant="destructive"
          size="icon"
          onClick={onRemove}
        >
          <Trash2 className="h-4 w-4" />
        </Button>

      </div>

   <div className="grid gap-4 md:grid-cols-2">

  <VariantColors
    color={variant.color}
    onChange={(color) => update("color", color)}
  />



</div>

      <div className="mt-8">

        <VariantSizes
          sizes={variant.sizes}
          onChange={(sizes) =>
            update("sizes", sizes)
          }
        />

      </div>

     <div className="mt-8">
  <VariantImages
    images={variant.images}
    onChange={(images) => update("images", images)}
  />
</div>

    </div>
  );
}