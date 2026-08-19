"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
  name: string;
  badge?: string;
}

export default function ProductGallery({ images, name, badge }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div className="flex flex-col-reverse sm:flex-row gap-4">
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex sm:flex-col gap-2 sm:w-20 shrink-0">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-colors shrink-0 ${
                activeIndex === i
                  ? "border-gold-400"
                  : "border-cream-200 hover:border-cream-400"
              }`}
            >
              <Image
                src={img}
                alt={`${name} - صورة ${i + 1}`}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main image */}
      <div
        className="relative flex-1 aspect-square sm:aspect-[4/3] rounded-xl overflow-hidden bg-cream-100 cursor-zoom-in"
        onMouseEnter={() => setZoomed(true)}
        onMouseLeave={() => setZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={images[activeIndex]}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          style={{
            transform: zoomed ? "scale(1.5)" : "scale(1)",
            transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
            transition: "transform 0.2s ease",
          }}
        />

        {/* Badge */}
        {badge && (
          <span className="absolute top-4 right-4 px-3 py-1.5 bg-gold-400 text-navy-800 text-xs font-semibold rounded-md z-10">
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}
