import { useEffect } from "react";
import { lazy, Suspense } from "react";

import Hero from "@/components/home/Hero";
import FlashSale from "@/components/home/FlashSale";
const TrendingProducts = lazy(() =>
  import("@/components/home/TrendingProducts")
);import FeaturedCollection from "@/components/home/FeaturedCollection";
const Categories = lazy(() =>
  import("@/components/home/Categories")
);

const WhyChooseUs = lazy(() =>
  import("@/components/home/WhyChooseUs")
);

const CustomerReviews = lazy(() =>
  import("@/components/home/CustomerReviews")
);

const Newsletter = lazy(() =>
  import("@/components/home/Newsletter")
);

import useProductStore from "@/store/productStore";

export default function Home() {
  const initialized = useProductStore((state) => state.initialized);
const fetchTrendingProducts =
  useProductStore(
    (state) => state.fetchTrendingProducts
  );
  useEffect(() => {
    if (!initialized) {
      fetchTrendingProducts();
    }
  }, [initialized, fetchTrendingProducts]);

  return (
    <>
      <Hero />
      {/* <FlashSale /> */}
<Suspense fallback={null}>
    <TrendingProducts />
  <section id="categories">
    <Categories />
  </section>

  <WhyChooseUs />

  <CustomerReviews />

  <Newsletter />
</Suspense>
    </>
  );
}