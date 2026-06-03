import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  Headphones, 
  Sparkles, 
  Percent, 
  Flame, 
  Star, 
  Check, 
  ChevronLeft, 
  ChevronRight,
  TrendingUp,
  Tag
} from 'lucide-react';
import { products, categories } from '../data/mockData';
import ProductCard from '../components/product/ProductCard';
import { useCartStore } from '../context/CartStore';
import toast from 'react-hot-toast';

// Features / Trust badges info
const features = [
  { Icon: Truck, title: 'Free Express Shipping', desc: 'On all orders over $75', color: 'text-indigo-500 bg-indigo-50 border-indigo-100' },
  { Icon: RefreshCw, title: '30-Day Easy Returns', desc: 'No questions asked policy', color: 'text-rose-500 bg-rose-50 border-rose-100' },
  { Icon: ShieldCheck, title: 'SSL Secure Payment', desc: '100% encrypted checkout', color: 'text-emerald-500 bg-emerald-50 border-emerald-100' },
  { Icon: Headphones, title: '24/7 Expert Support', desc: 'Live chat & phone helpline', color: 'text-amber-500 bg-amber-50 border-amber-100' },
];

// Testimonials data
const testimonials = [
  {
    name: 'Marcus K.',
    role: 'Verified Buyer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
    quote: 'The Wireless Pro Headphones exceeded all my expectations! The active noise cancellation is top-notch, and the sound profile is extremely rich. Lightning-fast delivery too!',
    rating: 5,
  },
  {
    name: 'Sophia L.',
    role: 'Cycling Enthusiast',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    quote: 'Found high-quality replacement bike spare parts here that I could not find anywhere else. The Alloy Chain Guard fits my crankset perfectly. Clean checkout experience.',
    rating: 5,
  },
  {
    name: 'Elena R.',
    role: 'Tech Lover',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    quote: 'Very premium shopping experience! I ordered the Smart Fitness Watch and it arrived in 2 days. The interface is gorgeous and easy to navigate. Will definitely shop here again.',
    rating: 5,
  },
];

