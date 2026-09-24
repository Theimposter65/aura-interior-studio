import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, options?: { dimension?: string; frame?: string; quantity?: number }) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  appliedPromo: string | null;
  promoDiscount: number;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;
  itemCount: number;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'aura_cart_v1';

export const VALID_PROMO_CODES: Record<string, { discountPercent: number; description: string }> = {
  'ATELIER10': { discountPercent: 10, description: '10% New Collector Welcome' },
  'ARCHITECT15': { discountPercent: 15, description: '15% Trade Partner Privilege' },
  'SUMMERLUXE': { discountPercent: 20, description: '20% Seasonal Curator Bonus' }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          return JSON.parse(stored);
        }
      } catch (e) {
        console.warn('Failed to parse cart from localStorage:', e);
      }
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch (e) {
        console.warn('Failed to save cart to localStorage:', e);
      }
    }
  }, [items]);

  const addToCart = (product: Product, options?: { dimension?: string; frame?: string; quantity?: number }) => {
    const selectedDimension = options?.dimension || product.dimensions?.[0] || 'Standard';
    const selectedFrame = options?.frame || product.frames?.[0] || 'Frameless';
    const quantity = options?.quantity || 1;

    const uniqueId = `${product.id}-${selectedDimension}-${selectedFrame}`.replace(/\s+/g, '-').toLowerCase();

    setItems(prevItems => {
      const existingIndex = prevItems.findIndex(i => i.id === uniqueId);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      } else {
        return [
          ...prevItems,
          {
            id: uniqueId,
            product,
            quantity,
            selectedDimension,
            selectedFrame
          }
        ];
      }
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setItems(prevItems =>
      prevItems.map(item => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedPromo(null);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const applyPromo = (code: string) => {
    const normalized = code.trim().toUpperCase();
    if (VALID_PROMO_CODES[normalized]) {
      setAppliedPromo(normalized);
      return { success: true, message: `Promo applied: ${VALID_PROMO_CODES[normalized].description}` };
    }
    return { success: false, message: 'Invalid or expired promotion code' };
  };

  const removePromo = () => {
    setAppliedPromo(null);
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  
  const promoPercent = appliedPromo ? VALID_PROMO_CODES[appliedPromo]?.discountPercent || 0 : 0;
  const promoDiscount = Math.round((subtotal * promoPercent) / 100);

  // Complimentary white-glove shipping on orders over $500, else $45
  const shipping = subtotal > 0 && subtotal - promoDiscount < 500 ? 45 : 0;
  const taxableAmount = Math.max(0, subtotal - promoDiscount);
  const tax = Math.round(taxableAmount * 0.08); // 8% estimated state tax
  const total = Math.max(0, taxableAmount + shipping + tax);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
        appliedPromo,
        promoDiscount,
        applyPromo,
        removePromo,
        itemCount,
        subtotal,
        shipping,
        tax,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
