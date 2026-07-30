import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import ProductHero from "@/components/C-products/ProductHero";
import ProductToolbar from "@/components/C-products/ProductToolbar";
import ProductGrid from "@/components/C-products/ProductGrid";
import ProductPagination from "@/components/C-products/ProductPagination";
import Newsletter from "@/components/home/Newsletter";
import PageLoader from "@/components/loading/PageLoader";
import useProductStore from "@/store/productStore";

export default function Products() {
  const [view, setView] = useState("grid");
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category");
  const setCategory = useProductStore((state) => state.setCategory);

  const products = useProductStore((state) => state.products);
  const loading = useProductStore((state) => state.loading);
  const error = useProductStore((state) => state.error);
  const pagination = useProductStore((state) => state.pagination);

  const page = useProductStore((state) => state.page);
  const search = useProductStore((state) => state.search);
  const sort = useProductStore((state) => state.sort);
  const filters = useProductStore((state) => state.filters);

  const setPage = useProductStore((state) => state.setPage);
  const setSearch = useProductStore((state) => state.setSearch);
  const setSort = useProductStore((state) => state.setSort);

  const fetchProducts = useProductStore((state) => state.fetchProducts);
  useEffect(() => {
    setCategory(category);
  }, [category, setCategory]);

  useEffect(() => {
    fetchProducts();
  }, [page, search, sort, filters, fetchProducts]);

  const handlePageChange = (newPage) => {
    setPage(newPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <ProductHero products={products} />

      <section className="py-10">
        <div className="mx-auto max-w-7xl px-5">
          <ProductToolbar
            search={search}
            setSearch={setSearch}
            sort={sort}
            setSort={setSort}
            view={view}
            setView={setView}
            totalProducts={pagination.totalProducts}
          />

          <div className="mt-8">
            {loading ? (
              <PageLoader
                title="Loading Products"
                subtitle="Finding the best sneakers for you..."
              />
            ) : error ? (
              <div className="flex min-h-[40vh] items-center justify-center">
                <p className="text-lg font-medium text-red-500">{error}</p>
              </div>
            ) : (
              <ProductGrid products={products} view={view} />
            )}
          </div>

          {!loading && (
            <div className="mt-14">
              <ProductPagination
                pagination={pagination}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </section>

      <Newsletter />
    </>
  );
}
