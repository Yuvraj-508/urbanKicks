import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

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

  <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:gap-4 md:p-6">
    <button
      type="button"
      onClick={() => navigate("/seller/products")}
      className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:bg-slate-100 hover:shadow-md md:h-10 md:w-10 md:rounded-xl"
    >
      <ArrowLeft className="h-4 w-4 text-slate-700 md:h-5 md:w-5" />
    </button>

    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
        Edit Product
      </h1>

      <p className="mt-1 text-sm text-slate-500">
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