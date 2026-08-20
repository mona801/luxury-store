"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export default function SignUpPage() {
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) return setError("الرجاء إدخال الاسم");
    if (!email.trim()) return setError("الرجاء إدخال البريد الإلكتروني");
    if (!password.trim() || password.length < 6) return setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
    setLoading(true);
    setTimeout(() => {
      const result = signup(name, email, password);
      if (result.success) {
        window.location.href = "/account";
      } else {
        setError(result.error || "حدث خطأ");
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <Image src="/images/logo.jpg" alt="متجر الك" width={48} height={48} className="w-12 h-12 rounded-lg object-cover" />
          </Link>
          <h1 className="text-2xl font-bold text-navy-800" style={{ fontFamily: "var(--font-playfair), 'Noto Serif Arabic', serif" }}>
            إنشاء حساب جديد
          </h1>
          <p className="text-sm text-cream-500 mt-2">أهلاً بك في متجر الك</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-cream-200 p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600 text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1.5">الاسم الكامل</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="أدخل اسمك"
              className="w-full h-11 px-4 border border-cream-200 rounded-lg text-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30 bg-cream-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1.5">البريد الإلكتروني</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="w-full h-11 px-4 border border-cream-200 rounded-lg text-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30 bg-cream-50"
              dir="ltr"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1.5">كلمة المرور</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="6 أحرف على الأقل"
                className="w-full h-11 px-4 pl-10 border border-cream-200 rounded-lg text-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30 bg-cream-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-cream-400 hover:text-navy-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 bg-navy-800 text-cream-50 text-sm font-semibold rounded-lg hover:bg-navy-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? "جاري الإنشاء..." : "إنشاء الحساب"}
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>

        <p className="text-center text-sm text-cream-500 mt-6">
          لديك حساب بالفعل؟{" "}
          <Link href="/auth/signin" className="text-gold-500 hover:text-gold-600 font-medium">
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </div>
  );
}
