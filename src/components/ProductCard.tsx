"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/data";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group bg-white rounded-xl overflow-hidden border border-cream-200 hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative aspect-square bg-cream-100 overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={cn(
            "object-cover transition-transform duration-500",
            hovered && "scale-110"
          )}
        />

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 right-3 px-2.5 py-1 bg-gold-400 text-navy-800 text-[11px] font-semibold rounded-md z-10">
            {product.badge}
          </span>
        )}

        {/* Wishlist */}
        <button
          className="absolute top-3 left-3 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white z-10"
          aria-label="أضف للمفضلة"
        >
          <Heart size={16} className="text-navy-700" />
        </button>

        {/* Quick add to cart */}
        <div className="absolute bottom-0 right-0 left-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
          <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-navy-800 text-cream-50 text-xs font-medium rounded-lg hover:bg-navy-700 transition-colors">
            <ShoppingBag size={14} />
            أضف للسلة
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-sm font-medium text-navy-800 mb-1.5 line-clamp-1 hover:text-gold-500 transition-colors cursor-pointer">
            {product.name}
          </h3>
        </Link>

        {/* Colors */}
        {product.colors.length > 0 && (
          <div className="flex items-center gap-1.5 mb-2.5">
            {product.colors.map((c) => (
              <span
                key={c.value}
                className="w-4 h-4 rounded-full border border-cream-200 cursor-pointer hover:ring-2 hover:ring-gold-400/50 transition-all"
                style={{ backgroundColor: c.value }}
                title={c.name}
              />
            ))}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-sm font-bold text-navy-800">
            {product.price.toLocaleString("ar-SA")} {product.currency}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-cream-500 line-through">
              {product.originalPrice.toLocaleString("ar-SA")} {product.currency}
            </span>
          )}
        </div>

        {/* Discount percent */}
        {product.originalPrice && (
          <span className="text-[11px] font-medium text-emerald-600">
            خصم {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </span>
        )}

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1 mt-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={cn(
                    i < Math.floor(product.rating!)
                      ? "text-gold-400 fill-gold-400"
                      : "text-cream-300"
                  )}
                />
              ))}
            </div>
            <span className="text-[11px] text-cream-500">
              ({product.reviewCount})
            </span>
          </div>
        )}

        {/* Stock */}
        {product.stockLabel && (
          <p className="text-[11px] font-medium text-amber-600 mt-1.5">
            {product.stockLabel}
          </p>
        )}
      </div>
    </div>
  );
}
