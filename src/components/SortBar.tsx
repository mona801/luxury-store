"use client";

import { SlidersHorizontal, Grid2x2, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";

interface SortBarProps {
  sort: string;
  onSortChange: (sort: string) => void;
  totalProducts: number;
  view: "grid" | "large";
  onViewChange: (view: "grid" | "large") => void;
  onMobileFilterOpen: () => void;
}

const sortOptions = [
  { value: "relevant", label: "الأكثر صلة" },
  { value: "price-low", label: "الأقل سعرًا" },
  { value: "price-high", label: "الأعلى سعرًا" },
  { value: "newest", label: "الأحدث" },
];

export default function SortBar({
  sort,
  onSortChange,
  totalProducts,
  view,
  onViewChange,
  onMobileFilterOpen,
}: SortBarProps) {
  return (
    <div className="flex items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-4">
        {/* Mobile filter button */}
        <button
          onClick={onMobileFilterOpen}
          className="lg:hidden flex items-center gap-2 px-4 py-2 border border-cream-200 rounded-lg text-xs font-medium text-navy-700 hover:border-gold-400 transition-colors"
        >
          <SlidersHorizontal size={15} />
          الفلاتر
        </button>

        <p className="text-sm text-cream-500">
          <span className="font-medium text-navy-800">{totalProducts}</span> منتج
        </p>
      </div>

      <div className="flex items-center gap-4">
        {/* Sort dropdown */}
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="h-9 px-3 border border-cream-200 rounded-lg text-xs text-navy-700 bg-white focus:outline-none focus:border-gold-400 cursor-pointer"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* View toggle */}
        <div className="hidden sm:flex items-center gap-1 border border-cream-200 rounded-lg p-0.5">
          <button
            onClick={() => onViewChange("grid")}
            className={cn(
              "w-8 h-8 rounded-md flex items-center justify-center transition-colors",
              view === "grid"
                ? "bg-navy-800 text-cream-50"
                : "text-cream-500 hover:text-navy-700"
            )}
            aria-label="شبكة عادية"
          >
            <Grid2x2 size={16} />
          </button>
          <button
            onClick={() => onViewChange("large")}
            className={cn(
              "w-8 h-8 rounded-md flex items-center justify-center transition-colors",
              view === "large"
                ? "bg-navy-800 text-cream-50"
                : "text-cream-500 hover:text-navy-700"
            )}
            aria-label="شبكة كبيرة"
          >
            <LayoutGrid size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
