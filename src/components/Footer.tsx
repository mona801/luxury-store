import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

const footerLinks = {
  categories: [
    { name: "غرفة المعيشة", href: "/category/living" },
    { name: "غرفة النوم", href: "/category/bedroom" },
    { name: "المطبخ والسفرة", href: "/category/dining" },
    { name: "المكتب", href: "/category/office" },
    { name: "ديكور وإكسسوارات", href: "/category/decor" },
    { name: "عروض خاصة", href: "/category/deals" },
  ],
  info: [
    { name: "من نحن", href: "/about" },
    { name: "تواصل معنا", href: "/contact" },
    { name: "الشحن والتوصيل", href: "/shipping" },
    { name: "سياسة الإرجاع", href: "/returns" },
  ],
};

const paymentMethods = ["Visa", "Mada", "Mastercard", "تابي", "تمارا"];

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TwitterIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-navy-800 text-cream-200 mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image src="/images/logo.jpg" alt="متجر الك" width={36} height={36} className="w-9 h-9 rounded-sm object-cover" />
              <span className="font-serif text-lg font-semibold text-cream-50">
                متجر الك
              </span>
            </div>
            <p className="text-sm text-cream-300 leading-relaxed mb-5">
              متجر متخصص في الأثاث والديكورات الراقية. نقدم لك أرقى التصاميم
              العصرية والكلاسيكية لتجميل منزلك.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 bg-navy-700 rounded-full flex items-center justify-center hover:bg-gold-500 transition-colors" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="#" className="w-9 h-9 bg-navy-700 rounded-full flex items-center justify-center hover:bg-gold-500 transition-colors" aria-label="Twitter">
                <TwitterIcon />
              </a>
              <a href="#" className="w-9 h-9 bg-navy-700 rounded-full flex items-center justify-center hover:bg-gold-500 transition-colors" aria-label="Facebook">
                <FacebookIcon />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-cream-50 font-semibold text-sm mb-4">التصنيفات</h3>
            <ul className="space-y-2.5">
              {footerLinks.categories.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-cream-300 hover:text-gold-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-cream-50 font-semibold text-sm mb-4">معلومات</h3>
            <ul className="space-y-2.5">
              {footerLinks.info.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-cream-300 hover:text-gold-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Payment */}
          <div>
            <h3 className="text-cream-50 font-semibold text-sm mb-4">تواصل معنا</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2 text-sm text-cream-300">
                <Phone size={15} className="text-gold-400" />
                <span dir="ltr">+966 55 123 4567</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-cream-300">
                <Mail size={15} className="text-gold-400" />
                <span>info@yourbrand.sa</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-cream-300">
                <MapPin size={15} className="text-gold-400" />
                <span>جدة، المملكة العربية السعودية</span>
              </li>
            </ul>

            <h3 className="text-cream-50 font-semibold text-sm mb-3">طرق الدفع</h3>
            <div className="flex flex-wrap gap-2">
              {paymentMethods.map((pm) => (
                <span key={pm} className="px-2.5 py-1 bg-navy-700 rounded text-xs text-cream-300">
                  {pm}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-navy-700">
        <div className="mx-auto max-w-7xl px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-cream-400">
            © {new Date().getFullYear()} متجر الك. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-4 text-xs text-cream-400">
            <Link href="/privacy" className="hover:text-gold-400 transition-colors">
              سياسة الخصوصية
            </Link>
            <Link href="/terms" className="hover:text-gold-400 transition-colors">
              الشروط والأحكام
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
