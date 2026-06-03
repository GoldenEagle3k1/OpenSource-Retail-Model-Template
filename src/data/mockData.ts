import type { Product } from '../types';

export const products: Product[] = [
  // ── Electronics ──────────────────────────────────────────────
  {
    id: '1',
    name: 'Wireless Pro Headphones',
    price: 149.99,
    originalPrice: 199.99,
    description:
      'Experience studio-quality sound with 40-hour battery life, active noise cancellation, and ultra-soft memory foam ear cushions. Perfect for audiophiles on the go.',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&q=80',
    ],
    rating: 4.8,
    reviewCount: 2341,
    inStock: true,
    badge: 'Sale',
    colors: ['#1a1a2e', '#e94560', '#16213e'],
  },
  {
    id: '2',
    name: 'Mechanical Gaming Keyboard',
    price: 89.99,
    description:
      'RGB backlit mechanical keyboard with Cherry MX switches, per-key illumination, and tactile feedback. Dominate every match with precision and style.',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80',
      'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=600&q=80',
    ],
    rating: 4.6,
    reviewCount: 987,
    inStock: true,
    badge: 'Hot',
    colors: ['#000000', '#ffffff'],
  },
  {
    id: '3',
    name: '4K Webcam Ultra',
    price: 129.99,
    originalPrice: 159.99,
    description:
      'Professional-grade 4K webcam with built-in ring light, dual microphones, and AI-powered background blur. Look your best in every meeting.',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1623949556303-b0d17d198c33?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1623949556303-b0d17d198c33?w=600&q=80',
    ],
    rating: 4.5,
    reviewCount: 543,
    inStock: true,
    badge: 'New',
  },
  {
    id: '4',
    name: 'Smart Fitness Watch',
    price: 199.99,
    originalPrice: 249.99,
    description:
      'Track your health 24/7 with heart rate monitoring, SpO2 sensor, GPS, and 7-day battery life. Water-resistant up to 50m.',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&q=80',
    ],
    rating: 4.7,
    reviewCount: 1872,
    inStock: true,
    badge: 'Hot',
    colors: ['#000000', '#c0c0c0', '#d4a017'],
  },

  // ── Clothing ─────────────────────────────────────────────────
  {
    id: '5',
    name: 'Slim Fit Oxford Shirt',
    price: 59.99,
    description:
      'Crafted from 100% premium Egyptian cotton, this slim-fit Oxford shirt offers a crisp, clean look for both office and casual wear. Available in multiple colors.',
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80',
    ],
    rating: 4.4,
    reviewCount: 328,
    inStock: true,
    badge: 'New',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#ffffff', '#87ceeb', '#2f4f4f', '#f5deb3'],
  },
  {
    id: '6',
    name: 'Premium Denim Jacket',
    price: 119.99,
    originalPrice: 149.99,
    description:
      'A timeless denim jacket with a modern slim silhouette, reinforced stitching, and vintage-washed finish. A wardrobe staple for every season.',
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&q=80',
    ],
    rating: 4.6,
    reviewCount: 215,
    inStock: true,
    badge: 'Sale',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#4169e1', '#000080', '#808080'],
  },

  // ── Home ─────────────────────────────────────────────────────
  {
    id: '7',
    name: 'Minimalist Wall Clock',
    price: 49.99,
    description:
      'Scandinavian-inspired silent wall clock with a brushed aluminum frame and high-contrast dial. No ticking — just pure, elegant timekeeping.',
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=600&q=80',
    ],
    rating: 4.3,
    reviewCount: 412,
    inStock: true,
    colors: ['#c0c0c0', '#000000', '#d4a017'],
  },
  {
    id: '8',
    name: 'Ceramic Coffee Mug Set',
    price: 34.99,
    description:
      'Set of 4 handcrafted ceramic mugs with a speckled glaze finish. Microwave and dishwasher safe. Each mug holds 12oz of your favorite beverage.',
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80',
    ],
    rating: 4.5,
    reviewCount: 764,
    inStock: true,
    badge: 'Hot',
    colors: ['#f5f5dc', '#708090', '#8b4513'],
  },
  {
    id: '9',
    name: 'Bamboo Desk Organizer',
    price: 29.99,
    description:
      'Keep your workspace clutter-free with this eco-friendly bamboo organizer. Features 6 compartments for pens, phones, notes, and accessories.',
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1542621334-a254cf47733d?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1542621334-a254cf47733d?w=600&q=80',
    ],
    rating: 4.2,
    reviewCount: 183,
    inStock: true,
    badge: 'New',
  },

  // ── Sports ───────────────────────────────────────────────────
  {
    id: '10',
    name: 'Running Sneakers X1',
    price: 94.99,
    originalPrice: 119.99,
    description:
      'Lightweight carbon-fiber reinforced running shoes with responsive foam midsole and breathable mesh upper. Built for speed, comfort, and long-distance performance.',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80',
    ],
    rating: 4.7,
    reviewCount: 2109,
    inStock: true,
    badge: 'Sale',
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ['#ff4500', '#000000', '#ffffff', '#4169e1'],
  },
  {
    id: '11',
    name: 'Yoga Mat Pro',
    price: 39.99,
    description:
      'Non-slip 6mm thick yoga mat made from eco-friendly TPE material. Includes carrying strap and alignment lines for perfect pose positioning.',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&q=80',
    ],
    rating: 4.4,
    reviewCount: 876,
    inStock: true,
    colors: ['#9370db', '#2e8b57', '#4169e1', '#000000'],
  },

  // ── Beauty ───────────────────────────────────────────────────
  {
    id: '12',
    name: 'Vitamin C Serum',
    price: 44.99,
    originalPrice: 59.99,
    description:
      '20% Vitamin C + Hyaluronic Acid brightening serum. Fades dark spots, boosts collagen, and gives you a radiant glow in 4 weeks. Dermatologist tested.',
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80',
    ],
    rating: 4.6,
    reviewCount: 1543,
    inStock: true,
    badge: 'Sale',
  },

  // ── Bike Spare Parts ─────────────────────────────────────────
  {
    id: '13',
    name: 'Shimano Brake Cable Set',
    price: 18.99,
    description:
      'OEM Shimano stainless steel brake cable and housing set. Compatible with road and mountain bikes. Includes ferrules, end caps, and cable ties for a clean install.',
    category: 'Bike Spare Parts',
    image: 'https://images.unsplash.com/photo-1558981285-6f0c68562f6e?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1558981285-6f0c68562f6e?w=600&q=80',
    ],
    rating: 4.5,
    reviewCount: 312,
    inStock: true,
    badge: 'New',
  },
  {
    id: '14',
    name: 'Alloy Chain Guard 44T',
    price: 24.99,
    originalPrice: 34.99,
    description:
      'Lightweight CNC-machined alloy chain guard (44T BCD). Keeps your chain on the ring on rough terrain. Universal 4-bolt mounting, fits most cranksets.',
    category: 'Bike Spare Parts',
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&q=80',
    ],
    rating: 4.3,
    reviewCount: 145,
    inStock: true,
    badge: 'Sale',
    colors: ['#000000', '#c0c0c0'],
  },
  {
    id: '15',
    name: 'MTB Handlebar Grips',
    price: 14.99,
    description:
      'Lock-on ergonomic mountain bike grips with dual clamps and vibration-dampening rubber compound. 130mm length, fits 22.2mm bars.',
    category: 'Bike Spare Parts',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&q=80',
    ],
    rating: 4.6,
    reviewCount: 289,
    inStock: true,
    badge: 'Hot',
    colors: ['#000000', '#ff4500', '#4169e1', '#2e8b57'],
  },
];

