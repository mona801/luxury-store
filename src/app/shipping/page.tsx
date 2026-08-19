import Link from "next/link";
import { ChevronLeft, Truck, Clock, CheckCircle, MapPin } from "lucide-react";

const shippingZones = [
  { zone: "الرياض", cities: "الرياض، الخرج، الدوادمي", time: "2-3 أيام عمل", cost: "مجاني" },
  { zone: "جدة", cities: "جدة", time: "1-2 أيام عمل", cost: "مجاني" },
  { zone: "مكة المكرمة", cities: "مكة، الطائف", time: "2-3 أيام عمل", cost: "مجاني" },
  { zone: "المدينة المنورة", cities: "المدينة، ينبع", time: "3-4 أيام عمل", cost: "مجاني" },
  { zone: "المنطقة الشرقية", cities: "الدمام، الخبر، الأحساء، الجبيل", time: "3-4 أيام عمل", cost: "مجاني" },
  { zone: "عسير", cities: "أبها، خميس مشيط، بيشة", time: "4-5 أيام عمل", cost: "مجاني" },
  { zone: "القصيم", cities: "بريدة، عنيزة، الرس", time: "4-5 أيام عمل", cost: "مجاني" },
  { zone: "تبوك", cities: "تبوك، ضباء", time: "5-6 أيام عمل", cost: "مجاني" },
  { zone: "حائل", cities: "حائل، بقعاء", time: "5-6 أيام عمل", cost: "مجاني" },
  { zone: "جازان", cities: "صبيها، أبو عريش", time: "5-7 أيام عمل", cost: "مجاني" },
  { zone: "نجران", cities: "نجران، صبيا", time: "5-7 أيام عمل", cost: "مجاني" },
  { zone: "الباحة", cities: "الباحة، بلجرشي", time: "6-7 أيام عمل", cost: "مجاني" },
  { zone: "الجوف", cities: "سكاكا", time: "6-8 أيام عمل", cost: "مجاني" },
  { zone: "الحدود الشمالية", cities: "عرعر، رفحاء", time: "7-9 أيام عمل", cost: "مجاني" },
];

export default function ShippingPage() {
  return (
    <div className="bg-cream-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-cream-200">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center gap-2 text-xs text-cream-500">
            <Link href="/" className="hover:text-gold-500 transition-colors">الرئيسية</Link>
            <ChevronLeft size={12} />
            <span className="text-navy-700 font-medium">الشحن والتوصيل</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:py-16">
        <div className="text-center mb-12">
          <h1 className="text-2xl sm:text-3xl font-bold text-navy-800 mb-3" style={{ fontFamily: "var(--font-playfair), 'Noto Serif Arabic', serif" }}>
            الشحن والتوصيل
          </h1>
          <p className="text-cream-500 text-sm max-w-lg mx-auto">
            نوفر توصيلًا مجانيًا لجميع مناطق المملكة العربية السعودية
          </p>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
          {[
            { icon: Truck, title: "توصيل مجاني", desc: "لجميع المناطق بدون حد أدنى للطلب" },
            { icon: Clock, title: "توصيل سريع", desc: "1-9 أيام حسب المنطقة" },
            { icon: CheckCircle, title: "تتبع الطلب", desc: "رابط تتبع يُرسل عبر الواتساب" },
          ].map((h) => (
            <div key={h.title} className="bg-white p-6 rounded-xl border border-cream-200 text-center">
              <div className="w-12 h-12 bg-gold-400/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <h.icon size={22} className="text-gold-500" />
              </div>
              <h3 className="text-sm font-semibold text-navy-800 mb-1">{h.title}</h3>
              <p className="text-xs text-cream-500">{h.desc}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-cream-200 overflow-hidden mb-10">
          <div className="px-6 py-4 border-b border-cream-200">
            <h2 className="text-base font-semibold text-navy-800">مدة التوصيل حسب المنطقة</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-cream-50">
                  <th className="px-5 py-3 text-right text-xs font-semibold text-navy-700">المنطقة</th>
                  <th className="px-5 py-3 text-right text-xs font-semibold text-navy-700">المدن الرئيسية</th>
                  <th className="px-5 py-3 text-right text-xs font-semibold text-navy-700">المدة التقديرية</th>
                  <th className="px-5 py-3 text-right text-xs font-semibold text-navy-700">التكلفة</th>
                </tr>
              </thead>
              <tbody>
                {shippingZones.map((z, i) => (
                  <tr key={z.zone} className={i % 2 === 0 ? "bg-white" : "bg-cream-50/50"}>
                    <td className="px-5 py-3 text-navy-800 font-medium">{z.zone}</td>
                    <td className="px-5 py-3 text-navy-600">{z.cities}</td>
                    <td className="px-5 py-3 text-navy-600">{z.time}</td>
                    <td className="px-5 py-3 text-emerald-600 font-medium">{z.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-white rounded-xl border border-cream-200 p-6">
          <h3 className="text-sm font-semibold text-navy-800 mb-3">ملاحظات هامة</h3>
          <ul className="space-y-2 text-sm text-navy-600">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-gold-400 rounded-full mt-1.5 shrink-0" />
              جميع الطلبات تُشحن خلال 24 ساعة من تأكيد الطلب (أيام العمل)
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-gold-400 rounded-full mt-1.5 shrink-0" />
              سيتم التواصل معك قبل التوصيل لتثبيت الموعد
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-gold-400 rounded-full mt-1.5 shrink-0" />
              تركيب المنتجات الكبيرة متاح عند الحاجة (قد يكون مجانيًا أو بتكلفة إضافية حسب المنتج)
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-gold-400 rounded-full mt-1.5 shrink-0" />
              يُرجى التأكد من صحة البيانات عند الطلب لتجنب أي تأخير
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
