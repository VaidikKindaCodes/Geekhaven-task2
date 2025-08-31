"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Star, MapPin, TrendingUp, Users, Search } from 'lucide-react';
import { sellers } from '@/data/mockData';
import { useApp } from '@/context/AppContext';
import { formatDate } from '@/lib/utils';

export default function SellersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const { dispatch } = useApp();

  useEffect(() => {
    dispatch({
      type: 'ADD_USER_ACTION',
      payload: {
        id: Date.now().toString(),
        action: 'Viewed sellers page',
        timestamp: new Date(),
      },
    });
  }, [dispatch]);

  const filteredSellers = sellers.filter(seller =>
    seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    seller.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    seller.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedSellers = [...filteredSellers].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'reviews':
        return b.totalReviews - a.totalReviews;
      case 'listings':
        return b.totalListings - a.totalListings;
      case 'newest':
        return new Date(b.memberSince).getTime() - new Date(a.memberSince).getTime();
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Trusted Sellers
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Connect with verified sellers who offer quality products and excellent service
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search sellers by name, description, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
            <div className="md:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviews</option>
                <option value="listings">Most Listings</option>
                <option value="newest">Newest Members</option>
              </select>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Showing {sortedSellers.length} of {sellers.length} sellers
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedSellers.map(seller => (
            <div key={seller.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
              <Link href={`/sellers/${seller.id}`} className="block p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative">
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {seller.name}
                    </h3>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {seller.rating.toFixed(1)}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        ({seller.totalReviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {seller.description}
                </p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">
                      {seller.totalListings}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Active Listings
                    </div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">
                      {seller.responseTime}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Response Time
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>{seller.location}</span>
                  </div>
                  <span>Since {formatDate(seller.memberSince)}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="text-center mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Want to Become a Seller?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Join our community of trusted sellers and start earning today
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Start Selling
          </button>
        </div>
      </div>
    </div>
  );
}
