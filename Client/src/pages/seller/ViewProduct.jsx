import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, Package, Tag, Layers } from "lucide-react";
import toast from "react-hot-toast";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProduct } from "@/services/product.service";

export default function ViewProduct() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await getProduct(id);
      setProduct(response.product);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load product."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[450px] items-center justify-center">
        <p className="text-slate-500">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="rounded-xl border bg-white p-10 text-center">
        <h2 className="text-xl font-semibold">Product not found</h2>

        <Link to="/seller/products">
          <Button className="mt-6">
            Back to Products
          </Button>
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
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>

          <h1 className="mt-3 text-3xl font-bold">
            {product.name}
          </h1>

          <p className="text-slate-500">
            Product Details
          </p>
        </div>

        <Link to={`/seller/products/edit/${product._id}`}>
          <Button>Edit Product</Button>
        </Link>
      </div>

      {/* Content */}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Images */}

        <div className="rounded-2xl border bg-white p-5">
          <h2 className="mb-4 text-lg font-semibold">
            Images
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {product.images?.map((image) => (
              <img
                key={image.public_id}
                src={image.url}
                alt={product.name}
                className="aspect-square rounded-xl border object-cover"
              />
            ))}
          </div>
        </div>

        {/* Details */}

        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border bg-white p-6">
            <h2 className="mb-5 text-lg font-semibold">
              Basic Information
            </h2>

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
                label="Stock"
                value={product.stock}
              />

              <Info
                label="Status"
                value={
                  <Badge
                    className={
                      product.stock > 0
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }
                  >
                    {product.stock > 0
                      ? "In Stock"
                      : "Out of Stock"}
                  </Badge>
                }
              />
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-6">
            <h2 className="mb-3 text-lg font-semibold">
              Description
            </h2>

            <p className="leading-7 text-slate-600">
              {product.description || "No description available."}
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold">
              Sizes
            </h2>

            <div className="flex flex-wrap gap-2">
              {product.sizes?.map((size) => (
                <Badge key={size} variant="secondary">
                  {size}
                </Badge>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold">
              Colors
            </h2>

            <div className="flex flex-wrap gap-3">
              {product.colors?.map((color) => (
                <div
                  key={color}
                  className="flex items-center gap-2 rounded-lg border px-3 py-2"
                >
                  <div
                    className="h-5 w-5 rounded-full border"
                    style={{
                      backgroundColor: color,
                    }}
                  />

                  <span>{color}</span>
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

      <div className="font-medium">
        {value}
      </div>
    </div>
  );
}