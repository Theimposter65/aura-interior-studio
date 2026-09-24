import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, Sparkles, CheckCircle2 } from 'lucide-react';
import { useCart, VALID_PROMO_CODES } from '../../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    promoDiscount,
    appliedPromo,
    applyPromo,
    removePromo,
    shipping,
    tax,
    total,
    clearCart
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{ message: string; success: boolean } | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromo(promoInput);
    setPromoFeedback(res);
    if (res.success) {
      setPromoInput('');
    }
  };

  const handleMockCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderConfirmed(true);
    }, 1200);
  };

  const handleFinishOrder = () => {
    clearCart();
    setOrderConfirmed(false);
    closeCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-studio-900/60 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-studio-50 shadow-2xl flex flex-col justify-between border-l border-studio-200">
          {/* Header */}
          <div className="p-6 border-b border-studio-200 flex items-center justify-between bg-white/50">
            <div>
              <h2 className="font-serif text-2xl text-studio-900 font-normal tracking-wide">
                Your Atelier Bag
              </h2>
              <p className="text-xs text-studio-500 uppercase tracking-wider mt-0.5">
                {items.length === 0 ? 'Empty bag' : `${items.length} bespoke selection${items.length > 1 ? 's' : ''}`}
              </p>
            </div>
            <button
              onClick={closeCart}
              className="p-2 text-studio-500 hover:text-studio-900 rounded-full hover:bg-studio-100 transition-colors"
              aria-label="Close Cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {orderConfirmed ? (
              <div className="py-12 px-4 text-center space-y-4 animate-fadeIn">
                <div className="w-16 h-16 bg-sage-100 text-sage-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10 stroke-[1.8]" />
                </div>
                <h3 className="font-serif text-3xl text-studio-900">Bespoke Order Confirmed</h3>
                <p className="text-xs text-studio-600 leading-relaxed max-w-xs mx-auto">
                  Thank you for entrusting your space with AURA Atelier. Our master curators have received your acquisition protocol.
                </p>
                <div className="bg-white p-4 rounded-lg border border-studio-200/80 text-left text-xs space-y-2 mt-6">
                  <div className="flex justify-between font-mono text-studio-500">
                    <span>Order Reference:</span>
                    <span className="font-semibold text-studio-800">AUR-{(Math.random() * 90000 + 10000).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between font-mono text-studio-500">
                    <span>Acquisition Total:</span>
                    <span className="font-semibold text-studio-800">${total} USD</span>
                  </div>
                  <div className="flex justify-between font-mono text-studio-500">
                    <span>Dispatch Protocol:</span>
                    <span className="text-sage-700 font-semibold">White-Glove Insured</span>
                  </div>
                </div>
                <button
                  onClick={handleFinishOrder}
                  className="w-full mt-6 py-3.5 px-6 bg-studio-900 hover:bg-studio-800 text-white text-xs uppercase tracking-widest transition-all rounded-sm shadow-md"
                >
                  Return to Atelier
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-studio-100 flex items-center justify-center mx-auto text-studio-400">
                  <Sparkles className="w-7 h-7 stroke-[1.4]" />
                </div>
                <h3 className="font-serif text-2xl text-studio-800">Your bag is serene and quiet</h3>
                <p className="text-xs text-studio-500 max-w-xs mx-auto leading-relaxed">
                  Discover our limited mineral wall murals, turnkey 3D spatial plans, or test pieces in the interactive room visualizer.
                </p>
                <button
                  onClick={closeCart}
                  className="mt-4 inline-flex items-center space-x-2 px-6 py-3 bg-studio-900 text-white text-xs uppercase tracking-widest hover:bg-studio-800 transition-colors rounded-sm"
                >
                  <span>Explore Collections</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="divide-y divide-studio-200">
                {items.map(item => (
                  <div key={item.id} className="py-4 first:pt-0 flex space-x-4">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-20 h-24 object-cover rounded bg-studio-200 flex-shrink-0 shadow-sm"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif text-lg text-studio-900 leading-tight">
                            {item.product.title}
                          </h4>
                          <span className="text-sm font-medium text-studio-900 ml-2">
                            ${item.product.price * item.quantity}
                          </span>
                        </div>
                        <p className="text-[11px] text-studio-500 uppercase tracking-wider mt-0.5">
                          {item.product.category.replace('-', ' ')}
                        </p>
                        {(item.selectedDimension || item.selectedFrame) && (
                          <div className="mt-1 text-[11px] text-studio-600 space-y-0.5">
                            {item.selectedDimension && (
                              <p>Size: <span className="text-studio-800 font-medium">{item.selectedDimension}</span></p>
                            )}
                            {item.selectedFrame && (
                              <p>Frame: <span className="text-studio-800 font-medium">{item.selectedFrame}</span></p>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-studio-200 bg-white rounded">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 hover:text-studio-900 text-studio-500 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-semibold text-studio-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 hover:text-studio-900 text-studio-500 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-xs text-studio-400 hover:text-terracotta-700 transition-colors flex items-center space-x-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Footer / Summary */}
          {!orderConfirmed && items.length > 0 && (
            <div className="p-6 bg-white border-t border-studio-200 space-y-4">
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="space-y-2">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={e => setPromoInput(e.target.value)}
                    placeholder="Privilege Code (e.g. ATELIER10)"
                    className="flex-1 text-xs px-3 py-2 border border-studio-300 rounded focus:outline-none focus:border-studio-800 uppercase tracking-wider"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-studio-100 hover:bg-studio-200 text-studio-900 text-xs uppercase tracking-wider font-semibold rounded transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoFeedback && (
                  <p className={`text-[11px] ${promoFeedback.success ? 'text-sage-700' : 'text-terracotta-700'}`}>
                    {promoFeedback.message}
                  </p>
                )}
                {appliedPromo && (
                  <div className="flex items-center justify-between text-xs text-sage-700 bg-sage-50 px-2.5 py-1.5 rounded">
                    <span>Applied: {appliedPromo} ({VALID_PROMO_CODES[appliedPromo]?.discountPercent}% OFF)</span>
                    <button onClick={removePromo} className="text-studio-400 hover:text-studio-700 text-[10px] underline">
                      Remove
                    </button>
                  </div>
                )}
              </form>

              {/* Price Breakdown */}
              <div className="space-y-2 pt-2 text-xs border-t border-studio-100">
                <div className="flex justify-between text-studio-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-studio-900">${subtotal}</span>
                </div>
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-sage-700">
                    <span>Privilege Discount</span>
                    <span>-${promoDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between text-studio-600">
                  <span>White-Glove Delivery</span>
                  <span>{shipping === 0 ? <span className="text-sage-700 font-medium">Complimentary</span> : `$${shipping}`}</span>
                </div>
                <div className="flex justify-between text-studio-600">
                  <span>Estimated Architectural Tax (8%)</span>
                  <span>${tax}</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-studio-900 pt-2 border-t border-studio-200">
                  <span>Total Acquisition</span>
                  <span className="font-serif text-lg">${total} USD</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleMockCheckout}
                disabled={isCheckingOut}
                className="w-full py-4 bg-studio-900 hover:bg-studio-800 text-white text-xs uppercase tracking-[0.2em] font-medium transition-all flex items-center justify-center space-x-2 rounded-sm shadow-md"
              >
                {isCheckingOut ? (
                  <span>Securing Acquisition Protocol...</span>
                ) : (
                  <>
                    <span>Proceed to Bespoke Checkout</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center space-x-4 text-[10px] text-studio-400 pt-1">
                <span className="flex items-center space-x-1">
                  <ShieldCheck className="w-3 h-3 text-sage-600" />
                  <span>Insured Transit</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Truck className="w-3 h-3" />
                  <span>Global Atelier Logistics</span>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
