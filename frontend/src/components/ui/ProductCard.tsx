"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart, Star, MapPin, Eye } from 'lucide-react';
import { Product } from '../../lib/types';
import { useCart, useLikes, useApp } from '../../context/AppContext';
import { formatCurrency, generateProductChecksum } from '../../lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const { addToCart } = useCart();
  const { toggleLike, isLiked } = useLikes();
  const { dispatch } = useApp();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  const handleToggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleLike(product.id);
  };

  const handleProductView = () => {
    dispatch({
      type: 'ADD_USER_ACTION',
      payload: {
        id: Date.now().toString(),
        action: 'Viewed product',
        timestamp: new Date(),
        details: product.title,
      },
    });
  };

  const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const productChecksum = generateProductChecksum(product.id);

  return (
    <div className="product-card group">
      <Link href={`/products/${product.id}`} onClick={handleProductView}>
        <div className="relative aspect-square overflow-hidden rounded-t-lg">
          {!imageError ? (
            <img
              src={product.images[0]}
              alt={product.title}
              className={`object-cover transition-all duration-300 ${
                isImageLoading ? 'blur-sm' : 'group-hover:scale-105'
              }`}
              onLoad={() => setIsImageLoading(false)}
              onError={() => {
                setImageError(true);
                setIsImageLoading(false);
              }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <div className="text-gray-400 text-center">
                <Eye className="h-12 w-12 mx-auto mb-2" />
                <p className="text-sm">Image unavailable</p>
              </div>
            </div>
          )}

          {discountPercentage > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              -{discountPercentage}%
            </div>
          )}

          <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
            product.condition === 'Like New' ? 'condition-like-new' :
            product.condition === 'Very Good' ? 'condition-very-good' :
            product.condition === 'Good' ? 'condition-good' : 'condition-fair'
          }`}>
            {product.condition}
          </div>

          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex space-x-2">
              <button
                onClick={handleAddToCart}
                className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                title="Add to cart"
              >
                <ShoppingCart className="h-4 w-4 text-gray-700" />
              </button>
              <button
                onClick={handleToggleLike}
                className={`p-2 rounded-full shadow-md transition-colors ${
                  isLiked(product.id)
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-white hover:bg-gray-100 text-gray-700'
                }`}
                title={isLiked(product.id) ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart className={`h-4 w-4 ${isLiked(product.id) ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {product.title}
          </h3>

          <div className="flex items-center space-x-2 mb-2">
            <span className="price-tag">{formatCurrency(product.price)}</span>
            {product.originalPrice > product.price && (
              <span className="original-price">{formatCurrency(product.originalPrice)}</span>
            )}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-mono">
            ID: {productChecksum}
          </div>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="seller-badge">
                <Star className="h-3 w-3 mr-1" />
                {product.sellerRating.toFixed(1)}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400 truncate">
                {product.sellerName}
              </span>
            </div>
          </div>
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
            <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
            <span className="truncate">{product.location}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-3">
              <span className="flex items-center">
                <Heart className="h-3 w-3 mr-1" />
                {product.likes}
              </span>
              <span>Listed {new Date(product.datePosted).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
