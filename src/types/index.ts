export type Category =
  | 'Electronics'
  | 'Clothing'
  | 'Home'
  | 'Sports'
  | 'Beauty'
  | 'Bike Spare Parts';

export type ProductBadge = 'New' | 'Sale' | 'Hot';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: Category;
  image: string;
  images?: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  badge?: ProductBadge;
  sizes?: string[];
  colors?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvv: string;
}

export interface FilterState {
  category: Category | 'All';
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating';
}
