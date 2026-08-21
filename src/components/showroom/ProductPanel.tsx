"use client";

import { useEffect, useState } from "react";
import { products } from "@/lib/data";

interface ProductPanelProps {
  productId: string | null;
  onClose: () => void;
}

export function ProductPanel({ productId, onClose }: ProductPanelProps) {
  const [visible, setVisible] = useState(false);
  const product = products.find((p) => p.id === productId);

  useEffect(() => {
    if (productId) {
      setVisible(true);
    } else {
      const t = setTimeout(() => setVisible(false), 400);
      return () => clearTimeout(t);
    }
  }, [productId]);

  if (!visible && !productId) return null;

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full sm:w-96 z-50 bg-navy-800/95 backdrop-blur-md border-l border-cream-800/30 transition-transform duration-500 ${
        productId ? "translate-x-0" : "translate-x-full"
      }`}
      style={{ fontFamily: "'Noto Sans Arabic', sans-serif" }}
    >
      <button
        onClick={onClose}
        className="absolute top-5 left-5 w-10 h-10 flex items-center justify-center rounded-full bg-cream-50/10 text-cream-50 hover:bg-cream-50/20 transition-colors text-xl"
      >
        ✕
      </button>

      {product && (
        <div className="h-full flex flex-col pt-20 px-6 pb-6 overflow-y-auto">
          <div className="mb-6 rounded-lg overflow-hidden bg-cream-50/5 aspect-square flex items-center justify-center">
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cream-700/20 to-cream-800/10">
              <span className="text-6xl">🪑</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-cream-50 mb-2">{product.name}</h2>
          <p className="text-cream-400 text-sm mb-4">{product.category} {product.subcategory ? `/ ${product.subcategory}` : ""}</p>

          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-2xl font-bold text-gold-400">{product.price.toLocaleString("ar-SA")}</span>
            {product.originalPrice && (
              <span className="text-sm text-cream-500 line-through">{product.originalPrice.toLocaleString("ar-SA")}</span>
            )}
            {product.originalPrice && (
              <span className="text-xs bg-olive-600/80 text-cream-50 px-2 py-0.5 rounded-full">
                وفّر {(product.originalPrice - product.price).toLocaleString("ar-SA")}
              </span>
            )}
          </div>

          {product.description && (
            <p className="text-cream-300 text-sm leading-relaxed mb-6">{product.description}</p>
          )}

          {product.colors.length > 0 && (
            <div className="mb-6">
              <p className="text-cream-400 text-xs uppercase tracking-wider mb-2">الألوان</p>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <div key={c.value} className="w-8 h-8 rounded-full border border-cream-800/40" style={{ backgroundColor: c.value }} />
                ))}
              </div>
            </div>
          )}

          {product.specs && product.specs.length > 0 && (
            <div className="mb-6 p-4 rounded-lg bg-navy-700/50">
              <p className="text-cream-400 text-xs uppercase tracking-wider mb-2">المواصفات</p>
              <div className="space-y-1.5 text-sm">
                {product.specs.map((spec) => (
                  <p key={spec.label} className="text-cream-200">{spec.label}: <span className="text-cream-400">{spec.value}</span></p>
                ))}
              </div>
            </div>
          )}

          {product.installment && product.installment.length > 0 && (
            <div className="mb-6 p-4 rounded-lg bg-navy-700/50">
              <p className="text-cream-400 text-xs uppercase tracking-wider mb-2">الدفع على أقساط</p>
              <div className="space-y-1.5 text-sm">
                {product.installment.map((inst) => (
                  <p key={inst.provider} className="text-cream-200">{inst.provider}: <span className="text-cream-400">{inst.monthly.toLocaleString("ar-SA")} ر.س / شهر لمدة {inst.months} أشهر</span></p>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-auto">
            <button
              className="flex-1 py-3 bg-gold-400 text-navy-800 font-bold rounded-sm hover:bg-gold-300 transition-colors text-sm"
              onClick={() => {
                window.location.href = `/product/${product.slug}`;
              }}
            >
              اعرض في الموقع
            </button>
            <button
              className="px-6 py-3 border border-cream-800/40 text-cream-200 rounded-sm hover:border-gold-400 hover:text-gold-400 transition-colors text-sm"
              onClick={onClose}
            >
              إغلاق
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
