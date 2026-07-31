import { create } from "zustand";
import {
  getProducts,
  getProduct,
} from "@/services/product.service";

const initialFilters = {
  brand: [],
  category: [],
  size: [],
  color: [],
  minPrice: "",
  maxPrice: "",
  inStock: false,
};

const useProductStore = create((set, get) => ({
  // ===========================
  // State
  // ===========================

  products: [],
  product: null,

  trendingProducts: [],
trendingLoading: false,

  loading: false,
  productLoading: false,

  error: null,

  pagination: {
    page: 1,
    totalPages: 1,
    totalProducts: 0,
    hasNextPage: false,
    hasPrevPage: false,
  },

  page: 1,
  limit: 12,
  search: "",
  sort: "newest",

  filters: initialFilters,

  initialized: false,

  // ===========================
  // Query Actions
  // ===========================

  setSearch: (search) =>
    set({
      search,
      page: 1,
    }),

  setSort: (sort) =>
    set({
      sort,
      page: 1,
    }),

  setPage: (page) =>
    set({
      page,
    }),

  setFilters: (filters) =>
    set((state) => ({
      filters: {
        ...state.filters,
        ...filters,
      },
      page: 1,
    })),

  resetFilters: () =>
    set({
      filters: initialFilters,
      page: 1,
      search: "",
      sort: "newest",
    }),

  // ===========================
  // Product List
  // ===========================

 fetchProducts: async () => {
  const {
    page,
    limit,
    search,
    sort,
    filters,
  } = get();

  set({
    loading: true,
    error: null,
  });

  try {
    const res = await getProducts({
      page,
      limit,
      search,
      sort,
      filters,
    });

    set({
      products: res.products,
      pagination: {
        page: res.currentPage,
        totalPages: res.totalPages,
        totalProducts: res.totalProducts,
        hasNextPage: res.currentPage < res.totalPages,
        hasPrevPage: res.currentPage > 1,
      },
      loading: false,
      initialized: true,
    });
  } catch (error) {
    set({
      loading: false,
      error:
        error.response?.data?.message ||
        error.message ||
        "Unable to load products.",
    });
  }
},

fetchTrendingProducts: async () => {
  set({
    trendingLoading: true,
    error: null,
  });

  try {
    const res = await getProducts({
      page: 1,
      limit: 8,
      filters: {
        bestseller: true,
      },
    });

    set({
      trendingProducts: res.products,
      trendingLoading: false,
    });
  } catch (error) {
    set({
      trendingLoading: false,
      error:
        error.response?.data?.message ||
        error.message ||
        "Unable to load trending products.",
    });
  }
},

  // ===========================
  // Single Product
  // ===========================

fetchProduct: async (id) => {
  set({
    productLoading: true,
    error: null,
  });

  try {
    const res = await getProduct(id);

    set({
      product: res.product,
      productLoading: false,
    });

    return res.product;
  } catch (error) {
    set({
      productLoading: false,
      error:
        error.response?.data?.message ||
        "Unable to load product.",
    });

    return null;
  }
},

  clearProduct: () =>
    set({
      product: null,
    }),
    setCategory: (category) =>
  set((state) => ({
    filters: {
      ...state.filters,
      category: category ? [category] : [],
    },
    page: 1,
  })),
  getTotalStock: () => {
  const product = get().product;

  if (!product) return 0;

  return product.variants.reduce(
    (total, variant) =>
      total +
      variant.sizes.reduce(
        (sum, size) => sum + size.stock,
        0
      ),
    0
  );
},
}));

export default useProductStore;