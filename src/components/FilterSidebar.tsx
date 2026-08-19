"use client";

import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterState {
  colors: string[];
  priceRange: [number, number];
  material: string;
  style: string;
}

interface FilterSidebarProps {
  onFilterChange: (filters: FilterState) => void;
}

const colorOptions = [
  { name: "بيج", value: "#d4bfa0" },
  { name: "كحلي", value: "#273f63" },
  { name: "أبيض", value: "#ffffff" },
  { name: "أسود", value: "#1a1a1a" },
  { name: "رمادي", value: "#9ca3af" },
  { name: "بني", value: "#8B7355" },
  { name: "ذهبي", value: "#d4af37" },
];

const materialOptions = [
  "قماش",
  "خشب طبيعي",
  "رخام",
  "معدن",
  "جلد",
  "مخمل",
];

const styleOptions = ["كلاسيكي", "مودرن", "مينيمال", "عصري", "فخم"];

export default function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const [filters, setFilters] = useState<FilterState>({
    colors: [],
    priceRange: [0, 20000],
    material: "",
    style: "",
  });
  const [openSection, setOpenSection] = useState<string | null>("color");

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const toggleColor = (color: string) => {
    const updated = filters.colors.includes(color)
      ? filters.colors.filter((c) => c !== color)
      : [...filters.colors, color];
    const newFilters = { ...filters, colors: updated };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const cleared: FilterState = {
      colors: [],
      priceRange: [0, 20000],
      material: "",
      style: "",
    };
    setFilters(cleared);
    onFilterChange(cleared);
  };

  const hasActiveFilters =
    filters.colors.length > 0 ||
    filters.material !== "" ||
    filters.style !== "" ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 20000;

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="sticky top-36">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-semibold text-navy-800">الفلاتر</h3>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-xs text-gold-500 hover:text-gold-600 transition-colors"
            >
              مسح الكل
            </button>
          )}
        </div>

        {/* Color filter */}
        <div className="border-b border-cream-200 pb-4 mb-4">
          <button
            onClick={() => toggleSection("color")}
            className="w-full flex items-center justify-between text-sm font-medium text-navy-700 mb-3"
          >
            اللون
            <ChevronDown
              size={16}
              className={cn(
                "transition-transform",
                openSection === "color" && "rotate-180"
              )}
            />
          </button>
          {openSection === "color" && (
            <div className="flex flex-wrap gap-2">
              {colorOptions.map((c) => (
                <button
                  key={c.value}
                  onClick={() => toggleColor(c.value)}
                  className={cn(
                    "w-8 h-8 rounded-full border-2 transition-all",
                    filters.colors.includes(c.value)
                      ? "border-gold-400 ring-2 ring-gold-400/30"
                      : "border-cream-200 hover:border-cream-400"
                  )}
                  style={{ backgroundColor: c.value }}
                  title={c.name}
                />
              ))}
            </div>
          )}
        </div>

        {/* Price filter */}
        <div className="border-b border-cream-200 pb-4 mb-4">
          <button
            onClick={() => toggleSection("price")}
            className="w-full flex items-center justify-between text-sm font-medium text-navy-700 mb-3"
          >
            نطاق السعر
            <ChevronDown
              size={16}
              className={cn(
                "transition-transform",
                openSection === "price" && "rotate-180"
              )}
            />
          </button>
          {openSection === "price" && (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <label className="text-[11px] text-cream-500 mb-1 block">من</label>
                  <input
                    type="number"
                    value={filters.priceRange[0]}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      const newFilters = {
                        ...filters,
                        priceRange: [val, filters.priceRange[1]] as [number, number],
                      };
                      setFilters(newFilters);
                      onFilterChange(newFilters);
                    }}
                    className="w-full h-9 px-3 border border-cream-200 rounded-lg text-xs focus:outline-none focus:border-gold-400 bg-cream-50"
                    placeholder="0"
                  />
                </div>
                <span className="text-cream-400 mt-4">—</span>
                <div className="flex-1">
                  <label className="text-[11px] text-cream-500 mb-1 block">إلى</label>
                  <input
                    type="number"
                    value={filters.priceRange[1]}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      const newFilters = {
                        ...filters,
                        priceRange: [filters.priceRange[0], val] as [number, number],
                      };
                      setFilters(newFilters);
                      onFilterChange(newFilters);
                    }}
                    className="w-full h-9 px-3 border border-cream-200 rounded-lg text-xs focus:outline-none focus:border-gold-400 bg-cream-50"
                    placeholder="20000"
                  />
                </div>
              </div>
              <input
                type="range"
                min={0}
                max={20000}
                step={500}
                value={filters.priceRange[1]}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  const newFilters = {
                    ...filters,
                    priceRange: [filters.priceRange[0], val] as [number, number],
                  };
                  setFilters(newFilters);
                  onFilterChange(newFilters);
                }}
                className="w-full accent-gold-400"
              />
            </div>
          )}
        </div>

        {/* Material filter */}
        <div className="border-b border-cream-200 pb-4 mb-4">
          <button
            onClick={() => toggleSection("material")}
            className="w-full flex items-center justify-between text-sm font-medium text-navy-700 mb-3"
          >
            الخامة
            <ChevronDown
              size={16}
              className={cn(
                "transition-transform",
                openSection === "material" && "rotate-180"
              )}
            />
          </button>
          {openSection === "material" && (
            <div className="space-y-1.5">
              {materialOptions.map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    const val = filters.material === m ? "" : m;
                    const newFilters = { ...filters, material: val };
                    setFilters(newFilters);
                    onFilterChange(newFilters);
                  }}
                  className={cn(
                    "block w-full text-right px-3 py-2 rounded-lg text-xs transition-colors",
                    filters.material === m
                      ? "bg-gold-400/10 text-gold-600 font-medium"
                      : "text-navy-600 hover:bg-cream-100"
                  )}
                >
                  {m}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Style filter */}
        <div className="pb-4">
          <button
            onClick={() => toggleSection("style")}
            className="w-full flex items-center justify-between text-sm font-medium text-navy-700 mb-3"
          >
            الأسلوب
            <ChevronDown
              size={16}
              className={cn(
                "transition-transform",
                openSection === "style" && "rotate-180"
              )}
            />
          </button>
          {openSection === "style" && (
            <div className="space-y-1.5">
              {styleOptions.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    const val = filters.style === s ? "" : s;
                    const newFilters = { ...filters, style: val };
                    setFilters(newFilters);
                    onFilterChange(newFilters);
                  }}
                  className={cn(
                    "block w-full text-right px-3 py-2 rounded-lg text-xs transition-colors",
                    filters.style === s
                      ? "bg-gold-400/10 text-gold-600 font-medium"
                      : "text-navy-600 hover:bg-cream-100"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
