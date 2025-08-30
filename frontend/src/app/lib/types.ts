export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  images: string[];
  category: string;
  condition: string;
  sellerId: number;
  sellerName: string;
  sellerRating: number;
  location: string;
  specifications: Record<string, string>;
  priceHistory: number[];
  likes: number;
  isLiked: boolean;
  datePosted: string;
}

export interface Seller {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  totalReviews: number;
  memberSince: string;
  location: string;
  description: string;
  totalListings: number;
  responseTime: string;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Filters {
  category: string;
  minPrice: string;
  maxPrice: string;
  condition: string;
  sortBy: string;
  location: string;
}

export interface UserAction {
  id: string;
  action: string;
  timestamp: Date;
  details?: string;
}

export interface AppState {
  assignmentSeed: string;
  cart: CartItem[];
  likedProducts: number[];
  userActions: UserAction[];
  darkMode: boolean;
}
