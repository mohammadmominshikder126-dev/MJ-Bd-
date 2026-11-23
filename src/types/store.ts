export type PageId = "home" | "categories" | "cart" | "wishlist" | "more";

export type CategoryName =
  | "All"
  | "Mobiles"
  | "Laptops"
  | "Accessories"
  | "Fashion"
  | "Home & Living";

export type SortOption = "featured" | "price-asc" | "price-desc" | "discount";

export interface CategoryItem {
  id: Exclude<CategoryName, "All">;
  label: string;
  description: string;
  itemCountLabel: string;
}

export interface Product {
  id: number;
  name: string;
  category: Exclude<CategoryName, "All">;
  price: number;
  oldPrice: number;
  image: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  description: string;
  specs: string[];
  featured?: boolean;
}

export interface CartItem {
  id: number;
  qty: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  targetPage?: PageId;
  targetCategory?: CategoryName;
}

export interface OfferItem {
  id: string;
  badge: string;
  title: string;
  description: string;
  code: string;
  discountText: string;
  targetCategory: CategoryName;
}

export interface OrderReceipt {
  orderNumber: string;
  customerName: string;
  phone: string;
  address: string;
  paymentMethod: "cod" | "bkash" | "card";
  items: Array<{
    id: number;
    name: string;
    qty: number;
    price: number;
  }>;
  subtotal: number;
  deliveryFee: number;
  total: number;
  createdAt: string;
}
