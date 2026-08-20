"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signup: (name: string, email: string, password: string) => { success: boolean; error?: string };
  signin: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface StoredUser {
  name: string;
  email: string;
  password: string;
}

function getStoredUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("luxury_users") || "[]");
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem("luxury_users", JSON.stringify(users));
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("luxury_current_user");
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch {}
    setIsLoading(false);
  }, []);

  const signup = useCallback((name: string, email: string, password: string) => {
    const users = getStoredUsers();
    const exists = users.find((u) => u.email === email);
    if (exists) {
      return { success: false, error: "البريد الإلكتروني مسجل بالفعل" };
    }
    const newUser = { name, email, password };
    users.push(newUser);
    saveUsers(users);
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem("luxury_current_user", JSON.stringify(userWithoutPassword));
    return { success: true };
  }, []);

  const signin = useCallback((email: string, password: string) => {
    const users = getStoredUsers();
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) {
      return { success: false, error: "البريد الإلكتروني أو كلمة المرور غير صحيحة" };
    }
    const { password: _, ...userWithoutPassword } = found;
    setUser(userWithoutPassword);
    localStorage.setItem("luxury_current_user", JSON.stringify(userWithoutPassword));
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("luxury_current_user");
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, signup, signin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
