"use client";

import { X } from "lucide-react";
import FilterSidebar from "./FilterSidebar";

interface MobileFilterDrawerProps {
  open: boolean;
  onClose: () => void;
  onFilterChange: (filters: {
    colors: string[];
    priceRange: [number, number];
    material: string;
    style: string;
  }) => void;
}

export default function MobileFilterDrawer({
  open,
  onClose,
  onFilterChange,
}: MobileFilterDrawerProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] lg:hidden">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute top-0 right-0 h-full w-80 bg-white shadow-xl overflow-y-auto animate-in slide-in-from-right">
        <div className="flex items-center justify-between p-4 border-b border-cream-200">
          <h3 className="text-sm font-semibold text-navy-800">الفلاتر</h3>
          <button onClick={onClose}>
            <X size={20} className="text-navy-700" />
          </button>
        </div>
        <div className="p-4">
          <FilterSidebar onFilterChange={onFilterChange} />
        </div>
      </div>
    </div>
  );
}
