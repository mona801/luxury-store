"use client";

import { cn } from "@/lib/utils";

const sceneLabels = [
  "المعيشة",
  "التفاصيل",
  "غرفة النوم",
  "المطبخ",
  "المجلس",
  "المجموعة",
];

export default function SceneIndicator({
  activeScene,
  totalScenes,
}: {
  activeScene: number;
  totalScenes: number;
}) {
  return (
    <nav
      className="fixed left-4 sm:left-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3"
      aria-label="المشاهد"
    >
      {Array.from({ length: totalScenes }).map((_, i) => (
        <div key={i} className="flex items-center gap-2 group">
          <span
            className={cn(
              "text-[10px] font-medium transition-all duration-500 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0",
              activeScene === i ? "text-gold-400 opacity-100 translate-x-0" : "text-cream-400"
            )}
          >
            {sceneLabels[i] ?? ""}
          </span>
          <div
            className={cn(
              "rounded-full transition-all duration-500",
              activeScene === i
                ? "w-2 h-2 bg-gold-400"
                : "w-1.5 h-1.5 bg-cream-400/40 group-hover:bg-cream-400/70"
            )}
          />
        </div>
      ))}
    </nav>
  );
}
