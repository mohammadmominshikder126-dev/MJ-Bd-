import React from "react";
import { Bell, Search, User, X } from "lucide-react";
import { PageId } from "../types/store";
import { BrandMark } from "./BrandMark";

interface StoreHeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  unreadNotifications: number;
  cartCount: number;
  wishlistCount: number;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSearchSubmit: () => void;
  onOpenNotifications: () => void;
  searchInputRef?: React.RefObject<HTMLInputElement | null>;
}

const DESKTOP_NAV_ITEMS: Array<{ id: PageId; label: string }> = [
  { id: "home", label: "Home" },
  { id: "categories", label: "Categories" },
  { id: "cart", label: "Cart" },
  { id: "wishlist", label: "Wishlist" },
  { id: "more", label: "More" },
];

export const StoreHeader: React.FC<StoreHeaderProps> = ({
  currentPage,
  onNavigate,
  unreadNotifications,
  cartCount,
  wishlistCount,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onOpenNotifications,
  searchInputRef,
}) => {
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit();
  };

  return (
    <header className="shrink-0 bg-gradient-to-r from-[#3b039b] via-[#5712df] to-[#6f1cf4] text-white rounded-b-[26px] shadow-md shadow-purple-950/15 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-3.5 pb-4 space-y-3.5">
        {/* Top Row: Brand, Desktop Nav Links, Notification Bell & Profile */}
        <div className="flex items-center justify-between gap-4 lg:gap-8">
          <button
            type="button"
            onClick={() => onNavigate("home")}
            className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffdf18] rounded-xl"
            aria-label="MJ BD LAB Home"
          >
            <BrandMark showSubtitle={true} />
          </button>

          {/* Desktop 5-Page Navigation */}
          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex items-center gap-7"
          >
            {DESKTOP_NAV_ITEMS.map((item) => {
              const isActive = currentPage === item.id;
              const countSuffix =
                item.id === "cart" && cartCount > 0
                  ? ` (${cartCount})`
                  : item.id === "wishlist" && wishlistCount > 0
                    ? ` (${wishlistCount})`
                    : "";

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffdf18] rounded-md px-1 tabular-nums ${
                    isActive ? "text-white font-bold" : "text-purple-100/85 hover:text-white"
                  }`}
                >
                  {item.label}
                  {countSuffix}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-1 right-1 h-0.5 bg-[#ffdf18] rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Notification Bell & Profile Icon */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={onOpenNotifications}
              className="relative w-11 h-11 rounded-full flex items-center justify-center text-white hover:bg-white/15 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffdf18]"
              aria-label={`Notifications${unreadNotifications > 0 ? `, ${unreadNotifications} unread` : ""}`}
            >
              <Bell className="w-6 h-6" strokeWidth={2} />
              {unreadNotifications > 0 && (
                <span className="absolute top-1 right-1 min-w-[19px] h-[19px] px-1 rounded-full bg-[#ff2d47] text-white text-[11px] font-bold flex items-center justify-center tabular-nums leading-none shadow-xs">
                  {unreadNotifications}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => onNavigate("more")}
              className="w-10 h-10 rounded-full bg-purple-100/90 hover:bg-white text-[#4c0cc7] flex items-center justify-center transition-colors shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffdf18]"
              aria-label="Account and more options"
            >
              <User className="w-5 h-5" strokeWidth={2.2} />
            </button>
          </div>
        </div>

        {/* Integrated White Pill Search Bar with Purple Circular Search Button */}
        <form onSubmit={handleFormSubmit} className="max-w-3xl mx-auto lg:max-w-none">
          <div className="flex items-center bg-white rounded-full pl-4 pr-1.5 py-1.5 shadow-sm gap-2.5">
            <Search className="w-5 h-5 text-slate-700 shrink-0" strokeWidth={2.2} />
            <input
              ref={searchInputRef}
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search products..."
              aria-label="Search products"
              className="flex-1 min-w-0 bg-transparent text-sm sm:text-[15px] text-[#15152b] placeholder:text-slate-400 focus:outline-none py-1"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                aria-label="Clear search"
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="submit"
              aria-label="Run search"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#5b12df] hover:bg-[#490cb8] active:scale-95 text-white flex items-center justify-center shrink-0 transition-all shadow-xs"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.4} />
            </button>
          </div>
        </form>
      </div>
    </header>
  );
};