export const categories = [
  {
    id: 'electronics',
    name: 'Electronics',
    icon: '💻',
    count: products.filter(p => p.category === 'Electronics').length,
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&q=80',
    gradient: 'from-blue-600 to-indigo-700',
  },
  {
    id: 'clothing',
    name: 'Clothing',
    icon: '👕',
    count: products.filter(p => p.category === 'Clothing').length,
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80',
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    id: 'home',
    name: 'Home',
    icon: '🏠',
    count: products.filter(p => p.category === 'Home').length,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    id: 'sports',
    name: 'Sports',
    icon: '🏃',
    count: products.filter(p => p.category === 'Sports').length,
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80',
    gradient: 'from-green-500 to-teal-600',
  },
  {
    id: 'beauty',
    name: 'Beauty',
    icon: '✨',
    count: products.filter(p => p.category === 'Beauty').length,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80',
    gradient: 'from-purple-500 to-violet-600',
  },
  {
    id: 'bike-spare-parts',
    name: 'Bike Spare Parts',
    icon: '🚲',
    count: products.filter(p => p.category === 'Bike Spare Parts').length,
    image: 'https://images.unsplash.com/photo-1558981285-6f0c68562f6e?w=600&q=80',
    gradient: 'from-slate-600 to-gray-700',
  },
];
