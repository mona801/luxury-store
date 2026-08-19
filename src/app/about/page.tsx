import Link from "next/link";
import { ChevronLeft, Truck, Shield, Heart, Award } from "lucide-react";

const values = [
  { icon: Heart, title: "الجودة أولاً", desc: "نختار كل قطعة بعناية فائقة من أفضل المصنعين حول العالم، لضمان حصولك على منتج يدوم طويلاً." },
  { icon: Award, title: "تصاميم حصرية", desc: "فريق تصميمنا ي работ على إبداع تشكيلات فريدة تجمع بين الأناقة والراحة." },
  { icon: Shield, title: "ضمان شامل", desc: "نقدم ضمانًا شاملًا على جميع منتجاتنا لراحة بالك وثقتنا في جودة ما نقدمه." },
  { icon: Truck, title: "توصيل متميز", desc: "خدمة توصيل احترافية لجميع مناطق المملكة مع تركيب المنتجات عند الحاجة." },
];

export default function AboutPage() {
  return (
    <div className="bg-cream-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-cream-200">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center gap-2 text-xs text-cream-500">
            <Link href="/" className="hover:text-gold-500 transition-colors">الرئيسية</Link>
            <ChevronLeft size={12} />
            <span className="text-navy-700 font-medium">من نحن</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 bg-gold-400/15 text-gold-500 text-xs font-medium rounded-full mb-6 border border-gold-400/20">
              قصتنا
            </span>
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-800 mb-6"
              style={{ fontFamily: "var(--font-playfair), 'Noto Serif Arabic', serif" }}
            >
              نصنع مساحات
              <br />
              <span className="text-gold-500">تلهمنا بالحياة</span>
            </h1>
            <p className="text-cream-500 text-base sm:text-lg leading-relaxed">
              تأسس متجر الك بهدف đơnير: تقديم الأثاث والديكورات الراقية بأسعار عادلة
              للسوق السعودي. نؤمن بأن كل منزل يستحق لمسة من الأناقة، ونعمل بشغف
              لتحويل رؤيتك إلى واقع يتجاوز توقعاتك.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-y border-cream-200">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { num: "+500", label: "منتج متاح" },
              { num: "+50,000", label: "عميل سعيد" },
              { num: "14", label: "منطقة توصيل" },
              { num: "+5", label: "سنوات خبرة" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl sm:text-3xl font-bold text-gold-500 mb-1">{s.num}</p>
                <p className="text-sm text-cream-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy-800 text-center mb-12" style={{ fontFamily: "var(--font-playfair), 'Noto Serif Arabic', serif" }}>
            قيمنا ورؤيتنا
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white p-6 rounded-xl border border-cream-200 text-center">
                <div className="w-14 h-14 bg-gold-400/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <v.icon size={26} className="text-gold-500" />
                </div>
                <h3 className="text-base font-semibold text-navy-800 mb-2">{v.title}</h3>
                <p className="text-sm text-cream-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-navy-800">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-cream-50 mb-4" style={{ fontFamily: "var(--font-playfair), 'Noto Serif Arabic', serif" }}>
            جاهز لتجميل منزلك؟
          </h2>
          <p className="text-cream-300 mb-8 max-w-lg mx-auto">
            اكتشف مجموعتنا الفاخرة وابدأ رحلتك نحو منزل أحلامك.
          </p>
          <Link href="/category/living" className="inline-flex items-center justify-center px-8 py-3.5 bg-gold-400 text-navy-800 font-semibold text-sm rounded-lg hover:bg-gold-500 transition-colors">
            تسوق الآن
          </Link>
        </div>
      </section>
    </div>
  );
}
