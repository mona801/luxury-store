import { Truck, Shield, CreditCard, Headphones } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "توصيل مجاني",
    desc: "لجميع مناطق المملكة",
  },
  {
    icon: Shield,
    title: "ضمان سنتين",
    desc: "على جميع المنتجات",
  },
  {
    icon: CreditCard,
    title: "دفع آمن",
    desc: "فيزا، مدى، تابي، تمارا",
  },
  {
    icon: Headphones,
    title: "دعم متواصل",
    desc: "7 أيام في الأسبوع",
  },
];

export default function FeaturesBar() {
  return (
    <section className="py-12 bg-cream-100/50 border-y border-cream-200">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.title} className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gold-400/10 rounded-xl flex items-center justify-center shrink-0">
                <f.icon size={22} className="text-gold-500" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-navy-800">{f.title}</h3>
                <p className="text-xs text-cream-500">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
