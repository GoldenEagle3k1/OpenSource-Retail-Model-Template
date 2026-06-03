import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, CreditCard, Lock, CheckCircle } from 'lucide-react';
import { useCartStore } from '../context/CartStore';
import CartItemRow from '../components/cart/CartItem';
import OrderSummary from '../components/cart/OrderSummary';
import type { CheckoutForm } from '../types';
import toast from 'react-hot-toast';

const INITIAL_FORM: CheckoutForm = {
  firstName: '', lastName: '', email: '', address: '',
  city: '', state: '', zip: '', country: 'United States',
  cardNumber: '', cardName: '', expiry: '', cvv: '',
};

const CartPage: React.FC = () => {
  const { items, clearCart } = useCartStore();
  const [showCheckout, setShowCheckout] = useState(false);
  const [form, setForm] = useState<CheckoutForm>(INITIAL_FORM);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleField = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const formatCardNumber = (val: string) =>
    val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // Validation: just check required fields have values
    const required = ['firstName', 'lastName', 'email', 'address', 'city', 'state', 'zip', 'cardNumber', 'cardName', 'expiry', 'cvv'];
    const missing = required.filter((k) => !form[k as keyof CheckoutForm]);
    if (missing.length > 0) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setOrderPlaced(true);
    clearCart();
    toast.success('Order placed successfully! 🎉');
  };

  // ── Order Placed Confirmation ─────────────────────────────────
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-lg w-full bg-white rounded-3xl shadow-lg border border-gray-100 p-10 text-center animate-slide-up">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-500" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-500 mb-2">
            Thank you, <span className="font-semibold text-gray-700">{form.firstName}</span>!
          </p>
          <p className="text-gray-500 text-sm mb-8">
            Your order has been placed successfully. A confirmation email will be sent to{' '}
            <span className="font-medium text-primary-600">{form.email}</span>.
          </p>
          <div className="bg-gray-50 rounded-2xl p-4 mb-8 text-sm text-gray-600">
            <p>🚚 Estimated delivery: <span className="font-semibold">3–5 business days</span></p>
          </div>
          <Link to="/" className="btn-primary w-full justify-center py-4 text-base">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // ── Empty Cart ────────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center animate-fade-in">
          <div className="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-primary-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
          <p className="text-gray-500 mb-8">Add some products to get started!</p>
          <Link to="/shop" className="btn-primary inline-flex">
            <ArrowLeft className="w-4 h-4" /> Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900">Shopping Cart</h1>
            <p className="text-gray-500 text-sm mt-1">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
          </div>
          <Link to="/shop" className="btn-ghost text-sm">
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </Link>
        </div>

        {!showCheckout ? (
          /* ── Cart View ── */
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 divide-y divide-gray-50">
                {items.map((item) => (
                  <CartItemRow key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} item={item} />
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <OrderSummary onCheckout={() => setShowCheckout(true)} />
            </div>
          </div>
        ) : (
          /* ── Checkout Form ── */
          <div className="grid lg:grid-cols-3 gap-8">
            <form onSubmit={handlePlaceOrder} className="lg:col-span-2 space-y-6">
              {/* Shipping */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                  <span className="w-7 h-7 bg-primary-100 text-primary-600 rounded-full text-sm font-black flex items-center justify-center">1</span>
                  Shipping Address
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1.5">First Name *</label>
                    <input id="firstName" name="firstName" type="text" required value={form.firstName} onChange={handleField} className="input-field" placeholder="John" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1.5">Last Name *</label>
                    <input id="lastName" name="lastName" type="text" required value={form.lastName} onChange={handleField} className="input-field" placeholder="Doe" />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
                    <input id="email" name="email" type="email" required value={form.email} onChange={handleField} className="input-field" placeholder="john@example.com" />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1.5">Street Address *</label>
                    <input id="address" name="address" type="text" required value={form.address} onChange={handleField} className="input-field" placeholder="123 Main Street, Apt 4B" />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1.5">City *</label>
                    <input id="city" name="city" type="text" required value={form.city} onChange={handleField} className="input-field" placeholder="New York" />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1.5">State *</label>
                    <input id="state" name="state" type="text" required value={form.state} onChange={handleField} className="input-field" placeholder="NY" />
                  </div>
                  <div>
                    <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1.5">ZIP Code *</label>
                    <input id="zip" name="zip" type="text" required value={form.zip} onChange={handleField} className="input-field" placeholder="10001" />
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1.5">Country</label>
                    <select id="country" name="country" value={form.country} onChange={handleField} className="input-field">
                      <option>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                      <option>Pakistan</option>
                      <option>Australia</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                  <span className="w-7 h-7 bg-primary-100 text-primary-600 rounded-full text-sm font-black flex items-center justify-center">2</span>
                  Payment Details
                  <Lock className="w-4 h-4 text-gray-400 ml-auto" />
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1.5">Card Number *</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="cardNumber"
                        name="cardNumber"
                        type="text"
                        required
                        value={form.cardNumber}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, cardNumber: formatCardNumber(e.target.value) }))
                        }
                        maxLength={19}
                        className="input-field pl-10"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1.5">Cardholder Name *</label>
                    <input id="cardName" name="cardName" type="text" required value={form.cardName} onChange={handleField} className="input-field" placeholder="John Doe" />
                  </div>
                  <div>
                    <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1.5">Expiry Date *</label>
                    <input id="expiry" name="expiry" type="text" required value={form.expiry} onChange={handleField} className="input-field" placeholder="MM / YY" maxLength={7} />
                  </div>
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1.5">CVV *</label>
                    <input id="cvv" name="cvv" type="password" required value={form.cvv} onChange={handleField} className="input-field" placeholder="•••" maxLength={4} />
                  </div>
                </div>

                {/* Card brands */}
                <div className="flex items-center gap-2 mt-4">
                  {['VISA', 'MC', 'AMEX', 'PayPal'].map((brand) => (
                    <span key={brand} className="px-2.5 py-1 bg-gray-100 text-gray-500 text-xs font-bold rounded-md">
                      {brand}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => setShowCheckout(false)}
                  className="btn-secondary flex-1"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Cart
                </button>
                <button type="submit" id="place-order" className="btn-primary flex-1 py-4 text-base">
                  <Lock className="w-4 h-4" /> Place Order
                </button>
              </div>
            </form>

            {/* Summary (sticky) */}
            <div className="lg:col-span-1">
              <OrderSummary />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
