import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, ChevronRight, Minus, Plus, ArrowLeft, Check } from 'lucide-react';
import { products } from '../data/mockData';
import { useCartStore } from '../context/CartStore';
import StarRating from '../components/ui/StarRating';
import Badge from '../components/ui/Badge';
import ProductCard from '../components/product/ProductCard';
import toast from 'react-hot-toast';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const addItem = useCartStore((s) => s.addItem);

  const product = products.find((p) => p.id === id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product?.sizes?.[0]
  );
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product?.colors?.[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="text-7xl mb-4">😕</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h1>
        <p className="text-gray-500 mb-6">This product doesn't exist or has been removed.</p>
        <button onClick={() => navigate('/shop')} className="btn-primary">
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </button>
      </div>
    );
  }

  const images = product.images ?? [product.image];
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleAddToCart = () => {
    addItem(product, quantity, selectedSize, selectedColor);
    setAdded(true);
    toast.success(`${product.name} added to cart! 🛒`);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/shop" className="hover:text-primary-600 transition-colors">Shop</Link>
          <ChevronRight className="w-4 h-4" />
          <Link
            to={`/shop?category=${encodeURIComponent(product.category)}`}
            className="hover:text-primary-600 transition-colors"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium line-clamp-1">{product.name}</span>
        </nav>

        {/* Main Product Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-10">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* ── Image Gallery ── */}
            <div className="p-6 lg:p-8 bg-gray-50 border-r border-gray-100">
              {/* Main Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-white mb-4 shadow-sm">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-300"
                />
                {product.badge && (
                  <div className="absolute top-4 left-4">
                    <Badge variant={product.badge} />
                  </div>
                )}
                {discountPercent && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-xl">
                    -{discountPercent}%
                  </div>
                )}
              </div>
              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-3">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      id={`thumbnail-${idx}`}
                      className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 flex-shrink-0 ${
                        selectedImage === idx
                          ? 'border-primary-500 shadow-md shadow-primary-100'
                          : 'border-gray-200 hover:border-gray-300 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ── Product Details ── */}
            <div className="p-6 lg:p-10 flex flex-col">
              <div className="flex-1">
                {/* Category + Badge */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider">
                    {product.category}
                  </span>
                  {!product.inStock && (
                    <span className="text-xs bg-red-100 text-red-600 font-semibold px-2 py-0.5 rounded-full">
                      Out of Stock
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight mb-4">
                  {product.name}
                </h1>

                {/* Rating */}
                <StarRating
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                  size="md"
                  className="mb-5"
                />

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-3xl font-black text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-lg text-gray-400 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                      <span className="text-sm font-bold text-red-500">
                        Save ${(product.originalPrice - product.price).toFixed(2)}
                      </span>
                    </>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                  {product.description}
                </p>

                {/* Color Picker */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mb-5">
                    <p className="text-sm font-semibold text-gray-900 mb-2">
                      Color: <span className="font-normal text-gray-500">{selectedColor}</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          id={`color-${color.replace('#', '')}`}
                          title={color}
                          className={`w-9 h-9 rounded-full border-2 transition-all duration-200 ${
                            selectedColor === color
                              ? 'border-primary-500 shadow-md scale-110'
                              : 'border-gray-300 hover:border-gray-500'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selector */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mb-6">
                    <p className="text-sm font-semibold text-gray-900 mb-2">Size</p>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          id={`size-${size}`}
                          className={`px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all duration-200 ${
                            selectedSize === size
                              ? 'border-primary-500 bg-primary-50 text-primary-700'
                              : 'border-gray-200 text-gray-700 hover:border-gray-400'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Quantity + Add to Cart */}
              <div className="border-t border-gray-100 pt-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      id="qty-decrease"
                      aria-label="Decrease quantity"
                      className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm transition-all text-gray-700"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center text-lg font-bold text-gray-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      id="qty-increase"
                      aria-label="Increase quantity"
                      className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm transition-all text-gray-700"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">
                    ${(product.price * quantity).toFixed(2)} total
                  </span>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  id="add-to-cart-detail"
                  className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                    added
                      ? 'bg-emerald-500 text-white'
                      : 'bg-primary-600 hover:bg-primary-700 text-white active:scale-98'
                  } disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary-200`}
                >
                  {added ? (
                    <>
                      <Check className="w-5 h-5" /> Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </>
                  )}
                </button>

                <Link
                  to="/cart"
                  className="btn-secondary w-full justify-center py-3"
                >
                  View Cart
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
