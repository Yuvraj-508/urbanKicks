import { useEffect } from "react";

import Hero from "@/components/home/Hero";
import FlashSale from "@/components/home/FlashSale";
import Categories from "@/components/home/Categories";
import TrendingProducts from "@/components/home/TrendingProducts";
import FeaturedCollection from "@/components/home/FeaturedCollection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CustomerReviews from "@/components/home/CustomerReviews";
import Newsletter from "@/components/home/Newsletter";

import useProductStore from "@/store/productStore";

export default function Home() {
  const initialized = useProductStore((state) => state.initialized);
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  useEffect(() => {
    if (!initialized) {
      fetchProducts();
    }
  }, [initialized, fetchProducts]);

  return (
    <>
      <Hero />
      <TrendingProducts />
      {/* <FlashSale /> */}
     <section id="categories">
  <Categories />
</section>
      {/* <FeaturedCollection /> */}
      <WhyChooseUs />
      <CustomerReviews />
      <Newsletter  />
    </>
  );
}