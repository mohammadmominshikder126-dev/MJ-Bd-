import React from "react";
import { ArrowRight, Minus, Plus, ShieldCheck, ShoppingCart, Trash2, Truck } from "lucide-react";
import { formatBDT } from "../../data/catalog";
import { CartItem, PageId, Product } from "../../types/store";

interface CartPageProps {
  cart: CartItem[];
  products: Product[];
  onChangeQty: (id: number, delta: number) => void;
  onRemoveItem: (id: number) => void;
  onOpenDetails: (product: Product) => void;
  onCheckout: () => void;
  onNavigate: (page: PageId) => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  cart,
  products,
  onChangeQty,
  onRemoveItem,
  onOpenDetails,
  onCheckout,
  onNavigate,
}) => {
  const lineItems = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.id);
      return product ? { product, qty: item.qty } : null;
    })
    .filter((entry): entry is { product: Product; qty: number } => entry !== null);

  const subtotal = lineItems.reduce((sum, { product, qty }) => sum + product.price * qty, 0);
  const freeDeliveryThreshold = 5000;
  const deliveryFee = subtotal === 0 || subtotal >= freeDeliveryThreshold ? 0 : 120;
  const total = subtotal + deliveryFee;
  const totalUnits = lineItems.reduce((sum, { qty }) => sum + qty, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-8 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#15152b]">
            Shopping Cart
          </h2>
          <p className="text-sm text-slate-500 mt-0.5 tabular-nums">
            {totalUnits === 0
              ? "Your cart is currently empty"
              : `${totalUnits} ${totalUnits === 1 ? "item" : "items"} saved in your cart`}
          </p>
        </div>

        {lineItems.length > 0 && (
          <button
            type="button"
            onClick={() => onNavigate("categories")}
            className="text-xs sm:text-sm font-semibold text-[#5b12df] hover:underline whitespace-nowrap shrink-0"
          >
            Continue Shopping
          </button>
        )}
      </div>

      {lineItems.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-10 text-center max-w-md mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-[#f4f1fe] text-[#5b12df] flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="w-8 h-8" />
          </div>
          <h3 className="font-display font-bold text-xl text-[#15152b]">Your cart is empty</h3>
          <p className="text-sm text-slate-500 mt-1.5">
            Explore our featured electronics, apparel, and home living products to get started.
          </p>
          <button
            type="button"
            onClick={() => onNavigate("categories")}
            className="mt-6 min-h-[44px] px-6 py-3 rounded-xl bg-[#5b12df] hover:bg-[#490cb8] text-white text-sm font-semibold inline-flex items-center gap-2 transition-colors"
          >
            <span>Start Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 divide-y divide-slate-100">
            {lineItems.map(({ product, qty }) => (
              <div
                key={product.id}
                className="p-4 sm:p-5 flex items-center gap-4"
              >
                <button
                  type="button"
                  onClick={() => onOpenDetails(product)}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-[#faf9fd] overflow-hidden shrink-0 border border-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5b12df]"
                  aria-label={`View ${product.name}`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <span className="text-xs text-slate-500 font-medium">
                        {product.category}
                      </span>
                      <button
                        type="button"
                        onClick={() => onOpenDetails(product)}
                        className="block text-left font-display font-bold text-sm sm:text-base text-[#15152b] hover:text-[#5b12df] truncate transition-colors"
                      >
                        {product.name}
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemoveItem(product.id)}
                      aria-label={`Remove ${product.name} from cart`}
                      className="min-w-[40px] min-h-[40px] rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition-colors shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                    <div className="inline-flex items-center rounded-xl bg-[#f4f1fe] border border-purple-100 p-0.5">
                      <button
                        type="button"
                        onClick={() => onChangeQty(product.id, -1)}
                        aria-label={`Decrease quantity of ${product.name}`}
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-[#5b12df] hover:bg-white transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-9 text-center text-sm font-bold text-[#15152b] tabular-nums">
                        {qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => onChangeQty(product.id, 1)}
                        aria-label={`Increase quantity of ${product.name}`}
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-[#5b12df] hover:bg-white transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="font-display font-bold text-base sm:text-lg text-[#5b12df] tabular-nums">
                        {formatBDT(product.price * qty)}
                      </div>
                      {qty > 1 && (
                        <div className="text-xs text-slate-400 tabular-nums">
                          {formatBDT(product.price)} each
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Card */}
          <aside className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 space-y-4">
            <h3 className="font-display font-bold text-lg text-[#15152b]">Order Summary</h3>

            <div className="space-y-2.5 text-sm border-b border-slate-100 pb-4">
              <div className="flex items-center justify-between text-slate-600">
                <span>Subtotal ({totalUnits} items)</span>
                <span className="font-semibold text-[#15152b] tabular-nums">
                  {formatBDT(subtotal)}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Delivery</span>
                <span className="font-semibold text-emerald-700 tabular-nums">
                  {deliveryFee === 0 ? "Free" : formatBDT(deliveryFee)}
                </span>
              </div>
            </div>

            {subtotal < freeDeliveryThreshold && (
              <div className="rounded-xl bg-[#f4f1fe] p-3 text-xs text-[#5b12df] flex items-center gap-2">
                <Truck className="w-4 h-4 shrink-0" />
                <span>
                  Add <strong className="tabular-nums">{formatBDT(freeDeliveryThreshold - subtotal)}</strong> more for free delivery.
                </span>
              </div>
            )}

            <div className="flex items-center justify-between pt-1">
              <span className="font-display font-bold text-base text-[#15152b]">Total</span>
              <span className="font-display font-extrabold text-xl text-[#5b12df] tabular-nums">
                {formatBDT(total)}
              </span>
            </div>

            <button
              type="button"
              onClick={onCheckout}
              className="w-full min-h-[48px] px-5 py-3 rounded-xl bg-[#5b12df] hover:bg-[#490cb8] active:scale-[0.99] text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Cash on Delivery & Verified Warranty</span>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};
