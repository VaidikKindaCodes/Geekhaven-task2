"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { User, Heart, ShoppingBag,  Clock, TrendingUp, Star } from 'lucide-react';
import { useApp, useLikes } from '@/context/AppContext';
import { products } from '@/data/mockData';
import { formatCurrency, formatDate } from '@/lib/utils';
import { ProductCard } from '@/components/ui/ProductCard';
import { AuthContextType, useAuth } from '@/context/AuthProvider';

interface Product {
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

export default function DashboardPage() {
  const {user} = useAuth() as AuthContextType;
  const backendurl = process.env.NEXT_PUBLIC_BACKEND_URL?.toString();
  const searchParams = useSearchParams();
  const [likedData , setLikedData] = useState<Product[]>([]);
  const [cartData , setCartData] = useState([]);
  const activeTab = searchParams.get('tab') || 'overview';
  const { userActions, dispatch } = useApp();
  const { likedProducts } = useLikes();

  const fetchLikedData = async () => {
    const res = await fetch(
      `${backendurl}/api/getliked?userId=${user?._id}`
    );
    const data = await res.json();
    setLikedData(data);
  };

  

  useEffect(()=>{
    fetchLikedData();
  } , [])
  useEffect(() => {
    dispatch({
      type: 'ADD_USER_ACTION',
      payload: {
        id: Date.now().toString(),
        action: 'Visited dashboard',
        timestamp: new Date(),
        details: `Tab: ${activeTab}`,
      },
    });
  }, [activeTab, dispatch]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'likes', label: 'Liked Products', icon: Heart },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'activity', label: 'Activity', icon: Clock }
  ];
  

  const mockOrders = [
    {
      id: 'ORD-001',
      date: '2025-08-28',
      total: 1999.99,
      status: 'Delivered',
      items: 1,
      product: products[0]
    },
    {
      id: 'ORD-002',
      date: '2025-08-25',
      total: 89.99,
      status: 'In Transit',
      items: 1,
      product: products[1]
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your VaidikShop account and activity
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-3 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{user?.username}</h3>
                </div>
              </div>
              <nav className="space-y-2">
                {tabs.map(tab => (
                  <Link
                    key={tab.id}
                    href={`/dashboard?tab=${tab.id}`}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                    {tab.id === 'likes' && likedProducts.length > 0 && (
                      <span className="ml-auto bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 text-xs px-2 py-1 rounded-full">
                        {likedProducts.length}
                      </span>
                    )}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
              {activeTab === 'overview' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    Account Overview
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Heart className="h-8 w-8 text-blue-600" />
                        <div>
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            {likedProducts.length}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Liked Products
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <ShoppingBag className="h-8 w-8 text-green-600" />
                        <div>
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            {mockOrders.length}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Total Orders
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Clock className="h-8 w-8 text-purple-600" />
                        <div>
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            {userActions.length}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Recent Actions
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Recent Activity
                    </h3>
                    <div className="space-y-3">
                      {userActions.slice(0, 5).map(action => (
                        <div key={action.id} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {action.action}
                            </p>
                            {action.details && (
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {action.details}
                              </p>
                            )}
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(action.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'likes' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    Liked Products ({likedProducts.length})
                  </h2>

                  {likedData.length === 0 ? (
                    <div className="text-center py-12">
                      <Heart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                      <p className="text-xl text-gray-500 dark:text-gray-400 mb-4">
                        No liked products yet
                      </p>
                      <p className="text-gray-400 dark:text-gray-500 mb-6">
                        Start browsing and like products to see them here
                      </p>
                      <Link
                        href="/products"
                        className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                      >
                        Browse Products
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {likedData.map(product => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  )}
                </div>
              )}
              {activeTab === 'orders' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    Order History
                  </h2>

                  <div className="space-y-4">
                    {mockOrders.map(order => (
                      <div key={order.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              Order {order.id}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Placed on {formatDate(order.date)}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-semibold text-gray-900 dark:text-white">
                              {formatCurrency(order.total)}
                            </div>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              order.status === 'Delivered' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <img
                            src={order.product.images[0]}
                            alt={order.product.title}
                            className="w-12 h-12 rounded-md object-cover"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {order.product.title}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Quantity: {order.items}
                            </p>
                          </div>
                          <Link
                            href={`/products/${order.product.id}`}
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium"
                          >
                            View Product
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === 'activity' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    Activity Log
                  </h2>

                  <div className="space-y-3">
                    {userActions.map(action => (
                      <div key={action.id} className="flex items-start space-x-3 py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {action.action}
                          </p>
                          {action.details && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {action.details}
                            </p>
                          )}
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                            {new Date(action.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
