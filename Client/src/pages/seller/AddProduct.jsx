import { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

import ProductForm from "@/components/product/ProductForm";
import { createProduct } from "@/services/product.service";

export default function AddProduct() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (product) => {
    try {
      setLoading(true);
console.log(product.variants);
      const formData = new FormData();

      // Basic Information
      formData.append("name", product.name.trim());
  formData.append(
  "description",
  product.description?.trim() || ""
);
      formData.append("brand", product.brand);
      formData.append("category", product.category);
      formData.append("gender", product.gender);

      // Pricing
    formData.append("price", Number(product.price));
formData.append("offerPrice", Number(product.offerPrice));
      // Product Details
      formData.append("featured", product.featured);
      formData.append("bestseller", product.bestseller);
      formData.append("newArrival", product.newArrival);
      formData.append("sale", product.sale);
      formData.append("active", product.active);

      formData.append(
        "tags",
        JSON.stringify(product.tags)
      );

      // Variants (without image files)
const variants = product.variants.map((variant) => ({
  color: variant.color,
  sizes: variant.sizes,
}));
      formData.append(
        "variants",
        JSON.stringify(variants)
      );

      // Images
      product.variants.forEach((variant, index) => {
        variant.images.forEach((image) => {
          formData.append(
            `variantImages_${index}`,
            image
          );
        });
      });
for (const [key, value] of formData.entries()) {
  console.log(
    key,
    value instanceof File,
    value
  );
}
      const response = await createProduct(formData);

      toast.success(
        response.message || "Product added successfully!"
      );

      navigate("/seller/products");
  } catch (error) {
  console.error("========== UPLOAD ERROR ==========");
  console.error(error);

  if (error.response) {
    console.error("Status:", error.response.status);
    console.error("Data:", error.response.data);
  }

  if (error.request) {
    console.error("Request:", error.request);
  }

  console.error("Code:", error.code);
  console.error("Message:", error.message);
  console.error("==================================");

  const data = error.response?.data;

  if (data?.errors?.length) {
    toast.error(
      data.errors
        .map((e) => `${e.field}: ${e.message}`)
        .join("\n")
    );
  } else {
    toast.error(
      data?.message ||
      error.message ||
      "Something went wrong."
    );
  }
}finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-4 md:p-6">
      <div className="flex items-start gap-3 md:gap-4">
        <button
          type="button"
          onClick={() => navigate("/seller/products")}
          className="mt-1 flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white shadow-sm transition hover:bg-slate-100 md:h-10 md:w-10 md:rounded-xl"
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

      <ProductForm
        loading={loading}
        onSubmit={handleSubmit}
      />
    </div>
  );
}