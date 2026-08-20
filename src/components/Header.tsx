"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  User,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  Truck,
  MapPin,
} from "lucide-react";
import { categories } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";
import CartDrawer from "./CartDrawer";

export default function Header() {
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { itemCount } = useCart();
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top bar */}
      <div className="bg-navy-800 text-cream-100 text-xs">
        <div className="mx-auto max-w-7xl px-4 flex items-center justify-between h-9">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Truck size={13} />
              التوصيل لجميع مناطق المملكة
            </span>
          </div>
          <span className="hidden sm:flex items-center gap-1">
            <MapPin size={13} />
            المتجر الرئيسي — جدة
          </span>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-cream-50/95 backdrop-blur-md border-b border-cream-200">
        <div className="mx-auto max-w-7xl px-4 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/images/logo.jpg"
              alt="متجر الك"
              width={40}
              height={40}
              className="w-10 h-10 rounded-sm object-cover"
              priority
            />
            <span className="font-serif text-xl font-semibold text-navy-800 hidden sm:block">
              متجر الك
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="relative"
                onMouseEnter={() => setMegaOpen(true)}
                onMouseLeave={() => setMegaOpen(false)}
              >
                <button className="flex items-center gap-1 text-sm font-medium text-navy-700 hover:text-gold-500 transition-colors">
                  {cat.name}
                  <ChevronDown
                    size={14}
                    className={cn(
                      "transition-transform",
                      megaOpen && "rotate-180"
                    )}
                  />
                </button>

                {megaOpen && (
                  <div className="absolute top-full right-0 w-64 bg-white border border-cream-200 shadow-lg rounded-b-lg p-5 animate-in fade-in slide-in-from-top-2">
                    <div className="grid gap-1">
                      {cat.subcategories?.map((sub) => (
                        <Link
                          key={sub.slug}
                          href={`/category/${cat.slug}/${sub.slug}`}
                          className="text-sm text-navy-700 hover:text-gold-500 hover:bg-cream-100 rounded px-3 py-2 transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                    <Link
                      href={`/category/${cat.slug}`}
                      className="mt-3 block text-xs font-medium text-gold-500 hover:text-gold-600 transition-colors"
                    >
                      عرض الكل ←
                    </Link>
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/category/deals"
              className="text-sm font-medium text-gold-500 hover:text-gold-600 transition-colors"
            >
              عروض خاصة
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-navy-700 hover:text-gold-500 transition-colors"
              aria-label="بحث"
            >
              <Search size={20} />
            </button>
            <Link
              href={user ? "/account" : "/auth/signin"}
              className="p-2 text-navy-700 hover:text-gold-500 transition-colors hidden sm:block"
              aria-label={user ? "حسابي" : "تسجيل الدخول"}
            >
              <User size={20} />
            </Link>
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-navy-700 hover:text-gold-500 transition-colors"
              aria-label="سلة التسوق"
            >
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold-400 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 text-navy-700 hover:text-gold-500 transition-colors lg:hidden"
              aria-label="القائمة"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="border-t border-cream-200 bg-white">
            <div className="mx-auto max-w-7xl px-4 py-4">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-cream-500"
                />
                <input
                  type="text"
                  placeholder="ابحث عن منتجات..."
                  className="w-full h-11 pr-10 pl-4 border border-cream-300 rounded-lg text-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30 bg-cream-50"
                  autoFocus
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-0 right-0 h-full w-80 bg-white shadow-xl overflow-y-auto animate-in slide-in-from-right">
            <div className="flex items-center justify-between p-4 border-b border-cream-200">
              <div className="flex items-center gap-2">
                <Image src="/images/logo.jpg" alt="متجر الك" width={32} height={32} className="w-8 h-8 rounded-sm object-cover" />
                <span className="font-serif text-lg font-semibold text-navy-800">
                  متجر الك
                </span>
              </div>
              <button onClick={() => setMobileOpen(false)}>
                <X size={22} className="text-navy-700" />
              </button>
            </div>
            <nav className="p-4 space-y-1">
              {categories.map((cat) => (
                <div key={cat.id}>
                  <button
                    onClick={() =>
                      setMobileSubmenu(
                        mobileSubmenu === cat.id ? null : cat.id
                      )
                    }
                    className="w-full flex items-center justify-between py-3 text-sm font-medium text-navy-700 hover:text-gold-500"
                  >
                    {cat.name}
                    <ChevronDown
                      size={16}
                      className={cn(
                        "transition-transform",
                        mobileSubmenu === cat.id && "rotate-180"
                      )}
                    />
                  </button>
                  {mobileSubmenu === cat.id && (
                    <div className="pr-4 pb-2 space-y-1">
                      {cat.subcategories?.map((sub) => (
                        <Link
                          key={sub.slug}
                          href={`/category/${cat.slug}/${sub.slug}`}
                          onClick={() => setMobileOpen(false)}
                          className="block py-2 text-sm text-navy-600 hover:text-gold-500"
                        >
                          {sub.name}
                        </Link>
                      ))}
                      <Link
                        href={`/category/${cat.slug}`}
                        onClick={() => setMobileOpen(false)}
                        className="block py-2 text-xs font-medium text-gold-500"
                      >
                        عرض الكل
                      </Link>
                    </div>
                  )}
                </div>
              ))}
              <hr className="border-cream-200 my-3" />
              <Link
                href="/category/deals"
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-sm font-medium text-gold-500"
              >
                عروض خاصة
              </Link>
              <Link
                href={user ? "/account" : "/auth/signin"}
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-sm font-medium text-navy-700"
              >
                {user ? `حسابي — ${user.name}` : "تسجيل الدخول"}
              </Link>
            </nav>
          </div>
        </div>
      )}

      {/* Cart drawer */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}
