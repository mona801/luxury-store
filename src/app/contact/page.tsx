"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Phone, Mail, MapPin, Clock, Send } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-cream-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-cream-200">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center gap-2 text-xs text-cream-500">
            <Link href="/" className="hover:text-gold-500 transition-colors">الرئيسية</Link>
            <ChevronLeft size={12} />
            <span className="text-navy-700 font-medium">تواصل معنا</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:py-16">
        <div className="text-center mb-12">
          <h1 className="text-2xl sm:text-3xl font-bold text-navy-800 mb-3" style={{ fontFamily: "var(--font-playfair), 'Noto Serif Arabic', serif" }}>
            تواصل معنا
          </h1>
          <p className="text-cream-500 text-sm max-w-lg mx-auto">
            يسعدنا تواصلك معنا. لا تتردد في طرح أي سؤال أو استفسار.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="bg-white rounded-xl border border-cream-200 p-10 text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send size={28} className="text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold text-navy-800 mb-2">تم إرسال رسالتك!</h3>
                <p className="text-sm text-cream-500 mb-6">سنتواصل معك في أقرب وقت ممكن.</p>
                <Link href="/" className="text-sm font-medium text-gold-500 hover:text-gold-600">العودة للرئيسية</Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-cream-200 p-6 sm:p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-xs font-medium text-navy-700 mb-1.5 block">الاسم *</label>
                    <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full h-11 px-4 border border-cream-200 rounded-lg text-sm focus:outline-none focus:border-gold-400 bg-cream-50" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-navy-700 mb-1.5 block">البريد الإلكتروني *</label>
                    <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full h-11 px-4 border border-cream-200 rounded-lg text-sm focus:outline-none focus:border-gold-400 bg-cream-50" dir="ltr" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-navy-700 mb-1.5 block">رقم الجوال</label>
                    <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full h-11 px-4 border border-cream-200 rounded-lg text-sm focus:outline-none focus:border-gold-400 bg-cream-50" dir="ltr" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-navy-700 mb-1.5 block">الموضوع *</label>
                    <input type="text" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full h-11 px-4 border border-cream-200 rounded-lg text-sm focus:outline-none focus:border-gold-400 bg-cream-50" />
                  </div>
                </div>
                <div className="mb-6">
                  <label className="text-xs font-medium text-navy-700 mb-1.5 block">الرسالة *</label>
                  <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={5} className="w-full px-4 py-3 border border-cream-200 rounded-lg text-sm focus:outline-none focus:border-gold-400 bg-cream-50 resize-none" />
                </div>
                <button type="submit" className="px-8 py-3 bg-navy-800 text-cream-50 text-sm font-semibold rounded-lg hover:bg-navy-700 transition-colors">
                  إرسال الرسالة
                </button>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-xl border border-cream-200 p-6">
              <h3 className="text-sm font-semibold text-navy-800 mb-5">معلومات التواصل</h3>
              <div className="space-y-4">
                {[
                  { icon: Phone, label: "الهاتف", value: "+966 55 123 4567", dir: "ltr" },
                  { icon: Mail, label: "البريد الإلكتروني", value: "info@yourbrand.sa", dir: "ltr" },
                  { icon: MapPin, label: "العنوان", value: "جدة، المملكة العربية السعودية", dir: undefined },
                  { icon: Clock, label: "ساعات العمل", value: "السبت - الخميس: 9 ص - 11 م", dir: undefined },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gold-400/10 rounded-lg flex items-center justify-center shrink-0">
                      <c.icon size={18} className="text-gold-500" />
                    </div>
                    <div>
                      <p className="text-[11px] text-cream-500 mb-0.5">{c.label}</p>
                      <p className="text-sm font-medium text-navy-800" dir={c.dir}>{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-white rounded-xl border border-cream-200 overflow-hidden">
              <div className="h-52 bg-cream-100 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={32} className="text-cream-300 mx-auto mb-2" />
                  <p className="text-xs text-cream-400">خريطة — جدة، المملكة العربية السعودية</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
