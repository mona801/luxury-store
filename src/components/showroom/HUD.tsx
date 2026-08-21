"use client";

interface HUDProps {
  entered: boolean;
  onEnter: () => void;
  soundOn: boolean;
  onToggleSound: () => void;
  onBack: () => void;
}

export function HUD({ entered, onEnter, soundOn, onToggleSound, onBack }: HUDProps) {
  if (!entered) {
    return (
      <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-gradient-to-b from-navy-900/80 via-navy-800/70 to-navy-900/80"
        style={{ fontFamily: "'Noto Sans Arabic', sans-serif" }}>
        <div className="text-center mb-12">
          <h1 className="text-5xl sm:text-7xl font-bold text-cream-50 mb-4 tracking-wide"
            style={{ fontFamily: "var(--font-playfair), 'Noto Serif Arabic', serif" }}>
            متجر الك
          </h1>
          <p className="text-cream-300 text-lg tracking-wider mb-2">المعرض الافتراضي</p>
          <p className="text-cream-500 text-sm max-w-md mx-auto leading-relaxed">
            استكشف مجموعتنا الفاخرة من الأثاث في بيئة ثلاثية الأبعاد. استخدم لوحة المفاتيح أو الفأرة للتنقل.
          </p>
        </div>
        <button
          onClick={onEnter}
          className="group relative px-14 py-4 border border-gold-400/50 text-gold-400 text-base tracking-widest uppercase rounded-sm hover:bg-gold-400/10 transition-all duration-500 mb-10"
        >
          <span className="relative z-10">ادخل المعرض</span>
          <div className="absolute inset-0 bg-gradient-to-r from-gold-400/0 via-gold-400/5 to-gold-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </button>
        <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
          <div className="flex flex-col items-center gap-1">
            <kbd className="px-2 py-0.5 bg-cream-50/10 border border-cream-800/30 rounded text-cream-400 text-xs font-mono">W A S D</kbd>
            <span className="text-cream-600 text-xs">التنقل</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <kbd className="px-2 py-0.5 bg-cream-50/10 border border-cream-800/30 rounded text-cream-400 text-xs font-mono">Mouse</kbd>
            <span className="text-cream-600 text-xs">الاتجاه</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <kbd className="px-2 py-0.5 bg-cream-50/10 border border-cream-800/30 rounded text-cream-400 text-xs font-mono">Click</kbd>
            <span className="text-cream-600 text-xs">اختيار</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <kbd className="px-2 py-0.5 bg-cream-50/10 border border-cream-800/30 rounded text-cream-400 text-xs font-mono">Esc</kbd>
            <span className="text-cream-600 text-xs">إطلاق</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-40 pointer-events-none" style={{ fontFamily: "'Noto Sans Arabic', sans-serif" }}>
      <div className="flex items-center justify-between px-5 py-4">
        <button
          onClick={onBack}
          className="pointer-events-auto px-4 py-2 bg-navy-800/80 backdrop-blur-sm text-cream-50 text-sm rounded border border-cream-800/20 hover:bg-navy-700/80 transition-colors"
        >
          ← العودة
        </button>
        <div className="text-center">
          <h1 className="text-cream-50 font-bold text-lg tracking-wide"
            style={{ fontFamily: "var(--font-playfair), 'Noto Serif Arabic', serif" }}>
            متجر الك
          </h1>
          <p className="text-cream-400 text-xs tracking-wider">المعرض الافتراضي</p>
        </div>
        <button
          onClick={onToggleSound}
          className="pointer-events-auto px-4 py-2 bg-navy-800/80 backdrop-blur-sm text-cream-50 text-sm rounded border border-cream-800/20 hover:bg-navy-700/80 transition-colors"
        >
          {soundOn ? "🔊" : "🔇"}
        </button>
      </div>

      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 pointer-events-none">
        <div className="px-5 py-2 bg-navy-800/60 backdrop-blur-sm rounded-full border border-cream-800/10">
          <p className="text-cream-400 text-xs text-center tracking-wider">
            WASD للتنقل • اضغط على الأثاث لعرض التفاصيل • Esc للإطلاق
          </p>
        </div>
      </div>
    </div>
  );
}
