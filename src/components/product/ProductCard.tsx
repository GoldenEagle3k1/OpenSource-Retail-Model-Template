import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import type { Product } from '../../types';
import { useCartStore } from '../../context/CartStore';
import StarRating from '../ui/StarRating';
import Badge from '../ui/Badge';
import toast from 'react-hot-toast';
import clsx from 'clsx';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1, product.sizes?.[0], product.colors?.[0]);
    toast.success(`${product.name} added to cart!`);
  };

  const discountPercent =
    product.originalPrice
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <Link
      to={`/product/${product.id}`}
      className={clsx(
        'card group flex flex-col overflow-hidden cursor-pointer',
        className
      )}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-50 aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3">
            <Badge variant={product.badge} />
          </div>
        )}
        {/* Discount */}
        {discountPercent && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
            -{discountPercent}%
          </div>
        )}
        {/* Wishlist hover */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
          aria-label="Add to wishlist"
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-50 hover:text-red-500"
          style={{ top: discountPercent ? '2.5rem' : '0.75rem' }}
        >
          <Heart className="w-4 h-4" />
        </button>
        {/* Quick add overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            id={`add-to-cart-${product.id}`}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl text-sm transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            <ShoppingCart className="w-4 h-4" />
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs font-medium text-primary-600 uppercase tracking-wide mb-1">
          {product.category}
        </p>
        <h3 className="text-sm font-semibold text-gray-900 leading-snug mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {product.name}
        </h3>
        <StarRating rating={product.rating} reviewCount={product.reviewCount} className="mb-3" />
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          {!product.inStock && (
            <span className="text-xs text-red-500 font-medium">Out of stock</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
