import { Eye, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function ProductRow({ product, onDelete, mobile = false }) {
  const {
    _id,
    name,
    brand,
    category,
    price,
    offerPrice,
    stock,
    sizes = [],
    colors = [],
    images = [],
  } = product;

  const image =
    images.length > 0
      ? images[0].url
      : "https://placehold.co/100x100?text=No+Image";

  const inStock = stock > 0;

  // ================= MOBILE =================

  if (mobile) {
    return (
      <div className="flex gap-4 p-4">
        <img
          src={image}
          alt={name}
          className="h-24 w-24 rounded-xl border object-cover"
        />

        <div className="flex-1 space-y-2">
          <div>
            <h3 className="font-semibold">{name}</h3>

            <p className="text-sm text-slate-500">
              {brand} • {category}
            </p>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <span className="font-semibold text-emerald-600">
              ₹{offerPrice || price}
            </span>

            {offerPrice && (
              <span className="text-slate-400 line-through">₹{price}</span>
            )}
          </div>

          <div className="flex flex-wrap gap-1">
            {sizes.map((size) => (
              <Badge key={size} variant="secondary">
                {size}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-1">
            {colors.map((color) => (
              <span
                key={color}
                className="h-4 w-4 rounded-full border"
                style={{
                  backgroundColor: color.toLowerCase(),
                }}
              />
            ))}
          </div>

          <div className="flex items-center justify-between">
            <Badge variant={inStock ? "default" : "destructive"}>
              {inStock ? `Stock : ${stock}` : "Out of Stock"}
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

              <Button size="icon" variant="ghost" onClick={() => onDelete(_id)}>
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
    <tr className="border-b transition hover:bg-slate-50">
      {/* Image */}

      <td className="px-5 py-4">
        <img
          src={image}
          alt={name}
          className="h-16 w-16 rounded-xl border object-cover"
        />
      </td>

      {/* Product */}

      <td className="px-5 py-4">
        <h3 className="font-semibold text-slate-900">{name}</h3>

        <p className="text-sm text-slate-500">{brand}</p>

        <p className="text-xs text-slate-400">{category}</p>
      </td>

      {/* Price */}

      <td className="px-5 py-4">
        <div className="font-semibold">₹{offerPrice || price}</div>

        {offerPrice && (
          <div className="text-sm text-slate-400 line-through">₹{price}</div>
        )}
      </td>

      {/* Sizes */}

      <td className="px-5 py-4">
        <div className="flex flex-wrap gap-1">
          {sizes.map((size) => (
            <Badge key={size} variant="secondary">
              {size}
            </Badge>
          ))}
        </div>
      </td>

      {/* Colors */}

      <td className="px-5 py-4">
        <div className="flex gap-2">
          {colors.map((color) => (
            <span
              key={color}
              className="h-5 w-5 rounded-full border"
              style={{
                backgroundColor: color.toLowerCase(),
              }}
            />
          ))}
        </div>
      </td>

      {/* Qty */}

      <td className="px-5 py-4 text-center font-semibold">{stock}</td>

      {/* Status */}

      <td className="px-5 py-4">
        <div className="flex items-center justify-center gap-3">
          <Badge
            className={
              inStock
                ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                : "bg-red-100 text-red-700 hover:bg-red-100"
            }
          >
            {inStock ? "In Stock" : "Out of Stock"}
          </Badge>

          <Switch
            checked={inStock}
            onCheckedChange={(checked) => {
              console.log("Update Stock Status:", checked);

              // API call will go here
            }}
          />
        </div>
      </td>

      {/* Actions */}

      <td className="px-5 py-4">
        <div className="flex justify-center gap-1">
          <Button asChild size="icon" variant="ghost">
            <Link to={`/seller/products/edit/${_id}`}>
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
  onClick={() => onDelete(product._id)}
>
  <Trash2 className="h-4 w-4 text-red-600" />
</Button>
        </div>
      </td>
    </tr>
  );
}
