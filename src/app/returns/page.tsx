import Link from "next/link";
import { ChevronLeft, RotateCcw, Clock, AlertTriangle, CheckCircle } from "lucide-react";

export default function ReturnsPage() {
  return (
    <div className="bg-cream-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-cream-200">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center gap-2 text-xs text-cream-500">
            <Link href="/" className="hover:text-gold-500 transition-colors">الرئيسية</Link>
            <ChevronLeft size={12} />
            <span className="text-navy-700 font-medium">سياسة الإرجاع</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:py-16">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gold-400/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <RotateCcw size={28} className="text-gold-500" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-navy-800 mb-3" style={{ fontFamily: "var(--font-playfair), 'Noto Serif Arabic', serif" }}>
            سياسة الإرجاع والاستبدال
          </h1>
          <p className="text-cream-500 text-sm max-w-lg mx-auto">
            رضاك أولويتنا. إذا لم تكن راضيًا عن منتجك، نوفر لك خيارات مرنة.
          </p>
        </div>

        <div className="space-y-6">
          {/* Period */}
          <div className="bg-white rounded-xl border border-cream-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gold-400/10 rounded-lg flex items-center justify-center">
                <Clock size={20} className="text-gold-500" />
              </div>
              <h2 className="text-base font-semibold text-navy-800">فترة الإرجاع</h2>
            </div>
            <p className="text-sm text-navy-600 leading-relaxed">
              يمكنك إرجاع المنتج خلال <strong className="text-navy-800">7 أيام</strong> من تاريخ استلام الطلب.
              يجب أن يكون المنتج في حالته الأصلية، غير مستخدم، وفي علبه الأصلي مع جميع الملحقات.
            </p>
          </div>

          {/* Eligible */}
          <div className="bg-white rounded-xl border border-cream-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <CheckCircle size={20} className="text-emerald-600" />
              </div>
              <h2 className="text-base font-semibold text-navy-800">المنتجات المؤهلة للإرجاع</h2>
            </div>
            <ul className="space-y-2 text-sm text-navy-600">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 shrink-0" />
                المنتجات غير المستخدمة وفي حالتها الأصلية
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 shrink-0" />
                المنتجات التي بها عيوب في التصنيع
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 shrink-0" />
                المنتجات التي لا تطابق الوصف أو الصورة
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 shrink-0" />
                الأضرار أثناء الشحن (يُرجى توثيق الأضرار بالصور)
              </li>
            </ul>
          </div>

          {/* Not eligible */}
          <div className="bg-white rounded-xl border border-cream-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                <AlertTriangle size={20} className="text-red-500" />
              </div>
              <h2 className="text-base font-semibold text-navy-800">المنتجات غير المؤهلة</h2>
            </div>
            <ul className="space-y-2 text-sm text-navy-600">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 shrink-0" />
                المنتجات المستخدمة أو بها آثار استخدام
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 shrink-0" />
                المنتجات المخصصة أو المُصنّعة حسب الطلب
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 shrink-0" />
                الإكسسوارات الصغيرة والمنتجات المخفضة (إلا إذا بها عيب)
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 shrink-0" />
                المنتجات التي مرّ عليها أكثر من 7 أيام من تاريخ الاستلام
              </li>
            </ul>
          </div>

          {/* Process */}
          <div className="bg-white rounded-xl border border-cream-200 p-6">
            <h2 className="text-base font-semibold text-navy-800 mb-4">خطوات الإرجاع</h2>
            <div className="space-y-4">
              {[
                { step: "1", title: "تواصل معنا", desc: "أرسل طلب الإرجاع عبر واتساب أو صفحة التواصل مع رقم الطلب." },
                { step: "2", title: "توثيق المنتج", desc: "أرسل صورًا للمنتج واصِف الحالة. سنراجع طلبك خلال 24 ساعة." },
                { step: "3", title: "استلام المنتج", desc: "سنرسل مندوب الشحن لاستلام المنتج من عنوانك (مجانًا)." },
                { step: "4", title: "الاسترداد", desc: "يُسترد المبلغ خلال 5-7 أيام عمل بعد استلام وفحص المنتج." },
              ].map((s) => (
                <div key={s.step} className="flex gap-4">
                  <div className="w-8 h-8 bg-navy-800 text-cream-50 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                    {s.step}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-navy-800">{s.title}</h4>
                    <p className="text-xs text-cream-500 mt-0.5">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="bg-navy-800 rounded-xl p-6 text-center">
            <h3 className="text-base font-semibold text-cream-50 mb-2">need مساعدة؟</h3>
            <p className="text-sm text-cream-300 mb-4">فريق خدمة العملاء جاهز لمساعدتك في أي وقت.</p>
            <Link href="/contact" className="inline-flex items-center justify-center px-6 py-2.5 bg-gold-400 text-navy-800 text-sm font-semibold rounded-lg hover:bg-gold-500 transition-colors">
              تواصل معنا
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
