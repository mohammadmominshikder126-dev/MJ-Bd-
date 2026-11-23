import React, { useEffect, useState } from "react";
import { Check, Heart, Minus, Plus, ShoppingCart, Star, X } from "lucide-react";
import { formatBDT } from "../../data/catalog";
import { Product } from "../../types/store";

interface ProductDetailsModalProps {
  product: Product | null;
  isWishlisted: boolean;
  onClose: () => void;
  onAddToCart: (id: number, qty: number) => void;
  onToggleWishlist: (id: number) => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  isWishlisted,
  onClose,
  onAddToCart,
  onToggleWishlist,
}) => {
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setQty(1);
  }, [product?.id]);

  useEffect(() => {
    if (!product) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  const savings = Math.max(0, product.oldPrice - product.price);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 bg-slate-950/55 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-5"
    >
      <div className="bg-white w-full sm:max-w-2xl rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[92dvh] flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 shrink-0">
          <span className="text-xs font-semibold text-slate-500">
            {product.category} · Product Details
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close product details"
            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-12 gap-6 custom-scroll">
          <div className="sm:col-span-5">
            <div className="aspect-square rounded-2xl bg-[#faf9fd] border border-slate-100 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="sm:col-span-7 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="inline-flex items-center gap-1 font-medium text-amber-600 tabular-nums">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {product.rating} · {product.reviewCount} reviews
                </span>
                <span className="font-semibold text-emerald-700">
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              <h2
                id="pdp-title"
                className="font-display font-extrabold text-xl sm:text-2xl text-[#15152b] leading-tight"
              >
                {product.name}
              </h2>

              <div className="flex items-baseline gap-2.5 flex-wrap">
                <span className="font-display font-extrabold text-2xl text-[#5b12df] tabular-nums">
                  {formatBDT(product.price)}
                </span>
                {product.oldPrice > product.price && (
                  <span className="text-sm text-slate-400 line-through tabular-nums">
                    {formatBDT(product.oldPrice)}
                  </span>
                )}
                {savings > 0 && (
                  <span className="text-xs font-semibold text-emerald-700 tabular-nums">
                    Save {formatBDT(savings)}
                  </span>
                )}
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">{product.description}</p>

              <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 pt-1">
                {product.specs.map((spec) => (
                  <li key={spec} className="text-xs text-slate-600 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#5b12df] shrink-0" />
                    <span className="truncate">{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Purchase Module */}
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center rounded-xl bg-[#f4f1fe] border border-purple-100 p-0.5">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-[#5b12df] hover:bg-white transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-9 text-center text-sm font-bold text-[#15152b] tabular-nums">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-[#5b12df] hover:bg-white transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  onAddToCart(product.id, qty);
                  onClose();
                }}
                className="flex-1 min-h-[44px] px-5 py-2.5 rounded-xl bg-[#5b12df] hover:bg-[#490cb8] text-white text-sm font-semibold flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
              >
                <ShoppingCart className="w-4 h-4 shrink-0" />
                <span>Add to Cart</span>
              </button>

              <button
                type="button"
                onClick={() => onToggleWishlist(product.id)}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                className={`min-w-[44px] min-h-[44px] rounded-xl border flex items-center justify-center transition-colors ${
                  isWishlisted
                    ? "bg-rose-50 border-rose-200 text-rose-600"
                    : "bg-white border-slate-200 text-slate-600 hover:text-rose-600"
                }`}
              >
                <Heart className="w-5 h-5" fill={isWishlisted ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