const HomePage: React.FC = () => {
  const addItem = useCartStore((s) => s.addItem);

  // States
  const [heroColorIdx, setHeroColorIdx] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'trending' | 'new' | 'sale' | 'best'>('trending');
  const [currentReview, setCurrentReview] = useState<number>(0);
  const [email, setEmail] = useState<string>('');
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  // Countdown timer state (starts at 14 hours 24 mins 36 secs)
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 24, seconds: 36 });

  // Countdown Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset timer
          return { hours: 24, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Hero Product (Wireless Pro Headphones - ID '1')
  const heroProduct = products.find((p) => p.id === '1') || products[0];
  const heroImages = heroProduct.images || [heroProduct.image];
  const heroColors = heroProduct.colors || ['#1a1a2e', '#e94560', '#16213e'];
  const colorNames = ['Midnight Navy', 'Crimson Red', 'Deep Abyss'];

  // Spotlight Product (Smart Fitness Watch - ID '4')
  const spotlightProduct = products.find((p) => p.id === '4') || products[3];

  // Filtering products based on active tab
  const getFilteredProducts = () => {
    switch (activeTab) {
      case 'new':
        return products.filter((p) => p.badge === 'New').slice(0, 8);
      case 'sale':
        return products.filter((p) => p.badge === 'Sale' || p.originalPrice).slice(0, 8);
      case 'best':
        return products.filter((p) => p.rating >= 4.6).slice(0, 8);
      case 'trending':
      default:
        return products.slice(0, 8);
    }
  };

  const handleHeroAddToCart = () => {
    addItem(heroProduct, 1, undefined, heroColors[heroColorIdx]);
    toast.success(`${heroProduct.name} (${colorNames[heroColorIdx]}) added to cart!`);
  };

  const handleSpotlightAddToCart = () => {
    addItem(spotlightProduct, 1, undefined, spotlightProduct.colors?.[0]);
    toast.success(`${spotlightProduct.name} added to cart!`);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    toast.success('Welcome to the VIP Club! Check your inbox for your 15% discount.', {
      duration: 5000,
      icon: '🎉',
    });
  };

  // Review navigation
  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % testimonials.length);
  };
  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="bg-gray-50 overflow-x-hidden">
      {/* ── 1. PREMIUM SPLIT HERO SECTION ────────────────────────── */}
      <section className="relative min-h-[750px] lg:min-h-[800px] flex items-center bg-slate-950 text-white overflow-hidden py-16 lg:py-24">
        {/* Abstract futuristic background blobs */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 -right-1/4 w-[500px] h-[500px] bg-indigo-600/30 rounded-full blur-[100px] animate-pulse duration-[8000ms]" />
          <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-purple-600/25 rounded-full blur-[100px] animate-pulse duration-[6000ms]" />
          <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[80px]" />
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Pitch & CTA */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6 sm:space-y-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-indigo-300 text-xs sm:text-sm font-semibold tracking-wide shadow-inner">
                <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '3s' }} />
                <span>Next-Gen Shopping Experience</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-none">
                Redefining the <br />
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Future of Retail
                </span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Experience handpicked premium electronics, high-street apparel, elegant home accessories, sports gear, beauty products, and precision bike spares. Crafted for those who demand the best.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                <Link 
                  to="/shop" 
                  id="hero-shop-now" 
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-2xl hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Explore Showcase 
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a 
                  href="#categories-section" 
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/15 text-white font-semibold rounded-2xl transition-all duration-200"
                >
                  View Categories
                </a>
              </div>

              {/* Stats Bar */}
              <div className="pt-8 grid grid-cols-3 gap-4 border-t border-white/10 max-w-lg mx-auto lg:mx-0">
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">15+</div>
                  <div className="text-xs sm:text-sm text-slate-400">Premium Products</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">6</div>
                  <div className="text-xs sm:text-sm text-slate-400">Custom Categories</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">4.8★</div>
                  <div className="text-xs sm:text-sm text-slate-400">Customer Rating</div>
                </div>
              </div>
            </div>

            {/* Right Column: Floating Interactive Spotlight Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[420px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl relative group overflow-hidden transition-all duration-500 hover:border-indigo-500/30">
                {/* Decorative spotlight radial background */}
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-indigo-500/20 rounded-full blur-2xl group-hover:bg-indigo-500/30 transition-all duration-500" />
                
                {/* Hero Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="flex items-center gap-1 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-bounce">
                    <Flame className="w-3.5 h-3.5 fill-current" />
                    WEEKLY BEST SELLER
                  </span>
                </div>

                {/* Interactive Product Image Container */}
                <div className="relative rounded-2xl bg-slate-900/50 p-4 aspect-square flex items-center justify-center overflow-hidden mb-6 group-hover:scale-[1.01] transition-transform">
                  <img
                    src={heroImages[heroColorIdx] || heroProduct.image}
                    alt={heroProduct.name}
                    className="max-h-[260px] object-contain drop-shadow-[0_20px_50px_rgba(99,102,241,0.3)] transition-all duration-500 hover:scale-105"
                  />
                  <div className="absolute bottom-3 right-3 bg-slate-950/80 text-white/90 text-xs font-medium px-2.5 py-1 rounded-lg backdrop-blur-sm">
                    {colorNames[heroColorIdx]}
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-bold text-indigo-400 tracking-wider uppercase">
                        {heroProduct.category}
                      </span>
                      <h3 className="text-lg font-bold text-white mt-0.5 group-hover:text-indigo-300 transition-colors">
                        {heroProduct.name}
                      </h3>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-black text-indigo-400">
                        ${heroProduct.price.toFixed(2)}
                      </div>
                      {heroProduct.originalPrice && (
                        <div className="text-xs text-slate-400 line-through">
                          ${heroProduct.originalPrice.toFixed(2)}
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                    {heroProduct.description}
                  </p>

                  {/* Interactive Color Switcher */}
                  <div className="space-y-2 pt-2">
                    <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
                      Select Premium Finish
                    </label>
                    <div className="flex gap-2.5">
                      {heroColors.map((color, idx) => (
                        <button
                          key={color}
                          onClick={() => setHeroColorIdx(idx)}
                          className={`w-6 h-6 rounded-full border transition-all duration-300 relative flex items-center justify-center ${
                            heroColorIdx === idx
                              ? 'border-indigo-400 scale-110 shadow-lg'
                              : 'border-white/10 hover:border-white/40'
                          }`}
                          style={{ backgroundColor: color }}
                          aria-label={`Select finish color ${idx + 1}`}
                        >
                          {heroColorIdx === idx && (
                            <span className="w-1.5 h-1.5 bg-white rounded-full" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Add To Cart */}
                  <button
                    onClick={handleHeroAddToCart}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-white hover:bg-slate-100 text-slate-950 font-bold rounded-xl text-sm transition-all duration-200 shadow-lg hover:shadow-indigo-500/10 active:scale-95"
                  >
                    Quick Purchase &middot; Add to Cart
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. FLOATING VALUE PROPS SECTION ────────────────────────── */}
      <section className="relative -mt-10 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map(({ Icon, title, desc, color }) => (
              <div 
                key={title} 
                className="flex items-start gap-4 p-3 rounded-2xl hover:bg-slate-50/50 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform ${color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. ASYMMETRIC BENTO GRID CATEGORIES ───────────────────── */}
      <section id="categories-section" className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 px-3 py-1 rounded-full">
              Curated Collections
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
              Browse Categories
            </h2>
            <p className="text-slate-500 mt-2">
              Find exactly what you need with our modular categories
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
            
            {/* 1. Electronics (Large Landscape) */}
            <Link
              to="/shop?category=Electronics"
              id="category-electronics"
              className="lg:col-span-4 h-72 relative rounded-3xl overflow-hidden group shadow-lg shadow-indigo-100"
            >
              <img
                src={categories[0].image}
                alt="Electronics"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white flex justify-between items-end">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{categories[0].icon}</span>
                    <h3 className="text-xl font-bold">{categories[0].name}</h3>
                  </div>
                  <p className="text-sm text-slate-200 mt-1">{categories[0].count} Premium items</p>
                </div>
                <span className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl group-hover:bg-white group-hover:text-slate-950 transition-all duration-300">
                  <ArrowRight className="w-5 h-5" />
                </span>
              </div>
            </Link>

            {/* 2. Clothing (Tall/Square) */}
            <Link
              to="/shop?category=Clothing"
              id="category-clothing"
              className="lg:col-span-2 h-72 relative rounded-3xl overflow-hidden group shadow-lg shadow-indigo-100"
            >
              <img
                src={categories[1].image}
                alt="Clothing"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white flex justify-between items-end">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{categories[1].icon}</span>
                    <h3 className="text-xl font-bold">{categories[1].name}</h3>
                  </div>
                  <p className="text-sm text-slate-200 mt-1">{categories[1].count} Collections</p>
                </div>
                <span className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl group-hover:bg-white group-hover:text-slate-950 transition-all duration-300">
                  <ArrowRight className="w-5 h-5" />
                </span>
              </div>
            </Link>

            {/* 3. Home (Square) */}
            <Link
              to="/shop?category=Home"
              id="category-home"
              className="lg:col-span-2 h-72 relative rounded-3xl overflow-hidden group shadow-lg shadow-indigo-100"
            >
              <img
                src={categories[2].image}
                alt="Home"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white flex justify-between items-end">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{categories[2].icon}</span>
                    <h3 className="text-xl font-bold">{categories[2].name}</h3>
                  </div>
                  <p className="text-sm text-slate-200 mt-1">{categories[2].count} Products</p>
                </div>
                <span className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl group-hover:bg-white group-hover:text-slate-950 transition-all duration-300">
                  <ArrowRight className="w-5 h-5" />
                </span>
              </div>
            </Link>

            {/* 4. Sports (Square) */}
            <Link
              to="/shop?category=Sports"
              id="category-sports"
              className="lg:col-span-2 h-72 relative rounded-3xl overflow-hidden group shadow-lg shadow-indigo-100"
            >
              <img
                src={categories[3].image}
                alt="Sports"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white flex justify-between items-end">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{categories[3].icon}</span>
                    <h3 className="text-xl font-bold">{categories[3].name}</h3>
                  </div>
                  <p className="text-sm text-slate-200 mt-1">{categories[3].count} Products</p>
                </div>
                <span className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl group-hover:bg-white group-hover:text-slate-950 transition-all duration-300">
                  <ArrowRight className="w-5 h-5" />
                </span>
              </div>
            </Link>

            {/* 5. Beauty (Square) */}
            <Link
              to="/shop?category=Beauty"
              id="category-beauty"
              className="lg:col-span-2 h-72 relative rounded-3xl overflow-hidden group shadow-lg shadow-indigo-100"
            >
              <img
                src={categories[4].image}
                alt="Beauty"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white flex justify-between items-end">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{categories[4].icon}</span>
                    <h3 className="text-xl font-bold">{categories[4].name}</h3>
                  </div>
                  <p className="text-sm text-slate-200 mt-1">{categories[4].count} Essentials</p>
                </div>
                <span className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl group-hover:bg-white group-hover:text-slate-950 transition-all duration-300">
                  <ArrowRight className="w-5 h-5" />
                </span>
              </div>
            </Link>

            {/* 6. Bike Spare Parts (Landscape Split with Promo box) */}
            <Link
              to="/shop?category=Bike+Spare+Parts"
              id="category-bike-spare-parts"
              className="lg:col-span-3 h-72 relative rounded-3xl overflow-hidden group shadow-lg shadow-indigo-100"
            >
              <img
                src={categories[5].image}
                alt="Bike Spare Parts"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white flex justify-between items-end">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{categories[5].icon}</span>
                    <h3 className="text-xl font-bold">{categories[5].name}</h3>
                  </div>
                  <p className="text-sm text-slate-200 mt-1">{categories[5].count} Spare Parts</p>
                </div>
                <span className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl group-hover:bg-white group-hover:text-slate-950 transition-all duration-300">
                  <ArrowRight className="w-5 h-5" />
                </span>
              </div>
            </Link>

            {/* Custom Interactive Bento Promo Card */}
            <div className="lg:col-span-3 h-72 bg-gradient-to-br from-indigo-900 via-primary-800 to-purple-950 rounded-3xl p-8 text-white relative overflow-hidden group border border-white/10 shadow-xl flex flex-col justify-between">
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-pink-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
              
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1 bg-white/10 backdrop-blur-sm border border-white/10 text-pink-300 text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full uppercase">
                  <Percent className="w-3 h-3" /> Season Campaign
                </span>
                <h4 className="text-xl font-extrabold tracking-tight mt-2">
                  Unlock 15% VIP Discount
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed max-w-[220px]">
                  Join the membership club today and get access to limited edition drops.
                </p>
              </div>

              <div className="pt-4">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 text-xs font-bold bg-white text-indigo-950 px-5 py-3 rounded-2xl hover:bg-slate-100 transition-colors shadow-lg"
                >
                  Join Membership <ArrowRight className="w-4.5 h-4.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 4. DYNAMIC SHOWCASE TAB SYSTEM ────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 px-3 py-1 rounded-full">
                Selected Showcase
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
                Trending Highlights
              </h2>
              <p className="text-slate-500 mt-2">
                Filter by styles or browse full collection below
              </p>
            </div>
            
            {/* Sleek Tab Filter Switcher */}
            <div className="flex flex-wrap gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
              <button
                onClick={() => setActiveTab('trending')}
                className={`px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 ${
                  activeTab === 'trending'
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Products
              </button>
              <button
                onClick={() => setActiveTab('new')}
                className={`px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 ${
                  activeTab === 'new'
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                New Arrivals
              </button>
              <button
                onClick={() => setActiveTab('sale')}
                className={`px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 ${
                  activeTab === 'sale'
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Hot Deals
              </button>
              <button
                onClick={() => setActiveTab('best')}
                className={`px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 ${
                  activeTab === 'best'
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Highly Rated
              </button>
            </div>
          </div>

          {/* Grid Container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {getFilteredProducts().map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-16">
            <Link 
              to="/shop" 
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl transition-colors duration-200 shadow-lg"
            >
              Browse Complete Catalog <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 5. SPOTLIGHT DEAL OF THE DAY ──────────────────────────── */}
      <section className="py-20 lg:py-24 bg-slate-950 text-white relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-rose-500/5 rounded-full blur-[80px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left: Product image */}
            <div className="flex justify-center relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/15 rounded-full blur-2xl" />
              <img
                src={spotlightProduct.image}
                alt={spotlightProduct.name}
                className="max-h-[380px] object-contain drop-shadow-[0_20px_50px_rgba(99,102,241,0.25)] relative z-10 hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Right: Info + Timer */}
            <div className="space-y-6 lg:space-y-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-500/20 text-rose-300 text-xs font-bold rounded-full border border-rose-500/30">
                <Flame className="w-4 h-4 fill-current animate-pulse text-rose-400" /> Deal of the Day
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                {spotlightProduct.name}
              </h2>

              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                {spotlightProduct.description}
              </p>

              {/* Price Details */}
              <div className="flex items-baseline gap-4">
                <span className="text-3xl sm:text-4xl font-black text-indigo-400">
                  ${spotlightProduct.price.toFixed(2)}
                </span>
                {spotlightProduct.originalPrice && (
                  <span className="text-lg text-slate-500 line-through">
                    ${spotlightProduct.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="bg-rose-500/10 text-rose-400 text-xs font-bold px-2.5 py-1 rounded-lg border border-rose-500/20">
                  Save ${(spotlightProduct.originalPrice! - spotlightProduct.price).toFixed(2)}
                </span>
              </div>

              {/* Countdown Clocks */}
              <div className="space-y-3">
                <span className="text-xs text-slate-400 uppercase tracking-widest font-bold block">
                  Offer Expiring In:
                </span>
                <div className="flex gap-3">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3 min-w-[70px] text-center backdrop-blur-md">
                    <div className="text-2xl sm:text-3xl font-extrabold text-white">
                      {timeLeft.hours.toString().padStart(2, '0')}
                    </div>
                    <div className="text-[10px] uppercase text-slate-400 font-bold mt-1">Hrs</div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold self-center text-slate-500">:</div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3 min-w-[70px] text-center backdrop-blur-md">
                    <div className="text-2xl sm:text-3xl font-extrabold text-white">
                      {timeLeft.minutes.toString().padStart(2, '0')}
                    </div>
                    <div className="text-[10px] uppercase text-slate-400 font-bold mt-1">Min</div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold self-center text-slate-500">:</div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3 min-w-[70px] text-center backdrop-blur-md">
                    <div className="text-2xl sm:text-3xl font-extrabold text-white">
                      {timeLeft.seconds.toString().padStart(2, '0')}
                    </div>
                    <div className="text-[10px] uppercase text-slate-400 font-bold mt-1">Sec</div>
                  </div>
                </div>
              </div>

              {/* Stock Indicator Progress Bar */}
              <div className="space-y-2 max-w-sm pt-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-400">Stock Availability</span>
                  <span className="text-rose-400">Only 8 Items Remaining!</span>
                </div>
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full rounded-full w-[40%] animate-pulse" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4">
                <button
                  onClick={handleSpotlightAddToCart}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all duration-200 shadow-xl shadow-indigo-600/20"
                >
                  Claim Discount Now &middot; Add to Cart
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── 6. TESTIMONIALS SLIDER SECTION ───────────────────────── */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 px-3 py-1 rounded-full">
              Trust & Quality
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
              Customer Feedbacks
            </h2>
          </div>

          {/* Testimonial slider card */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-lg border border-slate-100 relative overflow-hidden min-h-[220px]">
            <div className="absolute top-0 right-0 p-8 text-slate-100 select-none pointer-events-none">
              <span className="text-8xl font-black">“</span>
            </div>

            <div className="space-y-6 relative z-10">
              
              {/* Stars */}
              <div className="flex gap-1 text-amber-400">
                {Array.from({ length: testimonials[currentReview].rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>

              <blockquote className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium italic">
                "{testimonials[currentReview].quote}"
              </blockquote>

              <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                <img
                  src={testimonials[currentReview].avatar}
                  alt={testimonials[currentReview].name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-indigo-100"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {testimonials[currentReview].name}
                  </h4>
                  <p className="text-xs text-indigo-600 font-semibold mt-0.5">
                    {testimonials[currentReview].role}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Slider controls */}
          <div className="flex justify-center gap-3 mt-8">
            <button
              onClick={prevReview}
              className="w-12 h-12 rounded-full bg-white hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 transition-colors shadow-sm"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextReview}
              className="w-12 h-12 rounded-full bg-white hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 transition-colors shadow-sm"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </section>

      {/* ── 7. NEWSLETTER VIP CLUB SECTION ───────────────────────── */}
      <section className="py-20 lg:py-24 bg-gradient-to-br from-indigo-800 to-purple-900 text-white relative overflow-hidden">
        {/* Abstract design elements */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 left-0 w-80 h-80 bg-white rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-500 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="space-y-6 max-w-2xl mx-auto">
            
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-indigo-200 text-xs font-semibold uppercase tracking-wider">
              <TrendingUp className="w-3.5 h-3.5" /> Stay Ahead
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Join the VIP Shopping Club
            </h2>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              Subscribe to unlock early access to catalog restocks, weekly newsletter recommendations, and an instant 15% code directly in your inbox.
            </p>

            {/* Newsletter form with success feedback state */}
            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 pt-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-5 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all shadow-inner text-sm"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-4 bg-white hover:bg-slate-100 text-indigo-950 font-bold rounded-2xl text-sm transition-colors shadow-lg active:scale-95 flex items-center justify-center gap-2"
                >
                  Subscribe Now <Tag className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="pt-4 max-w-md mx-auto animate-fade-in">
                <div className="bg-white/10 backdrop-blur-md border border-white/25 rounded-3xl p-6 flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-2xl flex items-center justify-center">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-extrabold">Welcome aboard, VIP member!</h4>
                  <p className="text-xs text-indigo-200 leading-relaxed">
                    Check your inbox at <span className="font-semibold text-white">{email}</span> for your 15% discount code!
                  </p>
                </div>
              </div>
            )}

            <p className="text-[10px] text-slate-400 tracking-wide mt-4">
              We value your privacy. Unsubscribe at any time.
            </p>

          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
