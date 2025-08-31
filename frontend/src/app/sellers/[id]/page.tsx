"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Heart, 
  ShoppingCart, 
  Star, 
  MapPin, 
  Share2, 
  ArrowLeft,
  Plus,
  Minus,
  TrendingUp,
  MessageCircle,
  Shield,
  Truck
} from 'lucide-react';
import { products, sellers } from '@/data/mockData';
import { useCart, useLikes, useApp } from '@/context/AppContext';
import { formatCurrency, generateProductChecksum, formatDate } from '@/lib/utils';
import { ProductCard } from '@/components/ui/ProductCard';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = parseInt(params.id as string);
  const product = products.find(p => p.id === productId);
  const seller = sellers.find(s => s.id === product?.sellerId);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showSpecs, setShowSpecs] = useState(true);

  const { addToCart } = useCart();
  const { toggleLike, isLiked } = useLikes();
  const { dispatch } = useApp();

  useEffect(() => {
    if (product) {
      dispatch({
        type: 'ADD_USER_ACTION',
        payload: {
          id: Date.now().toString(),
          action: 'Viewed product detail',
          timestamp: new Date(),
          details: product.title,
        },
      });
    }
  }, [product, dispatch]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/products" className="btn btn-primary">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products.filter(p => 
    p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // Show success message (in a real app, you'd use a toast system)
    alert(`Added ${quantity}x ${product.title} to cart!`);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-200">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-gray-700 dark:hover:text-gray-200">Products</Link>
          <span>/</span>
          <Link href={`/products?category=${product.category}`} className="hover:text-gray-700 dark:hover:text-gray-200">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white">{product.title}</span>
        </nav>

        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
              
            </div>

            {product.images.length > 1 && (
              <div className="flex space-x-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index
                        ? 'border-blue-500'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {product.title}
                </h1>
                <button
                  onClick={handleShare}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <Share2 className="h-5 w-5" />
                </button>
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                {product.description}
              </p>

              <div className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-mono">
                Product ID: {generateProductChecksum(product.id)}
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-4xl font-bold text-green-600 dark:text-green-400">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-xl text-gray-500 dark:text-gray-400 line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                  <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded-full text-sm font-bold">
                    -{discountPercentage}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Condition & Details */}
            <div className="flex flex-wrap gap-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                product.condition === 'Like New' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                product.condition === 'Very Good' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                product.condition === 'Good' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
              }`}>
                Condition: {product.condition}
              </span>

              <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{product.location}</span>
              </div>

              <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm">Posted {formatDate(product.datePosted)}</span>
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Quantity:
                </span>
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 text-center min-w-[50px]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={() => toggleLike(product.id)}
                  className={`flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-colors ${
                    isLiked(product.id)
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isLiked(product.id) ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <Shield className="h-6 w-6 mx-auto text-green-600 mb-1" />
                <div className="text-xs text-gray-600 dark:text-gray-400">Buyer Protection</div>
              </div>
              <div className="text-center">
                <Truck className="h-6 w-6 mx-auto text-blue-600 mb-1" />
                <div className="text-xs text-gray-600 dark:text-gray-400">Fast Shipping</div>
              </div>
              <div className="text-center">
                <MessageCircle className="h-6 w-6 mx-auto text-purple-600 mb-1" />
                <div className="text-xs text-gray-600 dark:text-gray-400">24/7 Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications & Seller Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Specifications */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <button
              onClick={() => setShowSpecs(!showSpecs)}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Specifications
              </h3>
              <Plus className={`h-5 w-5 transition-transform ${showSpecs ? 'rotate-45' : ''}`} />
            </button>

            {showSpecs && (
              <div className="mt-4 space-y-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                    <span className="text-gray-600 dark:text-gray-400 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium">{value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Seller Info */}
          {seller && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Seller Information
              </h3>

              <Link href={`/sellers/${seller.id}`} className="block hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg p-4 -m-4 transition-colors">
                <div className="flex items-center space-x-4 mb-4">
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{seller.name}</h4>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {seller.rating.toFixed(1)} ({seller.totalReviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Member since:</span>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {formatDate(seller.memberSince)}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Response time:</span>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {seller.responseTime}
                    </div>
                  </div>
                </div>
              </Link>

              <button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Contact Seller
              </button>
            </div>
          )}
        </div>

        {/* Price History */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-12">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Price History
          </h3>
          <div className="space-y-2">
            {product.priceHistory.map((price, index) => (
              <div key={index} className="flex justify-between items-center py-2">
                <span className="text-gray-600 dark:text-gray-400">
                  {index === product.priceHistory.length - 1 ? 'Current Price' : `${product.priceHistory.length - index} days ago`}
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {formatCurrency(price)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Related Products
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
