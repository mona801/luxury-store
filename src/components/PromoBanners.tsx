"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const banners = [
  {
    title: "أناقة المعيشة",
    subtitle: "خصم حتى 40% على الأنتريهات",
    href: "/category/living",
    gradient: "from-navy-800 to-navy-700",
  },
  {
    title: "غرفة النوم الحلم",
    subtitle: "تشكيلة الأسرّة الفاخرة وصلت",
    href: "/category/bedroom",
    gradient: "from-cream-600 to-cream-500",
  },
];

export default function PromoBanners() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {banners.map((b) => (
            <Link
              key={b.title}
              href={b.href}
              className="group relative rounded-2xl overflow-hidden h-56 sm:h-64 flex items-end"
            >
              <div className={`absolute inset-0 bg-gradient-to-l ${b.gradient}`} />
              {/* Decorative circles */}
              <div className="absolute top-8 left-8 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
              <div className="absolute bottom-4 right-4 w-48 h-48 bg-white/5 rounded-full blur-3xl" />

              <div className="relative p-6 sm:p-8">
                <p className="text-cream-200/80 text-sm mb-1">{b.subtitle}</p>
                <div className="flex items-center gap-2">
                  <h3
                    className="text-xl sm:text-2xl font-bold text-cream-50"
                    style={{ fontFamily: "var(--font-playfair), 'Noto Serif Arabic', serif" }}
                  >
                    {b.title}
                  </h3>
                  <ArrowLeft
                    size={20}
                    className="text-gold-400 group-hover:-translate-x-1 transition-transform"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
