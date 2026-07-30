import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { LayoutGrid, List, Plus, Search, Filter } from "lucide-react";
import { Loader2 } from "lucide-react";
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

import {
  getProducts,
  deleteProduct,
  updateStock,
} from "@/services/product.service";
import ProductTable from "@/components/product/ProductTable";

export default function Products() {
  const navigate = useNavigate();

const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
const [search, setSearch] = useState("");
const [deleteId, setDeleteId] = useState(null);
const [isDeleting, setIsDeleting] = useState(false);

const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const [totalProducts, setTotalProducts] = useState(0);

useEffect(() => {
  fetchProducts();
}, [currentPage, search]);;

const fetchProducts = async () => {
  try {
    setLoading(true);

    const response = await getProducts({
      page: currentPage,
      limit: 10,
      search,
    });

    setProducts(response.products);
    setTotalPages(response.totalPages);
    setTotalProducts(response.totalProducts);
  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message ||
        "Failed to load products."
    );
  } finally {
    setLoading(false);
  }
};


const handleDelete = async () => {
  if (!deleteId) return;

  try {
    setIsDeleting(true);

    await deleteProduct(deleteId);

    toast.success("Product deleted successfully.");

    // If the last product on the page was deleted,
    // move to the previous page (if possible)
    if (products.length === 1 && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else {
      fetchProducts();
    }

    setDeleteId(null);
  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message || "Failed to delete product."
    );
  } finally {
    setIsDeleting(false);
  }
};

  const handleStockToggle = async (id, checked) => {
    try {
      await updateStock(id, checked);

      toast.success(
        checked
          ? "Product marked as In Stock"
          : "Product marked as Out of Stock",
      );

      fetchProducts();
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to update stock.");
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
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
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
            {totalProducts}
            </span>
          </p>

          <p>Newest First</p>
        </div>
      )}

      {/* Loading */}

      {loading ? (
        <div className="flex min-h-[450px] items-center justify-center">
          <div className="flex flex-col items-center gap-5">
            <div className="relative">
              <div className="h-16 w-16 rounded-full border-4 border-emerald-100"></div>

              <Loader2 className="absolute inset-0 m-auto h-8 w-8 animate-spin text-emerald-600" />
            </div>

            <div className="text-center">
              <p className="text-lg font-semibold text-slate-900">
                Loading Products...
              </p>

              <p className="text-sm text-slate-500">
                Fetching the latest inventory
              </p>
            </div>
          </div>
        </div>
      ) : products.length === 0? (
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
        <ProductTable
         products={products}
          onDelete={(id) => setDeleteId(id)}
          onStockToggle={handleStockToggle}
        />
      )}

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </Button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index}
                size="icon"
                variant={currentPage === index + 1 ? "default" : "outline"}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
      )}

      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => {
          if (!open) setDeleteId(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product?</AlertDialogTitle>

            <AlertDialogDescription>
              This action cannot be undone. The product will be permanently
              deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

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
