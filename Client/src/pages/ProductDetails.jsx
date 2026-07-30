import { useEffect } from "react";
import { useParams } from "react-router-dom";

import ProductGallery from "@/components/C-products/ProductGallery";
import ProductInfo from "@/components/C-products/ProductInfo";
import RelatedProducts from "@/components/C-products/RelatedProducts";
import PageLoader from "@/components/loading/PageLoader";
import useProductStore from "@/store/productStore";

export default function ProductDetails() {
  const { id } = useParams();

  const product = useProductStore((state) => state.product);
  const loading = useProductStore((state) => state.productLoading);
  const error = useProductStore((state) => state.error);

  const fetchProduct = useProductStore(
    (state) => state.fetchProduct
  );

  const clearProduct = useProductStore(
    (state) => state.clearProduct
  );

  useEffect(() => {
    fetchProduct(id);

    return () => {
      clearProduct();
    };
  }, [id, fetchProduct, clearProduct]);

 if (loading) {
  return (
    <PageLoader
      title="Loading Product"
      subtitle="Getting product details..."
    />
  );
}

if (error) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-5">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-600">
          Something went wrong
        </h2>

        <p className="mt-3 text-slate-500">
          {error}
        </p>
      </div>
    </div>
  );
}

if (!product) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-5">
      <div className="text-center">
        <h2 className="text-2xl font-bold">
          Product Not Found
        </h2>

        <p className="mt-3 text-slate-500">
          The product you're looking for doesn't exist or has been removed.
        </p>
      </div>
    </div>
  );
}

  return (
    <>
      <section className="py-6">
        <div className="mx-auto grid max-w-7xl items-start gap-8 px-5 lg:grid-cols-[1fr_0.95fr]">
          <ProductGallery product={product} />
          <ProductInfo product={product} />
        </div>
      </section>

      <RelatedProducts productId={product._id} />
    </>
  );
}