import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import type { CartItem as CartItemType } from '../../types';
import { useCartStore } from '../../context/CartStore';

interface CartItemProps {
  item: CartItemType;
}

const CartItemRow: React.FC<CartItemProps> = ({ item }) => {
  const { removeItem, updateQuantity } = useCartStore();

  return (
    <div className="flex gap-4 py-5 border-b border-gray-100 last:border-0 animate-fade-in">
      {/* Thumbnail */}
      <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="w-24 h-24 object-cover rounded-xl border border-gray-100 hover:opacity-90 transition-opacity"
        />
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <Link to={`/product/${item.product.id}`}>
          <h3 className="font-semibold text-gray-900 text-sm hover:text-primary-600 transition-colors line-clamp-2 mb-1">
            {item.product.name}
          </h3>
        </Link>
        <p className="text-xs text-gray-500 mb-1">{item.product.category}</p>
        {(item.selectedSize || item.selectedColor) && (
          <div className="flex items-center gap-2 mb-2">
            {item.selectedSize && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md">
                Size: {item.selectedSize}
              </span>
            )}
            {item.selectedColor && (
              <span className="flex items-center gap-1 text-xs text-gray-600">
                <span
                  className="w-3 h-3 rounded-full border border-gray-300"
                  style={{ backgroundColor: item.selectedColor }}
                />
                Color
              </span>
            )}
          </div>
        )}

        {/* Mobile price */}
        <p className="text-sm font-bold text-gray-900 sm:hidden">
          ${(item.product.price * item.quantity).toFixed(2)}
        </p>
      </div>

      {/* Quantity + Price (desktop layout) */}
      <div className="flex flex-col items-end justify-between gap-2">
        {/* Price (desktop) */}
        <p className="hidden sm:block text-base font-bold text-gray-900">
          ${(item.product.price * item.quantity).toFixed(2)}
        </p>

        <div className="flex items-center gap-2">
          {/* Quantity Controls */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
              aria-label="Decrease quantity"
              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm transition-all duration-150 text-gray-600 hover:text-gray-900"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-7 text-center text-sm font-semibold text-gray-900">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
              aria-label="Increase quantity"
              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm transition-all duration-150 text-gray-600 hover:text-gray-900"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Remove */}
          <button
            onClick={() => removeItem(item.product.id)}
            aria-label="Remove item"
            className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-gray-400">${item.product.price.toFixed(2)} each</p>
      </div>
    </div>
  );
};

export default CartItemRow;
