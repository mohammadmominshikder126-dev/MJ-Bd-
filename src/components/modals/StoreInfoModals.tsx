import React, { useEffect, useState } from "react";
import {
  Bell,
  Check,
  CheckCircle2,
  Copy,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Tag,
  Trash2,
  X,
} from "lucide-react";
import { SPECIAL_OFFERS, formatBDT } from "../../data/catalog";
import {
  CartItem,
  CategoryName,
  NotificationItem,
  OrderReceipt,
  PageId,
  Product,
} from "../../types/store";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
}

const ModalShell: React.FC<BaseModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "sm:max-w-lg",
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 bg-slate-950/55 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-5"
    >
      <div
        className={`bg-white w-full ${maxWidth} rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[90dvh] flex flex-col`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 shrink-0">
          <h2 className="font-display font-bold text-lg text-[#15152b]">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={`Close ${title}`}
            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="overflow-y-auto p-5 sm:p-6 custom-scroll">{children}</div>
      </div>
    </div>
  );
};

/* ---------------- Notifications Modal ---------------- */
interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onClickNotification: (item: NotificationItem) => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
  onClickNotification,
}) => {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <ModalShell isOpen={isOpen} onClose={onClose} title="Notifications">
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="tabular-nums">
            {unreadCount > 0 ? `${unreadCount} unread updates` : "You are all caught up"}
          </span>
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={onMarkAllRead}
              className="font-semibold text-[#5b12df] hover:underline"
            >
              Mark all as read
            </button>
          )}
        </div>

        <div className="space-y-2.5">
          {notifications.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onClickNotification(item)}
              className={`w-full text-left rounded-2xl border p-4 transition-colors flex items-start gap-3 ${
                item.read
                  ? "bg-white border-slate-200/80 hover:bg-slate-50"
                  : "bg-[#f4f1fe] border-purple-200 hover:bg-[#ebe4fd]"
              }`}
            >
              <span
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  item.read ? "bg-slate-100 text-slate-500" : "bg-[#5b12df] text-white"
                }`}
              >
                <Bell className="w-4 h-4" />
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-display font-bold text-sm text-[#15152b] truncate">
                    {item.title}
                  </span>
                  <span className="text-[11px] text-slate-400 whitespace-nowrap shrink-0">
                    {item.time}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  {item.message}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </ModalShell>
  );
};

/* ---------------- Offers Modal ---------------- */
interface OffersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (cat: CategoryName) => void;
  onNotifyToast: (msg: string) => void;
}

export const OffersModal: React.FC<OffersModalProps> = ({
  isOpen,
  onClose,
  onSelectCategory,
  onNotifyToast,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (id: string, code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      onNotifyToast(`Promo code ${code} copied`);
      setTimeout(() => setCopiedId(null), 1600);
    } catch {
      onNotifyToast(`Use code: ${code}`);
    }
  };

  return (
    <ModalShell isOpen={isOpen} onClose={onClose} title="Special Offers">
      <div className="space-y-4">
        <p className="text-sm text-slate-600">
          Verified markdowns and delivery perks active across MJ BD LAB today.
        </p>

        <div className="space-y-3">
          {SPECIAL_OFFERS.map((offer) => (
            <div
              key={offer.id}
              className="rounded-2xl border border-purple-200/80 bg-[#faf8ff] p-4 space-y-2.5"
            >
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="font-semibold text-[#5b12df] inline-flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" />
                  {offer.badge}
                </span>
                <span className="font-bold text-emerald-700">{offer.discountText}</span>
              </div>

              <h3 className="font-display font-bold text-base text-[#15152b]">{offer.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600">{offer.description}</p>

              <div className="pt-1 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => handleCopy(offer.id, offer.code)}
                  className="min-h-[38px] px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-[#15152b] hover:border-[#5b12df] inline-flex items-center gap-1.5 transition-colors"
                >
                  {copiedId === offer.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#5b12df]" />
                      <span>{offer.code}</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onSelectCategory(offer.targetCategory);
                    onClose();
                  }}
                  className="min-h-[38px] px-4 py-1.5 rounded-xl bg-[#5b12df] hover:bg-[#490cb8] text-white text-xs font-semibold transition-colors"
                >
                  Shop Deal
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ModalShell>
  );
};

/* ---------------- Checkout Modal ---------------- */
interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  products: Product[];
  onOrderConfirmed: (receipt: OrderReceipt) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  products,
  onOrderConfirmed,
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bkash" | "card">("cod");
  const [confirmedReceipt, setConfirmedReceipt] = useState<OrderReceipt | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setConfirmedReceipt(null);
      setError("");
    }
  }, [isOpen]);

  const lineItems = cart
    .map((item) => {
      const p = products.find((prod) => prod.id === item.id);
      return p ? { id: p.id, name: p.name, qty: item.qty, price: p.price } : null;
    })
    .filter((x): x is { id: number; name: string; qty: number; price: number } => x !== null);

  const subtotal = lineItems.reduce((sum, x) => sum + x.price * x.qty, 0);
  const deliveryFee = subtotal === 0 || subtotal >= 5000 ? 0 : 120;
  const total = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim()) {
      setError("Please fill in your name, phone number, and delivery address.");
      return;
    }
    const receipt: OrderReceipt = {
      orderNumber: `#MJ-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
      paymentMethod,
      items: lineItems,
      subtotal,
      deliveryFee,
      total,
      createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setConfirmedReceipt(receipt);
    onOrderConfirmed(receipt);
  };

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      title={confirmedReceipt ? "Order Confirmed" : "Checkout"}
    >
      {confirmedReceipt ? (
        <div className="space-y-5 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <div>
            <h3 className="font-display font-extrabold text-xl text-[#15152b]">
              Order {confirmedReceipt.orderNumber} Confirmed
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Preparing shipment for {confirmedReceipt.customerName}.
            </p>
          </div>

          <div className="bg-[#faf9fd] border border-slate-200/80 rounded-2xl p-4 text-left space-y-2 text-sm">
            {confirmedReceipt.items.map((item) => (
              <div key={item.id} className="flex justify-between gap-2">
                <span className="text-slate-700 truncate">
                  {item.name} × {item.qty}
                </span>
                <span className="font-semibold text-[#15152b] tabular-nums shrink-0">
                  {formatBDT(item.price * item.qty)}
                </span>
              </div>
            ))}
            <div className="border-t border-slate-200 pt-2 flex justify-between font-bold text-[#5b12df]">
              <span>Total Paid / Due</span>
              <span className="tabular-nums">{formatBDT(confirmedReceipt.total)}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full min-h-[46px] rounded-xl bg-[#5b12df] hover:bg-[#490cb8] text-white text-sm font-semibold transition-colors"
          >
            Done
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-xl bg-rose-50 border border-rose-200 text-rose-700 px-3.5 py-2.5 text-xs font-medium">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="checkout-name" className="block text-xs font-semibold text-slate-700 mb-1">
              Full Name
            </label>
            <input
              id="checkout-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Tariq Hasan"
              className="w-full min-h-[44px] px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#5b12df]"
            />
          </div>

          <div>
            <label htmlFor="checkout-phone" className="block text-xs font-semibold text-slate-700 mb-1">
              Phone Number
            </label>
            <input
              id="checkout-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="01XXXXXXXXX"
              className="w-full min-h-[44px] px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#5b12df]"
            />
          </div>

          <div>
            <label htmlFor="checkout-address" className="block text-xs font-semibold text-slate-700 mb-1">
              Delivery Address
            </label>
            <textarea
              id="checkout-address"
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="House, Road, Area, City"
              className="w-full p-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#5b12df]"
            />
          </div>

          <div>
            <span className="block text-xs font-semibold text-slate-700 mb-1.5">
              Payment Method
            </span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "cod", label: "Cash on Delivery" },
                { id: "bkash", label: "Mobile Pay" },
                { id: "card", label: "Card" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setPaymentMethod(opt.id as "cod" | "bkash" | "card")}
                  className={`min-h-[42px] px-2 py-2 rounded-xl border text-xs font-semibold transition-colors ${
                    paymentMethod === opt.id
                      ? "bg-[#f4f1fe] border-[#5b12df] text-[#5b12df]"
                      : "bg-white border-slate-200 text-slate-600"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-[#faf9fd] border border-slate-200/80 p-3.5 flex items-center justify-between text-sm">
            <span className="font-semibold text-slate-600">Total Payable</span>
            <span className="font-display font-extrabold text-lg text-[#5b12df] tabular-nums">
              {formatBDT(total)}
            </span>
          </div>

          <button
            type="submit"
            className="w-full min-h-[48px] rounded-xl bg-[#5b12df] hover:bg-[#490cb8] text-white text-sm font-semibold transition-colors"
          >
            Confirm Order
          </button>
        </form>
      )}
    </ModalShell>
  );
};

/* ---------------- Contact, About & Confirm Clear Modals ---------------- */
export const ContactModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onNotifyToast: (msg: string) => void;
}> = ({ isOpen, onClose, onNotifyToast }) => {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSent(true);
    setMessage("");
    onNotifyToast("Support message received");
  };

  return (
    <ModalShell isOpen={isOpen} onClose={onClose} title="Contact MJ BD LAB">
      <div className="space-y-4">
        <div className="space-y-2.5 text-sm text-slate-600">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#faf9fd] border border-slate-100">
            <Phone className="w-4 h-4 text-[#5b12df] shrink-0" />
            <span className="tabular-nums">+880 1700-000000 (10 AM – 8 PM)</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#faf9fd] border border-slate-100">
            <Mail className="w-4 h-4 text-[#5b12df] shrink-0" />
            <span>support@mjbdlab.com</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#faf9fd] border border-slate-100">
            <MapPin className="w-4 h-4 text-[#5b12df] shrink-0" />
            <span>Banani Road 11, Dhaka 1213, Bangladesh</span>
          </div>
        </div>

        {sent ? (
          <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-800">
            Thank you. Our Dhaka support team has logged your inquiry and will respond shortly.
          </div>
        ) : (
          <form onSubmit={handleSend} className="space-y-3 pt-1">
            <label htmlFor="support-msg" className="block text-xs font-semibold text-slate-700">
              Quick Inquiry
            </label>
            <textarea
              id="support-msg"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about product availability, warranty, or delivery..."
              className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#5b12df]"
            />
            <button
              type="submit"
              className="w-full min-h-[44px] rounded-xl bg-[#5b12df] hover:bg-[#490cb8] text-white text-sm font-semibold transition-colors"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </ModalShell>
  );
};

export const AboutModal: React.FC<{ isOpen: boolean; onClose: () => void; onNavigate: (p: PageId) => void }> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  return (
    <ModalShell isOpen={isOpen} onClose={onClose} title="About MJ BD LAB">
      <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
        <p className="font-display font-bold text-base text-[#15152b]">
          MJ BD LAB — Shop Smart, Live Better
        </p>
        <p>
          MJ BD LAB curates verified flagship electronics, acoustic audio gear, everyday cotton
          essentials, and modern home living products across Bangladesh with transparent BDT pricing
          and fast nationwide dispatch.
        </p>
        <div className="rounded-2xl bg-[#f4f1fe] p-4 flex items-start gap-3 text-xs sm:text-sm text-[#15152b]">
          <ShieldCheck className="w-5 h-5 text-[#5b12df] shrink-0 mt-0.5" />
          <span>
            Every order above ৳ 5,000 qualifies automatically for free express shipping and a 7-day
            easy replacement guarantee.
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            onClose();
            onNavigate("categories");
          }}
          className="w-full min-h-[44px] rounded-xl bg-[#5b12df] hover:bg-[#490cb8] text-white text-sm font-semibold transition-colors"
        >
          Explore Products
        </button>
      </div>
    </ModalShell>
  );
};

export const ConfirmClearModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <ModalShell isOpen={isOpen} onClose={onClose} title="Clear Shopping Data" maxWidth="sm:max-w-sm">
      <div className="space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
          <Trash2 className="w-6 h-6" />
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          This will remove all saved items from your cart and wishlist in local storage. This action
          cannot be undone.
        </p>
        <div className="flex items-center gap-3 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 min-h-[44px] rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 min-h-[44px] rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold transition-colors"
          >
            Clear Data
          </button>
        </div>
      </div>
    </ModalShell>
  );
};
