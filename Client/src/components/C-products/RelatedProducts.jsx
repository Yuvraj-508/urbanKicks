import ProductCard from "./ProductCard";
import useRelatedProducts from "@/hooks/useRelatedProducts";

export default function RelatedProducts({ productId }) {
  const { products, loading } = useRelatedProducts(productId);

  if (loading) {
    return (
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-5 text-center">
          Loading related products...
        </div>
      </section>
    );
  }

  if (!products.length) return null;

  return (
    <section className="py-8">
      <div className="mx-auto max-w-7xl px-5">

        <h2 className="mb-10 text-4xl font-black">
          Related Products
        </h2>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>

      </div>
    </section>
  );
}