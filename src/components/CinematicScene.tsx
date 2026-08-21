"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRevealOnScroll } from "@/lib/hooks/use-cinematic-scroll";
import type { Product } from "@/lib/data";

interface SceneProps {
  index: number;
  bgImage?: string;
  bgGradient?: string;
  children: ReactNode;
  className?: string;
  overlay?: string;
  noPadding?: boolean;
}

export function Scene({
  index,
  bgImage,
  bgGradient = "from-navy-900 via-navy-800 to-navy-900",
  children,
  className,
  overlay = "bg-navy-900/50",
  noPadding,
}: SceneProps) {
  const { ref, isVisible } = useRevealOnScroll(0.05);

  return (
    <section
      ref={ref}
      className={cn(
        "relative w-full min-h-screen overflow-hidden",
        !noPadding && "py-0",
        className
      )}
      data-scene={index}
    >
      {bgImage && (
        <div className="absolute inset-0">
          <Image
            src={bgImage}
            alt=""
            fill
            sizes="100vw"
            className={cn(
              "object-cover transition-transform duration-[2s] ease-out",
              isVisible ? "scale-100" : "scale-110"
            )}
            priority={index === 0}
          />
          <div className={cn("absolute inset-0", overlay)} />
        </div>
      )}
      {bgGradient && !bgImage && (
        <div className={cn("absolute inset-0 bg-gradient-to-b", bgGradient)} />
      )}
      <div
        className={cn(
          "relative z-10 transition-all duration-1000 ease-out",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        {children}
      </div>
    </section>
  );
}

interface CinematicProductCardProps {
  product: Product;
  direction?: "left" | "right";
  compact?: boolean;
}

export function CinematicProductCard({
  product,
  direction = "right",
  compact = false,
}: CinematicProductCardProps) {
  const { ref, isVisible } = useRevealOnScroll(0.2);

  return (
    <div
      ref={ref}
      className={cn(
        "group flex flex-col sm:flex-row items-center gap-6 sm:gap-8 transition-all duration-1000 ease-out",
        direction === "right"
          ? "sm:flex-row"
          : "sm:flex-row-reverse",
        isVisible
          ? "opacity-100 translate-x-0"
          : direction === "right"
            ? "opacity-0 translate-x-12"
            : "opacity-0 -translate-x-12"
      )}
    >
      {/* Product Image */}
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl bg-cream-100 shrink-0",
          compact ? "w-48 h-48 sm:w-56 sm:h-56" : "w-64 h-64 sm:w-80 sm:h-80"
        )}
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes={compact ? "256px" : "320px"}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute top-4 right-4 px-3 py-1 bg-gold-400/90 text-navy-800 text-xs font-semibold rounded-md backdrop-blur-sm z-10">
            {product.badge}
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="text-center sm:text-right max-w-sm">
        <p className="text-gold-400 text-xs font-medium tracking-wider uppercase mb-2">
          {product.category === "living"
            ? "غرفة المعيشة"
            : product.category === "bedroom"
              ? "غرفة النوم"
              : product.category === "dining"
                ? "المطبخ والسفرة"
                : product.category === "office"
                  ? "المكتب"
                  : "ديكور"}
        </p>
        <h3
          className="text-xl sm:text-2xl font-bold text-cream-50 mb-3"
          style={{ fontFamily: "var(--font-playfair), 'Noto Serif Arabic', serif" }}
        >
          {product.name}
        </h3>
        <p className="text-cream-300/70 text-sm leading-relaxed mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center gap-3 justify-center sm:justify-start mb-5">
          <span className="text-xl font-bold text-cream-50">
            {product.price.toLocaleString("ar-SA")} {product.currency}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-cream-400 line-through">
              {product.originalPrice.toLocaleString("ar-SA")}
            </span>
          )}
        </div>
        <Link
          href={`/product/${product.slug}`}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-cream-50/10 backdrop-blur-sm border border-cream-200/20 text-cream-50 text-sm font-medium rounded-lg hover:bg-cream-50/20 transition-all"
        >
          عرض المنتج
          <ArrowLeft size={16} />
        </Link>
      </div>
    </div>
  );
}

interface CinematicTextRevealProps {
  label?: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  align?: "center" | "left" | "right";
}

export function CinematicTextReveal({
  label,
  title,
  titleAccent,
  subtitle,
  align = "center",
}: CinematicTextRevealProps) {
  const { ref, isVisible } = useRevealOnScroll(0.3);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-1000 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
        align === "center" && "text-center",
        align === "left" && "text-right",
        align === "right" && "text-left"
      )}
    >
      {label && (
        <span className="inline-block px-4 py-1.5 bg-gold-400/15 text-gold-400 text-xs font-medium rounded-full mb-5 border border-gold-400/20 tracking-wider">
          {label}
        </span>
      )}
      <h2
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cream-50 leading-tight mb-5"
        style={{ fontFamily: "var(--font-playfair), 'Noto Serif Arabic', serif" }}
      >
        {title}
        {titleAccent && (
          <>
            <br />
            <span className="text-gold-400">{titleAccent}</span>
          </>
        )}
      </h2>
      {subtitle && (
        <p className="text-cream-200/60 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function CinematicDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-4">
      <div className="w-12 h-px bg-gold-400/30" />
      <div className="w-1.5 h-1.5 bg-gold-400/50 rotate-45" />
      <div className="w-12 h-px bg-gold-400/30" />
    </div>
  );
}
