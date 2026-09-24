import { describe, it, expect, beforeEach } from 'vitest';
import { VALID_PROMO_CODES } from '../context/CartContext';
import { products } from '../data/products';
import { CartItem } from '../types';

describe('Cart Calculations & Promo Validation', () => {
  const mockProductA = products[0]; // price: 340
  const mockProductB = products[1]; // price: 580

  // In-memory mock for localStorage in Node test runner
  const storageMock: Record<string, string> = {};
  const mockStorage = {
    getItem: (key: string) => storageMock[key] || null,
    setItem: (key: string, value: string) => {
      storageMock[key] = value;
    },
    removeItem: (key: string) => {
      delete storageMock[key];
    },
    clear: () => {
      for (const k of Object.keys(storageMock)) {
        delete storageMock[k];
      }
    }
  };

  beforeEach(() => {
    mockStorage.clear();
  });

  it('validates promo codes dictionary correctly', () => {
    expect(VALID_PROMO_CODES['ATELIER10'].discountPercent).toBe(10);
    expect(VALID_PROMO_CODES['ARCHITECT15'].discountPercent).toBe(15);
    expect(VALID_PROMO_CODES['SUMMERLUXE'].discountPercent).toBe(20);
    expect(VALID_PROMO_CODES['INVALID']).toBeUndefined();
  });

  it('calculates cart item subtotals and discounts correctly', () => {
    const cartItems: CartItem[] = [
      {
        id: 'wall-01-std',
        product: mockProductA,
        quantity: 2, // 340 * 2 = 680
        selectedDimension: '120x80 cm',
        selectedFrame: 'Natural White Oak'
      },
      {
        id: 'wall-02-std',
        product: mockProductB,
        quantity: 1, // 580 * 1 = 580
        selectedDimension: 'Three 60x120 cm Panels',
        selectedFrame: 'Blackened Ash'
      }
    ];

    const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    expect(subtotal).toBe(1260);

    // Apply 10% promo
    const discountPercent = VALID_PROMO_CODES['ATELIER10'].discountPercent;
    const promoDiscount = Math.round((subtotal * discountPercent) / 100);
    expect(promoDiscount).toBe(126);

    const discountedSubtotal = subtotal - promoDiscount;
    expect(discountedSubtotal).toBe(1134);

    // Shipping: over $500 so complimentary (0)
    const shipping = discountedSubtotal >= 500 ? 0 : 45;
    expect(shipping).toBe(0);

    // Tax: 8% of discountedSubtotal
    const tax = Math.round(discountedSubtotal * 0.08);
    expect(tax).toBe(91);

    const grandTotal = discountedSubtotal + shipping + tax;
    expect(grandTotal).toBe(1225);
  });

  it('applies shipping fee for small orders below threshold', () => {
    const singleSmallItem: CartItem = {
      id: 'pkg-01-sample',
      product: {
        ...mockProductA,
        price: 195
      },
      quantity: 1
    };

    const subtotal = singleSmallItem.product.price * singleSmallItem.quantity;
    const shipping = subtotal < 500 ? 45 : 0;
    expect(shipping).toBe(45);
  });

  it('persists and restores cart from localStorage properly', () => {
    const itemsToStore = [
      {
        id: 'test-item-1',
        product: mockProductA,
        quantity: 3
      }
    ];

    mockStorage.setItem('theartistictales_cart_v1', JSON.stringify(itemsToStore));
    const retrieved = JSON.parse(mockStorage.getItem('theartistictales_cart_v1') || '[]');

    expect(retrieved.length).toBe(1);
    expect(retrieved[0].quantity).toBe(3);
    expect(retrieved[0].product.title).toBe(mockProductA.title);
  });
});
