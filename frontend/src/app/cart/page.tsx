"use client";
import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
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

export default function CartPage() {
  const { user } = useAuth() as AuthContextType;
  const [cartData, setCartData] = useState<Product[]>([]);

  const fetchCartData = () => {
    if (!user?._id) {
      setCartData([]);
      return;
    }
    try {
      const cart = localStorage.getItem("cart");
      if (cart) {
        setCartData(JSON.parse(cart));
      } else {
        setCartData([]);
      }
    } catch {
      setCartData([]);
    }
  };

  const handleRemove = (productId: number) => {
    const updatedCart = cartData.filter((item) => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartData(updatedCart);
  };

  useEffect(() => {
    fetchCartData();
    const onStorage = (e: StorageEvent) => {
      if (e.key === "cart") fetchCartData();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [user?._id]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
          Please log in to view your cart 🛒
        </h1>
      </div>
    );
  }

  if (cartData.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
          Your Cart is Empty 🛒
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Shopping Cart
      </h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {cartData.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col"
          >
            <div className="relative w-full h-40">
              <img
                src={item.images[0]}
                alt={item.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {item.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {item.description}
              </p>
              <p className="mt-2 font-medium text-gray-800 dark:text-gray-200">
                ${item.price.toFixed(2)}
              </p>
              <button
                onClick={() => handleRemove(item.id)}
                className="mt-auto flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition"
              >
                <Trash2 className="h-4 w-4" /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
