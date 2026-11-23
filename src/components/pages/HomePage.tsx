import React, { useState } from "react";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { CATEGORIES, HERO_BANNER_IMAGE, HERO_SLIDES } from "../../data/catalog";
import { CategoryName, PageId, Product } from "../../types/store";
import { CategoryIcon } from "../CategoryIcon";
import { ProductCard } from "../ProductCard";

interface HomePageProps {
  products: Product[];
  wishlistIds: number[];
  cartCount: number;
  onNavigate: (page: PageId) => void;
  onSelectCategory: (category: CategoryName) => void;
  onToggleWishlist: (id: number) => void;
  onAddToCart: (id: number) => void;
  onOpenDetails: (product: Product) => void;
  onOpenOffers: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  wishlistIds,
  cartCount,
  onNavigate,
  onSelectCategory,
  onToggleWishlist,
  onAddToCart,
  onOpenDetails,
  onOpenOffers,
}) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const activeSlide = HERO_SLIDES[slideIndex];

  const featuredProducts = products.slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-3.5 pb-6 space-y-5">
      {/* Hero Promo Banner using exact extracted artwork */}
      <section aria-label="Special offers banner">
        <div className="relative rounded-[24px] bg-gradient-to-r from-[#ece4fe] via-[#eadfff] to-[#e4d5fe] overflow-hidden shadow-xs">
          <div className="relative flex items-center min-h-[178px] sm:min-h-[220px] lg:min-h-[250px]">
            {/* Left Copy */}
            <div className="w-[58%] sm:w-[55%] p-4 sm:p-7 lg:p-9 relative z-10 space-y-2.5 sm:space-y-3.5">
              <span className="inline-block rounded-full bg-[#5b12df] text-white text-[11px] sm:text-xs font-bold px-3.5 py-1 shadow-xs">
                {activeSlide.label}
              </span>

              <h1 className="font-display font-extrabold text-[21px] sm:text-3xl lg:text-4xl text-[#15152b] leading-[1.12]">
                {activeSlide.headline}
                <span className="block mt-0.5">
                  {slideIndex === 0 ? (
                    <>
                      Up to <span className="text-[#5b12df] text-[25px] sm:text-4xl lg:text-[42px]">70%</span> OFF
                    </>
                  ) : (
                    <span className="text-[#5b12df]">{activeSlide.highlight}</span>
                  )}
                </span>
              </h1>

              <div className="pt-0.5">
                <button
                  type="button"
                  onClick={() => onSelectCategory(activeSlide.targetCategory)}
                  className="min-h-[38px] sm:min-h-[42px] px-4 sm:px-5 py-2 rounded-full bg-[#5b12df] hover:bg-[#490cb8] active:scale-[0.98] text-white text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <span>{activeSlide.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Banner Artwork directly from user design */}
            <div className="absolute right-0 top-0 bottom-0 w-[52%] sm:w-[46%] lg:w-[42%] flex items-center justify-end pointer-events-none">
              <img
                src={HERO_BANNER_IMAGE}
                alt="MJ BD LAB Special Offer"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain object-right [mask-image:linear-gradient(to_right,transparent_0%,black_18%)]"
              />
            </div>
          </div>
        </div>

        {/* 3 Carousel Dots */}
        <div className="flex items-center justify-center gap-2.5 pt-2.5" role="tablist" aria-label="Banner slides">
          {HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={idx === slideIndex}
              aria-label={`Banner slide ${idx + 1}`}
              onClick={() => setSlideIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                idx === slideIndex ? "bg-[#5b12df]" : "bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </section>

      {/* 4 Quick Shortcuts using exact extracted icons */}
      <section aria-label="Quick actions" className="grid grid-cols-4 gap-2 sm:gap-4">
        {/* 1. All Products */}
        <button
          type="button"
          onClick={() => onSelectCategory("All")}
          className="bg-white hover:bg-[#faf8ff] rounded-2xl border border-slate-100 shadow-[0_2px_10px_rgba(33,16,74,0.04)] py-2.5 px-1 sm:p-4 flex flex-col items-center justify-center gap-1.5 transition-colors"
        >
          <span className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden flex items-center justify-center">
            <img
              src="/assets/design/shortcut_all.png"
              alt=""
              className="w-full h-full object-cover"
            />
          </span>
          <span className="text-[11px] sm:text-xs font-bold text-[#15152b] whitespace-nowrap">
            All Products
          </span>
        </button>

        {/* 2. Wishlist */}
        <button
          type="button"
          onClick={() => onNavigate("wishlist")}
          className="bg-white hover:bg-[#faf8ff] rounded-2xl border border-slate-100 shadow-[0_2px_10px_rgba(33,16,74,0.04)] py-2.5 px-1 sm:p-4 flex flex-col items-center justify-center gap-1.5 transition-colors"
        >
          <span className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center">
            <img
              src="/assets/design/shortcut_wishlist.png"
              alt=""
              className="w-full h-full object-cover rounded-xl"
            />
            {wishlistIds.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#ff2d47] text-white text-[10px] font-bold flex items-center justify-center tabular-nums">
                {wishlistIds.length}
              </span>
            )}
          </span>
          <span className="text-[11px] sm:text-xs font-bold text-[#15152b] whitespace-nowrap">
            Wishlist
          </span>
        </button>

        {/* 3. Cart */}
        <button
          type="button"
          onClick={() => onNavigate("cart")}
          className="bg-white hover:bg-[#faf8ff] rounded-2xl border border-slate-100 shadow-[0_2px_10px_rgba(33,16,74,0.04)] py-2.5 px-1 sm:p-4 flex flex-col items-center justify-center gap-1.5 transition-colors"
        >
          <span className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#eaf3ff] text-[#1464f4] flex items-center justify-center">
            <ShoppingCart className="w-6 h-6" strokeWidth={2.2} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[19px] h-[19px] px-1 rounded-full bg-[#ff2d47] text-white text-[10px] font-bold flex items-center justify-center tabular-nums shadow-xs">
                {cartCount}
              </span>
            )}
          </span>
          <span className="text-[11px] sm:text-xs font-bold text-[#15152b] whitespace-nowrap">
            Cart
          </span>
        </button>

        {/* 4. Offers */}
        <button
          type="button"
          onClick={onOpenOffers}
          className="bg-white hover:bg-[#faf8ff] rounded-2xl border border-slate-100 shadow-[0_2px_10px_rgba(33,16,74,0.04)] py-2.5 px-1 sm:p-4 flex flex-col items-center justify-center gap-1.5 transition-colors"
        >
          <span className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden flex items-center justify-center">
            <img
              src="/assets/design/shortcut_offers.png"
              alt=""
              className="w-full h-full object-cover"
            />
          </span>
          <span className="text-[11px] sm:text-xs font-bold text-[#15152b] whitespace-nowrap">
            Offers
          </span>
        </button>
      </section>

      {/* Categories Section */}
      <section aria-labelledby="home-categories-heading">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <span aria-hidden="true" className="w-1.5 h-6 rounded-full bg-[#5b12df]" />
            <h2
              id="home-categories-heading"
              className="font-display font-extrabold text-lg sm:text-xl text-[#15152b]"
            >
              Categories
            </h2>
          </div>

          <button
            type="button"
            onClick={() => onSelectCategory("All")}
            className="text-xs sm:text-sm font-semibold text-[#5b12df] hover:underline inline-flex items-center gap-1 whitespace-nowrap shrink-0"
          >
            <span>See All</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-5 gap-1.5 sm:gap-3.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className="group bg-[#f2efff] hover:bg-[#e8e2ff] rounded-2xl py-2.5 px-1 sm:p-4 flex flex-col items-center justify-center text-center transition-colors min-w-0"
            >
              <div className="mb-1.5 group-hover:scale-105 transition-transform">
                <CategoryIcon category={cat.id} className="w-10 h-10 sm:w-12 sm:h-12" />
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-[#15152b] truncate w-full leading-tight">
                {cat.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section aria-labelledby="featured-products-heading">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <span aria-hidden="true" className="w-1.5 h-6 rounded-full bg-[#5b12df]" />
            <h2
              id="featured-products-heading"
              className="font-display font-extrabold text-lg sm:text-xl text-[#15152b]"
            >
              Featured Products
            </h2>
          </div>

          <button
            type="button"
            onClick={() => onSelectCategory("All")}
            className="text-xs sm:text-sm font-semibold text-[#5b12df] hover:underline inline-flex items-center gap-1 whitespace-nowrap shrink-0"
          >
            <span>See All</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              onAddToCart={onAddToCart}
              onOpenDetails={onOpenDetails}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
