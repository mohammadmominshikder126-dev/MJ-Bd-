import React from "react";
import {
  Bell,
  CheckCircle2,
  ChevronRight,
  Info,
  MessageSquare,
  ShoppingBag,
  Tag,
  Trash2,
} from "lucide-react";
import { formatBDT } from "../../data/catalog";
import { OrderReceipt, PageId } from "../../types/store";

interface MorePageProps {
  unreadNotifications: number;
  lastOrder: OrderReceipt | null;
  onOpenNotifications: () => void;
  onOpenOffers: () => void;
  onNavigate: (page: PageId) => void;
  onOpenContact: () => void;
  onOpenAbout: () => void;
  onRequestClearData: () => void;
}

export const MorePage: React.FC<MorePageProps> = ({
  unreadNotifications,
  lastOrder,
  onOpenNotifications,
  onOpenOffers,
  onNavigate,
  onOpenContact,
  onOpenAbout,
  onRequestClearData,
}) => {
  const menuItems = [
    {
      id: "notifications",
      title: "Notifications",
      subtitle:
        unreadNotifications > 0
          ? `${unreadNotifications} unread store alerts`
          : "All notifications read",
      Icon: Bell,
      badge: unreadNotifications > 0 ? String(unreadNotifications) : undefined,
      onClick: onOpenNotifications,
    },
    {
      id: "offers",
      title: "Special Offers",
      subtitle: "Active promo deals and free delivery info",
      Icon: Tag,
      onClick: onOpenOffers,
    },
    {
      id: "products",
      title: "All Products",
      subtitle: "Browse every category and active markdown",
      Icon: ShoppingBag,
      onClick: () => onNavigate("categories"),
    },
    {
      id: "contact",
      title: "Contact & Support",
      subtitle: "Reach MJ BD LAB Dhaka support team",
      Icon: MessageSquare,
      onClick: onOpenContact,
    },
    {
      id: "about",
      title: "About MJ BD LAB",
      subtitle: "Brand promise, warranty, and return policy",
      Icon: Info,
      onClick: onOpenAbout,
    },
    {
      id: "clear",
      title: "Clear Shopping Data",
      subtitle: "Reset saved cart and wishlist items",
      Icon: Trash2,
      destructive: true,
      onClick: onRequestClearData,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-5 pb-10 space-y-6">
      <div>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#15152b]">
          More Options
        </h2>
        <p className="text-sm text-slate-500 mt-0.5">
          Manage notifications, special offers, support, and saved preferences
        </p>
      </div>

      {lastOrder && (
        <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <div className="font-display font-bold text-sm sm:text-base text-emerald-950">
                Order {lastOrder.orderNumber} Confirmed — Preparing Shipment
              </div>
              <p className="text-xs sm:text-sm text-emerald-800 mt-0.5 tabular-nums">
                {lastOrder.items.length} {lastOrder.items.length === 1 ? "item" : "items"} ·{" "}
                {formatBDT(lastOrder.total)} · {lastOrder.createdAt}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {menuItems.map(({ id, title, subtitle, Icon, badge, destructive, onClick }) => (
          <button
            key={id}
            type="button"
            onClick={onClick}
            className={`group text-left rounded-2xl border p-4 sm:p-5 flex items-center gap-4 transition-all ${
              destructive
                ? "bg-white hover:bg-rose-50/60 border-slate-200/80 hover:border-rose-200"
                : "bg-white hover:bg-[#f4f1fe]/60 border-slate-200/80 hover:border-purple-200"
            }`}
          >
            <span
              className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                destructive
                  ? "bg-rose-50 text-rose-600"
                  : "bg-[#f4f1fe] text-[#5b12df]"
              }`}
            >
              <Icon className="w-5 h-5" />
            </span>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className={`font-display font-bold text-sm sm:text-base truncate ${
                    destructive ? "text-rose-700" : "text-[#15152b]"
                  }`}
                >
                  {title}
                </span>
                {badge && (
                  <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-[#ff304d] text-white text-[11px] font-bold flex items-center justify-center tabular-nums">
                    {badge}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5 truncate">{subtitle}</p>
            </div>

            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
          </button>
        ))}
      </div>

      <footer className="pt-4 text-center text-xs text-slate-500">
        MJ BD LAB © 2026 · Shop Smart, Live Better
      </footer>
    </div>
  );
};
