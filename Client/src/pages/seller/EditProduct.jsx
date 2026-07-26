import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";

import ProductForm from "@/components/product/ProductForm";
import {
  getProduct,
  updateProduct,
} from "@/services/product.service";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const response = await getProduct(id);

      setProduct(response.product);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Unable to load product."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (
    formData,
    newImages,
    deletedImages = []
  ) => {
    try {
      setSaving(true);

      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          data.append(key, JSON.stringify(value));
        } else {
          data.append(key, value);
        }
      });

      data.append(
  "existingImages",
  JSON.stringify(formData.images || [])
);


      newImages.forEach((image) => {
        data.append("images", image);
      });


      data.append(
        "deletedImages",
        JSON.stringify(deletedImages)
      );

      const response = await updateProduct(id, data);

      toast.success(
        response.message || "Product updated successfully."
      );

      navigate("/seller/products");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to update product."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[450px] items-center justify-center rounded-2xl border border-slate-200 bg-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600"></div>

          <h3 className="text-lg font-semibold text-slate-900">
            Loading Product
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Please wait while we fetch the product details...
          </p>
        </div>
      </div>
    );
  }

  return (
     <div className="space-y-6">
    {/* Header */}
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <button
        type="button"
        onClick={() => navigate("/seller/products")}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm transition hover:bg-slate-100"
      >
        <ArrowLeft className="h-5 w-5 text-slate-700" />
      </button>

      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Edit Product
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Update product details, pricing, stock, sizes, colors and images.
        </p>
      </div>
    </div>

    {/* Product Form */}

    <ProductForm
      initialData={product}
      onSubmit={handleSubmit}
      loading={saving}
      isEdit={true}
    />
  </div>
  );
}