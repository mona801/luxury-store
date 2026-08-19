export default function PaymentTrust() {
  const methods = [
    { name: "Visa", color: "bg-blue-50 text-blue-700" },
    { name: "Mastercard", color: "bg-red-50 text-red-700" },
    { name: "Mada", color: "bg-emerald-50 text-emerald-700" },
    { name: "تابي", color: "bg-purple-50 text-purple-700" },
    { name: "تمارا", color: "bg-teal-50 text-teal-700" },
    { name: "الدفع عند الاستلام", color: "bg-amber-50 text-amber-700" },
  ];

  return (
    <section className="py-14 bg-cream-50">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <h2
          className="text-xl sm:text-2xl font-bold text-navy-800 mb-2"
          style={{ fontFamily: "var(--font-playfair), 'Noto Serif Arabic', serif" }}
        >
          طرق الدفع المتاحة
        </h2>
        <p className="text-cream-500 text-sm mb-8">
          نوفر لك خيارات دفع متعددة لتجربة تسوق مريحة وآمنة
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {methods.map((m) => (
            <div
              key={m.name}
              className={`px-6 py-3 rounded-xl ${m.color} text-sm font-medium border border-cream-200/50`}
            >
              {m.name}
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs text-cream-400">
          جميع المعاملات مشفرة وآمنة بحماية SSL 256-bit
        </p>
      </div>
    </section>
  );
}
