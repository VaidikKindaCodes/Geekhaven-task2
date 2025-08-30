"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, TrendingUp, Star, Heart, ShoppingCart, ArrowRight } from 'lucide-react';
import { products, categories, ASSIGNMENT_SEED } from '../app/data/mockData';
import { useCart, useLikes, useApp } from '../app/context/AppContext';
import { formatCurrency, generateSeedColor, generateProductChecksum } from '../app/lib/utils';
import { ProductCard } from '../components/ui/ProductCard';
import { CategoryCard } from '../components/ui/Category';
import { SearchBar } from '../components/ui/Search';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState(products.slice(0, 6));
  const [displayedProducts, setDisplayedProducts] = useState(products.slice(0, 10));
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const { dispatch } = useApp();
  const seedColor = generateSeedColor(ASSIGNMENT_SEED);

  useEffect(() => {
    // Set CSS custom property for seed color
    document.documentElement.style.setProperty('--seed-color', seedColor);

    // Log page visit
    dispatch({
      type: 'ADD_USER_ACTION',
      payload: {
        id: Date.now().toString(),
        action: 'Visited homepage',
        timestamp: new Date(),
      },
    });
  }, [dispatch, seedColor]);

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      const currentLength = displayedProducts.length;
      const nextProducts = products.slice(currentLength, currentLength + 10);
      setDisplayedProducts(prev => [...prev, ...nextProducts]);
      setLoadingMore(false);
    }, 1000);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    dispatch({
      type: 'ADD_USER_ACTION',
      payload: {
        id: Date.now().toString(),
        action: 'Searched',
        timestamp: new Date(),
        details: query,
      },
    });
  };

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    dispatch({
      type: 'ADD_USER_ACTION',
      payload: {
        id: Date.now().toString(),
        action: 'Selected category',
        timestamp: new Date(),
        details: categoryName,
      },
    });
  };

  const filteredProducts = displayedProducts.filter(product => {
    const matchesSearch = !searchQuery || 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = !selectedCategory || 
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Welcome to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-primary">
                ResellHub
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Discover amazing deals on pre-owned items. Buy and sell with confidence in our trusted marketplace.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <SearchBar 
                onSearch={handleSearch}
                placeholder="Search for products, categories..."
              />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">1,000+</div>
                <div className="text-gray-600 dark:text-gray-300">Products Listed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">500+</div>
                <div className="text-gray-600 dark:text-gray-300">Happy Sellers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">2,000+</div>
                <div className="text-gray-600 dark:text-gray-300">Satisfied Buyers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Find exactly what you're looking for
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map(category => (
              <CategoryCard
                key={category.id}
                category={category}
                isSelected={selectedCategory === category.name}
                onClick={() => handleCategorySelect(category.name)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                <TrendingUp className="inline-block mr-2 text-green-600" />
                Featured Products
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Hand-picked deals you don't want to miss
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Listings Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Latest Listings
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {searchQuery && `Showing results for "${searchQuery}"`}
              {selectedCategory && `Category: ${selectedCategory}`}
              {!searchQuery && !selectedCategory && 'Fresh arrivals from our community'}
            </p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500 dark:text-gray-400">
                No products found matching your criteria.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Load More Button */}
              {filteredProducts.length < products.length && !searchQuery && !selectedCategory && (
                <div className="text-center mt-12">
                  <button
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="btn btn-primary px-8 py-3 text-lg"
                  >
                    {loadingMore ? (
                      <>
                        <div className="loading-spinner mr-2"></div>
                        Loading...
                      </>
                    ) : (
                      'Load More Products'
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Selling?
          </h2>
          <p className="text-xl text-white opacity-90 mb-8">
            Join thousands of sellers and turn your unused items into cash today!
          </p>
          <div className="space-x-4">
            <button className="btn bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-medium">
              Start Selling
            </button>
            <button className="btn border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg font-medium">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
