"use client";

import Link from "next/link";
import Image from "next/image";
import { categories } from "@/lib/data";
import { ArrowLeft } from "lucide-react";

export default function ShopByRoom() {
  return (
    <section className="py-16 sm:py-20 bg-cream-50">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2
              className="text-2xl sm:text-3xl font-bold text-navy-800 mb-2"
              style={{ fontFamily: "var(--font-playfair), 'Noto Serif Arabic', serif" }}
            >
              تسوق حسب الغرفة
            </h2>
            <p className="text-cream-500 text-sm">اختر الغرفة التي تريد تجديدها</p>
          </div>
          <Link
            href="/category"
            className="hidden sm:flex items-center gap-1 text-sm font-medium text-gold-500 hover:text-gold-600 transition-colors"
          >
            عرض الكل
            <ArrowLeft size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group relative aspect-[4/5] rounded-xl overflow-hidden bg-navy-100"
            >
              {/* Image */}
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-800/80 via-navy-800/20 to-transparent group-hover:from-navy-800/90 transition-all" />

              {/* Content */}
              <div className="absolute bottom-0 right-0 left-0 p-4">
                <h3 className="text-cream-50 font-semibold text-sm mb-1">
                  {cat.name}
                </h3>
                <p className="text-cream-200/70 text-xs">
                  {cat.subcategories?.length ?? 0} منتجات
                </p>
              </div>

              {/* Hover arrow */}
              <div className="absolute top-4 left-4 w-8 h-8 bg-cream-50/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowLeft size={16} className="text-navy-800" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
