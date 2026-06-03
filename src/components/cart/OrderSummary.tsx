import React, { useState } from 'react';
import { Tag, Truck, Shield } from 'lucide-react';
import { useCartStore } from '../../context/CartStore';
import clsx from 'clsx';

interface OrderSummaryProps {
  onCheckout?: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ onCheckout }) => {
  const subtotal = useCartStore((s) => s.subtotal());
  const tax = useCartStore((s) => s.tax());
  const shipping = useCartStore((s) => s.shipping());
  const total = useCartStore((s) => s.total());
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const handlePromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim()) setPromoApplied(true);
  };

  const freeShippingThreshold = 75;
  const remaining = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5 sticky top-20">
      <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>

      {/* Free shipping progress */}
      {remaining > 0 && (
        <div className="bg-primary-50 border border-primary-100 rounded-xl p-4">
          <p className="text-sm text-primary-700 font-medium mb-2">
            Add <span className="font-bold">${remaining.toFixed(2)}</span> more for free shipping!
          </p>
          <div className="w-full bg-primary-100 rounded-full h-1.5">
            <div
              className="bg-primary-600 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((subtotal / freeShippingThreshold) * 100, 100)}%` }}
            />
          </div>
        </div>
      )}
      {shipping === 0 && (
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex items-center gap-2">
          <Truck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <p className="text-sm text-emerald-700 font-medium">You qualify for free shipping! 🎉</p>
        </div>
      )}

      {/* Promo Code */}
      {!promoApplied ? (
        <form onSubmit={handlePromo} className="flex gap-2">
          <div className="relative flex-1">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              id="promo-code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Promo code"
              className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-700 transition-colors"
          >
            Apply
          </button>
        </form>
      ) : (
        <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-emerald-600" />
            <span className="text-sm text-emerald-700 font-semibold">{promoCode} applied!</span>
          </div>
          <button
            onClick={() => { setPromoApplied(false); setPromoCode(''); }}
            className="text-xs text-red-500 hover:text-red-700 font-medium"
          >
            Remove
          </button>
        </div>
      )}

      {/* Breakdown */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Tax (8%)</span>
          <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span className={clsx('font-medium', shipping === 0 ? 'text-emerald-600' : 'text-gray-900')}>
            {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        {promoApplied && (
          <div className="flex justify-between text-emerald-600">
            <span>Promo discount</span>
            <span className="font-medium">-$0.00</span>
          </div>
        )}
        <div className="h-px bg-gray-100" />
        <div className="flex justify-between text-base font-bold text-gray-900">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* CTA */}
      {onCheckout && (
        <button
          onClick={onCheckout}
          id="proceed-to-checkout"
          className="btn-primary w-full text-base py-4"
        >
          Proceed to Checkout
        </button>
      )}

      {/* Trust badges */}
      <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
        <Shield className="w-3.5 h-3.5" />
        <span>Secure checkout · SSL encrypted</span>
      </div>
    </div>
  );
};

export default OrderSummary;
