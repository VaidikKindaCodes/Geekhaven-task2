"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

interface User {
  _id: string;
  username: string;
  email: string;
  LikedItems: any[]; // adjust as per schema
}

export interface AuthContextType {
  token: string | null;
  user: User | null;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null; // ✅ safe check
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null); // ✅ start null
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // ✅ runs only in browser
    const cookieToken = getCookie("token");
    const storedUser = getCookie("user");
    if (cookieToken) setToken(cookieToken);
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  const logout = () => {
    setToken(null);
    setUser(null);
    if (typeof document !== "undefined") {
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
  };

  const isAuthenticated = useMemo(() => !!user, [user]);

  return (
    <AuthContext.Provider value={{ token, user, logout, isAuthenticated, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
