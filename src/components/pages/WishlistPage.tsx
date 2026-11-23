import React from "react";
import { ArrowRight, Heart, ShoppingCart } from "lucide-react";
import { PageId, Product } from "../../types/store";
import { ProductCard } from "../ProductCard";

interface WishlistPageProps {
  products: Product[];
  wishlistIds: number[];
  onToggleWishlist: (id: number) => void;
  onAddToCart: (id: number) => void;
  onAddAllToCart: () => void;
  onOpenDetails: (product: Product) => void;
  onNavigate: (page: PageId) => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({
  products,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onAddAllToCart,
  onOpenDetails,
  onNavigate,
}) => {
  const savedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#15152b]">
            My Wishlist
          </h2>
          <p className="text-sm text-slate-500 mt-0.5 tabular-nums">
            {savedProducts.length === 0
              ? "Save products you love for later"
              : `${savedProducts.length} saved ${savedProducts.length === 1 ? "item" : "items"}`}
          </p>
        </div>

        {savedProducts.length > 0 && (
          <button
            type="button"
            onClick={onAddAllToCart}
            className="min-h-[42px] px-4 py-2 rounded-xl bg-[#f4f1fe] hover:bg-[#ebe4fd] text-[#5b12df] text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Move All to Cart</span>
          </button>
        )}
      </div>

      {savedProducts.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
          {savedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={true}
              onToggleWishlist={onToggleWishlist}
              onAddToCart={onAddToCart}
              onOpenDetails={onOpenDetails}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-10 text-center max-w-md mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="font-display font-bold text-xl text-[#15152b]">Your wishlist is empty</h3>
          <p className="text-sm text-slate-500 mt-1.5">
            Tap the heart icon on any product card to save it here for quick access.
          </p>
          <button
            type="button"
            onClick={() => onNavigate("categories")}
            className="mt-6 min-h-[44px] px-6 py-3 rounded-xl bg-[#5b12df] hover:bg-[#490cb8] text-white text-sm font-semibold inline-flex items-center gap-2 transition-colors"
          >
            <span>Explore Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
