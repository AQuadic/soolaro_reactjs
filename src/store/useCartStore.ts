import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { cartApi, clearCouponFromSession, getCouponFromSession, type Cart } from "@/lib/api/cart";

interface CartActions {
  setCart: (cart: Cart) => void;
  removeItem: (itemId: number) => Promise<void>;
  updateItemQuantity: (itemId: number, quantity: number) => Promise<void>;
  addToCart: (
    itemableId: number,
    itemableType: string,
    quantity: number,
    variantId?: number,
  ) => Promise<void>;
  applyCoupon: (couponCode: string) => Promise<void>;
  clearCoupon: () => Promise<void>;
  clearCart: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  fetchCart: () => Promise<void>;
  syncCartSilently: () => Promise<void>;
  fetchCartWithAddress: (cityId: string, areaId?: string) => Promise<void>;
  // Optimistic update helpers
  optimisticUpdateQuantity: (itemId: number, quantity: number) => void;
  optimisticRemoveItem: (itemId: number) => void;
  rollbackOptimisticUpdate: (backup: Cart | null) => void;
}

interface CartStore extends CartActions {
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;
  appliedCoupon: string | null;
  isCouponLoading: boolean;
}

export const useCartStore = create<CartStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      cart: null,
      isLoading: false,
      error: null,
      appliedCoupon: getCouponFromSession(),
      isCouponLoading: false,

      // Actions
      setCart: (cart) => {
        set({ cart, error: null });
      },

      setLoading: (loading) => {
        set({ isLoading: loading });
      },

      setError: (error) => {
        set({ error });
      },

      removeItem: async (itemId) => {
        const { cart, optimisticRemoveItem, rollbackOptimisticUpdate } = get();
        if (!cart) return;

        const item = cart.items.find((item) => item.id === itemId);
        if (!item) return;

        // Create backup for rollback
        const cartBackup = { ...cart, items: [...cart.items] };

        // Optimistic update - remove item from UI immediately
        optimisticRemoveItem(itemId);

        try {
          // Make API call in background
          await cartApi.removeFromCart(item.itemable_id, {
            itemable_id: item.itemable_id,
            itemable_type: item.itemable_type,
          });

          // Sync with server to get updated totals (silently)
          await get().syncCartSilently();
        } catch (error) {
          console.error("Failed to remove item from cart:", error);
          // Rollback optimistic update
          rollbackOptimisticUpdate(cartBackup);
          throw error;
        }
      },

      updateItemQuantity: async (itemId, quantity) => {
        const {
          cart,
          optimisticUpdateQuantity,
          rollbackOptimisticUpdate,
          removeItem,
        } = get();
        if (!cart) return;

        const item = cart.items.find((item) => item.id === itemId);
        if (!item) return;

        // Handle quantity going to 0 as removal
        if (quantity <= 0) {
          await removeItem(itemId);
          return;
        }

        // Create backup for rollback
        const cartBackup = { ...cart, items: [...cart.items] };

        // Optimistic update - update quantity in UI immediately
        optimisticUpdateQuantity(itemId, quantity);

        try {
          // Make API call in background (addToCart with new quantity replaces existing)
          await cartApi.addToCart({
            itemable_id: item.itemable_id,
            itemable_type: item.itemable_type,
            quantity: quantity,
            variant_id: item.variant.id,
          });

          // Sync with server to get updated totals (silently)
          await get().syncCartSilently();
        } catch (error) {
          console.error("Failed to update item quantity:", error);
          rollbackOptimisticUpdate(cartBackup);
          throw error;
        }
      },

      addToCart: async (itemableId, itemableType, quantity, variantId) => {
        set({ isLoading: true, error: null });

        try {
          const cart = await cartApi.addToCart({
            itemable_id: itemableId,
            itemable_type: itemableType,
            quantity,
            variant_id: variantId,
          });

          set({ cart, isLoading: false, error: null });
        } catch (error) {
          console.error("Failed to add item to cart:", error);
          set({ isLoading: false, error: "Failed to add item to cart" });
          throw error;
        }
      },

      applyCoupon: async (couponCode: string) => {
        set({ isCouponLoading: true, error: null });
        try {
          const cart = await cartApi.applyCoupon(couponCode);
          set({
            cart,
            appliedCoupon: couponCode,
            isCouponLoading: false,
          });
        } catch (error) {
          set({ error: "Failed to apply coupon code", isCouponLoading: false });
          throw error;
        }
      },

      clearCoupon: async () => {
        set({ isCouponLoading: true, error: null });
        try {
          const cart = await cartApi.clearCoupon();
          set({
            cart,
            appliedCoupon: null,
            isCouponLoading: false,
          });
        } catch (error) {
          set({ error: "Failed to clear coupon", isCouponLoading: false });
          throw error;
        }
      },

      clearCart: () => {
        set({
          cart: null,
          error: null,
          appliedCoupon: null,
          isCouponLoading: false,
        });
      },

      fetchCart: async () => {
        set({ isLoading: true, error: null });
        try {
          const cart = await cartApi.getCart();
          const storedCoupon = getCouponFromSession();

          // Clear coupon if cart is empty
          const shouldClearCoupon = !storedCoupon || cart.items.length === 0;

          set({
            cart,
            isLoading: false,
            appliedCoupon: shouldClearCoupon ? null : storedCoupon,
          });
        } catch (error) {
          console.error("Failed to fetch cart:", error);
          set({ error: "Failed to fetch cart", isLoading: false });
        }
      },

      syncCartSilently: async () => {
        // Same as fetchCart but without setting isLoading
        try {
          const cart = await cartApi.getCart();
          const storedCoupon = getCouponFromSession();
          const shouldClearCoupon = !storedCoupon || cart.items.length === 0;
            if (shouldClearCoupon) {
                  clearCouponFromSession();
                }
          set({
            cart,
            error: null,
            appliedCoupon: shouldClearCoupon ? null : storedCoupon,
          });
        } catch (error) {
          // Don't set error state for silent sync failures
          console.warn("Silent cart sync failed:", error);
        }
      },

      fetchCartWithAddress: async (cityId, areaId) => {
        // Silently refresh cart with location params to get updated shipping fee
        try {
          const params: Record<string, string> = { city_id: cityId };
          if (areaId) params.area_id = areaId;

          const storedCoupon = getCouponFromSession();
          const cart = await cartApi.getCart({
            ...params,
            coupon_code: storedCoupon || undefined,
          });
          const shouldClearCoupon = !storedCoupon || cart.items.length === 0;

          set({
            cart,
            error: null,
            appliedCoupon: shouldClearCoupon ? null : storedCoupon,
          });
        } catch (error) {
          console.warn("Failed to refresh cart with address:", error);
        }
      },

      // Optimistic update helpers
      optimisticUpdateQuantity: (itemId, quantity) => {
        const { cart } = get();
        if (!cart) return;

        const updatedItems = cart.items.map((item) =>
          item.id === itemId ? { ...item, quantity } : item,
        );

        const updatedCart: Cart = {
          ...cart,
          items: updatedItems,
          calculations: { ...cart.calculations },
        };
        set({ cart: updatedCart });
      },

      optimisticRemoveItem: (itemId) => {
        const { cart } = get();
        if (!cart) return;

        const updatedItems = cart.items.filter((item) => item.id !== itemId);

        const updatedCart: Cart = {
          ...cart,
          items: updatedItems,
          calculations: { ...cart.calculations },
        };

        // If removing the last item, clear applied coupon
        if (updatedCart.items.length === 0) {
          set({ cart: updatedCart, appliedCoupon: null });
        } else {
          set({ cart: updatedCart });
        }
      },

      rollbackOptimisticUpdate: (backup) => {
        if (backup) set({ cart: backup });
      },
    }),
    { name: "cart-store" },
  ),
);

// Selector helpers
export const useCartItems = () =>
  useCartStore((state) => state.cart?.items || []);
export const useCartItemsCount = () =>
  useCartStore(
    (state) =>
      state.cart?.items?.reduce(
        (sum, item) => sum + (item?.quantity || 0),
        0,
      ) || 0,
  );
export const useCartCalculations = () =>
  useCartStore((state) => state.cart?.calculations);
export const useCartLoading = () => useCartStore((state) => state.isLoading);
