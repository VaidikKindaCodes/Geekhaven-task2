"use client";

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AppState, CartItem, UserAction, Filters } from '../lib/types';
import { ASSIGNMENT_SEED } from '../data/mockData';
import { saveToLocalStorage, loadFromLocalStorage } from '../lib/utils';

interface AppContextType extends AppState {
  dispatch: React.Dispatch<AppAction>;
}

type AppAction =
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_LIKE'; payload: number }
  | { type: 'ADD_USER_ACTION'; payload: UserAction }
  | { type: 'TOGGLE_DARK_MODE' }
  | { type: 'LOAD_STATE'; payload: Partial<AppState> };

const initialState: AppState = {
  assignmentSeed: ASSIGNMENT_SEED,
  cart: [],
  likedProducts: [],
  userActions: [],
  darkMode: false,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };

    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
      };

    case 'TOGGLE_LIKE':
      const isLiked = state.likedProducts.includes(action.payload);
      return {
        ...state,
        likedProducts: isLiked
          ? state.likedProducts.filter(id => id !== action.payload)
          : [...state.likedProducts, action.payload],
      };

    case 'ADD_USER_ACTION':
      return {
        ...state,
        userActions: [action.payload, ...state.userActions.slice(0, 19)], // Keep only last 20
      };

    case 'TOGGLE_DARK_MODE':
      return {
        ...state,
        darkMode: !state.darkMode,
      };

    case 'LOAD_STATE':
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  useEffect(() => {
    const savedCart = loadFromLocalStorage('cart', []);
    const savedLikedProducts = loadFromLocalStorage('likedProducts', []);
    const savedUserActions = loadFromLocalStorage('userActions', []);
    const savedDarkMode = loadFromLocalStorage('darkMode', false);

    dispatch({
      type: 'LOAD_STATE',
      payload: {
        cart: savedCart,
        likedProducts: savedLikedProducts,
        userActions: savedUserActions,
        darkMode: savedDarkMode,
      },
    });
  }, []);

  useEffect(() => {
    saveToLocalStorage('cart', state.cart);
  }, [state.cart]);

  useEffect(() => {
    saveToLocalStorage('likedProducts', state.likedProducts);
  }, [state.likedProducts]);

  useEffect(() => {
    saveToLocalStorage('userActions', state.userActions);
  }, [state.userActions]);

  useEffect(() => {
    saveToLocalStorage('darkMode', state.darkMode);
  }, [state.darkMode]);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (state.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [state.darkMode]);

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

export function useCart() {
  const { cart, dispatch } = useApp();

  const addToCart = (product: any, quantity: number = 1) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { ...product, quantity },
    });

    dispatch({
      type: 'ADD_USER_ACTION',
      payload: {
        id: Date.now().toString(),
        action: 'Added to cart',
        timestamp: new Date(),
        details: `${product.title} (qty: ${quantity})`,
      },
    });
  };

  const removeFromCart = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });

    dispatch({
      type: 'ADD_USER_ACTION',
      payload: {
        id: Date.now().toString(),
        action: 'Removed from cart',
        timestamp: new Date(),
        details: `Product ID: ${productId}`,
      },
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({
      type: 'UPDATE_CART_QUANTITY',
      payload: { id: productId, quantity },
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });

    dispatch({
      type: 'ADD_USER_ACTION',
      payload: {
        id: Date.now().toString(),
        action: 'Cleared cart',
        timestamp: new Date(),
      },
    });
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
  };
}

export function useLikes() {
  const { likedProducts, dispatch } = useApp();

  const toggleLike = (productId: number) => {
    dispatch({ type: 'TOGGLE_LIKE', payload: productId });

    const isLiked = likedProducts.includes(productId);
    dispatch({
      type: 'ADD_USER_ACTION',
      payload: {
        id: Date.now().toString(),
        action: isLiked ? 'Unliked product' : 'Liked product',
        timestamp: new Date(),
        details: `Product ID: ${productId}`,
      },
    });
  };

  const isLiked = (productId: number) => {
    return likedProducts.includes(productId);
  };

  return {
    likedProducts,
    toggleLike,
    isLiked,
    likeCount: likedProducts.length,
  };
}
