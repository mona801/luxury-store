"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/auth-context";
import { useWishlist } from "@/lib/wishlist-context";
import { products } from "@/lib/data";
import { Heart, LogOut, User, Mail } from "lucide-react";

export default function AccountPage() {
  const { user, isLoading, logout } = useAuth();
  const { wishlist } = useWishlist();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/signin");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-cream-500 text-sm">جاري التحميل...</div>
      </div>
    );
  }

  if (!user) return null;

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
      {/* User info */}
      <div className="bg-white rounded-xl border border-cream-200 p-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-navy-100 rounded-full flex items-center justify-center">
            <User size={28} className="text-navy-600" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-navy-800">{user.name}</h1>
            <div className="flex items-center gap-1.5 text-sm text-cream-500 mt-1">
              <Mail size={14} />
              {user.email}
            </div>
          </div>
          <button
            onClick={() => { logout(); router.push("/"); }}
            className="flex items-center gap-2 px-4 py-2 border border-cream-200 rounded-lg text-sm text-navy-700 hover:bg-cream-100 transition-colors"
          >
            <LogOut size={16} />
            تسجيل الخروج
          </button>
        </div>
      </div>

      {/* Wishlist */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Heart size={20} className="text-red-400 fill-red-400" />
          <h2 className="text-lg font-bold text-navy-800">قائمة الأمنيات ({wishlistProducts.length})</h2>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-cream-200">
            <Heart size={48} className="mx-auto text-cream-300 mb-4" />
            <p className="text-cream-500 mb-4">قائمة الأمنيات فارغة</p>
            <Link
              href="/"
              className="inline-block px-6 py-2.5 bg-navy-800 text-cream-50 text-sm font-medium rounded-lg hover:bg-navy-700 transition-colors"
            >
              تصفح المنتجات
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {wishlistProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="bg-white rounded-xl border border-cream-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="aspect-square bg-cream-100 relative">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="25vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium text-navy-800 line-clamp-1">{product.name}</h3>
                  <p className="text-sm font-bold text-navy-800 mt-1">
                    {product.price.toLocaleString("ar-SA")} {product.currency}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
