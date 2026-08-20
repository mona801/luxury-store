"use client";

import { useState } from "react";
import { Star, Heart, ShoppingBag, Truck, RotateCcw, Shield, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWishlist } from "@/lib/wishlist-context";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/data";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.value ?? "");
  const [quantity, setQuantity] = useState(1);
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addItem } = useCart();
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, 1, selectedColor);
    }
  };

  return (
    <div className="space-y-5">
      {/* Breadcrumb-like category */}
      <p className="text-xs text-cream-500">{product.category}</p>

      {/* Name */}
      <h1
        className="text-2xl sm:text-3xl font-bold text-navy-800"
        style={{ fontFamily: "var(--font-playfair), 'Noto Serif Arabic', serif" }}
      >
        {product.name}
      </h1>

      {/* Rating */}
      {product.rating && (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={cn(
                  i < Math.floor(product.rating!)
                    ? "text-gold-400 fill-gold-400"
                    : "text-cream-300"
                )}
              />
            ))}
          </div>
          <span className="text-sm text-cream-500">
            {product.rating} ({product.reviewCount} تقييم)
          </span>
        </div>
      )}

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-2xl font-bold text-navy-800">
          {product.price.toLocaleString("ar-SA")} {product.currency}
        </span>
        {product.originalPrice && (
          <>
            <span className="text-lg text-cream-500 line-through">
              {product.originalPrice.toLocaleString("ar-SA")} {product.currency}
            </span>
            <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
              خصم {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </span>
          </>
        )}
      </div>

      {/* Installment */}
      {product.installment && product.installment.length > 0 && (
        <div className="flex items-center gap-2 p-3 bg-cream-100 rounded-lg">
          <span className="text-xs text-cream-500">أو ادفع</span>
          <span className="text-sm font-bold text-navy-800">
            {product.installment[0].monthly.toLocaleString("ar-SA")} {product.currency}
          </span>
          <span className="text-xs text-cream-500">
            شهريًا لمدة {product.installment[0].months} شهر عبر {product.installment[0].provider}
          </span>
        </div>
      )}

      {/* Divider */}
      <hr className="border-cream-200" />

      {/* Colors */}
      {product.colors.length > 0 && (
        <div>
          <label className="text-sm font-medium text-navy-700 mb-3 block">
            اللون:{" "}
            <span className="text-cream-500 font-normal">
              {product.colors.find((c) => c.value === selectedColor)?.name}
            </span>
          </label>
          <div className="flex items-center gap-2">
            {product.colors.map((c) => (
              <button
                key={c.value}
                onClick={() => setSelectedColor(c.value)}
                className={cn(
                  "w-10 h-10 rounded-full border-2 transition-all",
                  selectedColor === c.value
                    ? "border-gold-400 ring-2 ring-gold-400/30"
                    : "border-cream-200 hover:border-cream-400"
                )}
                style={{ backgroundColor: c.value }}
                title={c.name}
              />
            ))}
          </div>
        </div>
      )}

      {/* Stock */}
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "w-2 h-2 rounded-full",
            product.inStock ? "bg-emerald-500" : "bg-red-400"
          )}
        />
        <span className={cn(
          "text-sm",
          product.inStock ? "text-emerald-600" : "text-red-500"
        )}>
          {product.stockLabel ?? (product.inStock ? "متوفر في المخزون" : "غير متوفر")}
        </span>
      </div>

      {/* Quantity + Add to cart */}
      <div className="flex items-center gap-3">
        {/* Quantity */}
        <div className="flex items-center border border-cream-200 rounded-lg">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 flex items-center justify-center text-navy-700 hover:text-gold-500 transition-colors"
          >
            <Minus size={16} />
          </button>
          <span className="w-10 text-center text-sm font-medium text-navy-800">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 flex items-center justify-center text-navy-700 hover:text-gold-500 transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Add to cart */}
        <button
          onClick={handleAddToCart}
          className="flex-1 h-11 flex items-center justify-center gap-2 bg-navy-800 text-cream-50 text-sm font-semibold rounded-lg hover:bg-navy-700 transition-colors"
        >
          <ShoppingBag size={18} />
          أضف للسلة
        </button>

        {/* Wishlist */}
        <button
          onClick={() => toggleWishlist(product.id)}
          className={cn(
            "w-11 h-11 border rounded-lg flex items-center justify-center transition-all",
            wishlisted
              ? "border-red-300 bg-red-50 text-red-500"
              : "border-cream-200 text-navy-700 hover:border-red-300 hover:text-red-400"
          )}
        >
          <Heart size={18} className={wishlisted ? "fill-red-500" : ""} />
        </button>
      </div>

      {/* Trust badges */}
      <div className="grid grid-cols-3 gap-3 pt-2">
        <div className="flex flex-col items-center gap-1.5 p-3 bg-cream-100 rounded-lg">
          <Truck size={18} className="text-gold-500" />
          <span className="text-[11px] text-navy-700 text-center">توصيل مجاني</span>
        </div>
        <div className="flex flex-col items-center gap-1.5 p-3 bg-cream-100 rounded-lg">
          <RotateCcw size={18} className="text-gold-500" />
          <span className="text-[11px] text-navy-700 text-center">إرجاع خلال 7 أيام</span>
        </div>
        <div className="flex flex-col items-center gap-1.5 p-3 bg-cream-100 rounded-lg">
          <Shield size={18} className="text-gold-500" />
          <span className="text-[11px] text-navy-700 text-center">ضمان سنتين</span>
        </div>
      </div>
    </div>
  );
}
