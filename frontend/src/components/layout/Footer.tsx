"use client";

import Link from 'next/link';
import { Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-t from-gray-950 via-gray-900 to-gray-800 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-lg font-semibold text-white tracking-wide">
              ResellHub
            </span>
            <span className="text-xs text-gray-500 mt-1">
              © {currentYear} All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 animate-pulse" />
            <span>for the community</span>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4 text-xs">
          <Link href="/privacy" className="hover:text-white transition-colors underline underline-offset-2">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-white transition-colors underline underline-offset-2">
            Terms of Service
          </Link>
          <Link href="/cookies" className="hover:text-white transition-colors underline underline-offset-2">
            Cookie Policy
          </Link>
          <Link href="/help" className="hover:text-white transition-colors underline underline-offset-2">
            Help Center
          </Link>
        </div>
      </div>
    </footer>
  );
}
