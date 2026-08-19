"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/data";

interface ProductTabsProps {
  product: Product;
}

const tabs = [
  { id: "description", label: "الوصف" },
  { id: "specs", label: "المواصفات" },
  { id: "shipping", label: "الشحن والإرجاع" },
];

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div>
      {/* Tab headers */}
      <div className="flex border-b border-cream-200 gap-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-5 py-3 text-sm font-medium transition-colors relative",
              activeTab === tab.id
                ? "text-gold-500"
                : "text-cream-500 hover:text-navy-700"
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 right-0 left-0 h-0.5 bg-gold-400" />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="py-6">
        {activeTab === "description" && (
          <div className="text-sm text-navy-700 leading-relaxed max-w-2xl">
            <p>{product.description ?? "لا يوجد وصف متوفر لهذا المنتج حاليًا."}</p>
          </div>
        )}

        {activeTab === "specs" && (
          <div className="max-w-2xl">
            {product.specs && product.specs.length > 0 ? (
              <table className="w-full">
                <tbody>
                  {product.specs.map((spec, i) => (
                    <tr
                      key={spec.label}
                      className={cn(
                        i % 2 === 0 ? "bg-cream-50" : "bg-white"
                      )}
                    >
                      <td className="px-4 py-3 text-sm font-medium text-navy-700 w-1/3">
                        {spec.label}
                      </td>
                      <td className="px-4 py-3 text-sm text-navy-600">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-sm text-cream-500">لا توجد مواصفات متوفرة.</p>
            )}
          </div>
        )}

        {activeTab === "shipping" && (
          <div className="text-sm text-navy-700 leading-relaxed max-w-2xl space-y-4">
            <div>
              <h4 className="font-semibold text-navy-800 mb-2">الشحن والتوصيل</h4>
              <ul className="space-y-1.5 list-disc list-inside text-navy-600">
                <li>توصيل مجاني لجميع مناطق المملكة العربية السعودية</li>
                <li>المدن الرئيسية (الرياض، جدة، مكة، المدينة): 3-5 أيام عمل</li>
                <li>المناطق الأخرى: 5-10 أيام عمل</li>
                <li>الدفع عند الاستلام متاح لجميع المناطق</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-navy-800 mb-2">سياسة الإرجاع</h4>
              <ul className="space-y-1.5 list-disc list-inside text-navy-600">
                <li>يمكنك إرجاع المنتج خلال 7 أيام من تاريخ الاستلام</li>
                <li>يجب أن يكون المنتج في حالته الأصلية بدون استخدام</li>
                <li>الإرجاع مجاني عبر شركة الشحن المعتمدة</li>
                <li>يُسترد المبلغ خلال 5-7 أيام عمل بعد استلام المنتج</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
