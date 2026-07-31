import { Eye, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ColorSwatch from "./ColorSwatch";

export default function ProductRow({
  product,
  onDelete,
  mobile = false,
}) {
  const {
    _id,
    name,
    brand,
    category,
    price,
    offerPrice,
    image,
    totalStock,
    totalVariants,
    inStock,
    variants = [],
  } = product;

  const productImage =
    image || "https://placehold.co/100x100?text=No+Image";

const colorVariants = variants.map((variant) => ({
  name: variant.color?.name,
  swatches: variant.color?.swatches || [],
}));

  const sizes = [
    ...new Set(
      variants.flatMap((variant) =>
        variant.sizes.map((size) => size.size)
      )
    ),
  ];

  // ================= MOBILE =================

  if (mobile) {
    return (
      <div
        className={`flex gap-4 p-4 ${
          inStock ? "" : "bg-slate-50 opacity-70"
        }`}
      >
        <img
          src={productImage}
          alt={name}
          className="h-24 w-24 rounded-xl border object-cover"
        />

        <div className="flex-1">
          <h3 className="font-semibold">{name}</h3>

          <p className="text-sm text-slate-500">
            {brand} • {category}
          </p>

          <div className="mt-2">
            <span className="font-semibold text-emerald-600">
              ₹{offerPrice || price}
            </span>

            {offerPrice && (
              <span className="ml-2 text-slate-400 line-through">
                ₹{price}
              </span>
            )}
          </div>

          <div className="mt-3 flex flex-wrap gap-1">
            {sizes.map((size) => (
              <Badge key={size} variant="secondary">
                {size}
              </Badge>
            ))}
          </div>

<div className="flex gap-2 mt-2">
  {colorVariants.map((variant, index) => (
    <ColorSwatch
      key={index}
      swatches={variant.swatches}
      title={variant.name}
    />
  ))}
</div>

          <div className="mt-3 flex items-center justify-between">
            <Badge variant={inStock ? "default" : "destructive"}>
              {inStock
                ? `${totalStock} in stock`
                : "Out of Stock"}
            </Badge>

            <div className="flex gap-1">
              <Button asChild size="icon" variant="ghost">
                <Link to={`/seller/products/${_id}`}>
                  <Eye className="h-4 w-4" />
                </Link>
              </Button>

              <Button asChild size="icon" variant="ghost">
                <Link to={`/seller/products/edit/${_id}`}>
                  <Pencil className="h-4 w-4" />
                </Link>
              </Button>

              <Button
                size="icon"
                variant="ghost"
                onClick={() => onDelete(_id)}
              >
                <Trash2 className="h-4 w-4 text-red-600" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ================= DESKTOP =================

  return (
    <tr className="border-b hover:bg-slate-50">
      <td className="px-5 py-4">
        <img
          src={productImage}
          alt={name}
          className="h-16 w-16 rounded-xl border object-cover"
        />
      </td>

      <td className="px-5 py-4">
        <h3 className="font-semibold">{name}</h3>

        <p className="text-sm text-slate-500">{brand}</p>

        <p className="text-xs text-slate-400">{category}</p>
      </td>

      <td className="px-5 py-4">
        <div className="font-semibold">
          ₹{offerPrice || price}
        </div>

        {offerPrice && (
          <div className="text-sm text-slate-400 line-through">
            ₹{price}
          </div>
        )}
      </td>

      <td className="px-5 py-4">
        <div className="flex flex-wrap gap-1">
          {sizes.map((size) => (
            <Badge key={size} variant="secondary">
              {size}
            </Badge>
          ))}
        </div>
      </td>

      <td className="px-5 py-4">
<div className="flex gap-2">
  {colorVariants.map((variant, index) => (
    <ColorSwatch
      key={index}
      swatches={variant.swatches}
      title={variant.name}
    />
  ))}
</div>
      </td>

      <td className="px-5 py-4 text-center font-semibold">
        {totalStock}
      </td>

      <td className="px-5 py-4 text-center">
        <Badge
          className={
            inStock
              ? "bg-emerald-100 text-emerald-700"
              : "bg-red-100 text-red-700"
          }
        >
          {inStock ? "In Stock" : "Out of Stock"}
        </Badge>
      </td>

      <td className="px-5 py-4">
        <div className="flex justify-center gap-1">
          <Button asChild size="icon" variant="ghost">
            <Link to={`/seller/products/${_id}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>

          <Button asChild size="icon" variant="ghost">
            <Link to={`/seller/products/edit/${_id}`}>
              <Pencil className="h-4 w-4" />
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(_id)}
          >
            <Trash2 className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      </td>
    </tr>
  );
}

