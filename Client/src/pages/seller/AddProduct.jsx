import { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

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
    <div className="mx-auto max-w-7xl space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Add Product</h1>

        <p className="mt-2 text-slate-500">
          Create a new product for your store.
        </p>
      </div>

      <ProductForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
