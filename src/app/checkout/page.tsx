"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import Image from "next/image";
import Link from "next/link";
import { Check, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { REGIONS, CITIES_BY_REGION, PAYMENT_METHODS } from "@/lib/checkout-data";

const steps = ["معلومات التوصيل", "طريقة الدفع", "مراجعة الطلب"];

export default function CheckoutPage() {
  const { items, subtotal, discount, itemCount } = useCart();
  const [step, setStep] = useState(1);
  const [shipping, setShipping] = useState({
    name: "", phone: "", region: "جدة", city: "جدة", address: "", notes: "",
  });
  const [payment, setPayment] = useState("visa");

  const total = subtotal - discount;

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-cream-500 mb-4">لا يوجد منتجات في السلة</p>
          <Link href="/" className="text-sm font-medium text-gold-500 hover:text-gold-600">
            تصفح المنتجات
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream-50 min-h-screen">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
        {/* Steps */}
        <div className="flex items-center justify-center gap-0 mb-10">
          {steps.map((label, i) => (
            <div key={label} className="flex items-center">
              <div className="flex items-center gap-2">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors",
                  step > i + 1 ? "bg-emerald-500 text-white"
                    : step === i + 1 ? "bg-navy-800 text-cream-50"
                    : "bg-cream-200 text-cream-500"
                )}>
                  {step > i + 1 ? <Check size={14} /> : i + 1}
                </div>
                <span className={cn("text-xs font-medium hidden sm:block",
                  step === i + 1 ? "text-navy-800" : "text-cream-500"
                )}>{label}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={cn("w-12 sm:w-20 h-px mx-2",
                  step > i + 1 ? "bg-emerald-400" : "bg-cream-200"
                )} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form area */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <ShippingForm shipping={shipping} setShipping={setShipping} onNext={() => setStep(2)} />
            )}
            {step === 2 && (
              <PaymentForm payment={payment} setPayment={setPayment} onNext={() => setStep(3)} onBack={() => setStep(1)} />
            )}
            {step === 3 && (
              <ReviewStep shipping={shipping} payment={payment} items={items} total={total} onBack={() => setStep(2)} />
            )}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-cream-200 p-5 sticky top-36">
              <h3 className="text-sm font-semibold text-navy-800 mb-4">ملخص الطلب</h3>
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.selectedColor}`} className="flex gap-3">
                    <div className="w-14 h-14 rounded-lg bg-cream-100 shrink-0 overflow-hidden">
                      <Image src={item.product.images[0]} alt={item.product.name} width={56} height={56} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-navy-800 line-clamp-1">{item.product.name}</p>
                      <p className="text-[11px] text-cream-500">الكمية: {item.quantity}</p>
                      <p className="text-xs font-bold text-navy-800 mt-0.5">
                        {(item.product.price * item.quantity).toLocaleString("ar-SA")} ر.س
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <hr className="border-cream-200 mb-3" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-cream-500">المجموع ({itemCount})</span><span className="text-navy-800">{subtotal.toLocaleString("ar-SA")} ر.س</span></div>
                {discount > 0 && <div className="flex justify-between"><span className="text-emerald-600">الخصم</span><span className="text-emerald-600">-{discount.toLocaleString("ar-SA")} ر.س</span></div>}
                <div className="flex justify-between"><span className="text-cream-500">الشحن</span><span className="text-navy-800">مجاني</span></div>
              </div>
              <hr className="border-cream-200 my-3" />
              <div className="flex justify-between">
                <span className="text-sm font-semibold text-navy-800">الإجمالي</span>
                <span className="text-lg font-bold text-navy-800">{total.toLocaleString("ar-SA")} ر.س</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShippingForm({ shipping, setShipping, onNext }: {
  shipping: { name: string; phone: string; region: string; city: string; address: string; notes: string };
  setShipping: (s: typeof shipping) => void;
  onNext: () => void;
}) {
  return (
    <div className="bg-white rounded-xl border border-cream-200 p-6">
      <h2 className="text-lg font-semibold text-navy-800 mb-6">معلومات التوصيل</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-navy-700 mb-1.5 block">الاسم الكامل *</label>
          <input type="text" value={shipping.name} onChange={(e) => setShipping({ ...shipping, name: e.target.value })}
            className="w-full h-11 px-4 border border-cream-200 rounded-lg text-sm focus:outline-none focus:border-gold-400 bg-cream-50" placeholder="محمد أحمد" />
        </div>
        <div>
          <label className="text-xs font-medium text-navy-700 mb-1.5 block">رقم الجوال *</label>
          <input type="tel" value={shipping.phone} onChange={(e) => setShipping({ ...shipping, phone: e.target.value })}
            className="w-full h-11 px-4 border border-cream-200 rounded-lg text-sm focus:outline-none focus:border-gold-400 bg-cream-50" placeholder="05XXXXXXXX" dir="ltr" />
        </div>
        <div>
          <label className="text-xs font-medium text-navy-700 mb-1.5 block">المنطقة *</label>
          <select value={shipping.region} onChange={(e) => setShipping({ ...shipping, region: e.target.value, city: CITIES_BY_REGION[e.target.value]?.[0] ?? "" })}
            className="w-full h-11 px-4 border border-cream-200 rounded-lg text-sm focus:outline-none focus:border-gold-400 bg-cream-50 cursor-pointer">
            {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-navy-700 mb-1.5 block">المدينة *</label>
          <select value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
            className="w-full h-11 px-4 border border-cream-200 rounded-lg text-sm focus:outline-none focus:border-gold-400 bg-cream-50 cursor-pointer">
            {(CITIES_BY_REGION[shipping.region] ?? []).map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs font-medium text-navy-700 mb-1.5 block">العنوان التفصيلي *</label>
          <textarea value={shipping.address} onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
            rows={3} className="w-full px-4 py-3 border border-cream-200 rounded-lg text-sm focus:outline-none focus:border-gold-400 bg-cream-50 resize-none"
            placeholder="الحي، الشارع، رقم المبنى، الشقة..." />
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs font-medium text-navy-700 mb-1.5 block">ملاحظات التوصيل (اختياري)</label>
          <input type="text" value={shipping.notes} onChange={(e) => setShipping({ ...shipping, notes: e.target.value })}
            className="w-full h-11 px-4 border border-cream-200 rounded-lg text-sm focus:outline-none focus:border-gold-400 bg-cream-50"
            placeholder="مثلاً: الباب الأيسر، عند البوابة..." />
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <button onClick={onNext} className="px-8 py-3 bg-navy-800 text-cream-50 text-sm font-semibold rounded-lg hover:bg-navy-700 transition-colors">
          متابعة للدفع
        </button>
      </div>
    </div>
  );
}

function PaymentForm({ payment, setPayment, onNext, onBack }: {
  payment: string; setPayment: (v: string) => void; onNext: () => void; onBack: () => void;
}) {
  return (
    <div className="bg-white rounded-xl border border-cream-200 p-6">
      <h2 className="text-lg font-semibold text-navy-800 mb-6">طريقة الدفع</h2>
      <div className="space-y-3">
        {PAYMENT_METHODS.map((m) => (
          <button key={m.id} onClick={() => setPayment(m.id)}
            className={cn("w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-right",
              payment === m.id ? "border-gold-400 bg-gold-400/5" : "border-cream-200 hover:border-cream-400"
            )}>
            <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0",
              payment === m.id ? "border-gold-400" : "border-cream-300"
            )}>
              {payment === m.id && <div className="w-2.5 h-2.5 rounded-full bg-gold-400" />}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-navy-800">{m.name}</span>
                {m.badge && <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-[10px] font-semibold rounded">{m.badge}</span>}
              </div>
              <p className="text-xs text-cream-500 mt-0.5">{m.desc}</p>
            </div>
          </button>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between">
        <button onClick={onBack} className="px-6 py-3 border border-cream-200 text-navy-700 text-sm font-medium rounded-lg hover:border-gold-400 transition-colors">
          رجوع
        </button>
        <button onClick={onNext} className="px-8 py-3 bg-navy-800 text-cream-50 text-sm font-semibold rounded-lg hover:bg-navy-700 transition-colors">
          مراجعة الطلب
        </button>
      </div>
    </div>
  );
}

function ReviewStep({ shipping, payment, items, total, onBack }: {
  shipping: { name: string; phone: string; region: string; city: string; address: string; notes: string };
  payment: string; items: ReturnType<typeof useCart>["items"]; total: number; onBack: () => void;
}) {
  const payLabel = PAYMENT_METHODS.find((m) => m.id === payment)?.name ?? payment;
  return (
    <div className="bg-white rounded-xl border border-cream-200 p-6">
      <h2 className="text-lg font-semibold text-navy-800 mb-6">مراجعة الطلب</h2>

      <div className="space-y-4">
        <div className="p-4 bg-cream-50 rounded-xl">
          <h4 className="text-xs font-semibold text-navy-700 mb-2">عنوان التوصيل</h4>
          <p className="text-sm text-navy-800">{shipping.name}</p>
          <p className="text-sm text-navy-600">{shipping.phone}</p>
          <p className="text-sm text-navy-600">{shipping.city}، {shipping.region}</p>
          <p className="text-sm text-navy-600">{shipping.address}</p>
          {shipping.notes && <p className="text-xs text-cream-500 mt-1">ملاحظات: {shipping.notes}</p>}
        </div>

        <div className="p-4 bg-cream-50 rounded-xl">
          <h4 className="text-xs font-semibold text-navy-700 mb-2">طريقة الدفع</h4>
          <p className="text-sm text-navy-800">{payLabel}</p>
        </div>

        <div className="p-4 bg-cream-50 rounded-xl">
          <h4 className="text-xs font-semibold text-navy-700 mb-2">المنتجات ({items.length})</h4>
          {items.map((item) => (
            <div key={`${item.product.id}-${item.selectedColor}`} className="flex justify-between text-sm py-1.5">
              <span className="text-navy-700">{item.product.name} × {item.quantity}</span>
              <span className="font-medium text-navy-800">{(item.product.price * item.quantity).toLocaleString("ar-SA")} ر.س</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button onClick={onBack} className="px-6 py-3 border border-cream-200 text-navy-700 text-sm font-medium rounded-lg hover:border-gold-400 transition-colors">
          رجوع
        </button>
        <button className="flex items-center gap-2 px-8 py-3 bg-gold-400 text-navy-800 text-sm font-semibold rounded-lg hover:bg-gold-500 transition-colors">
          <Lock size={16} />
          تأكيد الطلب — {total.toLocaleString("ar-SA")} ر.س
        </button>
      </div>
    </div>
  );
}
