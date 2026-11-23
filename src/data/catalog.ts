import { CategoryItem, NotificationItem, OfferItem, Product } from "../types/store";

export const PAGE_ORDER = ["home", "categories", "cart", "wishlist", "more"] as const;

export const HERO_BANNER_IMAGE = "/assets/design/hero_art.png";

export const CATEGORIES: CategoryItem[] = [
  {
    id: "Mobiles",
    label: "Mobiles",
    description: "Flagship 5G smartphones and Pro series",
    itemCountLabel: "2 items",
  },
  {
    id: "Laptops",
    label: "Laptops",
    description: "Ultrabooks and creator workstations",
    itemCountLabel: "1 item",
  },
  {
    id: "Accessories",
    label: "Accessories",
    description: "Wireless audio, wearables, and gear",
    itemCountLabel: "3 items",
  },
  {
    id: "Fashion",
    label: "Fashion",
    description: "Essential heavyweight cotton apparel",
    itemCountLabel: "1 item",
  },
  {
    id: "Home & Living",
    label: "Home & Living",
    description: "Smart lighting and room audio",
    itemCountLabel: "2 items",
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "iPhone 16 Pro",
    category: "Mobiles",
    price: 125000,
    oldPrice: 140000,
    image: "/assets/design/prod_iphone.png",
    inStock: true,
    rating: 4.9,
    reviewCount: 128,
    featured: true,
    description:
      "Aerospace-grade titanium frame with a 120Hz ProMotion OLED display, triple 48MP Pro camera system, and all-day battery life.",
    specs: ["256GB Storage", "6.3-inch OLED 120Hz", "Titanium Chassis", "1 Year Official Warranty"],
  },
  {
    id: 2,
    name: "AirPods Pro",
    category: "Accessories",
    price: 28000,
    oldPrice: 32000,
    image: "/assets/design/prod_airpods.png",
    inStock: true,
    rating: 4.8,
    reviewCount: 94,
    featured: true,
    description:
      "Active noise cancellation with adaptive transparency, personalized spatial audio, and a precision MagSafe USB-C charging case.",
    specs: ["Active Noise Canceling", "Up to 30h Total Playback", "IP54 Sweat Resistant", "USB-C Case"],
  },
  {
    id: 3,
    name: "Laptop Pro 14",
    category: "Laptops",
    price: 85000,
    oldPrice: 95000,
    image: "/src/assets/images/product_laptop_pro_1795435602339.jpg",
    inStock: true,
    rating: 4.9,
    reviewCount: 62,
    featured: true,
    description:
      "Precision milled aluminum ultrabook powered by next-gen multi-core silicon, 16GB unified memory, and a color-calibrated Liquid Retina display.",
    specs: ["16GB RAM · 512GB SSD", "14.2-inch 2.8K Display", "16-Hour Battery", "Backlit Keyboard"],
  },
  {
    id: 4,
    name: "Wireless Studio Headphone",
    category: "Accessories",
    price: 4500,
    oldPrice: 5500,
    image: "/src/assets/images/product_headphones_wireless_1795435601978.jpg",
    inStock: true,
    rating: 4.7,
    reviewCount: 215,
    featured: true,
    description:
      "Plush memory-foam over-ear cushions with 40mm dynamic acoustic drivers, dual-device Bluetooth 5.3 pairing, and 45-hour battery endurance.",
    specs: ["Bluetooth 5.3 + AUX", "45-Hour Battery", "Foldable Hinge", "Fast USB-C Charge"],
  },
  {
    id: 5,
    name: "Classic Heavyweight Tee",
    category: "Fashion",
    price: 850,
    oldPrice: 1200,
    image: "/src/assets/images/product_classic_tshirt_1795435602507.jpg",
    inStock: true,
    rating: 4.6,
    reviewCount: 310,
    featured: true,
    description:
      "240 GSM combed organic ring-spun cotton crewneck designed for crisp everyday drape, breathable comfort, and lasting colorfastness.",
    specs: ["100% Combed Cotton", "240 GSM Weight", "Pre-Shrunk Fit", "Sizes S / M / L / XL"],
  },
  {
    id: 6,
    name: "Smart Ambient Lamp",
    category: "Home & Living",
    price: 2200,
    oldPrice: 2800,
    image: "/src/assets/images/product_smart_lamp_1795435602105.jpg",
    inStock: true,
    rating: 4.8,
    reviewCount: 83,
    featured: true,
    description:
      "Brushed aluminum touch-dimmable bedside and desk lamp with warm 2700K to cool 5000K spectrum control and frosted glass diffuser.",
    specs: ["Stepless Touch Dimmer", "2700K–5000K Spectrum", "Brushed Aluminum Base", "Low Energy LED"],
  },
  {
    id: 7,
    name: "Titanium Smart Watch",
    category: "Accessories",
    price: 14500,
    oldPrice: 17500,
    image: "/src/assets/images/product_smart_watch_1795435602855.jpg",
    inStock: true,
    rating: 4.8,
    reviewCount: 71,
    featured: true,
    description:
      "Always-on sapphire AMOLED watch face with continuous heart-rate, sleep stage tracking, dual-band GPS, and 5ATM swim resistance.",
    specs: ["AMOLED Sapphire Glass", "5ATM Water Resistant", "7-Day Battery", "Dual-Band GPS"],
  },
  {
    id: 8,
    name: "Acoustic Smart Speaker",
    category: "Home & Living",
    price: 6800,
    oldPrice: 8500,
    image: "/src/assets/images/product_home_speaker_1795435602197.jpg",
    inStock: true,
    rating: 4.7,
    reviewCount: 54,
    featured: true,
    description:
      "360-degree room-filling acoustic fabric cylinder with capacitive top touch controls, rich bass waveguide, and multi-room Wi-Fi sync.",
    specs: ["360° Spatial Sound", "Wi-Fi + Bluetooth", "Capacitive Touch Ring", "Acoustic Knit Body"],
  },
];

