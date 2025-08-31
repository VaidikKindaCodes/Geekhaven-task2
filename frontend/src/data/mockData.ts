import { Product, Seller, Category } from '../lib/types';

export const ASSIGNMENT_SEED = 'FRONT25-UNIQUE123';

export const categories: Category[] = [
  { id: 1, name: 'Electronics', icon: '💻' },
  { id: 2, name: 'Fashion', icon: '👕' },
  { id: 3, name: 'Home & Garden', icon: '🏠' },
  { id: 4, name: 'Sports', icon: '⚽' },
  { id: 5, name: 'Books', icon: '📚' },
  { id: 6, name: 'Automotive', icon: '🚗' },
];

export const sellers: Seller[] = [
  {
    id: 1,
    name: 'TechDeals Pro',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    rating: 4.8,
    totalReviews: 245,
    memberSince: '2023-01-15',
    location: 'San Francisco, CA',
    description: 'Specialist in high-end electronics and gadgets',
    totalListings: 23,
    responseTime: 'Within 2 hours'
  },
  {
    id: 2,
    name: 'SneakerSpot',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    rating: 4.6,
    totalReviews: 189,
    memberSince: '2022-08-20',
    location: 'New York, NY',
    description: 'Authentic sneakers and streetwear',
    totalListings: 45,
    responseTime: 'Within 4 hours'
  },
  {
    id: 3,
    name: 'GameGear Hub',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    rating: 4.7,
    totalReviews: 156,
    memberSince: '2023-03-10',
    location: 'Austin, TX',
    description: 'Gaming equipment and accessories',
    totalListings: 34,
    responseTime: 'Within 1 hour'
  },
  {
    id: 4,
    name: 'Vintage Vibes',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    rating: 4.5,
    totalReviews: 98,
    memberSince: '2022-11-05',
    location: 'Portland, OR',
    description: 'Curated vintage and retro items',
    totalListings: 67,
    responseTime: 'Within 6 hours'
  },
  {
    id: 5,
    name: 'Cycle Central',
    avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=150',
    rating: 4.9,
    totalReviews: 203,
    memberSince: '2023-02-28',
    location: 'Denver, CO',
    description: 'Professional cycling gear and bikes',
    totalListings: 56,
    responseTime: 'Within 1 hour'
  },
];

