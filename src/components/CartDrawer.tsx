"use client";

import { useCart } from "@/lib/cart-context";
import Image from "next/image";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import Link from "next/link";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, subtotal, itemCount } = useCart();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute top-0 left-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col animate-in slide-in-from-left">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-cream-200">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-navy-800" />
            <h2 className="text-sm font-semibold text-navy-800">
              سلة التسوق ({itemCount})
            </h2>
          </div>
          <button onClick={onClose}>
            <X size={20} className="text-navy-700 hover:text-red-500 transition-colors" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={48} className="text-cream-300 mb-4" />
              <p className="text-sm text-cream-500 mb-4">سلتك فارغة</p>
              <Link
                href="/"
                onClick={onClose}
                className="px-6 py-2.5 bg-navy-800 text-cream-50 text-xs font-medium rounded-lg hover:bg-navy-700 transition-colors"
              >
                تصفح المنتجات
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor}`}
                  className="flex gap-3 p-3 bg-cream-50 rounded-xl"
                >
                  {/* Image */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-cream-100 shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-medium text-navy-800 line-clamp-1">
                        {item.product.name}
                      </h3>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="shrink-0 text-cream-400 hover:text-red-500 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    {item.selectedColor && (
                      <div className="flex items-center gap-1.5 mt-1">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-cream-200"
                          style={{ backgroundColor: item.selectedColor }}
                        />
                        <span className="text-[11px] text-cream-500">{item.selectedColor}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity */}
                      <div className="flex items-center border border-cream-200 rounded-md">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-navy-600 hover:text-gold-500"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-7 text-center text-xs font-medium text-navy-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-navy-600 hover:text-gold-500"
                        >
                          <Plus size={12} />
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
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-5 py-4 border-t border-cream-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-cream-500">المجموع الفرعي</span>
              <span className="text-sm font-bold text-navy-800">
                {subtotal.toLocaleString("ar-SA")} ر.س
              </span>
            </div>
            <p className="text-[11px] text-cream-400">الشحن يُحسب عند الدفع</p>
            <Link
              href="/cart"
              onClick={onClose}
              className="block w-full py-3 bg-cream-100 text-navy-800 text-sm font-medium rounded-lg text-center hover:bg-cream-200 transition-colors"
            >
              عرض السلة
            </Link>
            <Link
              href="/checkout"
              onClick={onClose}
              className="block w-full py-3 bg-navy-800 text-cream-50 text-sm font-semibold rounded-lg text-center hover:bg-navy-700 transition-colors"
            >
              إتمام الشراء
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
