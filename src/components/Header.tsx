"use client";

import { useState, useEffect } from "react";
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
  const [scrolled, setScrolled] = useState(false);
  const [isHome, setIsHome] = useState(false);
  const { itemCount } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    setIsHome(window.location.pathname === "/");
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsHome(window.location.pathname === "/");
  }, []);

  const transparent = isHome && !scrolled;

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        transparent
          ? "bg-transparent"
          : "bg-cream-50/95 backdrop-blur-md shadow-sm"
      )}
    >
      {/* Top bar — only visible when not transparent */}
      <div
        className={cn(
          "transition-all duration-500 overflow-hidden",
          transparent
            ? "max-h-0 opacity-0"
            : "max-h-10 opacity-100 bg-navy-800 text-cream-100 text-xs"
        )}
      >
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
      <div className="transition-colors duration-500">
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
            <span
              className={cn(
                "font-serif text-xl font-semibold hidden sm:block transition-colors duration-500",
                transparent ? "text-cream-50" : "text-navy-800"
              )}
            >
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
                <button
                  className={cn(
                    "flex items-center gap-1 text-sm font-medium transition-colors",
                    transparent
                      ? "text-cream-100 hover:text-gold-400"
                      : "text-navy-700 hover:text-gold-500"
                  )}
                >
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
              href="/category/living-room"
              className={cn(
                "text-sm font-medium transition-colors",
                transparent
                  ? "text-gold-400 hover:text-gold-300"
                  : "text-gold-500 hover:text-gold-600"
              )}
            >
              عروض خاصة
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={cn(
                "p-2 transition-colors",
                transparent
                  ? "text-cream-100 hover:text-gold-400"
                  : "text-navy-700 hover:text-gold-500"
              )}
              aria-label="بحث"
            >
              <Search size={20} />
            </button>
            <Link
              href={user ? "/account" : "/auth/signin"}
              className={cn(
                "p-2 transition-colors hidden sm:block",
                transparent
                  ? "text-cream-100 hover:text-gold-400"
                  : "text-navy-700 hover:text-gold-500"
              )}
              aria-label={user ? "حسابي" : "تسجيل الدخول"}
            >
              <User size={20} />
            </Link>
            <button
              onClick={() => setCartOpen(true)}
              className={cn(
                "relative p-2 transition-colors",
                transparent
                  ? "text-cream-100 hover:text-gold-400"
                  : "text-navy-700 hover:text-gold-500"
              )}
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
              className={cn(
                "p-2 transition-colors lg:hidden",
                transparent
                  ? "text-cream-100 hover:text-gold-400"
                  : "text-navy-700 hover:text-gold-500"
              )}
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
                <Image
                  src="/images/logo.jpg"
                  alt="متجر الك"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-sm object-cover"
                />
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
                href="/category/living-room"
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
