import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, Package, Tag, Layers, Palette, Box } from "lucide-react";
import toast from "react-hot-toast";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProduct } from "@/services/product.service";
import ColorSwatch from "@/components/product/ColorSwatch";

export default function ViewProduct() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const response = await getProduct(id);

      setProduct(response.product);
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to load product.");
    } finally {
      setLoading(false);
    }
  };

  const totalStock = useMemo(() => {
    return (
      product?.variants?.reduce(
        (total, variant) =>
          total + variant.sizes.reduce((sum, size) => sum + size.stock, 0),
        0,
      ) || 0
    );
  }, [product]);

  const allSizes = useMemo(() => {
    return [
      ...new Set(
        product?.variants?.flatMap((variant) =>
          variant.sizes.map((size) => size.size),
        ) || [],
      ),
    ];
  }, [product]);

  if (loading) {
    return (
      <div className="flex h-[450px] items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="rounded-xl border bg-white p-10 text-center">
        <h2 className="text-xl font-semibold">Product not found</h2>

        <Link to="/seller/products">
          <Button className="mt-5">Back to Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <Link to="/seller/products">
            <Button variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>

          <h1 className="mt-3 text-3xl font-bold">{product.name}</h1>

          <p className="text-slate-500">Product Details</p>
        </div>

        <Link to={`/seller/products/edit/${product._id}`}>
          <Button>Edit Product</Button>
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Images */}

        <div className="rounded-2xl border bg-white p-5">
          <h2 className="mb-5 text-lg font-semibold">Images</h2>

          <div className="grid grid-cols-2 gap-3">
            {product.variants?.flatMap((variant) =>
              variant.images.map((image) => (
                <img
                  key={image.public_id}
                  src={image.url}
                  alt={product.name}
                  className="aspect-square rounded-xl border object-cover"
                />
              )),
            )}
          </div>
        </div>

        {/* Details */}

        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border bg-white p-6">
            <h2 className="mb-5 text-lg font-semibold">Basic Information</h2>

            <div className="grid gap-5 md:grid-cols-2">
              <Info
                icon={<Package size={18} />}
                label="Brand"
                value={product.brand}
              />

              <Info
                icon={<Layers size={18} />}
                label="Category"
                value={product.category}
              />

              <Info
                icon={<Tag size={18} />}
                label="Price"
                value={`₹${product.price}`}
              />

              <Info
                icon={<Tag size={18} />}
                label="Offer Price"
                value={`₹${product.offerPrice}`}
              />

              <Info
                icon={<Box size={18} />}
                label="Total Stock"
                value={totalStock}
              />

              <Info
                label="Status"
                value={
                  <Badge
                    className={
                      totalStock > 0
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }
                  >
                    {totalStock > 0 ? "In Stock" : "Out of Stock"}
                  </Badge>
                }
              />
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-6">
            <h2 className="mb-3 text-lg font-semibold">Description</h2>

            <p className="leading-7 text-slate-600">
              {product.description || "No description available."}
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold">Available Sizes</h2>

            <div className="flex flex-wrap gap-2">
              {allSizes.map((size) => (
                <Badge key={size} variant="secondary">
                  {size}
                </Badge>
              ))}
            </div>
          </div>

          {/* Variants */}

          <div className="rounded-2xl border bg-white p-6">
            <h2 className="mb-5 text-lg font-semibold">Product Variants</h2>

            <div className="space-y-5">
              {product.variants.map((variant) => (
                <div
                  key={variant._id || variant.id}
                  className="rounded-xl border p-5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <ColorSwatch
                        swatches={variant.color?.swatches}
                        title={variant.color?.name}
                        size="h-6 w-6"
                      />

                      <div>
                        <h3 className="font-semibold">{variant.color.name}</h3>

                        <p className="text-sm text-slate-500">
                          SKU : {variant.sku}
                        </p>
                      </div>
                    </div>

                    <Badge>
                      {variant.sizes.reduce((sum, size) => sum + size.stock, 0)}{" "}
                      Qty
                    </Badge>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {variant.sizes.map((size) => (
                      <Badge key={size.size} variant="secondary">
                        {size.size} ({size.stock})
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-5 flex gap-3 overflow-x-auto">
                    {variant.images.map((image) => (
                      <img
                        key={image.public_id}
                        src={image.url}
                        alt=""
                        className="h-20 w-20 rounded-lg border object-cover"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ icon, label, value }) {
  return (
    <div>
      <p className="mb-1 flex items-center gap-2 text-sm text-slate-500">
        {icon}
        {label}
      </p>

      <div className="font-medium">{value}</div>
    </div>
  );
}