export const products: Product[] = [
  {
    id: 1,
    title: 'MacBook Pro 14-inch M2',
    description: 'Powerful laptop for professionals and creators with Apple M2 chip, 16GB RAM, and 512GB SSD. Excellent condition with original packaging and accessories.',
    price: 1999.99,
    originalPrice: 2399.99,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500'
    ],
    category: 'Electronics',
    condition: 'Like New',
    sellerId: 1,
    sellerName: 'TechDeals Pro',
    sellerRating: 4.8,
    location: 'San Francisco, CA',
    specifications: {
      'Processor': 'Apple M2',
      'Memory': '16GB',
      'Storage': '512GB SSD',
      'Display': '14.2-inch Liquid Retina XDR',
      'Graphics': 'Integrated Apple GPU',
      'Ports': 'Thunderbolt 4, HDMI, MagSafe 3'
    },
    priceHistory: [2100, 2050, 2000, 1999.99],
    likes: 234,
    isLiked: false,
    datePosted: '2025-08-20'
  },
  {
    id: 2,
    title: 'Nike Air Max 270',
    description: 'Comfortable running shoes in excellent condition. Perfect for daily wear and light sports activities.',
    price: 89.99,
    originalPrice: 150.00,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500'
    ],
    category: 'Fashion',
    condition: 'Good',
    sellerId: 2,
    sellerName: 'SneakerSpot',
    sellerRating: 4.6,
    location: 'New York, NY',
    specifications: {
      'Size': 'US 9',
      'Color': 'Black/White',
      'Brand': 'Nike',
      'Material': 'Mesh/Synthetic',
      'Type': 'Running Shoes'
    },
    priceHistory: [95, 92, 89.99],
    likes: 156,
    isLiked: false,
    datePosted: '2025-08-25'
  },
  {
    id: 3,
    title: 'Gaming Chair - Ergonomic',
    description: 'High-back gaming chair with lumbar support, adjustable height, and comfortable padding. Perfect for long gaming or work sessions.',
    price: 199.99,
    originalPrice: 299.99,
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500'
    ],
    category: 'Home & Garden',
    condition: 'Very Good',
    sellerId: 3,
    sellerName: 'GameGear Hub',
    sellerRating: 4.7,
    location: 'Austin, TX',
    specifications: {
      'Material': 'PU Leather',
      'Weight Capacity': '300 lbs',
      'Adjustable Height': 'Yes',
      'Lumbar Support': 'Yes',
      'Armrests': 'Adjustable'
    },
    priceHistory: [220, 210, 199.99],
    likes: 89,
    isLiked: true,
    datePosted: '2025-08-22'
  },
  {
    id: 4,
    title: 'Canon EOS R5 Camera',
    description: 'Professional mirrorless camera with 45MP sensor, 8K video recording, and advanced autofocus system. Includes original lens and accessories.',
    price: 2899.99,
    originalPrice: 3899.99,
    images: [
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500',
      'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500'
    ],
    category: 'Electronics',
    condition: 'Like New',
    sellerId: 1,
    sellerName: 'TechDeals Pro',
    sellerRating: 4.8,
    location: 'San Francisco, CA',
    specifications: {
      'Resolution': '45MP',
      'Sensor': 'Full-frame CMOS',
      'Video': '8K RAW',
      'Mount': 'RF',
      'ISO Range': '100-51200'
    },
    priceHistory: [3100, 3000, 2950, 2899.99],
    likes: 342,
    isLiked: false,
    datePosted: '2025-08-18'
  },
  {
    id: 5,
    title: 'Vintage Leather Jacket',
    description: 'Classic brown leather jacket made from genuine leather. Timeless style perfect for any season.',
    price: 149.99,
    originalPrice: 299.99,
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500'
    ],
    category: 'Fashion',
    condition: 'Good',
    sellerId: 4,
    sellerName: 'Vintage Vibes',
    sellerRating: 4.5,
    location: 'Portland, OR',
    specifications: {
      'Size': 'Medium',
      'Material': 'Genuine Leather',
      'Color': 'Brown',
      'Style': 'Vintage',
      'Lining': 'Cotton'
    },
    priceHistory: [180, 165, 149.99],
    likes: 67,
    isLiked: false,
    datePosted: '2025-08-23'
  },
  {
    id: 6,
    title: 'Mountain Bike - Trek',
    description: 'High-performance mountain bike perfect for trails and outdoor adventures. Well-maintained with recent tune-up.',
    price: 899.99,
    originalPrice: 1299.99,
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500',
      'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=500'
    ],
    category: 'Sports',
    condition: 'Very Good',
    sellerId: 5,
    sellerName: 'Cycle Central',
    sellerRating: 4.9,
    location: 'Denver, CO',
    specifications: {
      'Frame Size': 'Large',
      'Wheel Size': '29 inch',
      'Gears': '21-speed',
      'Brand': 'Trek',
      'Suspension': 'Front'
    },
    priceHistory: [950, 925, 899.99],
    likes: 123,
    isLiked: true,
    datePosted: '2025-08-21'
  },
  {
    id: 7,
    title: 'Wireless Earbuds Pro',
    description: 'Premium wireless earbuds with noise cancellation and long battery life. Includes charging case and all accessories.',
    price: 179.99,
    originalPrice: 249.99,
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500'
    ],
    category: 'Electronics',
    condition: 'Like New',
    sellerId: 1,
    sellerName: 'TechDeals Pro',
    sellerRating: 4.8,
    location: 'San Francisco, CA',
    specifications: {
      'Battery Life': '8 hours + 24 with case',
      'Connectivity': 'Bluetooth 5.0',
      'Features': 'Active Noise Cancellation',
      'Water Resistance': 'IPX4',
      'Controls': 'Touch'
    },
    priceHistory: [199, 189, 179.99],
    likes: 89,
    isLiked: false,
    datePosted: '2025-08-26'
  },
  {
    id: 8,
    title: 'Designer Handbag',
    description: 'Authentic designer handbag in excellent condition. Classic design that never goes out of style.',
    price: 450.00,
    originalPrice: 800.00,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'
    ],
    category: 'Fashion',
    condition: 'Very Good',
    sellerId: 4,
    sellerName: 'Vintage Vibes',
    sellerRating: 4.5,
    location: 'Portland, OR',
    specifications: {
      'Brand': 'Designer',
      'Material': 'Genuine Leather',
      'Color': 'Black',
      'Size': 'Medium',
      'Hardware': 'Gold-tone'
    },
    priceHistory: [500, 475, 450],
    likes: 167,
    isLiked: false,
    datePosted: '2025-08-19'
  }
];
