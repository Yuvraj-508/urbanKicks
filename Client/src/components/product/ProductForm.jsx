import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import ImageUploader from "./ImageUploader";
import SizeSelector from "./SizeSelector";
import ColorSelector from "./ColorSelector";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const categories = [
  "Running",
  "Sneakers",
  "Casual",
  "Sports",
  "Boots",
  "Sleepers"
];

export default function ProductForm({
  onSubmit,
  initialData = {},
  loading = false,
}) {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    description: "",
    price: "",
    offerPrice: "",
    stock: "",
    sizes: [],
    colors: [],
  });

  const [existingImages, setExistingImages] = useState([]);
  const [images, setImages] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);

  useEffect(() => {
    if (!initialData || Object.keys(initialData).length === 0) return;

    setFormData({
      name: initialData.name || "",
      brand: initialData.brand || "",
      category: initialData.category || "",
      description: initialData.description || "",
      price: initialData.price || "",
      offerPrice: initialData.offerPrice || "",
      stock: initialData.stock || "",
      sizes: initialData.sizes || [],
      colors: initialData.colors || [],
    });

    setExistingImages(initialData.images || []);
    setDeletedImages([]);
    setImages([]);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      return toast.error("Product name is required.");
    }

    if (!formData.brand.trim()) {
      return toast.error("Brand is required.");
    }

    if (!formData.category) {
      return toast.error("Please select a category.");
    }

    if (!formData.price) {
      return toast.error("Price is required.");
    }

    if (!formData.offerPrice) {
      return toast.error("Offer price is required.");
    }

    if (Number(formData.offerPrice) > Number(formData.price)) {
      return toast.error(
        "Offer price cannot be greater than price."
      );
    }

    if (
      existingImages.length === 0 &&
      images.length === 0
    ) {
      return toast.error(
        "Please upload at least one product image."
      );
    }

    onSubmit(
      {
        ...formData,
        images: existingImages,
      },
      images,
      deletedImages
    );
  };

  return (
    <div className="relative">
 {loading && (
  <div className="absolute inset-0 z-50 flex items-center justify-center rounded-2xl bg-white/60 backdrop-blur-md">
    <div className="flex flex-col items-center gap-3">
      <Loader2 className="h-10 w-10 animate-spin text-emerald-600" />

      <p className="text-sm font-medium text-slate-700">
        {initialData?._id
          ? "Updating product..."
          : "Creating product..."}
      </p>
    </div>
  </div>
)}

    <form
      onSubmit={submitHandler}
      className="space-y-6"
    >
<fieldset
  disabled={loading}
  className={`space-y-6 transition-all duration-300 ${
    loading ? "opacity-70" : "opacity-100"
  }`}
>
  {/* Basic Information */}

  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <h2 className="mb-4 text-lg font-semibold text-slate-900">
      Basic Information
    </h2>

    <div className="grid gap-4 lg:grid-cols-2">
      <Input
        name="name"
        placeholder="Product Name"
        value={formData.name}
        onChange={handleChange}
        className="h-11"
      />

      <Input
        name="brand"
        placeholder="Brand"
        value={formData.brand}
        onChange={handleChange}
        className="h-11"
      />

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="h-11 rounded-xl border border-input bg-background px-3 text-sm outline-none focus:border-emerald-500"
      >
        <option value="">Select Category</option>

        {categories.map((category) => (
          <option
            key={category}
            value={category}
          >
            {category}
          </option>
        ))}
      </select>

      <Input
        type="number"
        name="stock"
        placeholder="Stock Quantity"
        value={formData.stock}
        onChange={handleChange}
        className="h-11"
        min={0}
      />
    </div>

    <Textarea
      rows={4}
      name="description"
      placeholder="Product Description"
      value={formData.description}
      onChange={handleChange}
      className="mt-4 resize-none"
    />
  </div>

  {/* Pricing */}

  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <h2 className="mb-4 text-lg font-semibold text-slate-900">
      Pricing
    </h2>

    <div className="grid gap-4 md:grid-cols-2">
      <Input
        type="number"
        name="price"
        placeholder="Original Price"
        value={formData.price}
        onChange={handleChange}
        className="h-11"
      />

      <Input
        type="number"
        name="offerPrice"
        placeholder="Selling Price"
        value={formData.offerPrice}
        onChange={handleChange}
        className="h-11"
      />
    </div>
  </div>

  {/* Sizes */}

  <SizeSelector
    value={formData.sizes}
    onChange={(sizes) =>
      setFormData((prev) => ({
        ...prev,
        sizes,
      }))
    }
  />

  {/* Colors */}

  <ColorSelector
    value={formData.colors}
    onChange={(colors) =>
      setFormData((prev) => ({
        ...prev,
        colors,
      }))
    }
  />

  {/* Images */}

  <ImageUploader
    existingImages={existingImages}
    setExistingImages={setExistingImages}
    deletedImages={deletedImages}
    setDeletedImages={setDeletedImages}
    images={images}
    setImages={setImages}
  />

  {/* Footer */}

  <div className="sticky bottom-0 z-20 -mx-5 rounded-b-2xl border-t border-slate-200 bg-white/95 px-5 py-4 backdrop-blur supports-[backdrop-filter]:bg-white/80">
    <div className="flex justify-end">
      <Button
        type="submit"
        disabled={loading}
        className="h-11 w-full rounded-xl bg-emerald-600 text-white transition-all hover:bg-emerald-700 sm:w-auto sm:min-w-44"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {initialData?._id
              ? "Updating Product..."
              : "Creating Product..."}
          </>
        ) : initialData?._id ? (
          "Update Product"
        ) : (
          "Create Product"
        )}
      </Button>
    </div>
  </div>
</fieldset>
    </form>
    </div>
  );
}