export const HERO_SLIDES = [
  {
    id: "big-discount",
    label: "Special Offer",
    headline: "Big Discount",
    highlight: "Up to 70% OFF",
    subtitle: "Grab your favourite verified tech and lifestyle essentials today.",
    cta: "Shop Now",
    targetCategory: "All" as const,
  },
  {
    id: "pro-tech",
    label: "New Arrivals",
    headline: "Flagship Tech",
    highlight: "Pro Series",
    subtitle: "Titanium smartphones, creator laptops, and active noise-canceling audio.",
    cta: "Explore Tech",
    targetCategory: "Mobiles" as const,
  },
  {
    id: "living-essentials",
    label: "Home & Audio",
    headline: "Smart Living",
    highlight: "Save ৳ 1,700",
    subtitle: "Elevate your workspace and living room with ambient lighting and sound.",
    cta: "Browse Home",
    targetCategory: "Home & Living" as const,
  },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Welcome to MJ BD LAB",
    message: "Enjoy free delivery nationwide on orders above ৳ 5,000.",
    time: "Just now",
    read: false,
    targetPage: "categories",
    targetCategory: "All",
  },
  {
    id: "notif-2",
    title: "Seasonal Tech Savings",
    message: "Save up to ৳ 15,000 on iPhone 16 Pro and Laptop Pro 14.",
    time: "2 hours ago",
    read: false,
    targetPage: "categories",
    targetCategory: "Mobiles",
  },
  {
    id: "notif-3",
    title: "Audio & Wearables Restocked",
    message: "AirPods Pro and Titanium Smart Watch are ready for express dispatch.",
    time: "Today",
    read: false,
    targetPage: "categories",
    targetCategory: "Accessories",
  },
];

export const SPECIAL_OFFERS: OfferItem[] = [
  {
    id: "offer-1",
    badge: "Mega Deal",
    title: "Up to ৳ 15,000 Off Flagships",
    description: "Direct markdowns on iPhone 16 Pro and Laptop Pro 14 while stock lasts.",
    code: "MJTECH",
    discountText: "Up to 15% Off",
    targetCategory: "Mobiles",
  },
  {
    id: "offer-2",
    badge: "Bundle Saver",
    title: "Audio & Smart Accessories",
    description: "Save on AirPods Pro, Wireless Studio Headphones, and Titanium Smart Watch.",
    code: "MJAUDIO",
    discountText: "Up to 18% Off",
    targetCategory: "Accessories",
  },
  {
    id: "offer-3",
    badge: "Free Delivery",
    title: "Free Express Shipping",
    description: "Automatic free nationwide courier delivery on every order over ৳ 5,000.",
    code: "AUTO APPLIED",
    discountText: "Free Shipping",
    targetCategory: "All",
  },
];

export function formatBDT(amount: number): string {
  return `৳ ${Number(amount).toLocaleString("en-IN")}`;
}
