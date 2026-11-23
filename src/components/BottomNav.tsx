import React from "react";
import { Heart, Home, LayoutGrid, MoreHorizontal, ShoppingCart } from "lucide-react";
import { PageId } from "../types/store";

interface BottomNavProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  cartCount: number;
  wishlistCount: number;
}

const NAV_ITEMS: Array<{
  id: PageId;
  label: string;
  Icon: React.FC<{ className?: string; strokeWidth?: number; fill?: string }>;
}> = [
  { id: "home", label: "Home", Icon: Home },
  { id: "categories", label: "Categories", Icon: LayoutGrid },
  { id: "cart", label: "Cart", Icon: ShoppingCart },
  { id: "wishlist", label: "Wishlist", Icon: Heart },
  { id: "more", label: "More", Icon: MoreHorizontal },
];

export const BottomNav: React.FC<BottomNavProps> = ({
  currentPage,
  onNavigate,
  cartCount,
  wishlistCount,
}) => {
  return (
    <nav
      aria-label="Mobile bottom navigation"
      className="lg:hidden shrink-0 h-16 bg-white border-t border-slate-200/80 grid grid-cols-5 items-center z-30 shadow-[0_-4px_16px_rgba(21,21,43,0.04)]"
    >
      {NAV_ITEMS.map(({ id, label, Icon }) => {
        const isActive = currentPage === id;
        const badgeCount = id === "cart" ? cartCount : id === "wishlist" ? wishlistCount : 0;
        const fillIcon = isActive && (id === "home" || id === "wishlist") ? "currentColor" : "none";

        return (
          <button
            key={id}
            type="button"
            onClick={() => onNavigate(id)}
            aria-current={isActive ? "page" : undefined}
            className={`relative h-full min-h-[44px] flex flex-col items-center justify-center gap-0.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#5b12df] ${
              isActive ? "text-[#5b12df] font-bold" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span className="relative">
              <Icon className="w-5 h-5" strokeWidth={isActive ? 2.2 : 1.9} fill={fillIcon} />
              {badgeCount > 0 && (
                <span className="absolute -top-1.5 -right-2.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#ff2d47] text-white text-[10px] font-bold flex items-center justify-center tabular-nums leading-none">
                  {badgeCount}
                </span>
              )}
            </span>
            <span className="text-[11px] leading-tight whitespace-nowrap">{label}</span>
            {isActive && (
              <span
                aria-hidden="true"
                className="w-10 h-[3px] rounded-full bg-[#5b12df] mt-0.5"
              />
            )}
          </button>
        );
      })}
    </nav>
  );
};
