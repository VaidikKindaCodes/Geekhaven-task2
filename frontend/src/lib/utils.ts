import { ASSIGNMENT_SEED } from '../data/mockData';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateSeedColor(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; 
  }
  const hue = Math.abs(hash) % 360;
  const saturation = 60 + (Math.abs(hash) % 30); 
  const lightness = 45 + (Math.abs(hash) % 20); 

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

export function extractSeedNumber(seed: string): number {
  const numbers = seed.match(/\d+/g);
  if (numbers && numbers.length > 0) {
    return parseInt(numbers.join(''), 10);
  }
  return 123; 
}

export function calculatePlatformFee(subtotal: number, seed: string = ASSIGNMENT_SEED): number {
  const seedNumber = extractSeedNumber(seed);
  const feePercentage = seedNumber % 10;
  return (subtotal * feePercentage) / 100;
}

export function generateProductChecksum(productId: number, seed: string = ASSIGNMENT_SEED): string {
  const seedNumber = extractSeedNumber(seed);
  const checksum = (productId * seedNumber) % 10;
  return `${productId}-${checksum}`;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function generateStars(rating: number): string {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return '★'.repeat(fullStars) + 
         (hasHalfStar ? '☆' : '') + 
         '☆'.repeat(emptyStars);
}

export function filterProducts(products: any[], filters: any, searchQuery: string) {
  return products.filter(product => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesTitle = product.title.toLowerCase().includes(query);
      const matchesDescription = product.description.toLowerCase().includes(query);
      const matchesCategory = product.category.toLowerCase().includes(query);
      if (!matchesTitle && !matchesDescription && !matchesCategory) {
        return false;
      }
    }
    if (filters.category && filters.category !== 'all') {
      if (product.category !== filters.category) return false;
    }
    if (filters.minPrice && product.price < parseFloat(filters.minPrice)) return false;
    if (filters.maxPrice && product.price > parseFloat(filters.maxPrice)) return false;
    if (filters.condition && filters.condition !== 'all') {
      if (product.condition !== filters.condition) return false;
    }
    if (filters.location && filters.location !== 'all') {
      if (!product.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
    }

    return true;
  });
}

export function sortProducts(products: any[], sortBy: string) {
  switch (sortBy) {
    case 'price-low':
      return [...products].sort((a, b) => a.price - b.price);
    case 'price-high':
      return [...products].sort((a, b) => b.price - a.price);
    case 'rating':
      return [...products].sort((a, b) => b.sellerRating - a.sellerRating);
    case 'likes':
      return [...products].sort((a, b) => b.likes - a.likes);
    case 'newest':
    default:
      return [...products].sort((a, b) => new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime());
  }
}
export function saveToLocalStorage(key: string, data: any) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

export function loadFromLocalStorage(key: string, defaultValue: any = null) {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  }
  return defaultValue;
}
