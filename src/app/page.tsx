import Hero from "@/components/Hero";
import FeaturesBar from "@/components/FeaturesBar";
import ShopByRoom from "@/components/ShopByRoom";
import ProductsCarousel from "@/components/ProductsCarousel";
import PromoBanners from "@/components/PromoBanners";
import PaymentTrust from "@/components/PaymentTrust";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturesBar />
      <ShopByRoom />
      <ProductsCarousel
        title="الأكثر مبيعًا"
        subtitle="المنتجات الأكثر حبًا من عملائنا"
      />
      <PromoBanners />
      <ProductsCarousel
        title="وصل حديثًا"
        subtitle="أحدث الإضافات لمجموعتنا"
      />
      <PaymentTrust />
    </>
  );
}
