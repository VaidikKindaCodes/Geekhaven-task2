// "use client";

// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { Plus, Minus, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
// import { useCart, useApp } from '@/context/AppContext';
// import { formatCurrency, calculatePlatformFee, extractSeedNumber } from '@/lib/utils';
// import { ASSIGNMENT_SEED } from '@/data/mockData';
// import { useAuth } from '@/context/AuthProvider';

// interface Product {
//     id: number;
//     title: string;
//     description: string;
//     price: number;
//     originalPrice: number;
//     images: string[];
//     category: string;
//     condition: string;
//     sellerId: number;
//     sellerName: string;
//     sellerRating: number;
//     location: string;
//     specifications: Record<string, string>;
//     priceHistory: number[];
//     likes: number;
//     isLiked: boolean;
//     datePosted: string;
// }

// export default function CartPage() {
//   const {user} = useAuth();
//   const backendurl = process.env.NEXT_PUBLIC_BACKEND_URL?.toString();
//   const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
//   const { dispatch } = useApp();

//   const subtotal = getCartTotal();
//   const platformFee = calculatePlatformFee(subtotal, ASSIGNMENT_SEED);
//   const total = subtotal + platformFee;
//   const [cartData , setCartData] = useState<Product[]>([]);

//   const handleQuantityChange = (productId: number, newQuantity: number) => {
//     if (newQuantity <= 0) {
//       removeFromCart(productId);
//     } else {
//       updateQuantity(productId, newQuantity);
//     }
//   };
//   const fetchCartData= async () => {
//       const res = await fetch(
//         `${backendurl}/api/getcart?userId=${user?._id}`
//       );
//       const data = await res.json();
//       setCartData(data);
//     };
    

//   const handleProceedToCheckout = () => {
//     dispatch({
//       type: 'ADD_USER_ACTION',
//       payload: {
//         id: Date.now().toString(),
//         action: 'Proceeded to checkout',
//         timestamp: new Date(),
//         details: `${cart.length} items, total: ${formatCurrency(total)}`,
//       },
//     });
//   };
//    useEffect(()=>{
//       fetchCartData();
//     } , [])

//   if (cart.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
//         <div className="text-center max-w-md mx-auto px-4">
//           <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
//           <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
//             Your Cart is Empty
//           </h1>
//           <p className="text-gray-600 dark:text-gray-400 mb-8">
//             Looks like you haven't added any items to your cart yet. Start shopping to find great deals!
//           </p>
//           <Link
//             href="/products"
//             className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
//           >
//             Start Shopping
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header */}
//         <div className="flex items-center space-x-4 mb-8">
//           <Link
//             href="/products"
//             className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             <span>Continue Shopping</span>
//           </Link>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Cart Items */}
//           <div className="lg:col-span-2">
//             <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
//               <div className="p-6 border-b border-gray-200 dark:border-gray-700">
//                 <div className="flex items-center justify-between">
//                   <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
//                     Shopping Cart ({cart.length} items)
//                   </h1>
//                   <button
//                     onClick={clearCart}
//                     className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium"
//                   >
//                     Clear Cart
//                   </button>
//                 </div>
//               </div>

//               <div className="divide-y divide-gray-200 dark:divide-gray-700">
//                 {cart.map((item) => (
//                   <div key={item.id} className="p-6">
//                     <div className="flex items-start space-x-4">
//                       {/* Product Image */}
//                       <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
//                         <Image
//                           src={item.images[0]}
//                           alt={item.title}
//                           width={80}
//                           height={80}
//                           className="w-full h-full object-cover"
//                         />
//                       </div>

//                       {/* Product Details */}
//                       <div className="flex-1 min-w-0">
//                         <Link
//                           href={`/products/${item.id}`}
//                           className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
//                         >
//                           {item.title}
//                         </Link>
//                         <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
//                           Condition: {item.condition}
//                         </p>
//                         <p className="text-sm text-gray-600 dark:text-gray-400">
//                           Seller: {item.sellerName}
//                         </p>

