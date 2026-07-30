import ProductCard from "./ProductCard";



export default function ProductGrid({products,view}) {
  return (
<div
  className={
    view === "grid"
      ? "grid gap-6 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      : "space-y-5"
  }
>      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}