"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full h-[70vh] min-h-[480px] max-h-[720px] bg-navy-800 overflow-hidden">
      {/* Background gradient placeholder */}
      <div className="absolute inset-0 bg-gradient-to-l from-navy-800 via-navy-700 to-cream-200/30" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gold-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-20 w-96 h-96 bg-cream-300/10 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 h-full flex items-center">
        <div className="max-w-xl">
          <span className="inline-block px-4 py-1.5 bg-gold-400/15 text-gold-400 text-xs font-medium rounded-full mb-6 border border-gold-400/20">
            مجموعة 2026 الجديدة
          </span>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-cream-50 leading-tight mb-6"
            style={{ fontFamily: "var(--font-playfair), 'Noto Serif Arabic', serif" }}
          >
            أثاث يحكي
            <br />
            <span className="text-gold-400">قصة ذوقك</span>
          </h1>
          <p className="text-cream-200/80 text-lg mb-8 leading-relaxed max-w-md">
            اكتشف مجموعتنا الفاخرة من الأثاث والديكورات المصممة بعناية لتضفي
            لمسة من الأناقة على كل زاوية في منزلك.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/category/living"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-gold-400 text-navy-800 font-semibold text-sm rounded-lg hover:bg-gold-500 transition-colors"
            >
              تسوق الآن
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-cream-200/30 text-cream-100 font-medium text-sm rounded-lg hover:bg-cream-100/10 transition-colors"
            >
              اكتشف المزيد
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
