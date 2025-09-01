"use client";

import { useState, useEffect } from "react";
import { User, Heart, ShoppingBag, Clock, TrendingUp } from "lucide-react";
import { useApp, useLikes } from "@/context/AppContext";
import { formatCurrency, formatDate } from "@/lib/utils";
import { ProductCard } from "@/components/ui/ProductCard";
import { AuthContextType, useAuth } from "@/context/AuthProvider";

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
  const { user } = useAuth() as AuthContextType;
  const [likedData, setLikedData] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState("overview");
  const { userActions, dispatch } = useApp();
  const { likedProducts } = useLikes();

  useEffect(() => {
    // Get liked products from localStorage
    const stored = typeof window !== "undefined" ? localStorage.getItem("likedProducts") : null;
    if (stored) {
      try {
        const parsed: Product[] = JSON.parse(stored);
        setLikedData(parsed);
      } catch {
        setLikedData([]);
      }
    } else {
      setLikedData([]);
    }
  }, []);

  useEffect(() => {
    dispatch({
      type: "ADD_USER_ACTION",
      payload: {
        id: Date.now().toString(),
        action: "Visited dashboard",
        timestamp: new Date(),
        details: `Tab: ${activeTab}`,
      },
    });
  }, [activeTab, dispatch]);

  const tabs = [
    { id: "overview", label: "Overview", icon: TrendingUp },
    { id: "likes", label: "Liked Products", icon: Heart },
    { id: "orders", label: "Orders", icon: ShoppingBag },
    { id: "activity", label: "Activity", icon: Clock },
  ];

  // Mock orders (replace with real API if you have one)
  const mockOrders = [
    { id: "ORD123", product: "iPhone 13", amount: 699, status: "Delivered", date: "2024-08-10" },
    { id: "ORD124", product: "MacBook Pro", amount: 1299, status: "Processing", date: "2024-08-15" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your VaidikShop account and activity
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
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
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex w-full items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                    {tab.id === "likes" && likedData.length > 0 && (
                      <span className="ml-auto bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 text-xs px-2 py-1 rounded-full">
                        {likedData.length}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
              {activeTab === "overview" && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Overview</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Welcome back, {user?.username}! Here’s a quick summary of your activity.
                  </p>
                </div>
              )}

              {activeTab === "likes" && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Liked Products</h2>
                  {likedData.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {likedData.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400">No liked products yet.</p>
                  )}
                </div>
              )}

              {activeTab === "orders" && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
                  <div className="space-y-4">
                    {mockOrders.map((order) => (
                      <div
                        key={order.id}
                        className="p-4 border rounded-lg flex justify-between items-center dark:border-gray-700"
                      >
                        <div>
                          <p className="font-medium">{order.product}</p>
                          <p className="text-sm text-gray-500">Order ID: {order.id}</p>
                          <p className="text-sm text-gray-500">Date: {order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{formatCurrency(order.amount)}</p>
                          <p className="text-sm text-gray-500">{order.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "activity" && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                  <div className="space-y-4">
                    {userActions.length > 0 ? (
                      userActions.map((action) => (
                        <div
                          key={action.id}
                          className="p-4 border rounded-lg dark:border-gray-700"
                        >
                          <p className="font-medium">{action.action}</p>
                          <p className="text-sm text-gray-500">{action.details}</p>
                          <p className="text-xs text-gray-400">
                            {formatDate(action.timestamp.toString())}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-600 dark:text-gray-400">
                        No recent activity found.
                      </p>
                    )}
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
