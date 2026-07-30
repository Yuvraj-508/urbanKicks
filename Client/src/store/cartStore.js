import { create } from "zustand";
import { persist } from "zustand/middleware";

const isSameVariant = (item, productId, size, color) =>
  item.product._id === productId &&
  item.size === size &&
  item.color === color;

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
      }) => {
        const selectedSize =
          size || product?.sizes?.[0] || null;

        const selectedColor =
          color || product?.colors?.[0]?.name || null;

        set((state) => {
          const existingItem = state.cartItems.find((item) =>
            isSameVariant(
              item,
              product._id,
              selectedSize,
              selectedColor
            )
          );

          if (existingItem) {
            return {
              cartItems: state.cartItems.map((item) =>
                isSameVariant(
                  item,
                  product._id,
                  selectedSize,
                  selectedColor
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
                id: `${product._id}-${selectedSize}-${selectedColor}`,
                product,
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
            item.product.offerPrice ?? item.product.price;

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