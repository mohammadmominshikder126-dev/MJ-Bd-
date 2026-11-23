import React, { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { CATEGORIES } from "../../data/catalog";
import { CategoryName, Product, SortOption } from "../../types/store";
import { CategoryIcon } from "../CategoryIcon";
import { ProductCard } from "../ProductCard";

interface CategoriesPageProps {
  products: Product[];
  selectedCategory: CategoryName;
  searchQuery: string;
  wishlistIds: number[];
  onSelectCategory: (cat: CategoryName) => void;
  onSearchChange: (q: string) => void;
  onToggleWishlist: (id: number) => void;
  onAddToCart: (id: number) => void;
  onOpenDetails: (product: Product) => void;
}

const FILTER_TABS: CategoryName[] = [
  "All",
  "Mobiles",
  "Laptops",
  "Accessories",
  "Fashion",
  "Home & Living",
];

export const CategoriesPage: React.FC<CategoriesPageProps> = ({
  products,
  selectedCategory,
  searchQuery,
  wishlistIds,
  onSelectCategory,
  onSearchChange,
  onToggleWishlist,
  onAddToCart,
  onOpenDetails,
}) => {
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = products.filter((p) => {
      const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });

    if (sortBy === "price-asc") {
      return [...list].sort((a, b) => a.price - b.price);
    }
    if (sortBy === "price-desc") {
      return [...list].sort((a, b) => b.price - a.price);
    }
    if (sortBy === "discount") {
      return [...list].sort((a, b) => (b.oldPrice - b.price) - (a.oldPrice - a.price));
    }
    return list;
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#15152b]">
            Categories & Catalog
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Filter by department or search across all MJ BD LAB products
          </p>
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <div className="flex items-center bg-white rounded-xl border border-slate-200/90 focus-within:border-[#5b12df] focus-within:ring-2 focus-within:ring-[#5b12df]/15 px-3 py-1.5 gap-2 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Filter products..."
              aria-label="Filter catalog products"
              className="flex-1 min-w-0 bg-transparent text-sm text-[#15152b] placeholder:text-slate-400 focus:outline-none py-1"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                aria-label="Clear filter text"
                className="p-1 text-slate-400 hover:text-slate-700 rounded-md"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 bg-white rounded-xl border border-slate-200/90 px-3 py-2">
            <SlidersHorizontal className="w-4 h-4 text-slate-500 shrink-0" />
            <label htmlFor="sort-select" className="sr-only">
              Sort products
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-transparent text-sm font-medium text-[#15152b] focus:outline-none pr-2 cursor-pointer"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="discount">Biggest Savings</option>
            </select>
          </div>
        </div>
      </div>

      {/* Interactive Category Tabs */}
      <div
        role="tablist"
        aria-label="Filter by category"
        className="flex items-center gap-2 overflow-x-auto pb-1 custom-scroll"
      >
        {FILTER_TABS.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelectCategory(cat)}
              className={`min-h-[40px] px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 transition-colors border ${
                isActive
                  ? "bg-[#5b12df] text-white border-[#5b12df] shadow-xs"
                  : "bg-white text-slate-600 border-slate-200/80 hover:border-purple-300 hover:text-[#5b12df]"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Category Overview Cards when viewing All without search */}
      {selectedCategory === "All" && !searchQuery.trim() && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className="bg-[#f4f1fe] hover:bg-[#ebe4fd] border border-purple-100 rounded-2xl p-4 text-left transition-colors flex flex-col justify-between gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-white text-[#5b12df] flex items-center justify-center shadow-xs">
                <CategoryIcon category={cat.id} className="w-5 h-5" />
              </div>
              <div>
                <div className="font-display font-bold text-sm text-[#15152b]">{cat.label}</div>
                <div className="text-xs text-slate-500 mt-0.5 line-clamp-1">{cat.itemCountLabel}</div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 border-b border-slate-200/70 pb-2.5">
        <span className="tabular-nums">
          Showing <strong className="text-[#15152b]">{filteredProducts.length}</strong>{" "}
          {filteredProducts.length === 1 ? "product" : "products"}
          {selectedCategory !== "All" ? ` in ${selectedCategory}` : ""}
          {searchQuery.trim() ? ` matching "${searchQuery.trim()}"` : ""}
        </span>
        {(selectedCategory !== "All" || searchQuery.trim()) && (
          <button
            type="button"
            onClick={() => {
              onSelectCategory("All");
              onSearchChange("");
            }}
            className="font-semibold text-[#5b12df] hover:underline whitespace-nowrap shrink-0"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Product Grid or Empty State */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
          {filteredProducts.map((product) => (
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
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-10 text-center max-w-md mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-[#f4f1fe] text-[#5b12df] flex items-center justify-center mx-auto mb-4">
            <Search className="w-7 h-7" />
          </div>
          <h3 className="font-display font-bold text-lg text-[#15152b]">No matching products</h3>
          <p className="text-sm text-slate-500 mt-1.5">
            Try clearing your search query or switching to another category.
          </p>
          <button
            type="button"
            onClick={() => {
              onSelectCategory("All");
              onSearchChange("");
            }}
            className="mt-5 min-h-[44px] px-5 py-2.5 rounded-xl bg-[#5b12df] text-white text-sm font-semibold hover:bg-[#490cb8] transition-colors"
          >
            Show All Products
          </button>
        </div>
      )}
    </div>
  );
};
