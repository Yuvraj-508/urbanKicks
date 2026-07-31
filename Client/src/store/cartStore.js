import { create } from "zustand";
import { persist } from "zustand/middleware";

const isSameVariant = (
  item,
  productId,
  variantId,
  size
) =>
  item.product._id === productId &&
  item.variantId === variantId &&
  item.size === size;

const useCartStore = create(
  persist(
    (set, get) => ({
      // ==========================
      // State
      // ==========================

      cartItems: [],
      loading: false,
      error: null,

      // ==========================
      // Actions
      // ==========================

      addItem: ({
        product,
        quantity = 1,
        size,
        color,
        variantId,
      }) => {
        const selectedVariant =
          product?.variants?.find(
            (variant) => variant._id === variantId
          ) || product?.variants?.[0];

        const selectedSize =
          size ||
          selectedVariant?.sizes?.[0]?.size ||
          null;

        const selectedColor =
          color ||
          selectedVariant?.color?.name ||
          null;

        const selectedVariantId =
          variantId || selectedVariant?._id;

        set((state) => {
          const existingItem = state.cartItems.find((item) =>
            isSameVariant(
              item,
              product._id,
              selectedVariantId,
              selectedSize
            )
          );

          if (existingItem) {
            return {
              cartItems: state.cartItems.map((item) =>
                isSameVariant(
                  item,
                  product._id,
                  selectedVariantId,
                  selectedSize
                )
                  ? {
                      ...item,
                      quantity: item.quantity + quantity,
                    }
                  : item
              ),
            };
          }

          return {
            cartItems: [
              ...state.cartItems,
              {
                id: `${product._id}-${selectedVariantId}-${selectedSize}`,
                product,
                variantId: selectedVariantId,
                quantity,
                size: selectedSize,
                color: selectedColor,
              },
            ],
          };
        });
      },

      removeItem: (id) =>
        set((state) => ({
          cartItems: state.cartItems.filter(
            (item) => item.id !== id
          ),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: Math.max(1, quantity),
                }
              : item
          ),
        })),

      clearCart: () =>
        set({
          cartItems: [],
        }),

      // ==========================
      // Derived State
      // ==========================

      totalItems: () =>
        get().cartItems.reduce(
          (total, item) => total + item.quantity,
          0
        ),

      subtotal: () =>
        get().cartItems.reduce((total, item) => {
          const price =
            item.product.offerPrice ??
            item.product.price;

          return total + price * item.quantity;
        }, 0),
    }),
    {
      name: "urban-kicks-cart",

      partialize: (state) => ({
        cartItems: state.cartItems,
      }),
    }
  )
);

export default useCartStore;