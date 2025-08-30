"use client";

import Link from 'next/link';
import { 
  Heart, 
  Mail, 
  Phone, 
  MapPin
} from 'lucide-react';

export function Footer() {

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-lg"
              >
                R
              </div>
              <span className="text-xl font-bold">ResellHub</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted marketplace for buying and selling pre-owned items. 
              Find great deals and give your items a second life.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors text-sm">
                Home
              </Link>
              <Link href="/products" className="text-gray-300 hover:text-white transition-colors text-sm">
                Browse Products
              </Link>
              <Link href="/sellers" className="text-gray-300 hover:text-white transition-colors text-sm">
                Top Sellers
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors text-sm">
                About Us
              </Link>
              <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors text-sm">
                My Dashboard
              </Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Categories</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/products?category=Electronics" className="text-gray-300 hover:text-white transition-colors text-sm">
                Electronics
              </Link>
              <Link href="/products?category=Fashion" className="text-gray-300 hover:text-white transition-colors text-sm">
                Fashion
              </Link>
              <Link href="/products?category=Home%20%26%20Garden" className="text-gray-300 hover:text-white transition-colors text-sm">
                Home & Garden
              </Link>
              <Link href="/products?category=Sports" className="text-gray-300 hover:text-white transition-colors text-sm">
                Sports
              </Link>
              <Link href="/products?category=Automotive" className="text-gray-300 hover:text-white transition-colors text-sm">
                Automotive
              </Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300 text-sm">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>support@resellhub.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 text-sm">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 text-sm">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>San Francisco, CA</span>
              </div>
            </div>
            <div className="pt-4">
              <h4 className="text-sm font-semibold mb-2">Stay Updated</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  className="px-4 py-2 text-sm font-medium text-white rounded-r-md transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © {currentYear} ResellHub. All rights reserved.
            </div>

            <div className="flex items-center space-x-1 text-sm text-gray-400">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>for the community</span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap justify-center md:justify-start space-x-6 text-xs text-gray-500">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-gray-300 transition-colors">
              Cookie Policy
            </Link>
            <Link href="/help" className="hover:text-gray-300 transition-colors">
              Help Center
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
