import { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import ProductForm from "@/components/product/ProductForm";
import { createProduct } from "@/services/product.service";

export default function AddProduct() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData, images) => {
    try {
      if (!images?.length) {
        return toast.error("Please upload at least one product image.");
      }

      setLoading(true);

      const data = new FormData();

      data.append("name", formData.name.trim());
      data.append("description", formData.description?.trim() || "");
      data.append("brand", formData.brand);
      data.append("category", formData.category);
      data.append("price", formData.price);
      data.append("offerPrice", formData.offerPrice);
      data.append("stock", formData.stock);

      data.append("sizes", JSON.stringify(formData.sizes || []));

      data.append("colors", JSON.stringify(formData.colors || []));

      images.forEach((image) => {
        data.append("images", image);
      });

      const response = await createProduct(data);

      toast.success(response.message || "Product added successfully!");

      navigate("/seller/products");
    } catch (error) {
      console.error("Axios Error:", error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="mx-auto max-w-7xl space-y-8 p-4 md:p-6">
    {/* Header */}
 <div className="flex items-start gap-3 md:gap-4">
  <button
    type="button"
    onClick={() => navigate("/seller/products")}
    className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white shadow-sm transition-all hover:bg-slate-100 md:h-10 md:w-10 md:rounded-xl"
  >
    <ArrowLeft className="h-4 w-4 text-slate-700 md:h-5 md:w-5" />
  </button>

  <div>
    <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
      Add Product
    </h1>

    <p className="mt-1 text-sm text-slate-500">
      Create a new product for your store.
    </p>
  </div>
</div>

    {/* Product Form */}
    <ProductForm
      onSubmit={handleSubmit}
      loading={loading}
    />
  </div>
);

}
