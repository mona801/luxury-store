"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { products, categories } from "@/lib/data";
import ProductGallery from "@/components/ProductGallery";
import ProductInfo from "@/components/ProductInfo";
import ProductTabs from "@/components/ProductTabs";
import RelatedProducts from "@/components/RelatedProducts";

export default function ProductPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-navy-800 mb-3">المنتج غير موجود</h1>
          <Link href="/" className="text-sm text-gold-500 hover:text-gold-600 transition-colors">
            العودة للرئيسية
          </Link>
        </div>
      </div>
    );
  }

  const category = categories.find((c) => c.id === product.category);

  return (
    <div className="bg-cream-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-cream-200">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center gap-2 text-xs text-cream-500 flex-wrap">
            <Link href="/" className="hover:text-gold-500 transition-colors">
              الرئيسية
            </Link>
            <ChevronLeft size={12} />
            <Link
              href={`/category/${product.category}`}
              className="hover:text-gold-500 transition-colors"
            >
              {category?.name ?? product.category}
            </Link>
            <ChevronLeft size={12} />
            <span className="text-navy-700 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product section */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Gallery */}
          <ProductGallery images={product.images} name={product.name} badge={product.badge} />

          {/* Info */}
          <ProductInfo product={product} />
        </div>

        {/* Tabs */}
        <div className="mt-12 sm:mt-16">
          <ProductTabs product={product} />
        </div>
      </div>

      {/* Related products */}
      <RelatedProducts currentId={product.id} />
    </div>
  );
}
