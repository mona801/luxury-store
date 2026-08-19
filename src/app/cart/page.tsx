"use client";

import { useCart } from "@/lib/cart-context";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X, Tag, ArrowLeft, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, discount, coupon, setCoupon, itemCount } = useCart();

  return (
    <div className="bg-cream-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
        <h1
          className="text-2xl sm:text-3xl font-bold text-navy-800 mb-8"
          style={{ fontFamily: "var(--font-playfair), 'Noto Serif Arabic', serif" }}
        >
          سلة التسوق
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag size={56} className="text-cream-300 mx-auto mb-4" />
            <p className="text-cream-500 mb-6">سلتك فارغة</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-navy-800 text-cream-50 text-sm font-medium rounded-lg hover:bg-navy-700 transition-colors"
            >
              تصفح المنتجات
              <ArrowLeft size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items list */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor}`}
                  className="flex gap-4 p-4 bg-white rounded-xl border border-cream-200"
                >
                  {/* Image */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden bg-cream-100 shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      width={112}
                      height={112}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link
                          href={`/product/${item.product.slug}`}
                          className="text-sm font-medium text-navy-800 hover:text-gold-500 transition-colors line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        {item.selectedColor && (
                          <div className="flex items-center gap-1.5 mt-1">
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-cream-200"
                              style={{ backgroundColor: item.selectedColor }}
                            />
                            <span className="text-[11px] text-cream-500">
                              {item.selectedColor}
                            </span>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-cream-400 hover:text-red-500 transition-colors shrink-0"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity */}
                      <div className="flex items-center border border-cream-200 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-navy-600 hover:text-gold-500"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-navy-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-navy-600 hover:text-gold-500"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="text-sm font-bold text-navy-800">
                        {(item.product.price * item.quantity).toLocaleString("ar-SA")}{" "}
                        {item.product.currency}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border border-cream-200 p-5 sticky top-36">
                <h3 className="text-sm font-semibold text-navy-800 mb-4">
                  ملخص الطلب
                </h3>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-cream-500">
                      المجموع ({itemCount} منتج)
                    </span>
                    <span className="text-navy-800 font-medium">
                      {subtotal.toLocaleString("ar-SA")} ر.س
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-emerald-600">الخصم</span>
                      <span className="text-emerald-600 font-medium">
                        -{discount.toLocaleString("ar-SA")} ر.س
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-cream-500">الشحن</span>
                    <span className="text-navy-800 font-medium">مجاني</span>
                  </div>
                </div>

                <hr className="border-cream-200 mb-4" />

                {/* Coupon */}
                <div className="flex gap-2 mb-4">
                  <div className="relative flex-1">
                    <Tag
                      size={14}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-cream-400"
                    />
                    <input
                      type="text"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="كود الخصم"
                      className="w-full h-10 pr-9 pl-3 border border-cream-200 rounded-lg text-xs focus:outline-none focus:border-gold-400 bg-cream-50"
                    />
                  </div>
                  <button className="px-4 h-10 bg-cream-100 text-navy-700 text-xs font-medium rounded-lg hover:bg-cream-200 transition-colors">
                    تطبيق
                  </button>
                </div>

                <hr className="border-cream-200 mb-4" />

                <div className="flex items-center justify-between mb-5">
                  <span className="text-sm font-semibold text-navy-800">الإجمالي</span>
                  <span className="text-lg font-bold text-navy-800">
                    {(subtotal - discount).toLocaleString("ar-SA")} ر.س
                  </span>
                </div>

                <Link
                  href="/checkout"
                  className="block w-full py-3 bg-navy-800 text-cream-50 text-sm font-semibold rounded-lg text-center hover:bg-navy-700 transition-colors"
                >
                  إتمام الشراء
                </Link>

                <Link
                  href="/"
                  className="block w-full py-2.5 text-center text-xs text-gold-500 hover:text-gold-600 transition-colors mt-2"
                >
                  متابعة التسوق
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
