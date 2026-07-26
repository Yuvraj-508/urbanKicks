import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { LayoutGrid, List, Plus, Search, Filter } from "lucide-react";

import ProductCard from "@/components/product/ProductTable";
import ProductSkeleton from "@/components/product/ProductSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";


import { getProducts, deleteProduct } from "@/services/product.service";

export default function Products() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);
const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await getProducts();

      setProducts(response.products || []);
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = useMemo(() => {
    if (!search.trim()) return products;

    const keyword = search.toLowerCase();

    return products.filter((product) => {
      return (
        product.name?.toLowerCase().includes(keyword) ||
        product.brand?.toLowerCase().includes(keyword) ||
        product.category?.toLowerCase().includes(keyword)
      );
    });
  }, [products, search]);

const handleDelete = async () => {
  if (!deleteId) return;

  try {
    setIsDeleting(true);

    await deleteProduct(deleteId);

    toast.success("Product deleted successfully.");

    setProducts((prev) =>
      prev.filter((product) => product._id !== deleteId)
    );

    setDeleteId(null);
  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message ||
        "Failed to delete product."
    );
  } finally {
    setIsDeleting(false);
  }
};

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your products, inventory and pricing.
          </p>
        </div>

        <Button
          size="lg"
          className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700"
          onClick={() => navigate("/seller/products/add")}
        >
          <Plus className="mr-2 h-5 w-5" />
          Add Product
        </Button>
      </div>

      {/* Filters */}

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="pl-10"
            />
          </div>

          {/* <div className="hidden gap-3 md:flex">
            <select className="h-10 rounded-xl border border-slate-200 bg-white px-4">
              <option>Category</option>
            </select>

            <select className="h-10 rounded-xl border border-slate-200 bg-white px-4">
              <option>Brand</option>
            </select>

            <select className="h-10 rounded-xl border border-slate-200 bg-white px-4">
              <option>Newest</option>
            </select>
          </div>

          <Button variant="outline" className="md:hidden">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button> */}

          {/* <div className="ml-auto flex gap-2">
            <Button variant="outline" size="icon">
              <LayoutGrid className="h-5 w-5" />
            </Button>

            <Button variant="outline" size="icon">
              <List className="h-5 w-5" />
            </Button>
          </div> */}
        </div>
      </div>

      {/* Summary */}

      {!loading && (
        <div className="flex items-center justify-between text-sm text-slate-500">
          <p>
            Total Products{" "}
            <span className="font-semibold text-slate-900">
              {filteredProducts.length}
            </span>
          </p>

          <p>Newest First</p>
        </div>
      )}

      {/* Loading */}

      {loading ? (
        <ProductSkeleton />
      ) : filteredProducts.length === 0 ? (
        <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed bg-white text-center">
          <div className="mb-4 text-6xl">📦</div>

          <h2 className="text-xl font-semibold">No Products Found</h2>

          <p className="mt-2 max-w-sm text-slate-500">
            Start by adding your first product to your inventory.
          </p>

          <Button
            className="mt-6 bg-emerald-600 hover:bg-emerald-700"
            onClick={() => navigate("/seller/products/add")}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      ) : (
<ProductCard
  products={filteredProducts}
  onDelete={(id) => setDeleteId(id)}
/>      )}

<AlertDialog
      open={!!deleteId}
      onOpenChange={(open) => {
        if (!open) setDeleteId(null);
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete Product?
          </AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. The product will be
            permanently deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700"
          >
            {isDeleting ? "Deleting..." : "Delete Product"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

    </div>
  );
}
