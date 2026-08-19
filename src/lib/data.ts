export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  currency: string;
  images: string[];
  colors: { name: string; value: string }[];
  category: string;
  subcategory?: string;
  rating?: number;
  reviewCount?: number;
  badge?: string;
  inStock: boolean;
  stockLabel?: string;
  description?: string;
  specs?: { label: string; value: string }[];
  installment?: { provider: string; monthly: number; months: number }[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  subcategories?: { name: string; slug: string }[];
}

export const categories: Category[] = [
  {
    id: "living",
    name: "غرفة المعيشة",
    slug: "living-room",
    image: "/images/categories/living-room.jpg",
    subcategories: [
      { name: "أنتريهات", slug: "sofas" },
      { name: "كراسي استرخاء", slug: "armchairs" },
      { name: "طاولات قهوة", slug: "coffee-tables" },
      { name: "طاولات تلفزيون", slug: "tv-stands" },
      { name: "رفوف ووحدات", slug: "shelves" },
    ],
  },
  {
    id: "bedroom",
    name: "غرفة النوم",
    slug: "bedroom",
    image: "/images/categories/bedroom.jpg",
    subcategories: [
      { name: "أسرّة", slug: "beds" },
      { name: "كومودينو", slug: "nightstands" },
      { name: "خزائن ملابس", slug: "wardrobes" },
      { name: "تسريحة", slug: "dressing-tables" },
    ],
  },
  {
    id: "dining",
    name: "المطبخ والسفرة",
    slug: "dining",
    image: "/images/categories/dining.jpg",
    subcategories: [
      { name: "طاولات طعام", slug: "dining-tables" },
      { name: "كراسي طعام", slug: "dining-chairs" },
      { name: "بوفيهات", slug: "buffets" },
      { name: "خزائن طعام", slug: "sideboards" },
    ],
  },
  {
    id: "office",
    name: "المكتب",
    slug: "office",
    image: "/images/categories/office.jpg",
    subcategories: [
      { name: "مكاتب", slug: "desks" },
      { name: "كراسي مكتبية", slug: "office-chairs" },
      { name: "وحدات تخزين", slug: "storage-units" },
    ],
  },
  {
    id: "decor",
    name: "ديكور وإكسسوارات",
    slug: "decor",
    image: "/images/categories/decor.jpg",
    subcategories: [
      { name: "إطارات صور", slug: "frames" },
      { name: "شمعدانات", slug: "candle-holders" },
      { name: "سجاد", slug: "rugs" },
      { name: "وسائد", slug: "cushions" },
      { name: "مرايا", slug: "mirrors" },
    ],
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "أريكة كلاسيكية فاخرة",
    slug: "classic-luxury-sofa",
    price: 12500,
    originalPrice: 15000,
    currency: "ر.س",
    images: ["/images/products/sofa-1.jpg", "/images/products/sofa-1-b.jpg"],
    colors: [
      { name: "بيج", value: "#d4bfa0" },
      { name: "كحلي", value: "#273f63" },
      { name: "رمادي", value: "#9ca3af" },
    ],
    category: "living",
    subcategory: "sofas",
    rating: 4.8,
    reviewCount: 124,
    badge: "الأكثر مبيعًا",
    inStock: true,
    description:
      "أريكة فاخرة بتصميم كلاسيكي عصري، مصنوعة من أجود أنواع القماش الإيطالي مع إطار خشبي صلب من خشب الزان. مثالية لغرفة المعيشة العصرية.",
    specs: [
      { label: "العرض", value: "280 سم" },
      { label: "العمق", value: "95 سم" },
      { label: "الارتفاع", value: "85 سم" },
      { label: "الخامة", value: "قماش إيطالي" },
      { label: "الإطار", value: "خشب زان" },
    ],
    installment: [
      { provider: "تمارا", monthly: 1042, months: 12 },
      { provider: "تابي", monthly: 1042, months: 12 },
    ],
  },
  {
    id: "2",
    name: "طاولة قهوة مينيمال",
    slug: "minimal-coffee-table",
    price: 3200,
    currency: "ر.س",
    images: ["/images/products/table-1.jpg", "/images/products/table-1-b.jpg"],
    colors: [
      { name: "أبيض", value: "#ffffff" },
      { name: "بني", value: "#8B7355" },
    ],
    category: "living",
    subcategory: "coffee-tables",
    rating: 4.6,
    reviewCount: 67,
    inStock: true,
    description:
      "طاولة قهوة بتصميم مينيمال أنيق، سطح رخامي طبيعي مع قاعدة معدنية ذهبية.",
    specs: [
      { label: "القطر", value: "90 سم" },
      { label: "الارتفاع", value: "42 سم" },
      { label: "السطح", value: "رخام طبيعي" },
      { label: "القاعدة", value: "ستانلس ستيل مذهب" },
    ],
    installment: [
      { provider: "تمارا", monthly: 267, months: 12 },
      { provider: "تابي", monthly: 267, months: 12 },
    ],
  },
  {
    id: "3",
    name: "سرير كينج فاخر",
    slug: "luxury-king-bed",
    price: 9800,
    originalPrice: 12000,
    currency: "ر.س",
    images: ["/images/products/bed-1.jpg", "/images/products/bed-1-b.jpg"],
    colors: [
      { name: "بيج", value: "#d4bfa0" },
      { name: "كحلي غامق", value: "#1a2a42" },
    ],
    category: "bedroom",
    subcategory: "beds",
    rating: 4.9,
    reviewCount: 89,
    badge: "عرض خاص",
    inStock: true,
    stockLabel: "كمية محدودة",
    description:
      "سرير كينج فاخر بتصميم أنيق، مخمد رأسي قماش مخملي مع إطار خشبي أنيق.",
    specs: [
      { label: "المقاس", value: "كينج 200x200 سم" },
      { label: "الارتفاع", value: "120 سم" },
      { label: "المخمد", value: "مخمل إيطالي" },
      { label: "الإطار", value: "خشب جوز" },
    ],
    installment: [
      { provider: "تمارا", monthly: 817, months: 12 },
      { provider: "تابي", monthly: 817, months: 12 },
    ],
  },
  {
    id: "4",
    name: "طاولة طعام من خشب الزان",
    slug: "oak-dining-table",
    price: 7500,
    currency: "ر.س",
    images: [
      "/images/products/dining-1.jpg",
      "/images/products/dining-1-b.jpg",
    ],
    colors: [
      { name: "جوز", value: "#8B7355" },
      { name: "أسود", value: "#1a1a1a" },
    ],
    category: "dining",
    subcategory: "dining-tables",
    rating: 4.7,
    reviewCount: 45,
    inStock: true,
    description:
      "طاولة طعام فاخرة من خشب الزان الطبيعي، تتسع لـ 8 أشخاص مع تصميم أنيق ومتين.",
    specs: [
      { label: "الطول", value: "200 سم" },
      { label: "العرض", value: "100 سم" },
      { label: "الارتفاع", value: "76 سم" },
      { label: "المادة", value: "خشب زان طبيعي" },
      { label: "السعة", value: "8 أشخاص" },
    ],
    installment: [
      { provider: "تمارا", monthly: 625, months: 12 },
      { provider: "تابي", monthly: 625, months: 12 },
    ],
  },
  {
    id: "5",
    name: "كنبة زاوية عصرية",
    slug: "modern-corner-sofa",
    price: 8900,
    currency: "ر.س",
    images: ["/images/products/corner-1.jpg", "/images/products/corner-1-b.jpg"],
    colors: [
      { name: "رمادي فاتح", value: "#d1d5db" },
      { name: "أبيض كريمي", value: "#f5f0e8" },
    ],
    category: "living",
    subcategory: "sofas",
    rating: 4.5,
    reviewCount: 32,
    inStock: true,
    description:
      "كنبة زاوية عصرية بتصميم مينيمال، مثالية للمساحات الكبيرة مع راحة استثنائية.",
    specs: [
      { label: "الشكل", value: "زاوية يمينية" },
      { label: "العرض", value: "320 سم" },
      { label: "العمق", value: "180 سم" },
      { label: "الخامة", value: "قماش متين" },
    ],
    installment: [
      { provider: "تمارا", monthly: 742, months: 12 },
      { provider: "تابي", monthly: 742, months: 12 },
    ],
  },
  {
    id: "6",
    name: "مرآة حائط مذهبة",
    slug: "gold-wall-mirror",
    price: 1800,
    currency: "ر.س",
    images: ["/images/products/mirror-1.jpg", "/images/products/mirror-1-b.jpg"],
    colors: [{ name: "ذهبي", value: "#d4af37" }],
    category: "decor",
    subcategory: "mirrors",
    rating: 4.4,
    reviewCount: 56,
    badge: "وصل حديثًا",
    inStock: true,
    description:
      "مرآة حائط بإطار مذهل أنيق، تضيف لمسة فخامة لأي غرفة.",
    specs: [
      { label: "القطر", value: "80 سم" },
      { label: "الإطار", value: "معدن مذهب" },
      { label: "المرآة", value: "زجاج مقوّى" },
    ],
  },
  {
    id: "7",
    name: "مكتب مكتبي فاخر",
    slug: "luxury-office-desk",
    price: 4500,
    currency: "ر.س",
    images: ["/images/products/desk-1.jpg", "/images/products/desk-1-b.jpg"],
    colors: [
      { name: "بني غامق", value: "#5C4033" },
      { name: "أسود", value: "#1a1a1a" },
    ],
    category: "office",
    subcategory: "desks",
    rating: 4.7,
    reviewCount: 28,
    inStock: true,
    description:
      "مكتب مكتبي فاخر من خشب الجوز الطبيعي، مع أدراج مخفية وتصميم أنيق.",
    specs: [
      { label: "العرض", value: "160 سم" },
      { label: "العمق", value: "70 سم" },
      { label: "الارتفاع", value: "76 سم" },
      { label: "المادة", value: "خشب جوز طبيعي" },
    ],
    installment: [
      { provider: "تمارا", monthly: 375, months: 12 },
      { provider: "تابي", monthly: 375, months: 12 },
    ],
  },
  {
    id: "8",
    name: "سجادة سجاد يدوية",
    slug: "handmade-area-rug",
    price: 3500,
    currency: "ر.س",
    images: ["/images/products/rug-1.jpg", "/images/products/rug-1-b.jpg"],
    colors: [
      { name: "كريمي", value: "#f5f0e8" },
      { name: "أزرق فاتح", value: "#bfdbfe" },
    ],
    category: "decor",
    subcategory: "rugs",
    rating: 4.8,
    reviewCount: 41,
    inStock: true,
    description:
      "سجادة يدوية الصنع بتصميم كلاسيكي، مصنوعة من الصوف الطبيعي 100%.",
    specs: [
      { label: "المقاس", value: "200x300 سم" },
      { label: "المادة", value: "صوف طبيعي 100%" },
      { label: "التصنيع", value: "يدوي" },
    ],
  },
];
