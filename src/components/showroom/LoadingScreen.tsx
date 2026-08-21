"use client";

import { useState, useEffect } from "react";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 8 + 2;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => setReady(true), 500);
      }
      setProgress(Math.min(current, 100));
    }, 120);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-navy-900">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800 to-black" />
      <div className="relative z-10 text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-cream-50 mb-3 tracking-wide"
          style={{ fontFamily: "var(--font-playfair), 'Noto Serif Arabic', serif" }}>
          متجر الك
        </h1>
        <p className="text-cream-400 text-sm tracking-widest uppercase">Virtual Showroom</p>
      </div>
      <div className="relative z-10 w-64 sm:w-80 mb-8">
        <div className="h-px bg-cream-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-gold-400 to-gold-300 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }} />
        </div>
        <p className="text-cream-500 text-xs text-center mt-3">
          {ready ? "جاهز" : `جاري التحميل... ${Math.round(progress)}%`}
        </p>
      </div>
      {ready && (
        <button onClick={onComplete}
          className="relative z-10 px-10 py-3 border border-gold-400/40 text-gold-400 text-sm tracking-widest uppercase rounded-sm hover:bg-gold-400/10 transition-all duration-500"
          style={{ animation: "fadeIn 0.8s ease-out" }}>
          ادخل المعرض
        </button>
      )}
    </div>
  );
}