//                         {/* Mobile Actions */}
//                         <div className="flex items-center justify-between mt-4 sm:hidden">
//                           <div className="flex items-center space-x-2">
//                             <button
//                               onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
//                               className="p-1 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
//                             >
//                               <Minus className="h-4 w-4" />
//                             </button>
//                             <span className="w-8 text-center">{item.quantity}</span>
//                             <button
//                               onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
//                               className="p-1 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
//                             >
//                               <Plus className="h-4 w-4" />
//                             </button>
//                           </div>
//                           <div className="text-right">
//                             <div className="text-lg font-semibold text-gray-900 dark:text-white">
//                               {formatCurrency(item.price * item.quantity)}
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Desktop Quantity & Price */}
//                       <div className="hidden sm:flex items-center space-x-6">
//                         {/* Quantity Controls */}
//                         <div className="flex items-center space-x-2">
//                           <button
//                             onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
//                             className="p-2 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
//                           >
//                             <Minus className="h-4 w-4" />
//                           </button>
//                           <span className="w-12 text-center">{item.quantity}</span>
//                           <button
//                             onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
//                             className="p-2 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
//                           >
//                             <Plus className="h-4 w-4" />
//                           </button>
//                         </div>

//                         {/* Price */}
//                         <div className="text-right w-24">
//                           <div className="text-lg font-semibold text-gray-900 dark:text-white">
//                             {formatCurrency(item.price * item.quantity)}
//                           </div>
//                           {item.quantity > 1 && (
//                             <div className="text-sm text-gray-500 dark:text-gray-400">
//                               {formatCurrency(item.price)} each
//                             </div>
//                           )}
//                         </div>

//                         {/* Remove Button */}
//                         <button
//                           onClick={() => removeFromCart(item.id)}
//                           className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
//                           title="Remove from cart"
//                         >
//                           <Trash2 className="h-5 w-5" />
//                         </button>
//                       </div>

//                       {/* Mobile Remove Button */}
//                       <div className="sm:hidden">
//                         <button
//                           onClick={() => removeFromCart(item.id)}
//                           className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
//                           title="Remove from cart"
//                         >
//                           <Trash2 className="h-5 w-5" />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Order Summary */}
//           <div className="lg:col-span-1">
//             <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-24">
//               <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//                 Order Summary
//               </h2>

//               <div className="space-y-3">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600 dark:text-gray-400">Subtotal ({cart.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
//                   <span className="text-gray-900 dark:text-white font-medium">
//                     {formatCurrency(subtotal)}
//                   </span>
//                 </div>

//                 <div className="flex justify-between">
//                   <span className="text-gray-600 dark:text-gray-400">
//                     Platform Fee ({extractSeedNumber(ASSIGNMENT_SEED) % 10}%)
//                   </span>
//                   <span className="text-gray-900 dark:text-white font-medium">
//                     {formatCurrency(platformFee)}
//                   </span>
//                 </div>

//                 <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
//                   <div className="flex justify-between">
//                     <span className="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
//                     <span className="text-lg font-semibold text-gray-900 dark:text-white">
//                       {formatCurrency(total)}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-6 space-y-3">
//                 <Link
//                   href="/checkout"
//                   onClick={handleProceedToCheckout}
//                   className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors text-center block"
//                 >
//                   Proceed to Checkout
//                 </Link>

//                 <Link
//                   href="/products"
//                   className="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 px-6 py-3 rounded-lg font-medium transition-colors text-center block"
//                 >
//                   Continue Shopping
//                 </Link>
//               </div>

//               {/* Security Badge */}
//               <div className="mt-6 text-center">
//                 <div className="inline-flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
//                   <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
//                   </svg>
//                   <span>Secure Checkout</span>
//                 </div>
//               </div>

//               {/* Assignment Seed Info */}
//               <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
//                 <div className="text-xs text-gray-600 dark:text-gray-400 text-center">
//                   <span>Seed: </span>
//                   <code className="font-mono bg-white dark:bg-gray-800 px-2 py-1 rounded text-blue-600 dark:text-blue-400">
//                     {ASSIGNMENT_SEED}
//                   </code>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
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
  const backendurl = process.env.NEXT_PUBLIC_BACKEND_URL?.toString();
  const [cartData, setCartData] = useState<Product[]>([]);

  const fetchCartData = async () => {
    const res = await fetch(`${backendurl}/api/getcart?userId=${user?._id}`);
    const data = await res.json();
    setCartData(data);
  };

  const handleRemove = (productId: number) => {
    setCartData((prev) => prev.filter((item) => item.id !== productId));
    try {
      fetch(`${backendurl}/api/liked/remove`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?._id,
          productId,
        }),
      });
    } catch (error) {
      
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

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
              <Image
                src={item.images[0]}
                alt={item.title}
                fill
                className="object-cover"
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

