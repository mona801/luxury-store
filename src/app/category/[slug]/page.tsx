"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { products, categories } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import FilterSidebar from "@/components/FilterSidebar";
import MobileFilterDrawer from "@/components/MobileFilterDrawer";
import SortBar from "@/components/SortBar";

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const category = categories.find((c) => c.slug === slug);
  const categoryProducts = category
    ? products.filter((p) => p.category === category.id)
    : products;

  const [sort, setSort] = useState("relevant");
  const [view, setView] = useState<"grid" | "large">("grid");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    colors: [] as string[],
    priceRange: [0, 20000] as [number, number],
    material: "",
    style: "",
  });

  const filteredProducts = useMemo(() => {
    let result = [...categoryProducts];

    // Filter by colors
    if (filters.colors.length > 0) {
      result = result.filter((p) =>
        p.colors.some((c) => filters.colors.includes(c.value))
      );
    }

    // Filter by price
    result = result.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Sort
    switch (sort) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => Number(b.id) - Number(a.id));
        break;
    }

    return result;
  }, [categoryProducts, filters, sort]);

  return (
    <div className="bg-cream-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-cream-200">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center gap-2 text-xs text-cream-500">
            <Link href="/" className="hover:text-gold-500 transition-colors">
              الرئيسية
            </Link>
            <ChevronLeft size={12} />
            <span className="text-navy-700 font-medium">
              {category?.name ?? "جميع المنتجات"}
            </span>
          </nav>
        </div>
      </div>

      {/* Page header */}
      <div className="mx-auto max-w-7xl px-4 pt-8 pb-4">
        <h1
          className="text-2xl sm:text-3xl font-bold text-navy-800 mb-2"
          style={{ fontFamily: "var(--font-playfair), 'Noto Serif Arabic', serif" }}
        >
          {category?.name ?? "جميع المنتجات"}
        </h1>
        <p className="text-cream-500 text-sm">
          {category
            ? `${filteredProducts.length} منتج متاح`
            : "تصفح مجموعتنا الكاملة"}
        </p>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 pb-16">
        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar onFilterChange={setFilters} />
          </div>

          {/* Main */}
          <div className="flex-1 min-w-0">
            <SortBar
              sort={sort}
              onSortChange={setSort}
              totalProducts={filteredProducts.length}
              view={view}
              onViewChange={setView}
              onMobileFilterOpen={() => setMobileFilterOpen(true)}
            />

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-cream-400 text-sm mb-4">
                  لا توجد منتجات تطابق الفلاتر المحددة
                </p>
                <button
                  onClick={() =>
                    setFilters({
                      colors: [],
                      priceRange: [0, 20000],
                      material: "",
                      style: "",
                    })
                  }
                  className="text-sm font-medium text-gold-500 hover:text-gold-600 transition-colors"
                >
                  مسح الفلاتر
                </button>
              </div>
            ) : (
              <div
                className={
                  view === "grid"
                    ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5"
                    : "grid grid-cols-1 sm:grid-cols-2 gap-5"
                }
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {filteredProducts.length > 0 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button className="w-10 h-10 rounded-lg border border-cream-200 flex items-center justify-center text-sm font-medium text-navy-700 hover:border-gold-400 transition-colors">
                  1
                </button>
                <button className="w-10 h-10 rounded-lg border border-cream-200 flex items-center justify-center text-sm font-medium text-cream-500 hover:border-gold-400 hover:text-navy-700 transition-colors">
                  2
                </button>
                <button className="w-10 h-10 rounded-lg border border-cream-200 flex items-center justify-center text-sm font-medium text-cream-500 hover:border-gold-400 hover:text-navy-700 transition-colors">
                  3
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <MobileFilterDrawer
        open={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        onFilterChange={(f) => setFilters(f)}
      />
    </div>
  );
}
