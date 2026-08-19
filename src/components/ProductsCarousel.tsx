"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ChevronLeft, Star, Heart, ShoppingBag } from "lucide-react";
import { products } from "@/lib/data";
import { cn } from "@/lib/utils";

function ProductCard({ product }: { product: typeof products[0] }) {
  return (
    <div className="group min-w-[260px] max-w-[300px] flex-shrink-0 bg-white rounded-xl overflow-hidden border border-cream-200 hover:shadow-lg transition-all duration-300">
      {/* Image */}
      <div className="relative aspect-square bg-cream-100 overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="300px"
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 right-3 px-2.5 py-1 bg-gold-400 text-navy-800 text-[11px] font-semibold rounded-md z-10">
            {product.badge}
          </span>
        )}

        {/* Wishlist */}
        <button
          className="absolute top-3 left-3 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white z-10"
          aria-label="أضف للمفضلة"
        >
          <Heart size={15} className="text-navy-700" />
        </button>

        {/* Quick add */}
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
          <h3 className="text-sm font-medium text-navy-800 mb-1.5 line-clamp-1 hover:text-gold-500 transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1.5 mb-2">
          {product.colors.map((c) => (
            <span
              key={c.value}
              className="w-4 h-4 rounded-full border border-cream-200"
              style={{ backgroundColor: c.value }}
              title={c.name}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-navy-800">
            {product.price.toLocaleString("ar-SA")} {product.currency}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-cream-500 line-through">
              {product.originalPrice.toLocaleString("ar-SA")} {product.currency}
            </span>
          )}
        </div>

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
      </div>
    </div>
  );
}

export default function ProductsCarousel({ title, subtitle }: { title: string; subtitle: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2
              className="text-2xl sm:text-3xl font-bold text-navy-800 mb-2"
              style={{ fontFamily: "var(--font-playfair), 'Noto Serif Arabic', serif" }}
            >
              {title}
            </h2>
            <p className="text-cream-500 text-sm">{subtitle}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 border border-cream-200 rounded-full flex items-center justify-center hover:border-gold-400 hover:text-gold-500 transition-colors"
              aria-label="السابق"
            >
              <ChevronRight size={18} />
            </button>
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 border border-cream-200 rounded-full flex items-center justify-center hover:border-gold-400 hover:text-gold-500 transition-colors"
              aria-label="التالي"
            >
              <ChevronLeft size={18} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4"
          style={{ scrollbarWidth: "none" }}
        >
          {products.map((p) => (
            <div key={p.id} className="snap-start">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
