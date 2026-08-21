"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { products } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useWishlist } from "@/lib/wishlist-context";

export default function RelatedProducts({ currentId }: { currentId: string }) {
  const related = products.filter((p) => p.id !== currentId).slice(0, 4);
  return <RelatedProductsInner products={related} />;
}

function RelatedProductsInner({ products: items }: { products: typeof products }) {
  const { toggleWishlist, isWishlisted } = useWishlist();

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <h2
          className="text-2xl font-bold text-navy-800 mb-8"
          style={{ fontFamily: "var(--font-playfair), 'Noto Serif Arabic', serif" }}
        >
          منتجات مشابهة قد تعجبك
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
          {items.map((product) => {
            const liked = isWishlisted(product.id);
            return (
              <div
                key={product.id}
                className="group bg-white rounded-xl overflow-hidden border border-cream-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="relative aspect-square bg-cream-100 overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.badge && (
                    <span className="absolute top-3 right-3 px-2 py-0.5 bg-gold-400 text-navy-800 text-[10px] font-semibold rounded z-10">
                      {product.badge}
                    </span>
                  )}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={cn(
                      "absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center transition-all z-10",
                      liked ? "bg-red-50 text-red-500" : "bg-white/80 text-navy-700 hover:bg-white"
                    )}
                    aria-label={liked ? "إزالة من المفضلة" : "أضف للمفضلة"}
                  >
                    <Heart size={14} className={liked ? "fill-red-500" : ""} />
                  </button>
                  <div className="absolute bottom-0 right-0 left-0 p-2.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
                    <button className="w-full flex items-center justify-center gap-1.5 py-2 bg-navy-800 text-cream-50 text-xs font-medium rounded-lg hover:bg-navy-700 transition-colors">
                      <ShoppingBag size={13} />
                      أضف للسلة
                    </button>
                  </div>
                </div>
                <div className="p-3.5">
                  <Link href={`/product/${product.slug}`}>
                    <h3 className="text-sm font-medium text-navy-800 mb-1 line-clamp-1 hover:text-gold-500 transition-colors cursor-pointer">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    {product.colors.slice(0, 3).map((c) => (
                      <span
                        key={c.value}
                        className="w-3.5 h-3.5 rounded-full border border-cream-200"
                        style={{ backgroundColor: c.value }}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-navy-800">
                      {product.price.toLocaleString("ar-SA")} {product.currency}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-cream-500 line-through">
                        {product.originalPrice.toLocaleString("ar-SA")}
                      </span>
                    )}
                  </div>
                  {product.rating && (
                    <div className="flex items-center gap-1 mt-1.5">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={11}
                            className={cn(
                              i < Math.floor(product.rating!)
                                ? "text-gold-400 fill-gold-400"
                                : "text-cream-300"
                            )}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-cream-500">
                        ({product.reviewCount})
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
