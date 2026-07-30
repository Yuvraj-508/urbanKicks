import { useEffect, useState } from "react";
import { getRelatedProducts } from "@/services/product.service";

export default function useRelatedProducts(id) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetchRelated();
  }, [id]);

  const fetchRelated = async () => {
    try {
      setLoading(true);

      const res = await getRelatedProducts(id);

      setProducts(res.products || []);
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    loading,
  };
}