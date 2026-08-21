"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Play } from "lucide-react";
import { products } from "@/lib/data";
import { useCinematicScroll } from "@/lib/hooks/use-cinematic-scroll";
import {
  Scene,
  CinematicProductCard,
  CinematicTextReveal,
  CinematicDivider,
} from "@/components/CinematicScene";
import SceneIndicator from "@/components/SceneIndicator";

const sofa = products.find((p) => p.id === "1")!;
const coffeeTable = products.find((p) => p.id === "2")!;
const bed = products.find((p) => p.id === "3")!;
const diningTable = products.find((p) => p.id === "4")!;
const cornerSofa = products.find((p) => p.id === "5")!;
const mirror = products.find((p) => p.id === "6")!;
const desk = products.find((p) => p.id === "7")!;
const rug = products.find((p) => p.id === "8")!;

export default function CinematicHomepage() {
  const totalScenes = 6;
  const { activeScene } = useCinematicScroll(totalScenes);

  return (
    <div className="relative">
      <SceneIndicator activeScene={activeScene} totalScenes={totalScenes} />

      {/* ═══════ SCENE 01 — THE LIVING ROOM ═══════ */}
      <Scene
        index={0}
        bgImage={sofa.images[0]}
        overlay="bg-gradient-to-b from-navy-900/70 via-navy-900/40 to-navy-900/80"
      >
        <div className="h-screen flex flex-col items-center justify-center px-4">
          {/* Logo mark */}
          <div className="mb-8 opacity-60">
            <Image
              src="/images/logo.jpg"
              alt="متجر الك"
              width={56}
              height={56}
              className="w-14 h-14 rounded-lg object-cover mx-auto"
              priority
            />
          </div>

          <CinematicTextReveal
            label="LUXURY FURNITURE"
            title="أثاث يحكي"
            titleAccent="قصة ذوقك"
            subtitle="معرض أثاث فاخر يجمع بين الأناقة والراحة. كل قطعة تحكي قصة تصميم استثنائية."
          />

          <div className="mt-10 flex flex-col items-center gap-6">
            <Link
              href="/category/living"
              className="inline-flex items-center gap-3 px-8 py-3.5 bg-gold-400 text-navy-800 font-semibold text-sm rounded-lg hover:bg-gold-500 transition-colors"
            >
              استكشف المجموعة
              <ArrowLeft size={18} />
            </Link>

            {/* Scroll indicator */}
            <div className="flex flex-col items-center gap-2 mt-12 animate-bounce">
              <span className="text-cream-300/50 text-xs tracking-widest">اكتشف</span>
              <div className="w-px h-8 bg-gradient-to-b from-cream-300/50 to-transparent" />
            </div>
          </div>
        </div>
      </Scene>

      {/* ═══════ SCENE 02 — THE LIVING ROOM DETAIL ═══════ */}
      <Scene
        index={1}
        bgGradient="bg-gradient-to-br from-navy-800 via-navy-900 to-cream-900/20"
      >
        <div className="min-h-screen flex items-center py-20 px-4">
          <div className="mx-auto max-w-6xl w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Text */}
              <CinematicTextReveal
                label="SCENE 01 — LIVING"
                title="غرفة المعيشة"
                titleAccent="الفخامة تبدأ من هنا"
                subtitle="أريكة فاخرة بإطار خشبي صلب من خشب الزان، مغطاة بأجود أنواع القماش الإيطالي. صُممت لتكون قلب البيت."
                align="right"
              />

              {/* Right: Product */}
              <div className="flex justify-center lg:justify-start">
                <CinematicProductCard product={sofa} direction="left" />
              </div>
            </div>

            {/* Second product row */}
            <div className="mt-16 lg:mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="order-2 lg:order-1 flex justify-center lg:justify-end">
                <CinematicProductCard product={coffeeTable} direction="right" />
              </div>
              <CinematicTextReveal
                label="THE DETAILS"
                title="التفاصيل"
                titleAccent="تفصيل تفصيل"
                subtitle="طاولة قهوة بسطح رخامي طبيعي وقاعدة معدنية مذهبة. كل خطوة في التصنيع تحمل بصمة حرفية."
                align="left"
              />
            </div>
          </div>
        </div>
      </Scene>

      {/* ═══════ SCENE 03 — THE BEDROOM ═══════ */}
      <Scene
        index={2}
        bgImage={bed.images[0]}
        overlay="bg-gradient-to-t from-navy-900/90 via-navy-900/30 to-navy-900/60"
      >
        <div className="min-h-screen flex items-center py-20 px-4">
          <div className="mx-auto max-w-6xl w-full">
            <div className="max-w-2xl">
              <CinematicTextReveal
                label="SCENE 02 — BEDROOM"
                title="غرفة النوم"
                titleAccent="المكان الذي تبدأ فيه كل يوم"
                subtitle="سرير كينج فاخر بمخمد رأسي قماش مخملي وإطار من خشب الجوز. صُمم ليمنحك راحة لا مثيل لها."
                align="right"
              />
              <div className="mt-8">
                <Link
                  href={`/product/${bed.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-cream-50/10 backdrop-blur-sm border border-cream-200/20 text-cream-50 text-sm font-medium rounded-lg hover:bg-cream-50/20 transition-all"
                >
                  عرض السرير
                  <ArrowLeft size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Scene>

      {/* ═══════ SCENE 04 — THE DINING ═══════ */}
      <Scene
        index={3}
        bgGradient="bg-gradient-to-b from-cream-900/30 via-navy-800 to-navy-900"
      >
        <div className="min-h-screen flex items-center py-20 px-4">
          <div className="mx-auto max-w-6xl w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <CinematicTextReveal
                label="SCENE 03 — DINING"
                title="المطبخ والسفرة"
                titleAccent="حيث تجتمع العائلة"
                subtitle="طاولة طعام من خشب الزان الطبيعي تتسع لـ 8 أشخاص. تصميم أنيق يجمع بين الجمال والمتانة."
                align="right"
              />
              <div className="flex justify-center lg:justify-start">
                <CinematicProductCard product={diningTable} direction="left" />
              </div>
            </div>
          </div>
        </div>
      </Scene>

      {/* ═══════ SCENE 05 — THE MAJLIS ═══════ */}
      <Scene
        index={4}
        bgGradient="bg-gradient-to-br from-navy-900 via-navy-800 to-cream-900/20"
      >
        <div className="min-h-screen flex items-center py-20 px-4">
          <div className="mx-auto max-w-6xl w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="flex justify-center lg:justify-end">
                <CinematicProductCard product={cornerSofa} direction="right" />
              </div>
              <CinematicTextReveal
                label="SCENE 04 — MAJLIS"
                title="المجلس"
                titleAccent="المكان يجمع"
                subtitle="كنبة زاوية عصرية بتصميم مينيمال. مثالية للجلسات الطويلة مع الأهل والأصدقاء."
                align="left"
              />
            </div>

            {/* Decorative products */}
            <div className="mt-16 lg:mt-24">
              <CinematicDivider />
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
                <div className="flex justify-center">
                  <CinematicProductCard product={mirror} direction="right" compact />
                </div>
                <div className="flex justify-center">
                  <CinematicProductCard product={rug} direction="left" compact />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Scene>

      {/* ═══════ SCENE 06 — EXPLORE THE COLLECTION ═══════ */}
      <Scene
        index={5}
        bgGradient="bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900"
        overlay="bg-transparent"
      >
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
          <CinematicTextReveal
            label="COLLECTION"
            title="استكشف المجموعة"
            titleAccent="بانتظارك"
            subtitle="اكتشف مجموعتنا الكاملة من الأثاث والديكورات الراقية. كل قطعة صُممت لتضيف لمسة من الأناقة لمنزلك."
          />

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl w-full">
            {products.slice(0, 4).map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="group relative aspect-square rounded-xl overflow-hidden bg-cream-100"
              >
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/40 transition-colors duration-500" />
                <div className="absolute bottom-0 right-0 left-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-cream-50 text-xs font-medium text-center">
                    {product.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/category/living-room"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold-400 text-navy-800 font-semibold text-sm rounded-lg hover:bg-gold-500 transition-colors"
            >
              تسوق الآن
              <ArrowLeft size={18} />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-cream-200/30 text-cream-100 font-medium text-sm rounded-lg hover:bg-cream-100/10 transition-colors"
            >
              <Play size={16} />
              قصتنا
            </Link>
          </div>

          {/* Trust features */}
          <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl w-full">
            {[
              { num: "500+", label: "منتج" },
              { num: "50K+", label: "عميل" },
              { num: "14", label: "منطقة" },
              { num: "5+", label: "سنوات" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-gold-400 mb-1">
                  {stat.num}
                </p>
                <p className="text-xs text-cream-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Scene>
    </div>
  );
}
