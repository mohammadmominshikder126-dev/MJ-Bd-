import React, { useState } from "react";
import { Heart, Package, ShoppingCart } from "lucide-react";
import { Product } from "../types/store";
import { formatBDT } from "../data/catalog";

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (id: number) => void;
  onAddToCart: (id: number) => void;
  onOpenDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onOpenDetails,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="group bg-white rounded-[20px] border border-slate-100 shadow-[0_3px_14px_rgba(33,16,74,0.06)] p-2 sm:p-3 flex items-stretch gap-2 sm:gap-3 transition-transform duration-200 hover:-translate-y-0.5">
      {/* Left: Crisp Product Image */}
      <button
        type="button"
        onClick={() => onOpenDetails(product)}
        aria-label={`View details for ${product.name}`}
        className="w-[43%] max-w-[144px] aspect-square self-center rounded-2xl bg-[#fbfaff] p-1 overflow-hidden shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5b12df]"
      >
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-[1.04]"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#f4f1fe] text-[#5b12df] p-2 text-center">
            <Package className="w-6 h-6 opacity-70" />
          </div>
        )}
      </button>

      {/* Right: Stock pill + Heart, Name, Price, Old Price, Add to Cart pill */}
      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
        <div>
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="inline-block rounded-full bg-[#14c653] text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 leading-tight whitespace-nowrap">
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist(product.id);
              }}
              aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
              aria-pressed={isWishlisted}
              className={`w-7 h-7 sm:w-8 sm:h-8 -mr-1 rounded-full flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5b12df] ${
                isWishlisted ? "text-[#f12b65]" : "text-slate-500 hover:text-[#f12b65]"
              }`}
            >
              <Heart
                className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
                fill={isWishlisted ? "currentColor" : "none"}
                strokeWidth={2}
              />
            </button>
          </div>

          <button
            type="button"
            onClick={() => onOpenDetails(product)}
            className="text-left w-full focus:outline-none focus-visible:underline"
          >
            <h3 className="font-display font-bold text-[12px] sm:text-sm text-[#15152b] leading-snug line-clamp-1 group-hover:text-[#5b12df] transition-colors">
              {product.name}
            </h3>
          </button>

          <div className="mt-0.5 font-display font-extrabold text-[13px] sm:text-base text-[#5b12df] tabular-nums leading-tight">
            {formatBDT(product.price)}
          </div>

          {product.oldPrice > product.price && (
            <div className="text-[10px] sm:text-xs text-slate-400 line-through tabular-nums leading-tight">
              {formatBDT(product.oldPrice)}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => onAddToCart(product.id)}
          className="mt-2 w-full min-h-[32px] sm:min-h-[36px] px-2 sm:px-3 py-1.5 rounded-full bg-[#5b12df] hover:bg-[#490cb8] active:scale-[0.98] text-white text-[10px] sm:text-xs font-bold flex items-center justify-center gap-1 sm:gap-1.5 transition-all whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5b12df]"
        >
          <ShoppingCart className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
          <span>Add to Cart</span>
        </button>
      </div>
    </article>
  );
};
