"use client";

import { useEffect } from 'react';
import { Award, Shield, Users, Zap } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { ASSIGNMENT_SEED } from '@/data/mockData';
import { generateSeedColor } from '@/lib/utils';

export default function AboutPage() {
  const { dispatch } = useApp();
  const seedColor = generateSeedColor(ASSIGNMENT_SEED);

  useEffect(() => {
    dispatch({
      type: 'ADD_USER_ACTION',
      payload: {
        id: Date.now().toString(),
        action: 'Visited about page',
        timestamp: new Date(),
      },
    });
  }, [dispatch]);

  const features = [
    {
      icon: Shield,
      title: 'Secure Transactions',
      description: 'Every transaction is protected with bank-level security and buyer protection guarantees.'
    },
    {
      icon: Users,
      title: 'Trusted Community',
      description: 'Join thousands of verified buyers and sellers in our trusted marketplace ecosystem.'
    },
    {
      icon: Award,
      title: 'Quality Assurance',
      description: 'All products are verified for quality and authenticity before listing.'
    },
    {
      icon: Zap,
      title: 'Fast & Reliable',
      description: 'Quick transactions, fast shipping, and responsive customer support when you need it.'
    }
  ];

  const stats = [
    { label: 'Active Users', value: '50,000+' },
    { label: 'Products Sold', value: '1M+' },
    { label: 'Countries Served', value: '25+' },
    { label: 'Customer Satisfaction', value: '99.8%' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-white dark:bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              About <span 
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: `linear-gradient(135deg, ${seedColor}, #60a5fa)` }}
              >
                ResellHub
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              We're revolutionizing the way people buy and sell pre-owned items, creating a sustainable marketplace that benefits everyone in our community.
            </p>

            {/* Assignment Seed Display */}
            <div className="inline-flex items-center justify-center p-6 rounded-2xl shadow-lg max-w-md mx-auto"
                 style={{ backgroundColor: `${seedColor}20`, borderColor: seedColor, borderWidth: '2px' }}>
              <div className="text-center">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Assignment Seed
                </h3>
                <div 
                  className="px-4 py-3 rounded-lg font-mono text-white text-lg font-bold tracking-wider"
                  style={{ backgroundColor: seedColor }}
                >
                  {ASSIGNMENT_SEED}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                  This unique seed generates our dynamic theme colors and platform fee calculations
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                At ResellHub, we believe in the power of giving items a second life. Our platform connects sellers who have quality pre-owned items with buyers looking for great deals, creating a sustainable cycle that benefits both the environment and our users' wallets.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                We're not just a marketplace – we're a community of conscious consumers who understand that one person's unused item can be another's treasure.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                  <div 
                    className="text-3xl font-bold mb-2"
                    style={{ color: seedColor }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Why Choose ResellHub?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We've built our platform with features that prioritize security, trust, and user experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-all duration-300">
                <div 
                  className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${seedColor}20` }}
                >
                  <feature.icon 
                    className="h-8 w-8"
                    style={{ color: seedColor }}
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
