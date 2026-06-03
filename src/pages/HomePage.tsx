import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Headphones } from 'lucide-react';
import { products, categories } from '../data/mockData';
import ProductCard from '../components/product/ProductCard';

const features = [
  { Icon: Truck, title: 'Free Shipping', desc: 'On orders over $75' },
  { Icon: RefreshCw, title: 'Easy Returns', desc: '30-day return policy' },
  { Icon: ShieldCheck, title: 'Secure Payment', desc: 'SSL encrypted checkout' },
  { Icon: Headphones, title: '24/7 Support', desc: "We're always here to help" },
];

const HomePage: React.FC = () => {
  const trendingProducts = products.slice(0, 8);

  return (
    <div className="animate-fade-in">
      {/* ── Hero Section ────────────────────────────────────────── */}
      <section className="relative min-h-[600px] flex items-center overflow-hidden bg-gradient-to-br from-indigo-900 via-primary-800 to-purple-900">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div className="text-center lg:text-left animate-slide-up">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white/80 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                New arrivals every week
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
                Shop the
                <span className="block bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
                  Future of Retail
                </span>
              </h1>
              <p className="text-lg text-white/70 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Discover premium products across electronics, fashion, home decor, sports gear, beauty essentials, and bike spare parts — all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/shop" id="hero-shop-now" className="btn-primary text-base px-8 py-4 shadow-xl shadow-primary-900/40">
                  Shop Now <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/shop" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-200 text-base">
                  Browse Categories
                </Link>
              </div>
              <div className="mt-10 flex items-center gap-6 justify-center lg:justify-start text-white/60 text-sm">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-white">15+</span> Products
                </div>
                <div className="w-px h-4 bg-white/20" />
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-white">6</span> Categories
                </div>
                <div className="w-px h-4 bg-white/20" />
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-white">4.6★</span> Avg. Rating
                </div>
              </div>
            </div>

            {/* Hero product showcase */}
            <div className="hidden lg:grid grid-cols-2 gap-4 animate-fade-in">
              {products.slice(0, 4).map((product, idx) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className={`relative overflow-hidden rounded-2xl group ${idx === 0 ? 'col-span-2 h-48' : 'h-40'}`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <p className="text-xs font-medium text-white/70">{product.category}</p>
                    <p className="text-sm font-bold">{product.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Feature Badges ──────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map(({ Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-3 p-3">
                <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{title}</p>
                  <p className="text-xs text-gray-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Categories ─────────────────────────────────── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">Find exactly what you're looking for</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/shop?category=${encodeURIComponent(cat.name)}`}
                id={`category-${cat.id}`}
                className="relative overflow-hidden rounded-2xl group h-44 sm:h-52"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-70 group-hover:opacity-80 transition-opacity duration-300`} />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
                  <span className="text-3xl mb-2">{cat.icon}</span>
                  <h3 className="text-lg font-bold drop-shadow-sm">{cat.name}</h3>
                  <p className="text-sm text-white/80">{cat.count} products</p>
                  <span className="mt-3 flex items-center gap-1 text-xs bg-white/20 px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1 group-hover:translate-y-0">
                    Shop now <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trending Products ───────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="section-title">Trending Products</h2>
              <p className="section-subtitle">Our best-selling items this week</p>
            </div>
            <Link
              to="/shop"
              className="hidden sm:flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors text-sm"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-10 sm:hidden">
            <Link to="/shop" className="btn-secondary">
              View all products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Banner CTA ──────────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-purple-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">
            Ready to upgrade your ride? 🚲
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Check out our Bike Spare Parts collection — quality components at unbeatable prices.
          </p>
          <Link
            to="/shop?category=Bike+Spare+Parts"
            id="bike-parts-cta"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 font-bold rounded-xl hover:bg-primary-50 transition-all duration-200 text-base shadow-xl"
          >
            Shop Bike Parts <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
